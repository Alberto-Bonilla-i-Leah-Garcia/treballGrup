import { game as gController } from "./deforestacio.js";
import { paused } from "./resources.js";

let pauseScreen = $('#pause-elements');
pauseScreen.hide();

$('#pause').on('click', () => {
    gController.pauseGame();
    // Mostrar o Amagar
    pauseScreen.toggle(paused);
    
});

$('#return').on('click', () => {
    window.location.assign("../");
});
