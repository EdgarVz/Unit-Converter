# 🔄 Unit Converter Web App
https://roadmap.sh/projects/unit-converter

A simple and powerful unit converter web application built with pure Node.js - no frameworks, no external dependencies! Convert between different units of length, weight, and temperature with ease.

Una aplicación web de conversión de unidades simple y potente construida con Node.js puro - ¡sin frameworks, sin dependencias externas! Convierte entre diferentes unidades de longitud, peso y temperatura fácilmente.

**Author / Autor:** [EdgarVz]

---

## 📦 Installation / Instalación

```bash
# Clone the repository / Clonar el repositorio
git clone https://github.com/EdgarVz/unit-converter
cd unit-converter

# Install dependencies (none, but you can create package.json)
npm init -y

# Start the server / Iniciar el servidor
node server.js

# Open in your browser / Abrir en tu navegador
# http://localhost:3000
```

## 🚀 Quick Start / Inicio Rápido

1. Start the server / Inicia el servidor
```bash
node server.js
```

2. Open your browser / Abre tu navegador
```text
http://localhost:3000
```

3. Select conversion type / Selecciona tipo de conversión

- Length / Longitud

- Weight / Peso

- Temperature / Temperatura

4. Enter value and units / Ingresa valor y unidades

- Choose "from" unit / Elige unidad de origen

- Choose "to" unit / Elige unidad de destino

- Click "Convert"

5. View result / Ver resultado

- The converted value appears below / El valor convertido aparece abajo

## 📋 Features / Características

### English

- ✅ 3 Conversion Types - Length, Weight, Temperature

- ✅ Multiple Units - 8+ units per category

- ✅ Clean Interface - Simple and intuitive design

- ✅ Real-time Conversion - Instant results

- ✅ Input Validation - Handles errors gracefully

- ✅ Responsive Design - Works on all devices

- ✅ Pure Node.js - No frameworks, no dependencies

- ✅ Custom CSS - Modern, clean styling

### Español

- ✅ 3 Tipos de Conversión - Longitud, Peso, Temperatura

- ✅ Múltiples Unidades - 8+ unidades por categoría

- ✅ Interfaz Limpia - Diseño simple e intuitivo

- ✅ Conversión en Tiempo Real - Resultados instantáneos

- ✅ Validación de Entrada - Maneja errores adecuadamente

- ✅ Diseño Responsive - Funciona en todos los dispositivos

- ✅ Node.js Puro - Sin frameworks, sin dependencias

- ✅ CSS Personalizado - Estilo moderno y limpio

## 📏 Available Units / Unidades Disponibles

### Length / Longitud
|Unit/Unidad|Value/Valor|
|:-|:-|
|Kilometer/Kilometro|km|
|Meter/Metro|m|
|Centimeter/Centimetro|cm|
|Millimeter/Milimetro|mm|
|Inch/Pulgada|in|
|Foot/Pie|ft|
|Yard/Yarda|yd|
|Mile/Milla|mi|

### Weight / Peso
|Unit/Unidad|Value/Valor|
|:-|:-|
|Kilogram/Kilogram|kg|
|Gram/Gramo|g|
|Milligram/Miligram|mg|
|Ounce/Onza|oz|
|Pound/Libra|lb|

### Temperature / Temperatura
|Unit/Unidad|Value/Valor|
|:-|:-|
|Celsius|°C|
|Fahrenheit|°F|
|Kelvin|°K|

## 🎯 How It Works / Cómo Funciona

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │ ←→ │   Server.js   │ ←→ │  Converters │
└─────────────┘     └──────────────┘     └─────────────┘
       ↑                    ↑                     ↑
       │                    │                     │
   HTML/CSS              Routes               Length.js
                                          Weight.js
                                       Temperature.js
```

## Key Components / Componentes Clave

1. Server/Servidor (server.js)
- HTTP server with routing / Servidor HTTP con enrutamiento

- Request parsing / Parseo de peticiones

- Dynamic HTML rendering / Renderizado HTML dinámico

- Static file serving / Servicio de archivos estáticos

2. Converters/Convertidores (/converters)
- length.js - Conversion rates / Tasas de conversión

- weight.js - Conversion rates / Tasas de conversión

- temperature.js - Special logic / Lógica especial

3. Views (/views)
- HTML templates with placeholders / Plantillas HTML con placeholders

- Dynamic content replacement / Reemplazo dinámico de contenido

- CSS styling / Estilos CSS

## 💡 Code Highlights / Lo Mejor del Código

### Factory Function / Función Fábrica
```Javascript
function createConverter(rates) {
    return function(value, from, to) {
        if (!(from in rates) || !(to in rates)) return null;
        const valueInBase = value / rates[from];
        return valueInBase * rates[to];
    };
}
```
This elegant pattern avoids code duplication for length and weight converters.
Este patrón elegante evita la duplicación de código para conversores de longitud y peso.

### Dynamic Select Marking / Marcado Dinámico de Selects
```Javascript
const fromRegex = new RegExp(
    `(<select[^>]*id="from"[^>]*>.*?)(<option value="${data.from}")([^>]*>)`,
    's'
);
content = content.replace(fromRegex, '$1$2 selected$3');
```
Smart regex to preserve selected units after conversion.
Regex inteligente para preservar las unidades seleccionadas después de la conversión.

### Robust Error Handling / Manejo Robusto de Errores
```Javascript
try {
    // File operations / Operaciones de archivo
} catch (error) {
    if (error.code === 'ENOENT') {
        res.writeHead(404); // File not found / Archivo no encontrado
    } else {
        res.writeHead(500); // Internal error / Error interno
    }
}
```

## 🛡️ Error Handling / Manejo de Errores

|Scenario/Escenario|Response/Respuesta|
|:-|:-|
|✅ Invalid number|400 Value must be a number|
|✅ Negative value|400 Value must be positive|
|✅ Missing unit|400 From/To unit is required|
|✅ Invalid unit|400 Invalid unit|
|✅ File not found|404 View not found|
|✅ CSS missing|404 CSS file not found|
|✅ Route not found|404 Invalid route|
|✅ Payload too large|413 Payload Too Large|


## 📁 Project Structure / Estructura del Proyecto
```text
unit-converter/
├── server.js                 # Main server / Servidor principal
├── converters/               # Conversion logic / Lógica de conversión
│   ├── length.js
│   ├── weight.js
│   └── temperature.js
├── views/                    # HTML templates / Plantillas HTML
│   ├── home.html
│   ├── length.html
│   ├── weight.html
│   ├── temperature.html
│   └── css/
│       └── style.css        # Custom styles / Estilos personalizados
└── README.md                 # Documentation / Documentación
```


## 🧪 Test It Yourself / Pruébalo Tú Mismo
```bash
# 1. Start the server / Inicia el servidor
node server.js

# 2. Open browser / Abre el navegador
# http://localhost:3000

# 3. Try these conversions / Prueba estas conversiones
# Length: 1 meter to centimeter → 100 cm
# Weight: 1 kilogram to pound → 2.20 lb
# Temperature: 100°C to Fahrenheit → 212°F
```

## 🎯 Features Demonstrated / Características Demostradas

- ✅ HTTP Server - Native Node.js server / Servidor HTTP - Servidor nativo de Node.js
- ✅ Routing - Manual route handling / Enrutamiento - Manejo manual de rutas
- ✅ Form Processing - POST data parsing / Procesamiento de Formularios - Parseo de datos POST
- ✅ Dynamic HTML - Template replacement / HTML Dinámico - Reemplazo de plantillas
- ✅ File System - Reading/writing files / Sistema de Archivos - Lectura/escritura de archivos
- ✅ Error Handling - Comprehensive validation / Manejo de Errores - Validación exhaustiva
- ✅ CSS Styling - Custom stylesheet / Estilos CSS - Hoja de estilos personalizada
- ✅ Modular Code - Separated concerns / Código Modular - Responsabilidades separadas
- ✅ Factory Pattern - Code reuse / Patrón Fábrica - Reutilización de código



## 📚 What I Learned / Lo Que Aprendí

- Building HTTP servers from scratch / Construir servidores HTTP desde cero
- Processing form data in Node.js / Procesar datos de formularios en Node.js
- Dynamic HTML rendering / Renderizado HTML dinámico
- Regular expressions for text manipulation / Expresiones regulares para manipulación de texto
- Error handling in web applications / Manejo de errores en aplicaciones web
- Code organization and modularity / Organización de código y modularidad
- Serving static files (CSS) / Servir archivos estáticos (CSS)

## 📄 License / Licencia
MIT © EdgarVz