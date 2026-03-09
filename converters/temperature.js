/**
 * Temperature converter - uses Celsius as intermediate unit
 * Conversor de temperatura - usa Celsius como unidad intermedia
 * 
 * Unlike length and weight, temperature requires formulas, not simple rates
 * A diferencia de longitud y peso, la temperatura requiere fórmulas, no tasas simples
 */

/**
 * Converts any temperature unit to Celsius
 * Convierte cualquier unidad de temperatura a Celsius
 * @param {number} value - Temperature value / Valor de temperatura
 * @param {string} from - Source unit ('celsius', 'fahrenheit', 'kelvin')
 * @returns {number} Temperature in Celsius / Temperatura en Celsius
 */
function toCelsius(value, from) {
    if (from === 'fahrenheit') {
        // Formula: (°F - 32) × 5/9 = °C
        return (value - 32) * 5/9;
    }
    if (from === 'kelvin') {
        // Formula: K - 273.15 = °C
        return value - 273.15;
    }
    // Already Celsius / Ya está en Celsius
    return value;
}

/**
 * Converts Celsius to any temperature unit
 * Convierte Celsius a cualquier unidad de temperatura
 * @param {number} value - Temperature in Celsius / Temperatura en Celsius
 * @param {string} to - Target unit ('celsius', 'fahrenheit', 'kelvin')
 * @returns {number} Converted temperature / Temperatura convertida
 */
function fromCelsius(value, to) {
    if (to === 'fahrenheit') {
        // Formula: (°C × 9/5) + 32 = °F
        return (value * 9/5) + 32;
    }
    if (to === 'kelvin') {
        // Formula: °C + 273.15 = K
        return value + 273.15;
    }
    // Stay in Celsius / Mantener en Celsius
    return value;
}

/**
 * Main conversion function
 * Función principal de conversión
 * @param {number} value - Value to convert / Valor a convertir
 * @param {string} from - Source unit / Unidad de origen
 * @param {string} to - Target unit / Unidad de destino
 * @returns {number} Converted value / Valor convertido
 */
function convert(value, from, to) {
    // First convert to Celsius, then to target unit
    // Primero convertir a Celsius, luego a la unidad destino
    const valueInCelsius = toCelsius(value, from);
    return fromCelsius(valueInCelsius, to);
}

module.exports = convert;