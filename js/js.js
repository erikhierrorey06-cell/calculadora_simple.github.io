const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".numero");
const operandos = document.querySelectorAll(".op");
const ContError = document.getElementById("textHistorial");
const error = document.getElementById("msgError");
var valor1 = ""; //guardará el valor primero
var valor2 = ""; //guardará el valor segundo
var op = ""; //guardará los operandos (excepto el "=")
var sol = 0; //guardará la solución
var EnProceso = false //se encargará de que el usuario no pueda introducir otro operando cuando se ha seleccionado uno
botones.forEach(function (boton) { //esta funcion se encarga de concatenar los numeros
    boton.addEventListener("click", function () {
        const valor = boton.textContent;
        if (pantalla.value === "") {
            pantalla.value = valor;
        } else if (boton.classList.contains("numero")) {
            pantalla.value += valor;
        }
    });
});

operandos.forEach(function (operation) {
    EnProceso = false
    operation.addEventListener("click", function () {
        const Op = operation.textContent; //creamos variable local para guardar el operador seleccionado (ya que el "=" es un operador tambien)
        if (Op == "CE") {
            reinicio()
            pantalla.value = ""
        }
        if (valor1 != "") { //si ya ha introducido un operando no puede seleccionar otro
            EnProceso = true
        }
        if (!EnProceso) { //si un operando ha sido seleccionado no podrá modificar el op
            guardarOp(Op)
        }
        if (Op === "=") { //como es igual, ya suponemos que el usuario ha introducido el segundo valor
            calcular()
        }
    });
});
function guardarOp(operando) {
    valor1 = pantalla.value
    op = operando
    pantalla.value = ""
}

function calcular() {
    error_bol = false
    valor2 = pantalla.value
    //los condicionales se encargan del tratamiento de errores
    if (valor2 === "" || valor1 === "") {
        mistake("Falta algún valor")
        error_bol = true
    } else if (Number(valor2) === 0 && op === "/") {
        error_bol = true
        mistake("No se puede dividir entre 0")
    }
    if (error_bol) {
        pantalla.value = "" //resetea la pantalla al dar error
    }
    traduccion()
    if (!error_bol) {
        switch (op) {
            case "+":
                sol = Number(valor1) + Number(valor2)
                pantalla.value = sol
                break;
            case "-":
                sol = Number(valor1) - Number(valor2)
                pantalla.value = sol
                break;
            case "*":
                sol = Number(valor1) * Number(valor2)
                pantalla.value = sol
                break;
            case "/":
                sol = Number(valor1) / Number(valor2)
                sol = sol.toFixed(4) //nos aseguramos que solo salgan 4 decimales
                pantalla.value = sol
                break;
        }
        error.classList.remove("mal") //cambiamos clase
        error.classList.add("ok")
        error.textContent = "Todo correcto!"
        let nuevoP = document.createElement("p"); //creamos una etiqueta <p> nueva de html
        nuevoP.textContent = valor1 + op + valor2 + "=" + sol;
        ContError.appendChild(nuevoP);
        ContError.scrollTop = ContError.scrollHeight //para que automaticamente baje abajo al añadir elementos y no se quede arriba
        reinicio()

    }
}
function reinicio() {
    op = "" //reseteamos todo
    valor2 = ""
    valor1 = ""
    EnProceso = false
}
function traduccion() {
    switch (valor1) { //traducimos los valores de simbolo a numero del valor 1
        case "π":
            valor1 = "3.1415"
            break;
        case "e":
            valor1 = "2.7182"
            break;
    }
    switch (valor2) {  //traducimos los valores de simbolo a numero del valor 2
        case "π":
            valor2 = "3.1415"
            break;
        case "e":
            valor2 = "2.7182"
            break;
    }

}
function mistake(mensaje) {
    error.textContent = "¡Error! Valores reiniciados";
    error.classList.add("mal"); //no ponemos toggle ya que si ya estaba mal y salta otra vez el toggle a clase mal le quita la clase mal
    valor1 = ""; //reseteamos todo
    valor2 = "";
    op = ""
    EnProceso = false
    let nuevoP = document.createElement("p"); //ponemos el error en el historial
    nuevoP.textContent = mensaje;
    nuevoP.style.color = "red";
    ContError.appendChild(nuevoP);


}