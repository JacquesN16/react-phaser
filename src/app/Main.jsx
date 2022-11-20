import {useEffect} from "react";
import Phaser from 'phaser';
import blue_cat_sprite from './assets/blue_001.png'
import ball from './assets/ball.png'

export default function Main (){

    let game = null
    let cursors = null
    let blue_cat = null
    let blue_cat_sprite_name = 'blue_cat'
    let ball_item = null


    let config = {
        parent:"containerId",
        type: Phaser.AUTO,
        width: 500,
        height: 500,
        backgroundColor:'#fff',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        renderType : Phaser.AUTO
    };

    const create_animate = (anims, sprite,key,start,end) => {
        anims.create({
            key: key,
            frames: anims.generateFrameNumbers(sprite, { start: start, end: end }),
            frameRate: 10,
            repeat: -1
        });
    }
    const ball_move = (ball) => {

    }

    // const collectBall = (ball) =>
    // {
    //     ball.disableBody(true, true);
    // }

    function collectBall (player, ball)
    {
        ball.disableBody(true, true);
    }

    function preload () {

        this.load.spritesheet('blue_cat', blue_cat_sprite,{frameWidth: 32, frameHeight: 32})
        this.load.image('ball', './assets/ball.png')
    }

    function create () {

        this.physics.world.setBounds(0, 0, 500 * 4, 500 * 4);
        cursors = this.input.keyboard.createCursorKeys()

        blue_cat = this.physics.add.sprite(20,20,blue_cat_sprite)
        blue_cat.setCollideWorldBounds(true);
        ball_item = this.physics.add.group({key:'ball', repeat: 1, setXY: { x:50, y: 50} })


        create_animate(this.anims, blue_cat_sprite_name, 'right', 36,39)
        create_animate(this.anims, blue_cat_sprite_name, 'left', 52,55)
        create_animate(this.anims, blue_cat_sprite_name, 'stay', 12,15)
        create_animate(this.anims, blue_cat_sprite_name, 'up', 44,47)
        create_animate(this.anims, blue_cat_sprite_name, 'down', 28,31)



        this.physics.add.overlap(blue_cat, ball_item, collectBall, null, this);
    }

    function update (){
        if (cursors.left.isDown){
            blue_cat.setVelocityX(-160);
            blue_cat.anims.play('left', true);
        } else if (cursors.right.isDown ){
            console.log('yaya ')
            blue_cat.setVelocityX(160);
            blue_cat.anims.play('right', true);
        } else if (cursors.up.isDown ){
            blue_cat.setVelocityY(-160);
            blue_cat.anims.play('up',true)
        } else if(cursors.down.isDown){
            blue_cat.setVelocityY(160);
            blue_cat.anims.play('down',true)
        } else {
            blue_cat.setVelocityX(0);
            blue_cat.setVelocity(0);
            blue_cat.anims.play('stay',true);
        }

        ball_item.setVelocityX(50)
        ball_item.setVelocityY(50)

    }

    useEffect(()=>{
        game = new Phaser.Game(config)
        // return game

    },[])

    return(<>
    <div id='containerId'>

    </div>

    </>)


}
