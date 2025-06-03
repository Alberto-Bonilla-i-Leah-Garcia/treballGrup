import { game_logic as gl } from "./resources.js";


export let score = function () {
    let scoreLabel = $('#score');
    let score = gl.initialScore;

    function update() {
        scoreLabel.text(score);
    }

    return {
        reset: function () {
            score = 0;
            update();
        },

        addScore: function (points) {
            score += points;
            update();
        }
    }
}();