class LaptopScene extends Phaser.Scene {
    constructor() {
		super({ key: 'LaptopScene' })
	}
    preload(){
        
    }
    create() {
        var scene = this;
        this.add.sprite(0,0,"laptopBackground").setOrigin(0,0);
       
        gameState.laptopButton2 = this.add.sprite(500,630,"laptopButton").setOrigin(0,0).setInteractive();
        gameState.laptopButton2.setAlpha(0.2);
        gameState.laptopButton2.on('pointerover', () => {
            gameState.laptopButton2.setAlpha(0.4);
        });
        gameState.laptopButton2.on('pointerout', () => {
            gameState.laptopButton2.setAlpha(0.2);
        });
        gameState.laptopButton2.on('pointerdown', () => {
            if(gameState.playerStats.studying == 0){
                scene.scene.bringToTop("ArenaScene");
            }
        });
        this.timeEvent = this.time.addEvent({
            delay: 5000, 
            callback: ()=>{
                if(gameState.numOfHomework < 4){
                    gameState.numOfHomework++;
                    var x = Math.ceil(Math.random()*1000+50);
                    var y = Math.ceil(Math.random()*430+50);
                    var hw = scene.add.sprite(x,y,"homework").setOrigin(0,0);
                    var submitButton = scene.add.sprite(x+100,y+145,"submitButton").setInteractive().setScale(2).setOrigin(0,0);
                    submitButton.hw = hw;

                    submitButton.on('pointerdown', () => {
                        gameState.numOfHomework--;
                        submitButton.hw.destroy();
                        submitButton.destroy();
                    });
                }
                
            },
            callbackScope: this,
            loop: -1,
        });
        
	}
    update(){
        
    }
}


class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        
    }
    create(){
        this.scene.launch("LaptopScene");
        this.scene.bringToTop("ArenaScene");
        
        var scene = this;
        gameState.input=this.input;
        gameState.globalScene = this;
        const connectId = Math.ceil(Math.random()*100);
        gameState.mouse=this.input.mousePointer;
        gameState.cursors = this.input.keyboard.createCursorKeys(); 
        
        this.add.sprite(0,0,"blackBg").setOrigin(0,0);
        this.add.sprite(0,0,"gamebackground").setOrigin(0,0);
        
        gameState.badFriend = this.add.sprite(1070,150,"badFriend").setOrigin(0,0).setInteractive().setDepth(0);
        gameState.badFriend.visible = false;
        gameState.badFriendTimer= Math.ceil(Math.random()*500+100);
        
        
        gameState.badFriend2 = this.add.sprite(465,75,"badFriend2").setOrigin(0,0).setInteractive().setDepth(0);
        gameState.badFriend2.visible = false;
        gameState.badFriend2Timer= Math.ceil(Math.random()*1000+100);
        
        
        gameState.sleepMonster = this.add.sprite(100,150,"sleepMonster").setOrigin(0,0).setInteractive().setScale(0.1);
        gameState.sleepMonster.setAlpha(0);
        gameState.sleepMonsterTimer= Math.ceil(Math.random()*1000+2000);
        
        
        gameState.rdoor = this.add.sprite(1065,25,'rightDoor').setOrigin(0,0).setInteractive();
        gameState.rdoor.setFrame(0);
        
        gameState.curtain = this.add.sprite(455,75,'curtain').setOrigin(0,0).setInteractive();
        gameState.curtain.setFrame(0);
        
        
       
        
        gameState.laptopButton = this.add.sprite(500,630,"laptopButton").setOrigin(0,0).setInteractive();
        gameState.laptopButton.setAlpha(0.2);
        gameState.laptopButton.on('pointerover', () => {
            gameState.laptopButton.setAlpha(0.4);
        });
        gameState.laptopButton.on('pointerout', () => {
            gameState.laptopButton.setAlpha(0.2);
        });
        gameState.laptopButton.on('pointerdown', () => {
            if(gameState.playerStats.studying == 0 && gameState.playerStats.sleeping == 0){
                scene.scene.bringToTop("LaptopScene");
            }
        });
        
        
        gameState.rdoor.on('pointerover', () => {
            if(gameState.playerStats.sleeping == 0 ){
                gameState.rdoor.setFrame(1); 
                gameState.rightDoorClosed = 1;
            }
        });
        gameState.rdoor.on('pointerout', () => {
            gameState.rdoor.setFrame(0);
            gameState.rightDoorClosed = 0;
        });
        
        
        gameState.curtain.on('pointerover', () => {
            if(gameState.playerStats.sleeping == 0 ){
                gameState.curtain.setFrame(1); 
                gameState.curtainClosed = 1;
            }
        });
        gameState.curtain.on('pointerout', () => {
            gameState.curtain.setFrame(0);
            gameState.curtainClosed = 0;
        });
        
        
        gameState.sleepScreen = this.add.sprite(0,0,"blackBg").setOrigin(0,0);
        gameState.sleepScreen.alpha = 0;
        gameState.sleepScreen.visible = false;

        
        gameState.sleepButton = this.add.sprite(650,630,"sleepButton").setOrigin(0,0).setInteractive();
        gameState.sleepButton.setAlpha(0.2);
        gameState.sleepButton.on('pointerover', () => {
            gameState.sleepButton.setAlpha(0.4);
        });
        gameState.sleepButton.on('pointerout', () => {
            gameState.sleepButton.setAlpha(0.2);
        });
        gameState.sleepButton.on('pointerdown', () => {
            if(gameState.playerStats.sleeping == 0 && gameState.sleepScreen.visible == false){
                gameState.playerStats.sleeping = 1;
                gameState.sleepScreen.visible = true;
                scene.tweens.add({
                    targets: gameState.sleepScreen,
                    alpha: 1,
                    duration: 200,
                    ease: 'Power2'  
                });
            }else{
                gameState.playerStats.sleeping = 0;
                scene.tweens.add({
                    targets: gameState.sleepScreen,
                    alpha: 0,
                    duration: 200,
                    ease: 'Power2'  
                });
                this.timeEvent = this.time.addEvent({
                    delay: 200, 
                    callback: ()=>{
                       gameState.sleepScreen.visible = false;
                    },
                    callbackScope: this,
                });
            }
            
        });
    
        
        this.add.sprite(50,600,"stressMeterLabel").setOrigin(0,0);
        gameState.createStressBar(this,50,640,100);
        
        this.timeEvent = this.time.addEvent({
            delay: 10, 
            callback: ()=>{
                
                if((gameState.badFriendPresent == 0 || (gameState.rightDoorClosed == 1 && gameState.badFriendPresent == 1)) && 
                   (gameState.badFriend2Present == 0 || (gameState.curtainClosed == 1 && gameState.badFriend2Present == 1)) && gameState.numOfHomework < 4){
                    if(gameState.playerStats.stress > 0){
                        gameState.playerStats.stress -= 0.1;
                    }else{
                        gameState.playerStats.stress = 0;
                    }
                }
                if(gameState.numOfHomework >= 4){
                    gameState.playerStats.stress += 0.2;
                }
                
                //Bad Friend One
                if(gameState.badFriendPresent == 1){
                    if(gameState.rightDoorClosed == 1){
                        gameState.badFriendTimer--;
                    }else{
                        gameState.playerStats.stress += 0.2;
                    }
                }else{
                    gameState.badFriendTimer--;
                }
                
                if(gameState.badFriendTimer <= 0){
                    if(gameState.badFriendPresent == 0){
                        gameState.badFriend.visible = true;
                        gameState.badFriendPresent = 1;
                        gameState.badFriendTimer= 150;
                    }else{
                        gameState.badFriend.visible = false;
                        gameState.badFriendPresent = 0;
                        gameState.badFriendTimer= Math.ceil(Math.random()*1050+250);
                    }
                }
                
                //Bad Friend Two
                if(gameState.badFriend2Present == 1){
                    if(gameState.curtainClosed == 1){
                        gameState.badFriend2Timer--;
                    }else{
                        gameState.playerStats.stress += 0.2;
                    }
                }else{
                    gameState.badFriend2Timer--;
                }
                
                if(gameState.badFriend2Timer <= 0){
                    if(gameState.badFriend2Present == 0){
                        gameState.badFriend2.visible = true;
                        gameState.badFriend2Present = 1;
                        gameState.badFriend2Timer= 300;
                    }else{
                        gameState.badFriend2.visible = false;
                        gameState.badFriend2Present = 0;
                        gameState.badFriend2Timer= Math.ceil(Math.random()*1200+1000);
                    }
                }
                
                //Sleep Monster
                if(gameState.sleepMonsterPresent == 1){
                    if(gameState.playerStats.sleeping == 1){
                        gameState.sleepMonsterTimer--;
                    }else{
                        gameState.playerStats.stress += 0.3;
                    }
                }else{
                    gameState.sleepMonsterTimer--;
                }
                
                if(gameState.sleepMonsterTimer <= 0){
                    if(gameState.sleepMonsterPresent == 0){
                        scene.tweens.add({
                            targets: gameState.sleepMonster,
                            alpha: 1,
                            duration: 500,
                            ease: 'Power2'  
                        });
                        gameState.sleepMonsterPresent = 1;
                        gameState.sleepMonsterTimer= 250;
                    }else{
                        scene.tweens.add({
                            targets: gameState.sleepMonster,
                            alpha: 0,
                            duration: 500,
                            ease: 'Power2'  
                        });
                        gameState.sleepMonsterPresent = 0;
                        gameState.sleepMonsterTimer= Math.ceil(Math.random()*1200+1800);
                    }
                }
            },
            callbackScope: this,
            loop: -1,
        });
        
        
    }
    
    
    update(){
        
    }
}