class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.image('gamebackground','images/gamebackground.png');
        this.load.image('sleepButton','images/sleepButton.png');
        this.load.image('laptopButton','images/laptopButton.png');
        this.load.image('laptopButton','images/.png');
        this.load.image('badFriend','images/badFriend.png');
        this.load.image('badFriend2','images/badFriend2.png');
        this.load.image('sleepMonster','images/sleepMonster.png');
        this.load.image('blackBg','images/blackBg.png');
        this.load.image('laptopBackground','images/laptopBackground.png');
        this.load.image('homework','images/homework.png');
        this.load.image('submitButton','images/submitButton.png');
        this.load.image('stressMeterLabel','images/stressMeterLabel.png');
        this.load.spritesheet('curtain','images/curtain.png',{frameWidth: 374,frameHeight: 144});
        this.load.spritesheet('rightDoor','images/rightDoor.png',{frameWidth: 150,frameHeight: 525});
    }
    create() {
        
        
                
        this.scene.stop("MenuScene");
        this.scene.start("ArenaScene");
	}
    update(){
        
    }
}