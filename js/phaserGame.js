import { game as gController } from "./deforestacio.js";
import { state } from "./utility/resources.js";

 $('#pause-elements').hide();
 $('#gameOver-elements').hide();

$('#pause').on('click', () => {
    gController.pauseGame();
});

$('#return').on('click', () => {
    window.location.assign("../");
});