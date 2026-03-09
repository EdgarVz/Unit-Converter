// Import Node.js core modules / Importar módulos principales de Node.js
const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs').promises;
const path = require('path');

// Server configuration / Configuración del servidor
const hostname = 'localhost';
const port = 3000;

/**
 * Route definitions / Definición de rutas
 * Maps HTTP methods and paths to handler functions
 * Mapea métodos HTTP y rutas a funciones manejadoras
 */
const routes = {
    // GET routes - display pages / Rutas GET - mostrar páginas
    'GET:/': (req, res) => renderView(res, 'home'),
    'GET:/length': (req, res) => renderView(res, 'length'),
    'GET:/weight': (req, res) => renderView(res, 'weight'),
    'GET:/temperature': (req, res) => renderView(res, 'temperature'),
    
    // POST routes - handle form submissions / Rutas POST - procesar formularios
    'POST:/select': (req, res) => selectUnit(req, res),
    'POST:/length': (req, res) => processConversion(req, res),
    'POST:/weight': (req, res) => processConversion(req, res),
    'POST:/temperature': (req, res) => processConversion(req, res)
};

// Import conversion rates for length and weight / Importar tasas de conversión para longitud y peso
const lengthRates = require('./converters/length');
const weightRates = require('./converters/weight');

/**
 * Converter registry / Registro de conversores
 * Each converter is a function that takes (value, from, to) and returns converted value
 * Cada conversor es una función que recibe (valor, desde, hacia) y devuelve el valor convertido
 */
const converters = {
    length: createConverter(lengthRates),
    weight: createConverter(weightRates),
    temperature: require('./converters/temperature') // Special case with formulas / Caso especial con fórmulas
}

/**
 * Factory function that creates a converter from conversion rates
 * Función fábrica que crea un conversor a partir de tasas de conversión
 * @param {Object} rates - Conversion rates object / Objeto con tasas de conversión
 * @returns {Function} Converter function / Función conversora
 */
function createConverter(rates) {
    return function(value, from, to) {
        // Validate units exist / Validar que las unidades existan
        if (!(from in rates) || !(to in rates)) return null;
        
        // Convert to base unit then to target unit / Convertir a unidad base y luego a destino
        const valueInBase = value / rates[from];
        return valueInBase * rates[to];
    };
}

/**
 * Parses HTTP request body with size limit
 * Parsea el cuerpo de la petición HTTP con límite de tamaño
 * @param {http.IncomingMessage} req - Request object / Objeto de petición
 * @param {http.ServerResponse} res - Response object / Objeto de respuesta
 * @returns {Promise<Object>} Parsed form data / Datos del formulario parseados
 */
async function parseBody(req, res) {
    return new Promise((resolve, reject) => {
        let body = '';
        let totalBytes = 0;
        const limit = 1024 * 1024; // 1MB limit / Límite de 1MB

        // Accumulate data chunks / Acumular fragmentos de datos
        req.on('data', chunk => {
            totalBytes += chunk.length;
            if (totalBytes > limit) {
                res.writeHead(413);
                res.end('413 Payload Too Large');
                req.destroy();
                reject(new Error('Payload too large'));
                return;
            }
            body += chunk.toString();
        });
        
        // Parse when complete / Parsear al completar
        req.on('end', () => resolve(qs.parse(body)));
        req.on('error', reject);
    });
}

/**
 * Handles the unit selection from home page
 * Maneja la selección de unidad desde la página principal
 * @param {http.IncomingMessage} req - Request object / Objeto de petición
 * @param {http.ServerResponse} res - Response object / Objeto de respuesta
 */
async function selectUnit(req, res) {
    const formData = await parseBody(req);
    const option = formData.option;
    
    // Redirect to selected conversion page / Redirigir a la página de conversión seleccionada
    if (option === 'length') {
        res.writeHead(302, {'location': '/length'});
        res.end();
    }else if (option === 'weight') {
        res.writeHead(302, {'location': '/weight'});
        res.end();
    }else if (option === 'temperature') {
        res.writeHead(302, {'location': '/temperature'});
        res.end();
    }            
}

/**
 * Processes conversion form submissions
 * Procesa los envíos del formulario de conversión
 * @param {http.IncomingMessage} req - Request object / Objeto de petición
 * @param {http.ServerResponse} res - Response object / Objeto de respuesta
 */
async function processConversion(req, res){
    let body = await parseBody(req, res);
    const type = body.type;
    
    // Validate converter type exists / Validar que el tipo de conversor exista
    if (!(type in converters)){
        res.writeHead(400);
        return res.end('400 Invalid conversion type');
    }
    
    // Validate and parse value / Validar y parsear el valor
    const value = parseFloat(body.value);
    if (isNaN(value)){
        res.writeHead(400);
        return res.end('400 Value must be a number');
    }
    if (value < 0) {
        res.writeHead(400);
        return res.end('400 Value must be positive');        
    }
    
    // Validate units are provided / Validar que las unidades estén presentes
    if (!body.from || body.from.trim() === '') {
        res.writeHead(400);
        return res.end('400 From unit is required');
    }
    if (!body.to || body.to.trim() === '') {
        res.writeHead(400);
        return res.end('400 To unit is required');
    }

    // Perform conversion / Realizar la conversión
    const result = converters[type](value, body.from, body.to);
    if (result === null){
        res.writeHead(400);
        return res.end('400 Invalid unit');
    }
    
    // Round to 2 decimal places / Redondear a 2 decimales
    const roundedResult = parseFloat(result.toFixed(2));

    // Prepare data for view / Preparar datos para la vista
    const data = {
        result: roundedResult,
        from: body.from,
        to: body.to,
        value: value
    };

    return renderView(res, type, data);
}

/**
 * Renders HTML views with data interpolation
 * Renderiza vistas HTML con interpolación de datos
 * @param {http.ServerResponse} res - Response object / Objeto de respuesta
 * @param {string} viewName - Name of the view file / Nombre del archivo de vista
 * @param {Object} data - Data to inject into the view / Datos para inyectar en la vista
 */
async function renderView(res, viewName, data = {}){
    const viewPath = path.join (__dirname, 'views', viewName+'.html');
    try{
        let content = await fs.readFile(viewPath, 'utf-8');
        
        // Mark selected option in 'from' select if data.from exists
        // Marcar opción seleccionada en el select 'from' si existe data.from
        if (data.from) {
            const fromRegex = new RegExp(
                `(<select[^>]*id="from"[^>]*>.*?)(<option value="${data.from}")([^>]*>)`,
                's'
            );
            content = content.replace(fromRegex, '$1$2 selected$3');
        }

        // Mark selected option in 'to' select if data.to exists
        // Marcar opción seleccionada en el select 'to' si existe data.to
        if (data.to) {
            const toRegex = new RegExp(
                `(<select[^>]*id="to"[^>]*>.*?)(<option value="${data.to}")([^>]*>)`,
                's'
            );
            content = content.replace(toRegex, '$1$2 selected$3');
        }

        // Add style to hide result block if no result / Agregar estilo para ocultar bloque de resultado si no hay resultado
        data.resultStyle = !data.result ? 'style="display: none"' : '';

        // Replace all placeholders with actual values / Reemplazar todos los placeholders con valores reales
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            content = content.replace(regex, value);
        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);

    }catch (error){
        // Handle file not found / Manejar archivo no encontrado
        if (error.code === 'ENOENT'){
            res.writeHead(404);
            res.end('404 View not found');
        }else {
            // Handle other errors / Manejar otros errores
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
        return;
    }
}

/**
 * Creates HTTP server / Crea el servidor HTTP
 * Handles all incoming requests
 * Maneja todas las peticiones entrantes
 */
const server = http.createServer(async (req, res) => {
    // Parse URL using WHATWG URL API / Parsear URL usando la API WHATWG URL
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const parsedUrl = new URL(fullUrl);
    const urlPath = parsedUrl.pathname;
    const key = `${req.method}:${urlPath}`;

    // Handle CSS file requests specially / Manejar peticiones de archivos CSS especialmente
    if (urlPath === '/css/style.css') {
        const cssPath = path.join(__dirname, 'views/css/style.css');
        try {
            const css = await fs.readFile(cssPath, 'utf-8');
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(css);
        }catch (error){
            res.writeHead(404);
            res.end('CSS file not found');
        }
        return;
    }
    
    // Route to appropriate handler or return 404 / Enrutar al manejador apropiado o devolver 404
    if (routes[key]){
        await routes[key](req, res);
    }else{
        res.writeHead(404);
        res.end('404 Invalid route');
    }
});

// Start the server / Iniciar el servidor
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});