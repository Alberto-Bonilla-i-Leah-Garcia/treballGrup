import { timer as tController } from "./timer.js";
import { game_measures as measures } from "./resources.js";
import { state_control as sController } from "./resources.js";
import { paused } from "./resources.js";

export let game = function (){
    const tree = '../assets/tree.png';
    const branchDestroyed = '../assets/empty.png';
    const branchtypes = ['../assets/branch.png'];
    const branch = { 
        current: branchDestroyed,
        indexPos: 0,
        sidePos: false,
        clickable: true,
        waiting: true,
        onChanged: function (){
            this.changeCallback(this);
        },
        destroy: function (){
            this.current = branchDestroyed;
            this.clickable = false;
            this.waiting = true;
            this.onChanged();
        },
        spawn: function (pos, side){
            this.current = this.branch;
            this.clickable = true;
            this.waiting = false;
            this.indexPos = pos
            this.sidePos = side
        }
    }

    const shuffe = arr => arr.sort(()=> Math.random() - 0.5);

    let p = {
        branchs: [],
        remainingBranchs: 0,
        treeCount: 0,
    };

    return {
        createBranchs: function (call){
            let items = branchtypes.slice();
            shuffe(items);
            let aux = [];
            for(let i = 0; i < 2; i++){
                aux = aux.concat(items);
            }                       
            items = aux;
            shuffe(items);
            p.branchs = items.map((item, indx) => {
                let it = Object.create(branch);
                it.current = it.branch = item;
                it.changeCallback = call;
                return it;
            });
            p.remainingBranchs = p.branchs.length
            this.generateBranchsPosition();
            return p.branchs;
        },

        clickBranch: function (branch){
            if(paused) return;
            if (!branch.clickable) return;
            branch.destroy();
            p.remainingBranchs--;
            if (p.remainingBranchs === 0){ //No queden branques
                p.treeCount++;
                this.generateBranchsPosition();
                p.remainingBranchs = p.branchs.length
            } else { //Queden branques

            }
        },

        generateBranchsPosition: function (){
            let posR = [];
            let posL = [];
            for(let i = 0; i < measures.spawnPointsR.length; i++)
                posR.push(i);
            for(let i = 0; i < measures.spawnPointsL.length; i++)
                posL.push(i);
            shuffe(posR);
            shuffe(posL);
            let side;
            p.branchs.forEach(b => {
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