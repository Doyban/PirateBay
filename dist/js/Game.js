!function(t){var e=t.Game=function(t){};e.prototype.create=function(){this.stage.disableVisibilityChange=!0,this.createGame=!0,this.amountEnemies=0,this.background=this.game.add.sprite(0,0,"backgroundGame"),this.target=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,"target"),this.target.anchor.setTo(.5,.5),this.target.z=1,this.groupGame=this.game.add.group(),this.groupGame.enableBody=!0,this.groupGame.physicsBodyType=Phaser.Physics.ARCADE,this.groupGame.add(this.target),this.score=0,this.spriteScore=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"score"),this.scoreText=this.game.add.text(.122*this.game.world.width,.037*this.game.world.height,this.score,{align:"right",fill:"#ffffff",font:"25px arcade_normalregular",stroke:"#535353",strokeThickness:5}),this.scoreTextTween=this.add.tween(this.scoreText.scale).to({x:2,y:2},100,Phaser.Easing.Linear.In).to({x:1,y:1},100,Phaser.Easing.Linear.In),this.stage=0,this.spriteRound=this.game.add.sprite(.2*this.game.world.width,.03*this.game.world.height,"round"),this.roundText=this.game.add.text(.25*this.game.world.width,.037*this.game.world.height,this.stage,{align:"right",fill:"#ffffff",font:"25px arcade_normalregular",stroke:"#535353",strokeThickness:5}),this.roundTextTween=this.add.tween(this.roundText.scale).to({x:2,y:2},100,Phaser.Easing.Linear.In).to({x:1,y:1},100,Phaser.Easing.Linear.In),this.amountPirates=0,this.spriteAmountPirates=this.game.add.sprite(.37*this.game.world.width,.03*this.game.world.height,"pirates"),this.amountPiratesText=this.game.add.text(.47*this.game.world.width,.037*this.game.world.height,this.amountPirates,{align:"right",fill:"#ffffff",font:"25px arcade_normalregular",stroke:"#535353",strokeThickness:5}),this.amountPiratesTextTween=this.add.tween(this.amountPiratesText.scale).to({x:2,y:2},100,Phaser.Easing.Linear.In).to({x:1,y:1},100,Phaser.Easing.Linear.In),this.soundGame=this.game.add.audio("audioBackgroundGame"),this.soundDeadPirate=this.game.add.audio("audioDeadPirate"),this.soundGameOver=this.game.add.audio("audioGameOver"),this.soundDeadEnemy=this.game.add.audio("audioDeadEnemy"),this.buttonMusic=this.game.add.button(.83*this.game.world.width,.03*this.game.world.height,"music",this.toggleBackgroundMusic,this),this.buttonMusicToggle=!1,this.buttonAudio=this.game.add.button(.91*this.game.world.width,.03*this.game.world.height,"audio",this.toggleGameAudio,this),this.buttonAudioToggle=!1,this.soundGame.play("",0,1,!0)},e.prototype.update=function(){this.hit(),this.gameOver()||(this.updateRound(),this.updateTarget(),this.groupGame.sort("y",Phaser.Group.SORT_ASCENDING))},e.prototype.punctuateBlueEnemy=function(){this.amountEnemies-=1,this.score+=2*parseInt(localStorage.scoreRate),this.scoreTextTween.start(),this.scoreText.setText(this.score)},e.prototype.punctuateGreenEnemy=function(){this.amountEnemies-=1,this.score+=4*parseInt(localStorage.scoreRate),this.scoreTextTween.start(),this.scoreText.setText(this.score)},e.prototype.punctuateRedEnemy=function(){this.amountEnemies-=1,this.score+=5*parseInt(localStorage.scoreRate),this.scoreTextTween.start(),this.scoreText.setText(this.score)},e.prototype.punctuateWhiteEnemy=function(){this.amountEnemies-=1,this.score+=parseInt(localStorage.scoreRate),this.scoreTextTween.start(),this.scoreText.setText(this.score)},e.prototype.punctuateYellowEnemy=function(){this.amountEnemies-=1,this.score+=3*parseInt(localStorage.scoreRate),this.scoreTextTween.start(),this.scoreText.setText(this.score)},e.prototype.playSoundDeadEnemy=function(){this.soundDeadEnemy.play()},e.prototype.stageMethod=function(){this.roundText.setText(++this.stage),this.roundTextTween.start()},e.prototype.amountPiratesMethod=function(t){this.amountPiratesText.setText(this.amountPirates+=t),this.amountPiratesTextTween.start()},e.prototype.gameOver=function(){return this.game.lastScore=this.score,this.game.lastRound=this.stage,t.localStorage.setItem("lastScore",this.game.lastScore),t.localStorage.setItem("lastRound",this.game.lastRound),0===this.amountPirates&&!this.createGame&&(showAds(),this.soundGameOver.play(),this.soundGame.stop(),this.game.state.start("ShareScore"),localStorage.scoreRate=1,!0)},e.prototype.hit=function(){this.game.physics.arcade.overlap(this.groupGame,this.groupGame,this.collisionHandler,null,this)},e.prototype.collisionHandler=function(t,e){var s,i;if(t instanceof Pirate&&(e instanceof BlueEnemy||e instanceof GreenEnemy||e instanceof RedEnemy||e instanceof WhiteEnemy||e instanceof YellowEnemy))s=t,i=e;else{if(!((t instanceof BlueEnemy||t instanceof GreenEnemy||t instanceof RedEnemy||t instanceof WhiteEnemy||t instanceof YellowEnemy)&&e instanceof Pirate))return;s=e,i=t}s.alive&&(s.killPirate(i),this.soundDeadPirate.play())},e.prototype.initPirates=function(){var t=new Pirate(this);this.groupGame.add(t),this.amountPiratesMethod(1),this.createGame=!1},e.prototype.initEnemies=function(t){var e=new BlueEnemy(this,t),s=new GreenEnemy(this,t),i=new RedEnemy(this,t),a=new WhiteEnemy(this,t),o=new YellowEnemy(this,t);this.groupGame.add(e),this.groupGame.add(s),this.groupGame.add(i),this.groupGame.add(a),this.groupGame.add(o),this.createGame=!1,e?this.amountEnemies+=1:s?this.amountEnemies+=1:i?this.amountEnemies+=1:a?this.amountEnemies+=1:o&&(this.amountEnemies+=1)},e.prototype.updateRound=function(){0===this.amountEnemies&&(this.stageMethod(),this.amountEnemies=2*this.stage,this.game.time.events.repeat(2*Phaser.Timer.SECOND,5,this.initPirates,this),this.game.time.events.repeat(20*Phaser.Timer.SECOND,this.amountEnemies,this.initEnemies,this))},e.prototype.updateTarget=function(){this.target.x=this.game.input.x,this.target.y=this.game.input.y},e.prototype.toggleBackgroundMusic=function(){this.soundGame.mute=!this.soundGame.mute,this.buttonMusicToggle=!this.buttonMusicToggle,this.buttonMusic.frame=this.buttonMusicToggle?1:0},e.prototype.toggleGameAudio=function(){this.buttonAudioToggle=!this.buttonAudioToggle,this.buttonAudio.frame=this.buttonAudioToggle?1:0,this.soundDeadPirate.volume=this.buttonAudioToggle?0:1,this.soundGameOver.volume=this.buttonAudioToggle?0:1,this.soundDeadEnemy.volume=this.buttonAudioToggle?0:1}}(this);