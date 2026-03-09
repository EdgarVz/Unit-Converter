/**
 * Weight conversion rates relative to 1 gram
 * Tasas de conversión de peso relativas a 1 gramo
 * 
 * Each value represents how many of that unit equals 1 gram
 * Cada valor representa cuántas de esa unidad equivalen a 1 gramo
 * 
 * Examples / Ejemplos:
 * - 1 gram = 1000 milligrams → rate: 1000
 * - 1 gram = 0.001 kilograms → rate: 0.001
 * - 1 gram = 0.035274 ounces → rate: 0.035274
 */
module.exports = {
    milligram: 1000,       // 1 g = 1000 mg
    gram: 1,               // Base unit / Unidad base
    kilogram: 0.001,       // 1 g = 0.001 kg
    ounce: 0.035274,       // 1 g = 0.035274 oz
    pound: 0.00220462      // 1 g = 0.00220462 lb
};