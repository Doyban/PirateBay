!function(t){var i=t.BlueEnemy=function(t,i){this.game=t.game,this.state=t;var n,e,s;if(i)n=i.x,e=i.y;else{var a=this.rand();n=a.x,e=a.y}s=n<0?"sailing-right":"sailing-left",Phaser.Sprite.call(this,t.game,n,e,"blueEnemy"),this.animations.add("sailing-left",Phaser.Animation.generateFrameNames("sailing-left-",0,11,".png",0),4,!0,!1),this.animations.add("sailing-right",Phaser.Animation.generateFrameNames("sailing-right-",0,11,".png",0),4,!0,!1),this.animations.add("shooting-left",Phaser.Animation.generateFrameNames("shooting-left-",0,7,".png",0),4,!1,!1),this.animations.add("shooting-right",Phaser.Animation.generateFrameNames("shooting-right-",0,7,".png",0),4,!1,!1),this.animations.add("sinking-left",Phaser.Animation.generateFrameNames("sinking-left-",0,7,".png",0),4,!1,!1),this.animations.add("sinking-right",Phaser.Animation.generateFrameNames("sinking-right-",0,7,".png",0),4,!1,!1),this.animations.play(s),this.game.physics.enable(this,Phaser.Physics.ARCADE),this.body.enable=!0,this.body.setSize(30,30),this.inputEnabled=!0,this.events.onInputDown.add(this.killBlueEnemy,this),this.checkWorldBounds=!0,this.events.onOutOfBounds.add(this.boundOut,this);n<0?(this.body.velocity.x=this.game.rnd.integerInRange(50,150),this.body.velocity.y=0):(this.body.velocity.x=-this.game.rnd.integerInRange(50,150),this.body.velocity.y=0)};i.prototype=Object.create(Phaser.Sprite.prototype),i.prototype.constructor=i,i.prototype.update=function(){this.alive||this.destroy()},i.prototype.killBlueEnemy=function(){--this.health<=0&&(this.inputEnabled=!1,this.body.velocity.x<0?(this.body.velocity.x=0,this.body.velocity.y=0,this.animations.play("shooting-left",null,!1,!1).onComplete.add(function(){this.animations.play("sinking-left",null,!1,!0)},this)):(this.body.velocity.x=0,this.body.velocity.y=0,this.animations.play("shooting-right",null,!1,!1).onComplete.add(function(){this.animations.play("sinking-right",null,!1,!0)},this)),this.state.punctuateBlueEnemy(),this.state.playSoundDeadEnemy())},i.prototype.boundOut=function(t){var i=this.rand(!0);this.x=i.x,this.y=i.y},i.prototype.rand=function(t){var i,n,e;return i=t?this.x<0?700:-50:this.game.rnd.pick([-50,700]),e=this.game.rnd.integerInRange(0,4),n=80+320/6*e,{x:i,y:n}}}(this);