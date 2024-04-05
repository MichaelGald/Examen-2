document.addEventListener("DOMContentLoaded", function() {
    const ingresoDeCantidad = document.querySelector("#amount");
    const cambioMonedaTipo1 = document.querySelector("#from");
    const cambioMonedaTipo2 = document.querySelector("#to");
    const guardarElCambio = document.querySelector("#convert-btn");
    const mostrarElCambio = document.querySelector("#result-container");

    loadPreferences();

    guardarElCambio.addEventListener("click", savePreferences);
    cambioMonedaTipo1.addEventListener("change", updateConversion);
    cambioMonedaTipo2.addEventListener("change", updateConversion);

    function loadPreferences() {
        const eleccion1 = localStorage.getItem("amount");
        const moneda1 = localStorage.getItem("from");
        const moneda2 = localStorage.getItem("to");

        if (eleccion1){
             ingresoDeCantidad.value = eleccion1;
            }
        if (moneda1){
             cambioMonedaTipo1.value = moneda1;
            }
        if (moneda2){
            cambioMonedaTipo2.value = moneda2;
        }
        updateConversion();
    }

    function savePreferences() {
        const cantidadIngresada = ingresoDeCantidad.value;
        const monedaCambio1 = cambioMonedaTipo1.value;
        const monedaCambio2 = cambioMonedaTipo2.value;

        localStorage.setItem("amount", cantidadIngresada);
        localStorage.setItem("from", monedaCambio1);
        localStorage.setItem("to", monedaCambio2);

        updateConversion();
    }

    function updateConversion() {
        const cantidad = parseFloat(ingresoDeCantidad.value);
        const moneda1 = cambioMonedaTipo1.value;
        const moneda2 = cambioMonedaTipo2.value;
        let resultado = "";

        if (isNaN(cantidad)) {
            mostrarElCambio.textContent = "Ingrese una cantidad válida.";
            return;
        }

        switch(`${moneda1}-${moneda2}`) {
            case "usd-eur":
                resultado = (cantidad * 0.92).toFixed(2) + ' EUR';
                break;
            case "eur-usd":
                resultado = (cantidad / 0.92).toFixed(2) + ' USD';
                break;
            case "usd-gbp":
                resultado = (cantidad * 0.79).toFixed(2) + ' GBP';
                break;
            case "gbp-usd":
                resultado = (cantidad / 0.79).toFixed(2) + ' USD';
                break;
            case "eur-gbp":
                resultado = (cantidad * 1.16).toFixed(2) + ' GBP';
                break;
            case "gbp-eur":
                resultado = (cantidad / 1.16).toFixed(2) + ' EUR';
                break;
            default:
                resultado = "No se puede realizar la conversión.";
        }

        mostrarElCambio.textContent = resultado;
    }
});
