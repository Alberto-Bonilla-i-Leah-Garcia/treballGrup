import { gameLogic as gl } from "./resources.js";
import { state } from "./resources.js";

export let timer = function () {
    let timerLabel = $('#timer');
    let timerInterval;
    let segons = gl.initialTime;
    function onEndCallback(){}


    function showTime(){
        if (segons <= 0) {
            segons = 0;
            onEndCallback();
        }
        const minutos = Math.floor(segons / 60);
        const seg = segons % 60;
        timerLabel.text( `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}` );
    }
    function update() {
        if (state.paused) return;
        segons--;
        showTime();
    }

    return {
        start: function (_onEndCallback) {
            onEndCallback = _onEndCallback;
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(update, 1000);
            showTime();
        },
        addBonusTime: function (){
            segons += gl.bonus;
            showTime();
        },
        subPenalityTime: function (){
            segons -= gl.penality;
            showTime();
        }
        
    }
}();