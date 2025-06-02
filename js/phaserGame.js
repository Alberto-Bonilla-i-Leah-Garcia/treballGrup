import { game as gController } from "./deforestacio.js";

$('#return').on('click',function(){
    window.location.assign("../");
});

$('#pause').on('click', () => {
    gController.pause();
});