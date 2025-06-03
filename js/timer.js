import { game_logic as gl } from "./resources.js";
import { paused } from "./resources.js";

export let timer = function () {
    let timerLabel = $('#timer');
    let timerInterval;
    let segons = gl.initialTime;

    function showTime(){
        const minutos = Math.floor(segons / 60);
        const seg = segons % 60;
        timerLabel.text( `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}` );
    }
    function update() {
        if (paused) return;
        segons--;
        showTime();
    }

    return {
        start: function () {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(update, 1000);
            showTime();
        },
        addTime: function (num){
            segons += num;
            showTime();
        }
    }
}();