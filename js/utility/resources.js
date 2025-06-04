export const game_measures = {
    //Game Size
    width: 800,
    height: 600,

    //Tree pos
    treeX: 400,
    treeY: 300,

    //Punts on poden apareixer les branques
    left: 185.5,
    spawnPointsL: [100,250,400],
    right: 614.5,
    spawnPointsR: [100,250,400]
}

export const game_logic = {
    //Time
    initialTime: 30,

    //Score
    initialScore: 0,
    bonus: 5,
    penality: 15,
    
}

export const flowState = [
        { bGood:4, bBad:4 }, //Maximes branques
        { bGood:1, bBad:0 }, //Lvl 1
        { bGood:2, bBad:0 }, //...
        { bGood:2, bBad:1 },
        { bGood:2, bBad:2 },
        { bGood:3, bBad:1 },
        { bGood:3, bBad:1 },
        { bGood:3, bBad:2 },
        { bGood:3, bBad:3 },
        { bGood:4, bBad:1 },
        { bGood:4, bBad:2 }, //Lvl 10
];


export let paused = false;

export const state_control = {
    togglePause: function(){
        paused = !paused
    }
}


export const assets = {
    tree : '../assets/tree.png',
    branchDestroyed : '../assets/branch_broken.png',
    branchGood : '../assets/branch.png',
    branchBad : '../assets/branch_bad.png',
    all: ['../assets/tree.png', '../assets/branch_broken.png', '../assets/branch.png', '../assets/branch_bad.png',]
}