import { game_logic as gl } from "./resources.js";


export let score = function () {
    let scoreLabel = $('#score');

    function update(score) {
        scoreLabel.text(score);
    }

    return {
        score : gl.initialScore,

        reset: function () {
            this.score = 0;
            update(this.score);
        },

        addScore: function (points) {
            this.score += points;
            update(this.score);
        }
    }
}();