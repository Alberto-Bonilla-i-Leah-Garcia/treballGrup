import { game_logic as gl } from "./resources.js";


export let timer = function () {
    let scoreLabel = $('#score');
    let score = gl.score;

    function update() {
        scoreLabel.text(gl.score);
    }

    return {
        addScore: function (points) {
            gl.score += points;
            update();
        },
        reset: function () {
            gl.score = 0;
            update();
        },
        get: function () {
            return gl.score;
        }
    }
}();