import { branch } from "./utility/branch.js";
import { gameMeasures as measures } from "./utility/resources.js";
import { state } from "./utility/resources.js";
import { stateModifier as stateCotroller } from "./utility/resources.js";
import { timer as tController } from "./utility/timer.js";
import { score as sController } from "./utility/score.js";


import { flowState } from "./utility/resources.js";


export let game = function (){
    
    const shuffe = arr => arr.sort(()=> Math.random() - 0.5);

    let p = {
        branchs: [],
        branchsGood: [],
        branchsBad: [],
        remainingBranchsGood: 0,
        remainingBranchsBad: 0,
    };

    return {
        createBranchs: function (onChangedCall){
            for(let i = 0; i < 4; i++){   //Emplenar l'array de branques bones i dolentes alhora
                let it = Object.create(branch);
                it.setParam(true, onChangedCall);
                p.branchsGood.push(it);
                it = Object.create(branch);
                it.setParam(false, onChangedCall);
                p.branchsBad.push(it);
            };
            this.regenerateBranchs();
            return p.branchsGood.concat(p.branchsBad);
        },

        clickBranch: function (branch){
            if(state.paused || !branch.clickable) return;

            branch.destroy();

            //Branca dolenta clicada
            if (!branch.is_healthy()){ 
                p.remainingBranchsBad--;
                tController.subPenalityTime();
            }else{
                p.remainingBranchsGood--;
            }

            //No queden branques
            if (p.remainingBranchsGood === 0){ 
                sController.addScore(1);
                tController.addBonusTime();
                this.regenerateBranchs();
            }
        },

        regenerateBranchs: function (){
            let posR = [...Array(measures.spawnPointsR.length).keys()];
            let posL = [...Array(measures.spawnPointsL.length).keys()];

            shuffe(posR);
            shuffe(posL);

            let fl = flowState[Math.floor(sController.score/5 +1)];
            if(fl){
                p.remainingBranchsGood = fl.bGood;
                p.remainingBranchsBad  = fl.bBad;
            }else{
                p.remainingBranchsGood = 3;
                p.remainingBranchsBad = 3;
            }

            p.branchs.forEach( (b) =>  b.desactivate() );

            p.branchs = p.branchsGood.slice(0,p.remainingBranchsGood).concat(p.branchsBad.slice(0,p.remainingBranchsBad));

            p.branchs.forEach(b => {
                //Escollir costat i posició
                if (posL.length && posR.length) {   //Escollir aleatoriament
                    if (Math.random() < 0.5)        
                        b.spawn(posL.pop(), true);
                    else
                        b.spawn(posR.pop(), false);
                } else if (posL.length)             //Acabar d'omplir l'esquerra
                    b.spawn(posL.pop(), true);
                else if (posR.length)               //Acabar d'omplir la dreta
                    b.spawn(posR.pop(), false);
                else                                //No queden llocs
                    console.error("No hi ha suficient llocs");
            });
            

        },
        gameOver: function (){
            console.log("Game Over");
            stateCotroller.setGameOver();
        },
        pauseGame: function (){
            stateCotroller.togglePause();
        }
    };
}();