/**
 * Length conversion rates relative to 1 meter
 * Tasas de conversión de longitud relativas a 1 metro
 * 
 * Each value represents how many of that unit equals 1 meter
 * Cada valor representa cuántas de esa unidad equivalen a 1 metro
 * 
 * Examples / Ejemplos:
 * - 1 meter = 100 centimeters → rate: 100
 * - 1 meter = 0.001 kilometers → rate: 0.001
 * - 1 meter = 39.3701 inches → rate: 39.3701
 */
module.exports = {
    meter: 1,              // Base unit / Unidad base
    centimeter: 100,       // 1 m = 100 cm
    kilometer: 0.001,      // 1 m = 0.001 km
    millimeter: 1000,      // 1 m = 1000 mm
    inch: 39.3701,         // 1 m = 39.3701 in
    foot: 3.28084,         // 1 m = 3.28084 ft
    yard: 1.09361,         // 1 m = 1.09361 yd
    mile: 0.000621371      // 1 m = 0.000621371 mi
};