import { assets } from "./resources.js"

export const branch = { 
        branch: null,
        current: assets.branchDestroyed,
        indexPos: 0,
        sidePos: false,
        visible: false,
        clickable: true,
        
        onChanged: function (){
            this.changeCallback(this);
        },
        is_healthy: function (){
            return this.branch === assets.branchGood;
        },
        destroy: function (){
            this.current = assets.branchDestroyed;
            this.clickable = false;
            this.onChanged();
        },
        spawn: function (pos, side){
            this.current = this.branch;
            this.clickable = true;
            this.indexPos = pos;
            this.sidePos = side;
            this.visible = true;
        },
        desactivate: function (){
            this.visible = false;
        },
        setParam: function (healthy,onChangedCall){
            if (healthy)
                this.current = this.branch = assets.branchGood;
            else
                this.current = this.branch = assets.branchBad;
            this.changeCallback = onChangedCall;
        }
    }