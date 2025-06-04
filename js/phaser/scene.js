import { game as gController } from "../deforestacio.js";
import { timer as tController } from "../utility/timer.js";
import { gameMeasures as measures } from "../utility/resources.js";
import { assets } from "../utility/resources.js"

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlayScene');
        this.branchs = gController.createBranchs(()=>null); // Inicialitzar branques
    }

    preload() {  
        assets.all.forEach((r)=>this.load.image(r,r));
    }

    create() {
        tController.start(() => {
            gController.gameOver();
        });

        this.g_branchs = this.physics.add.staticGroup();

        this.branchs.forEach((b, i)=> {
            const sprite = this.g_branchs.create(0, 0, b.current);
            sprite.setInteractive();
            sprite.on('pointerup', ()=> gController.clickBranch(this.branchs[i]));
        });

        this.physics.add.staticGroup().create(measures.treeX, measures.treeY, assets.tree);

    }

    update() {
        this.g_branchs.children.iterate((b, i) => {
            b.setTexture(this.branchs[i].current);
            b.x = this.branchs[i].sidePos ? measures.left : measures.right;
            b.y = this.branchs[i].sidePos ? measures.spawnPointsL[this.branchs[i].indexPos] : measures.spawnPointsR[this.branchs[i].indexPos];
            b.setFlipX(!this.branchs[i].sidePos);
            b.setActive(this.branchs[i].visible).setVisible(this.branchs[i].visible);
        }
        );
    }
}