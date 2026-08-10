/**
 * Función pura que calcula el interés simple.
 * Convierte las entradas a números para prevenir TypeErrors y errores de concatenación.
 * 
 * @param {number|string} principal - Monto inicial.
 * @param {number|string} rate - Tasa de interés anual (%).
 * @param {number|string} years - Período de tiempo en años.
 * @returns {number} El interés total calculado.
 */
function calculateInterest(principal, rate, years) {
    // Conversión explícita a tipo número
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    // Prevención de TypeError y NaN validando los valores convertidos
    if (isNaN(p) || isNaN(r) || isNaN(t)) {
        throw new TypeError("Todos los valores de entrada deben ser números válidos.");
    }

    // Fórmula del interés simple: I = (P * R * T) / 100
    const interest = (p * r * t) / 100;
    
    // Retorna el resultado redondeado a 2 decimales como número
    return parseFloat(interest.toFixed(2));
}

// Vinculación con el DOM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calculator-form");
    const resultText = document.getElementById("result-text");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Captura de valores de los inputs
            const principalInput = document.getElementById("principal").value;
            const rateInput = document.getElementById("rate").value;
            const yearsInput = document.getElementById("years").value;

            try {
                // Cálculo de la lógica de negocio
                const totalInterest = calculateInterest(principalInput, rateInput, yearsInput);
                const principalNum = parseFloat(principalInput);
                const totalAmount = principalNum + totalInterest;

                // Renderizado de resultados
                resultText.innerHTML = `
                    Interés Calculado: <strong>$${totalInterest.toFixed(2)}</strong><br>
                    Monto Total Acumulado: <strong>$${totalAmount.toFixed(2)}</strong>
                `;
            } catch (error) {
                resultText.textContent = `Error: ${error.message}`;
            }
        });
    }
});

// Exportación para pruebas con Jasmine / Node.js y compilación con Webpack
if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculateInterest };
}
