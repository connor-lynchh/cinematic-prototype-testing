class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('cats','sleeping_cat_animation.png', { frameWidth: 300, frameHeight: 300 });
        this.load.image('studio','StudioName.png');
    }

    create() {

        this.graphics = this.add.graphics();


        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(0,0,1920,1080);

        var studio = this.add.image(1000,-500,'studio')
            .setScale(2);
        
        this.cat = this.add.sprite(1000,500,'cats')
            .setScale(1.5);


        this.tweens.add({
            targets: studio,
            x:1000,
            y: 200,
            alpha: 1,
            duration: 3000,
            ease: 'Sine.in',
            });

        this.anims.create({
            key: 'cat sleeping',
            frames: this.anims.generateFrameNumbers('cats', {start:0, end: 3}),
            duration:4000,
            framerate: 10,
            repeat: -1

        });    
        this.cat.play('cat sleeping');       
        this.cat.setInteractive();
        this.cat.on('pointerdown', () => this.scene.start('load'));
    }
}

class Load extends Phaser.Scene{
    constructor(){
        super('load');
    }
    
    player;
    preload() {

        this.graphics = this.add.graphics();

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(800, 510, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(810, 520, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.path = './assets/'
        this.load.image('firstBG','titlePageBlackWhite.png');
        this.load.image('secondBG','titlePageWhiteBlack.png');
        this.load.image('jumps','StudioName.png');
        this.load.image('playB','playBlack.png');
        this.load.image('playW','playWhite.png');
        this.load.image('settingsW','settingsWhite.png')
        this.load.image('settingsB','settingsBlack.png');
        this.load.image('creditsB','creditBlack.png');
        this.load.image('creditsW','creditsWhite.png');
        this.load.image('exitB','exitBlack.png');
        this.load.image('exitW','exitWhite.png');
        this.load.image('musicOn','musicOn.png');
        this.load.image('musicOff','musicOff.png');
        this.load.audio('music','Succession (Main Title Theme) - Nicholas Britell  Succession (HBO Original Series Soundtrack).mp3');
        for (var i = 0; i < 5000; i++) {
            this.load.image('jumps'+i, 'StudioName.png');
        }
    }

    create() {

        let audioImageOn = true;
        let audioImageOff = false; 

        var titleBGV1 = this.add.image(960,540,'firstBG');
        titleBGV1.setDepth(0);
        titleBGV1.setScale(1920/titleBGV1.width,1080/titleBGV1.height);

        
        var titleBGV2 = this.add.image(960,540,'secondBG');
        titleBGV2.setVisible(false);
        titleBGV2.setScale(1920/titleBGV2.width,1080/titleBGV2.height);

       // const layerBG = this.add.layer();

        //layerBG.add([titleBGV1,titleBGV2]);
        //layerBG.setDepth(0);
        this.settingsBox = this.add.graphics();
        this.settingsBox.setVisible(false);
        this.settingsBox.setDepth(101);
        this.settingsBox.fillStyle(0x000000, 1);
        this.settingsBox.fillRect(500,200,800,800);

        let musicOn = this.add.image(900,550,'musicOn');
        musicOn.setVisible(false);
        musicOn.setScale(600/musicOn.width,600/musicOn.height);
        musicOn.setDepth(101);

        let musicOff = this.add.image(900,550,'musicOff');
        musicOff.setVisible(false);
        musicOff.setScale(600/musicOff.width,600/musicOff.height);
        musicOff.setDepth(101);

        
        var backSettings = this.add.text(850,900,'BACK',{font:'50px monospace',color: '#FFFFFF'});
        backSettings.setVisible(false);
        backSettings.setDepth(101);

        let playBlack = this.add.image(700,700,'playB');
        playBlack.setVisible(false);
        playBlack.setScale(200/playBlack.width,200/playBlack.height);
        playBlack.setDepth(100);

        let settingsBlack = this.add.sprite(1200,700,'settingsB');
       settingsBlack.setScale(200/settingsBlack.width,200/settingsBlack.height);
       settingsBlack.setDepth(100);
       settingsBlack.setInteractive();
       settingsBlack.on('pointerdown', () => {
            alert('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            this.settingsBox.setVisible(true);
            backSettings.setVisible(true);
            if(audioImageOn == true){
                musicOn.setVisible(true);
            }
            else{
                musicOff.setVisible(true);
            }
       });

        var creditsBlack = this.add.image(700,800,'creditsB');
        creditsBlack.setVisible(false);
        creditsBlack.setScale(100/creditsBlack.width,100/creditsBlack.height);
        creditsBlack.setDepth(100);

        let exitBlack = this.add.image(1200,800,'exitB');
        exitBlack.setVisible(true);
        exitBlack.setScale(100/exitBlack.width,100/exitBlack.height);
        exitBlack.setDepth(100);

          
        let playWhite = this.add.image(700,700,'playW');
        playWhite.setScale(200/playWhite.width,200/playWhite.height);
        playWhite.setDepth(100);

        var settingsWhite = this.add.image(1200,700,'settingsW');
        settingsWhite.setVisible(false);
        settingsWhite.setScale(200/settingsWhite.width,200/settingsWhite.height);

        let creditsWhite = this.add.image(700,800,'creditsW');
        //creditsWhite.setVisible(true);
        creditsWhite.setScale(100/creditsWhite.width,100/creditsWhite.height);
        creditsWhite.setDepth(100);

        var exitWhite = this.add.image(1200,800,'exitW');
        exitWhite.setVisible(false);
        exitWhite.setScale(100/exitWhite.width,100/exitWhite.height);
        exitWhite.setDepth(100);

        


       settingsWhite.setInteractive()
       settingsWhite.on('pointerdown', () => {
            this.settingsBox.setVisible(true);
            backSettings.setVisible(true);
            if(audioImageOn == true){
                musicOn.setVisible(true);
            }
            else{
                musicOff.setVisible(true);
            }
        });

       backSettings.setInteractive()
       backSettings.on('pointerdown', () => {
            this.settingsBox.setVisible(false);
            backSettings.setVisible(false);
            musicOn.setVisible(false);
            musicOff.setVisible(false);
       });

       musicOn.setInteractive()
       musicOn.on('pointerdown', () => {
            musicOn.setVisible(false);
            audioImageOn = false;
            musicOff.setVisible(true);
            audioImageOff = true
            titleBGV1.setVisible(false);
            titleBGV2.setVisible(true);
            settingsBlack.setVisible(false);
            exitBlack.setVisible(false);
            playWhite.setVisible(false);
            creditsWhite.setVisible(false);
            settingsWhite.setVisible(true);
            exitWhite.setVisible(true);
            playBlack.setVisible(true);
            creditsBlack.setVisible(true);
       });

       musicOff.setInteractive()
       musicOff.on('pointerdown', () => {
        musicOn.setVisible(true);
        audioImageOn = true;
        musicOff.setVisible(false);
        audioImageOff = false;        
        titleBGV1.setVisible(true);
        titleBGV2.setVisible(false);
        settingsBlack.setVisible(true);
        exitBlack.setVisible(true);
        playWhite.setVisible(true);
        creditsWhite.setVisible(true);
        settingsWhite.setVisible(false);
        exitWhite.setVisible(false);
        playBlack.setVisible(false);
        creditsBlack.setVisible(false);
       });



      /*  this.tweens.chain({
            tweens: [
                {
                   targets: playButton,
                   x: 600,
                   duration: 300,
                   ease:'Sine.out' 
                },
                {
                    targets: settingsButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                 {
                    targets: creditsButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                 {
                    targets: exitButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                {
                    targets: play,
                    x: 295,
                    duration: 1000,
                    ease:'cubic.out',
                },
                {
                targets: settings,
                x: 240,
                duration: 1000,
                ease:'cubic.out',
                },
                  {
                targets: credits,
                x: 245,
                duration: 1000,
                ease:'cubic.out',
                },
                {
                targets: exit,
                x: 295,
                duration: 1000,
                ease:'cubic.out',
                },
            ]
        });

        
        play.setInteractive()

        play.on('pointerdown', () => {
            this.gotoScene('play');
        })



        this.input.on('pointerdown', () => this.scene.start('intro'));*/
    }

    

}
/*
class Settings extends Phaser.Scene{
    constructor(){
        super('load');


class Credits extends Phaser.Scene{
    constructor(){
        super('load');

        
class Exit extends Phaser.Scene{
    constructor(){
        super('load');

*/



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        pixelArt: true,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Intro,Load],
    title: "Cinematic",
});