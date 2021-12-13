"use strict";
let canvas;
let ctx;
const cWidth = 800;
const cHeight = 800;
const PI = Math.PI;

let gamma = 1;
let omega0 = 1;
let m = 1;

let t = 0
let dt = 0.01

let F = 1
let omega = -1


let theta_init = PI / 6
let theta_dot_init = 0

let theta = theta_init
let theta_dot = theta_dot_init

let L = 1
let pixelsPerMetre = 0.4 * cWidth / L; //used for display
let doReset = false;
let fields = ["omega", "omega0", "gamma", "force", "mass"];

let constants = [
    omega,
    omega0,
    gamma,
    F,
    m,
]
let initial = [
    omega,
    omega0,
    gamma,
    F,
    m,
];

window.onload = init;

let canvasElem = document.querySelector("canvas");


const form = document.getElementById("dataForm")
form.addEventListener("submit", function (event) {

    let data = [];
    for (let field of fields) {
        data.push(parseFloat(document.getElementById(field).value))
    }
    for (let i = 0; i < data.length; i++) {
        if (!isNaN(data[i])) {
            constants[i] = data[i]
        }
    }
    for (let [i, field] of fields.entries()) {
        document.getElementById(field).value = constants[i]
    }
    event.preventDefault();
    console.log(data);
}, false)

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function (event) {
    doReset = true;

})

function init() {
    canvas = document.getElementById('oscillator');
    ctx = canvas.getContext('2d');
    canvas.width = cWidth;
    canvas.height = cHeight;

    //fill input boxes with current values
    for (let [i, field] of fields.entries()) {
        document.getElementById(field).value = constants[i]

        // Request an animation frame for the first time
        // The mainloop() function will be called as a callback of this request
        window.requestAnimationFrame(mainloop);
    }
}


function mainloop() {
    //update quantities
    t += dt;
    [theta, theta_dot] = update(theta, theta_dot, t, constants)

    if (doReset) {
        [theta, theta_dot] = [theta_init, theta_dot_init];
        doReset = false;
        constants = initial;
    }


    // Perform the drawing operation
    draw(theta);

    // Keep requesting new frames
    window.requestAnimationFrame(mainloop);

}

function update(theta, theta_dot, t, constants) {
    let [omega, omega0, gamma, F, m] = constants

    theta += dt * theta_dot;

    theta_dot += dt * (F / m * Math.cos(omega * t) - omega0 ** 2 * theta - gamma / m * theta_dot)

    return [theta, theta_dot]

    //return Math.exp(-gamma*t/2) * (C1_c * Math.cos(capOmega_c*t) + C2_c * Math.sin(capOmega_c*t)) + A_c*Math.cos(omega*t-phi_c)

}

function draw(y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(L * pixelsPerMetre * Math.sin(y) + cWidth / 2, L * pixelsPerMetre * Math.cos(y) + cHeight / 2, 20, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.moveTo(cWidth / 2, cHeight / 2);
    ctx.lineTo(L * pixelsPerMetre * Math.sin(y) + cWidth / 2, L * pixelsPerMetre * Math.cos(y) + cHeight / 2);
    ctx.stroke();
}