import { timer as tController } from "./timer.js";
import { score as sController } from "./score.js";
import { game_measures as measures } from "./resources.js";
import { state_control as state } from "./resources.js";
import { game_logic as gl } from "./resources.js";
import { paused } from "./resources.js";
import { assets } from "./resources.js"

export let game = function (){
    
    const branch = { 
        branch: null,
        current: assets.branchDestroyed,
        indexPos: 0,
        sidePos: false,
        clickable: true,
        onChanged: function (){
            this.changeCallback(this);
        },
        destroy: function (){
            this.current = assets.branchDestroyed;
            this.clickable = false;
            this.onChanged();
        },
        spawn: function (pos, side){
            this.current = this.branch;
            this.clickable = true;
            this.indexPos = pos
            this.sidePos = side
        }
    }

    const shuffe = arr => arr.sort(()=> Math.random() - 0.5);

    let p = {
        branchsGood: [],
        branchsBad: [],
        remainingBranchsGood: 0,
        remainingBranchsBad: 0,
        treeCount: 0,
    };

    return {
        createBranchs: function (call){
            let items = [];
            for(let i = 0; i < gl.initialTotal; i++){   //Emplenar l'array de branques bones
               items.push(assets.branchGood);   
            }
            p.branchsGood = items.map((item, indx) => {
                let it = Object.create(branch);
                it.current = it.branch = item;
                it.changeCallback = call;
                return it;
            });
            p.branchsBad = [assets.branchBad].map((item, indx) => {
                let it = Object.create(branch);
                it.current = it.branch = item;
                it.changeCallback = call;
                return it;
            });
            p.remainingBranchsGood = p.branchsGood.length;
            p.remainingBranchsBad = p.branchsBad.length;
            this.generateBranchsPosition();
            return p.branchsGood.concat(p.branchsBad);
        },

        clickBranch: function (branch){
            if(paused) return;
            if (!branch.clickable) return;
            branch.destroy();
            
            if (branch.branch == assets.branchBad){
                p.remainingBranchsBad--;
                tController.addTime(gl.penality);
            }else
                p.remainingBranchsGood--;

            if (p.remainingBranchsGood === 0){ //No queden branques
                sController.addScore(1);
                this.generateBranchsPosition();
                p.remainingBranchsGood = p.branchsGood.length;
                p.remainingBranchsBad = p.branchsBad.length;
                tController.addTime(gl.bonus);
            } else { //Queden branques
            }
            console.log(p.remainingBranchsGood, p.remainingBranchsBad);
        },

        generateBranchsPosition: function (){
            let posR = [];
            let posL = [];
            let branchs = p.branchsGood.concat(p.branchsBad);
            for(let i = 0; i < measures.spawnPointsR.length; i++)
                posR.push(i);
            for(let i = 0; i < measures.spawnPointsL.length; i++)
                posL.push(i);
            shuffe(posR);
            shuffe(posL);
            shuffe(branchs); //No es necessari (ja es busca una posició aleatoria)
            let side;
            branchs.forEach(b => {
                side = null;
                while( !side && (posL.length || posR.length)){
                    if (Math.round(Math.random())){
                        if(posL.length > 0)
                            side = 'L';
                    }else{
                        if(posR.length > 0)
                            side = 'R';
                    }
                }
                if (side == 'R')
                    b.spawn(posR.pop(),false);
                else if(side == 'L')
                    b.spawn(posL.pop(),true);
                else 
                    console.error("No hi ha suficient llocs");
            });
        },

        pauseGame: function (){
            sController.togglePause();
        },
    };
}();