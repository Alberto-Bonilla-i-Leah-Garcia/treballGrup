import { game as gController } from "./deforestacio.js";

let timerElement;
let timerInterval;
let segundos = 0;

export function iniciarTemporizador() {
    segundos = 0;

    if (!document.getElementById('timer')) {
        timerElement = document.createElement('div');
        timerElement.id = 'timer';
        document.body.appendChild(timerElement);
    } else {
        timerElement = document.getElementById('timer');
        timerElement.textContent = "00:00";
    }
    

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(actualizarTimer, 1000);
}

function actualizarTimer() {
    if (gController.getPaused()) return;

    segundos++;
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    const formato = `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
    timerElement.textContent = formato;
}

$('#return').on('click', () => {
    window.location.assign("../");
});


$('#pause').on('click', () => {
    gController.pauseGame();

    let overlay = document.getElementById('pause-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'pause-overlay';
        document.body.appendChild(overlay);
    }

    // Crear rótulo si no existe
    let label = document.getElementById('pause-label');
    if (!label) {
        label = document.createElement('div');
        label.id = 'pause-label';
        document.body.appendChild(label);
    }
    // Siempre aseguramos el texto correcto
    label.innerText = "PAUSE";

    // Mostrar u ocultar según estado
    if (gController.getPaused()) {
        overlay.style.display = "block";
        label.style.display = "block";
    } else {
        overlay.style.display = "none";
        label.style.display = "none";
    }
});
