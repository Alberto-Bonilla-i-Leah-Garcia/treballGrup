export const game_measures = {
    //Game Size
    width: 800,
    height: 600,

    //Punts on poden apareixer les branques
    left: 10,
    spawnPointsL: [100,300],
    right: 800,
    spawnPointsR: [100,300]
}

export const game_logic = {
    //Temps inicial en segons
    initialTime: 120,
    
    //Variables "globals" que es comparteixen el timer i la logica del joc
    currentTime: 120,
}

export let paused = false;


export const state_control = {
    togglePause: function(){
        paused = !paused
    }
}