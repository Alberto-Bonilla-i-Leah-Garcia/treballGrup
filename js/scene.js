import { game as gController } from "./deforestacio.js";
import { game_measures as measures } from "./resources.js";
import { iniciarTemporizador } from "./phaserGame.js";

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlayScene');
        this.branchTypes = [];
        this.branchs = gController.createBranchs(()=>null); // Inicialitzar branques
    }

    preload() {  
        this.branchs.forEach((r)=>{
            if (!this.branchTypes.includes(r.current))
                this.branchTypes.push(r.current);
        });
        this.branchTypes.push("../assets/branch.png");
        this.branchTypes.forEach((r)=>this.load.image(r,r)); // Primer paràmetre nom Segon paràmetre direcció
    }

    create() {
        iniciarTemporizador();
        this.cameras.main.setBackgroundColor(0xE69873);

        this.g_branchs = this.physics.add.staticGroup();

        this.branchs.forEach((b, i)=> {
            const sprite = this.g_branchs.create(0, 0, b.current);
            sprite.setInteractive();
            sprite.on('pointerup', ()=> gController.clickBranch(this.branchs[i]));
        });
    }

    update() {
        this.g_branchs.children.iterate((b, i) => {
            b.setTexture(this.branchs[i].current);
            b.x = this.branchs[i].sidePos ? measures.left : measures.right;
            b.y = this.branchs[i].sidePos ? measures.spawnPointsL[this.branchs[i].indexPos] : measures.spawnPointsR[this.branchs[i].indexPos];
            b.setFlipX(this.branchs[i].sidePos);
        }
        );
    }
}