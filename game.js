const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    backgroundColor: "000000",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true,
            debug: true
        }
    },
    scene:[MenuScene,ArenaScene,LaptopScene],
    scale: {
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

let gameState = {
    playerStats:{
        stress: 0,
        sleeping: 0,
        studying: 0,
        workMeter: 0,
    },
    rightDoorClosed: 0,
    curtainClosed: 0,
    
    badFriendPresent: 0,
    badFriendTimer: 0,
    
    badFriend2Present: 0,
    badFriend2Timer: 0,
    
    sleepMonsterPresent: 0,
    sleepMonsterTimer: 0,
    
    numOfHomework: 0,
    
    time: 0,
    
    createStressBar: function(scene, x,y,maxStress){
        var hbBG = scene.add.rectangle(x,y,100,10,0xD3D3D3).setScale(2).setOrigin(0,0);
        var hb = scene.add.rectangle(x,y,100,10,0xff0000).setScale(2).setOrigin(0,0);
        var checkHealth = scene.time.addEvent({
            delay: 10,
            callback: ()=>{
                
                if(gameState.playerStats.stress >= maxStress){
                    window.location.reload();
                    checkHealth.destroy();
                }
                hb.width = gameState.playerStats.stress/maxStress*100;
               
            },  
            startAt: 0,
            timeScale: 1,
            repeat: -1
        });
    },
}
