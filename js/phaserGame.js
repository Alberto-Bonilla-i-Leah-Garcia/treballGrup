import { game as gController } from "./deforestacio.js";
import { state } from "./utility/resources.js";

let pauseScreen = $('#pause-elements');
pauseScreen.hide();

$('#pause').on('click', () => {
    if(state.gameOver) return;
    gController.pauseGame();
    // Mostrar o Amagar
    pauseScreen.toggle(paused);
});

$('#return').on('click', () => {
    window.location.assign("../");
});
