!function(t){var i=t.Menu=function(){};i.prototype.preload=function(){this.game.load.image("backgroundMenu",backgroundMenu)},i.prototype.create=function(){this.background=this.game.add.sprite(0,0,"backgroundMenu"),this.background.name="backgroundGame",this.exitButton=this.game.add.button(.85*this.game.world.width,.03*this.game.world.height,"exit",this.startExit,this),this.inviteButton=this.game.add.button(.19*this.game.world.width,.3*this.game.world.height,"invite",this.startInvite,this),this.loginButton=this.game.add.button(.445*this.game.world.width,.3*this.game.world.height,"login",this.startLogin,this),this.shareButton=this.game.add.button(.7*this.game.world.width,.3*this.game.world.height,"share",this.startShare,this),this.playButton=this.game.add.button(.1*this.game.world.width,.5*this.game.world.height,"play",this.startPlay,this),localStorage.scoreRate=localStorage.scoreRate||1,this.displayMedal(),this.points=isNaN(this.points)?this.points="0":this.points,this.spriteShield=this.game.add.sprite(.1*this.game.world.width,.03*this.game.world.height,"shield"),this.pointsText=this.game.add.text(.17*this.game.world.width,.025*this.game.world.height,this.points.toString(),{align:"right",fill:"#ffffff",font:"60px arcade_normalregular",stroke:"#535353",strokeThickness:5})},initAds(),i.prototype.displayMedal=function(){this.points=0,(this.stages=this.stages||[]).push(t.localStorage.getItem("lastRound"));for(var i=0;i<this.stages.length;i++)this.points+=parseInt(this.stages[i]);this.points<=1?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal1"):this.points<=20?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal2"):this.points<=40?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal3"):this.points<=70?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal4"):this.points<=110?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal5"):this.points<=170?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal6"):this.points<=250?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal7"):this.points<=300?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal8"):this.points<=500?this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal9"):this.imageMedals=this.game.add.sprite(.03*this.game.world.width,.03*this.game.world.height,"medal1")},i.prototype.startExit=function(){exitGame()},i.prototype.startInvite=function(){inviteGame()},i.prototype.startLogin=function(){challengeGame()},i.prototype.startPlay=function(){this.game.state.start("Game")},i.prototype.startShare=function(){shareGame()},i.prototype.startStore=function(){this.game.state.start("Store")}}(this);