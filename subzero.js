/*
	Subzero class.
	Pretty much the same as Scorpion.
*/
//Reverse 1803 - startsX - frames*frameWidth
function Subzero(game, x, y) {
	this.name = "Subzero";
	this.scaleBy = 2.41;

	this.img = AM.getAsset("./img/Subzero.png");
	this.imgr = AM.getAsset("./img/SubzeroReverse.png");

	this.velocity = { x: 200, y: 50 };


	this.speed = 5;
	
	//Subzero's states.
	this.movingRight = false;
	this.movingLeft = false;
	this.idling = true;
	this.crouching = false;
	
	this.facing = "R";

	this.punching = false;
	this.punching2 = false;
	this.punching3 = false;

	this.kicking = false;
	this.kicking2 = false;

	this.blocking = false;
	this.jumping = false;

	this.jumpKicking = false;

	this.uppercutting = false;

	this.isBot = false;

	this.boxWidth = 51;
	this.boxHeight = 105;

	this.actualWidth = 51;
	this.actualHeight = 105;

	this.gettingAttacked = false;
	this.knockingBack = false;
	this.gettingAttackedCounter = 0;

	this.currentBox = new Box(x, y, this.boxWidth * this.scaleBy, this.boxHeight * this.scaleBy);

	this.healthBar = new HealthBar(100, this.game, 100, 100);

	this.attackDamageMap = new Map();

	this.attackDamageMap.set(this.punching, 0.5);
	this.attackDamageMap.set(this.punching2, 0.3);
	this.attackDamageMap.set(this.punching3, 0.15);
	this.attackDamageMap.set(this.kicking, 0.4);
	this.attackDamageMap.set(this.kicking2, 0.2);

	this.crouchFrames = [new Frame(1156, 30, 51, 93), new Frame(1212, 54, 51, 69),
							new Frame(1269, 69, 50, 54)];
	this.blockFrames = [new Frame(974, 18, 51, 105), new Frame(1031, 18, 45, 105),
						new Frame(1083, 18, 44, 105)];

	this.crouchBlockFrames = [new Frame(1350, 50, 45, 73)];

	this.punchFrames = [new Frame(17, 262, 52, 103), new Frame(75, 262, 57, 103),
						new Frame(142, 262, 73, 103), new Frame(142, 262, 73, 103)];

	this.punchFrames2 = [new Frame(248, 261, 46, 104), new Frame(304, 261, 56, 104),
						new Frame(369, 261, 73, 104)];

	this.punchFrames3 = [new Frame(481, 261, 52, 104), new Frame(540, 261, 58, 104),
						new Frame(540, 261, 58, 104)];

	this.kickFrames = [new Frame(18, 492, 49, 101), new Frame(74, 490, 49, 104),
						new Frame(129, 491, 39, 103), new Frame(175, 506, 55, 89),
						new Frame(241, 501, 77, 92), new Frame(241, 501, 77, 92),
						new Frame(241, 501, 77, 92), new Frame(327, 510, 65, 84),
						new Frame(175, 506, 55, 89)];

	this.kickFrames2 = [new Frame(18, 492, 49, 101), new Frame(74, 490, 49, 104),
						new Frame(129, 491, 39, 103), new Frame(175, 506, 55, 89),
						new Frame(650, 514, 80, 80), new Frame(650, 514, 80, 80),
						new Frame(650, 514, 80, 80), new Frame(327, 510, 65, 84),
						new Frame(175, 506, 55, 89)];

	this.jumpFrames = [new Frame(727, 148, 44, 105), new Frame(778, 200, 36, 53),
						new Frame(823, 200, 41, 53), new Frame(873, 209, 43, 45),
						new Frame(926, 205, 44, 47), new Frame(977, 202, 38, 51),
						new Frame(1022, 202, 42, 52), new Frame(1071, 209, 44, 43)];

	this.jumpKickFrames = [new Frame(1056, 776, 47, 67), new Frame(1109, 766, 85, 76),
							new Frame(1109, 766, 85, 76), new Frame(1109, 766, 85, 76),
							new Frame(1109, 766, 85, 76), new Frame(1109, 766, 85, 76),
							new Frame(1109, 766, 85, 76), new Frame(1109, 766, 85, 76)];

	this.uppercutFrames = [new Frame(18, 750, 50, 93), new Frame(73, 744, 54, 99),
							new Frame(134, 735, 72, 108), new Frame(215, 718, 47, 125),
							new Frame(269, 724, 43, 119), new Frame(269, 724, 43, 119),
							new Frame(269, 724, 43, 119), new Frame(269, 724, 43, 119)];

	this.gettingAttackedFrames = [new Frame(18, 858, 50, 104), new Frame(74, 860, 52, 102),
									new Frame(134, 861, 56, 101)];

	this.dyingFrames = [new Frame(504, 979, 65, 91), new Frame(577, 1020, 62, 50),
						new Frame(648, 1003, 59, 67), new Frame(714, 1013, 54, 57),
						new Frame(775, 1032, 71, 38), new Frame(852, 1026, 66, 43)];

	this.knockBackFrames = [new Frame(17, 971, 74, 98), new Frame(98, 990, 74, 80),
							new Frame(178, 980, 57, 90), new Frame(241, 990, 49, 80),
							new Frame(295, 1004, 71, 66), new Frame(373, 1039, 94, 31)];

	this.idleAnimation = new Animation(this.img,
		91, 18, 51, 105, 0.10, 12, true, false, false, null);
	this.idleLeftAnimation = new Animation(this.imgr,
		1100, 18, 51, 105, 0.10, 12, true, true, false, null);

	this.moveAnimation = new Animation(this.img,
		20, 150, 51, 102, 0.10, 8, true, false, false, null);
	this.moveLeftAnimation = new Animation(this.imgr,
		1375, 150, 51, 102, 0.10, 8, true, true, false, null);

	this.crouchAnimation = new Animation(this.img,
		1156, 30, 51, 93, 0.10, this.crouchFrames.length, false, false, true, this.crouchFrames);
	this.crouchLeftAnimation = new Animation(this.imgr,
		1156, 30, 51, 93, 0.10, this.crouchFrames.length, false, true, true, this.crouchFrames);

	this.blockRightAnimation = new Animation(this.img,
		974, 18, 51, 105, 0.10, this.blockFrames.length, false, false, true, this.blockFrames);
	this.blockLeftAnimation = new Animation(this.imgr,
		974, 18, 51, 105, 0.10, this.blockFrames.length, false, true, true, this.blockFrames);

	this.blockCrouchRightAnimation = new Animation(this.img,
		1350, 50, 45, 73, 0.10, 1, false, false, true, this.crouchBlockFrames);
	this.blockCrouchLeftAnimation = new Animation(this.imgr,
		408, 50, 45, 73, 0.10, 1, false, true, true, this.crouchBlockFrames);

	this.punchRightAnimation = new Animation(this.img,
		17, 262, 52, 103, 0.10, this.punchFrames.length, false, false, false, this.punchFrames);
	this.punchLeftAnimation = new Animation(this.imgr,
		17, 262, 52, 103, 0.10, this.punchFrames.length, false, true, false, this.punchFrames);

	this.punchRight2Animation = new Animation(this.img,
		248, 261, 46, 104, 0.10, this.punchFrames2.length, false, false, false, this.punchFrames2);
	this.punchLeft2Animation = new Animation(this.imgr,
		248, 261, 46, 104, 0.10, this.punchFrames2.length, false, true, false, this.punchFrames2);

	this.punchRight3Animation = new Animation(this.img,
		481, 261, 52, 104, 0.10, this.punchFrames3.length, false, false, false, this.punchFrames3);
	this.punchLeft3Animation = new Animation(this.imgr,
		481, 261, 52, 104, 0.10, this.punchFrames3.length, false, true, false, this.punchFrames3);

	this.kickRightAnimation = new Animation(this.img,
		18, 492, 49, 101, 0.10, this.kickFrames.length, false, false, false, this.kickFrames);
	this.kickLeftAnimation = new Animation(this.imgr,
		18, 492, 49, 101, 0.10, this.kickFrames.length, false, true, false, this.kickFrames);

	this.kickRight2Animation = new Animation(this.img,
		18, 492, 49, 101, 0.10, this.kickFrames2.length, false, false, false, this.kickFrames2);
	this.kickLeft2Animation = new Animation(this.imgr,
		18, 492, 49, 101, 0.10, this.kickFrames2.length, false, true, false, this.kickFrames2);

	this.jumpRightAnimation = new Animation(this.img,
		727, 148, 44, 105, 0.10, this.jumpFrames.length, false, false, false, this.jumpFrames);
	this.jumpLeftAnimation = new Animation(this.imgr,
		727, 148, 44, 105, 0.10, this.jumpFrames.length, false, true, false, this.jumpFrames);

	//TODO:  attackeds.
	this.jumpKickRightAnimation = new Animation(this.img,
		1056, 776, 47, 67, 0.10, this.jumpKickFrames.length, false, false, false, this.jumpKickFrames);
	this.jumpKickLeftAnimation = new Animation(this.imgr,
		1056, 776, 47, 67, 0.10, this.jumpKickFrames.length, false, true, false, this.jumpKickFrames);

	this.uppercutRightAnimation = new Animation(this.img,
		18, 750, 50, 93, 0.10, this.uppercutFrames.length, false, false, false, this.uppercutFrames);
	this.uppercutLeftAnimation = new Animation(this.imgr,
		18, 750, 50, 93, 0.10, this.uppercutFrames.length, false, true, false, this.uppercutFrames);

	this.attackedRightAnimation = new Animation(this.img,
		18, 858, 50, 104, 0.10, this.gettingAttackedFrames.length, false, false, false, this.gettingAttackedFrames);
	this.attackedLeftAnimation = new Animation(this.imgr,
		18, 858, 50, 104, 0.10, this.gettingAttackedFrames.length, false, true, false, this.gettingAttackedFrames);

	this.dyingAnimation = new Animation(this.img,
		0, 0, 0, 0, 0.10, this.dyingFrames.length, false, false, false, this.dyingFrames);

	this.knockBackRightAnimation = new Animation(this.img,
		0, 0, 0, 0, 0.10, this.knockBackFrames.length, false, false, false, this.knockBackFrames);

	this.knockBackLeftAnimation = new Animation(this.imgr,
		0, 0, 0, 0, 0.10, this.knockBackFrames.length, false, true, false, this.knockBackFrames);

	this.animationCollection = [this.idleAnimation, this.idleLeftAnimation,
			this.moveAnimation, this.moveLeftAnimation, this.crouchAnimation,
			this.crouchLeftAnimation, this.blockRightAnimation,
			this.blockLeftAnimation, this.blockCrouchRightAnimation,
			this.blockCrouchLeftAnimation, this.punchRightAnimation,
			this.punchLeftAnimation, this.punchRight2Animation, this.punchLeft2Animation,
			this.punchRight3Animation, this.punchLeft3Animation, this.kickRightAnimation,
			this.kickLeftAnimation, this.kickRight2Animation, this.kickLeft2Animation,
			this.jumpRightAnimation, this.jumpLeftAnimation, this.jumpKickRightAnimation,
			this.jumpKickLeftAnimation, this.uppercutRightAnimation, this.uppercutLeftAnimation,
			this.attackedRightAnimation, this.attackedLeftAnimation, this.dyingAnimation,
			this.knockBackRightAnimation, this.knockBackLeftAnimation];

	for (var i = 0; i < this.animationCollection.length; i++) {
		//console.log(i);
		this.animationCollection[i].actualWidth = 51;
		this.animationCollection[i].actualHeight = 105;
	}
	this.healthBar = new HealthBar(100, this.game, 20, 100);

	this.currentAnimation = this.idleAnimation;





	this.counter = 0;
	this.setA = 0;
	Entity.call(this, game, x, y);
}

Subzero.prototype = new Entity();
Subzero.prototype.constructor = Subzero;
var attack = false;
var count = 0;
var count2 = 0

/*
Checks gameEngine states and changes Character's states
depending on them.
*/
Subzero.prototype.checkGameStates = function() {
	if (!this.game.crouch) {
			this.crouchAnimation.elapsedTime = 0;
			this.crouchLeftAnimation.elapsedTime = 0;
		}
		if (!this.game.block) {
			this.blockLeftAnimation.elapsedTime = 0;
			this.blockRightAnimation.elapsedTime = 0;
		}
		if (this.game.jump) {
			if (!this.gettingAttacked) {
				this.jumping = true;
			}
			this.game.block = null;
			this.blocking = false;
			if (this.game.jumpKick) {
			//	this.jumpKicking = true;
			}
		} else if (this.game.punch ) {
			//console.log("you pressed punch key");
			if (!this.gettingAttacked && !this.knockingBack) {
				this.punching = true;
			} else {
				this.game.punch = null;
			}
			this.movingLeft = false;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.blocking = false;
		} else if (this.game.punch2) {

			if (!this.gettingAttacked) {
				this.punching2 = true;
			} 
			this.movingLeft = false;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.blocking = false;
		} else if (this.game.punch3) {
			if (!this.gettingAttacked) {
				this.punching3 = true;
			}
			this.movingLeft = false;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.blocking = false;
		} else if (this.game.kick ) {
			if (!this.gettingAttacked && !this.knockingBack) {
				this.kicking = true;
			} else {
				this.game.kick = null;
			}
			this.movingLeft = false;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.blocking = false;
		} 
		else if (this.game.kick2) {
			if (!this.gettingAttacked) {
				this.kicking2 = true;
			}
			this.movingLeft = false;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.blocking = false;
		} else if (this.game.block) {

			if (!this.gettingAttacked && !this.knockingBack) {
				this.blocking = true;
			}
			this.movingLeft = false;
			this.idling = false;
			//this.crouching = false;
			this.movingRight = false;
			if (this.game.crouch) {
				this.crouching = true;
			} else {
				this.crouching = false;
			}
		} else if (this.game.uppercut) {
			this.uppercutting = true;
		}else if (this.game.crouch) {
			this.crouching = true;
			this.idling = false;
			this.movingRight = false;
			this.movingLeft = false;
			this.punching = false;
			//this.blocking = false;
			if (this.game.block) {
				this.blocking = true;
			} else {
				this.blocking = false;
			}

		} else if (this.game.moveRight) {
			this.movingRight = true;
			this.idling = false;
			this.crouching = false;
			this.movingLeft = false;
			this.punching = false;
			this.blocking = false;
			if (!this.gettingAttacked) {
				this.facing = "R";
			}
		} else if (this.game.moveLeft) {
			this.movingLeft = true;
			this.idling = false;
			this.crouching = false;
			this.movingRight = false;
			this.punching = false;
			this.blocking = false;
			if (!this.gettingAttacked) {
				this.facing = "L";
			}
		}
		// else if (this.game.jump) {
		//	this.jumping = true;
		//	this.idling = false;
		//	this.crouching = false;
			//this.movingRight = false;
		//	this.punching = false;
		//	this.blocking = false; }
		else  if (!this.game.moveRight && !this.game.crouch && !this.game.moveLeft
					&& !this.game.punch) {
			this.idling = true;
			this.movingRight = false;
			this.crouching = false;
			this.movingLeft = false;
			this.punching = false;
			this.blocking = false;
		}
		//FUN EASTER EGG STUFF, BETTER TO REMOVE in prototype!
		//ULTRA SPEED is activated when "U" key is pressed
		//and deactivated when "U" is pressed again
		/*if (this.game.ultraSpeed) {
			this.speed += 0.1;
		} else {
			this.speed = 5;
		}*/
}

/*Check my states and update animations.*/
Subzero.prototype.checkMyStates = function() {
	if (this.gettingAttacked) {
		if (!this.blocking) {
			this.gettingAttackedCounter++;
		}

		//this.jumping = false;
		this.punching = false;
		this.punching2 = false;
		this.punching3 = false;
		this.kicking = false;
		this.kicking2 = false;
		//this.crouching = false;
		if (this.jumping) {
			this.currentAnimation = this.facing === "L" ? this.attackedLeftAnimation : this.attackedRightAnimation;
			this.jumping = false;
			this.y = 420;
			if (this.currentAnimation.isDone()) {
	 			this.currentAnimation.elapsedTime = 0;
	 			this.gettingAttacked = false;
	 			//this.currentAnimation = this.facing === "L" ? this.idleLeftAnimation : this.idleAnimation;
	 		}
		} else if (this.blocking && !this.knockingBack) {
				if (this.facing === "R") {
					if (this.crouching) {
						this.currentAnimation = this.blockCrouchRightAnimation;
					} else {
						this.currentAnimation = this.blockRightAnimation;
					}
				} else {
					if (this.crouching) {
						this.currentAnimation = this.blockCrouchLeftAnimation;
					} else {
						this.currentAnimation = this.blockLeftAnimation;
					}
				}
			} else {
				if (this.gettingAttackedCounter >= 100) {
					
					this.currentAnimation = this.facing === "L" ? this.knockBackLeftAnimation : this.knockBackRightAnimation;
					this.knockingBack = true;
					if (this.x > 10 && this.x < 3700) {
						this.x += this.facing === 'L' ? 5 : -5;
					}
					if (this.currentAnimation.isDone()) {
						this.gettingAttacked = false;
						this.knockingBack = false;
						this.gettingAttackedCounter = 0;
						this.knockBackLeftAnimation.elapsedTime = 0;
						this.knockBackRightAnimation.elapsedTime = 0;
					}
				} else {
	 				this.currentAnimation = this.facing === "L" ? this.attackedLeftAnimation : this.attackedRightAnimation;
	 				if (this.currentAnimation.isDone()) {
	 					this.currentAnimation.elapsedTime = 0;
	 					this.gettingAttacked = false;
	 					//this.currentAnimation = this.facing === "L" ? this.idleLeftAnimation : this.idleAnimation;
	 				}
	 			}
	 		}	
		} else  if (this.blocking) {
			if (this.facing === "R") {
				if (this.crouching) {

					this.currentAnimation = this.blockCrouchRightAnimation;
					
				} else {
					this.currentAnimation = this.blockRightAnimation;
				}
			} else {
				if (this.crouching) {
					this.currentAnimation = this.blockCrouchLeftAnimation;
				} else {
					this.currentAnimation = this.blockLeftAnimation;
				}
			}
		}  else if (this.uppercutting) {
			if (this.facing === "R") {
				this.currentAnimation = this.uppercutRightAnimation;
				if(this.uppercutRightAnimation > .2) {
					hitsnd.play();
				}
				if (this.currentAnimation.isDone()) {
					this.uppercutRightAnimation.elapsedTime = 0;
					this.uppercutting = false;
					this.game.uppercut = null;
				}
			} else {
				this.currentAnimation = this.uppercutLeftAnimation;
				if(this.uppercutLeftAnimation > .2) {
					hitsnd.play();
				}
				if (this.currentAnimation.isDone()) {
					this.uppercutLeftAnimation.elapsedTime = 0;
					this.uppercutting = false;
					this.game.uppercut = null;
				}
			}
		} else if (this.punching) {
			if (this.facing === "R") {
				this.currentAnimation = this.punchRightAnimation;
				if(this.punchRightAnimation.elapsedTime > .2){
					punchsnd.play();
				}
				if (this.punchRightAnimation.isDone()) {
					this.punchRightAnimation.elapsedTime = 0;
					this.punching = false;
					this.game.punch = null;
				}
			} else if (this.facing === "L") {
				if (this.punchLeftAnimation.isDone()) {
					this.punchLeftAnimation.elapsedTime = 0;
					this.punching = false;
					this.game.punch = null;
				}
				this.currentAnimation = this.punchLeftAnimation;
				if(this.punchLeftAnimation.elapsedTime > .2){
					punchsnd.play();
				}
			}
		} else if (this.punching2) {
			if (this.facing === "R") {
				this.currentAnimation = this.punchRight2Animation;
				if(this.punchRight2Animation.elapsedTime > .2){
					punchsnd.play();
				}
				if (this.punchRight2Animation.isDone()) {
					this.punchRight2Animation.elapsedTime = 0;
					this.punching2 = false;
					this.game.punch2 = null;
				}
			} else if (this.facing === "L") {
				this.currentAnimation = this.punchLeft2Animation;
				if(this.punchLeft2Animation.elapsedTime > .2){
					punchsnd.play();
				}
				if (this.punchLeft2Animation.isDone()) {
					this.punchLeft2Animation.elapsedTime = 0;
					this.punching2 = false;
					this.game.punch2 = null;
				}
			}
		} else if (this.punching3) {
			if (this.facing === "R") {
				this.currentAnimation = this.punchRight3Animation;
				if(this.punchRight3Animation.elapsedTime > .2){
					kicksnd.play();
				}
				if (this.punchRight3Animation.isDone()) {
					this.punchRight3Animation.elapsedTime = 0;
					this.punching3 = false;
					this.game.punch3 = null;
				}
			} else if (this.facing === "L") {
				this.currentAnimation = this.punchLeft3Animation;
				if(this.punchLeft3Animation.elapsedTime > .2){
					kicksnd.play();
				}
				if (this.punchLeft3Animation.isDone()) {
					this.punchLeft3Animation.elapsedTime = 0;
					this.punching3 = false;
					this.game.punch3 = null;
				}
			}
		} else if (this.kicking) {
			if (this.facing === "R") {
				this.currentAnimation = this.kickRightAnimation;
				if(this.kickRightAnimation.elapsedTime > .4){
					kicksnd.play();
				}
				if (this.kickRightAnimation.isDone()) {
					
					this.kickRightAnimation.elapsedTime = 0;
					this.kicking = false;
					this.game.kick = false;
				}
			} else if (this.facing === "L") {
				this.currentAnimation = this.kickLeftAnimation;
				if(this.kickLeftAnimation.elapsedTime > .4){
					kicksnd.play();
				}
				if (this.kickLeftAnimation.isDone()) {
					kicksnd.play()
					this.kickLeftAnimation.elapsedTime = 0;
					this.kicking = false;
					this.game.kick = false;
				}
			}
		} else if(this.kicking2) {
			if (this.facing === "R") {
				this.currentAnimation = this.kickRight2Animation;
				if(this.kickRight2Animation.elapsedTime > .2){
					hitsnd.play();
				}
				if (this.kickRight2Animation.isDone()) {
					this.kickRight2Animation.elapsedTime = 0;
					this.kicking2 = false;
					this.game.kick2 = false;
				}
			} else if (this.facing === "L") {
				this.currentAnimation = this.kickLeft2Animation;
				if(this.kickLeft2Animation.elapsedTime > .2){
					hitsnd.play();
				}
				if (this.kickLeft2Animation.isDone()) {
					this.kickLeft2Animation.elapsedTime = 0;
					this.kicking2 = false;
					this.game.kick2 = false;
				}
			}
		} else if (this.jumping) {
			//console.log("this.jumping is true");
			if (this.facing === "R") {
				
			//	if (this.jumpKicking) {
					//this.jumpRightAnimation.readyFrames = this.jumpKickFrames;
				//} else {
					this.currentAnimation = this.jumpRightAnimation;
					jumpsnd.play();
				//}

				if (this.currentAnimation.isDone()) {
					this.jumpRightAnimation.readyFrames = null;
					this.jumpKickRightAnimation.elapsedTime = 0;
					this.jumpRightAnimation.elapsedTime = 0;
					this.jumping = false;
					//this.jumpKicking = false;
					this.game.jumpKick = null;
					this.game.jump = null;
				}
				//console.log("Scorpions move right " +  this.movingRight);
				if (this.movingRight && this.x < 3720) {
					this.x += this.speed;
				}

				if ((this.x < 640) || (this.x > 3200 && this.x < 3720)) {
					this.xView += this.speed;
				}
			} else if (this.facing === "L") {
				//if (this.jumpKicking) {
					//this.jumpLeftAnimation.readyFrames = this.jumpKickFrames;
				//} else {
					this.currentAnimation = this.jumpLeftAnimation;
					jumpsnd.play();
				//}
				if (this.currentAnimation.isDone()) {
					this.jumpLeftAnimation.readyFrames = null;
					this.jumpLeftAnimation.elapsedTime = 0;
					this.jumpKickLeftAnimation.elapsedTime = 0;
					//this.jumpKicking = false;
					this.jumping = false;
					this.game.jumpKick = null;
					this.game.jump = null;
				}
				if (this.movingLeft && this.x >= 0) {
					this.x -= this.speed;
				}

				if ((this.x >= 0 && this.x < 640) || (this.x > 3200 && this.x < 3720)) {
					this.xView += -1 * (this.speed);
				}
			}
			var jumpDistance = this.currentAnimation.elapsedTime / this.currentAnimation.totalTime;
			var totalHeight = 360;
			if (jumpDistance > 0.5) {
				jumpDistance = 1 - jumpDistance;
			}
			var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
			this.y = 420 - height;
		} else  if (this.movingRight) {
			//IF THIS IS NOT GETTING ATTACKED THE DO IT
			if (!this.gettingAttacked) {
				this.currentAnimation = this.moveAnimation;

				if ((this.x < 3720)) {
					this.x += this.speed;
				}	

				if ((this.x < 640) || (this.x > 3200 && this.x < 3720)) {
					this.xView += this.speed;
				}
			}
			
		} else if (this.movingLeft) {
			if (!this.gettingAttacked) {
				this.currentAnimation = this.moveLeftAnimation;

				if (this.x >= 0) {
					this.x += -1 * (this.speed);
				}

				if ((this.x >= 0 && this.x < 640) || (this.x > 3200 && this.x < 3720)) {
					this.xView += -1 * (this.speed);
				}
			}
		} else  if (this.crouching === true) {
			if (this.facing === "R") {
				this.currentAnimation = this.crouchAnimation;
				
					ducksnd.play();
				
			} else {
				if (this.uppercutting) {
					
				} else {
					this.currentAnimation = this.crouchLeftAnimation;
					
						ducksnd.play();
					
				}
			}
		} else  {
			if (this.facing === "R") {
				this.currentAnimation = this.idleAnimation;
			} else {
				this.currentAnimation = this.idleLeftAnimation;
			}
		}
}


Subzero.prototype.update = function() {
	
	if (this.healthBar.hp <= 0) {
		this.healthBar.hp = 0;
		this.currentAnimation = this.dyingAnimation;
		if (this.dyingAnimation.isDone()) {
			this.removeFromWorld = true;
		}
	}else if (!this.isBot) {
		
		this.checkGameStates();

		this.checkMyStates();

	} else {
		// if (!this.gettingAttacked) {
		// 	var next = Math.random();
			
		// 		this.currentAnimation = this.facing === "L" ? this.idleLeftAnimation : this.idleAnimation;
		// }
	}

	//console.log("my y is: " + this.currentAnimation.getY(this.y, this.scaleBy) + 
			//"\n my x is: " + this.x + "\n myHeight is: " + this.currentAnimation.getFrameHeight() * this.scaleBy + 
		//"\n myWidth is:  " + this.currentAnimation.getFrameWidth() * this.scaleBy);
		var currentBox = new Box(this.currentAnimation.getX(this.x, this.scaleBy),
			this.currentAnimation.getY(this.y, this.scaleBy),
			this.currentAnimation.getFrameWidth() * this.scaleBy,
			this.currentAnimation.getFrameHeight() * this.scaleBy);
		this.currentBox = currentBox;

	//Detect collision with other entities
	var range = 96;
	if(count > 2000){
		count = 0;
	}
	for (var i = 0; i < this.game.entities.length; i++) {

		var ent = this.game.entities[i];
		if(!(this.isBot)){
				if (ent.gettingAttacked) {
					if (!ent.blocking) {
						ent.gettingAttackedCounter++;
					}
					ent.punching = false;
					ent.punching2 = false;
					ent.punching3 = false;
					ent.kicking = false;
					ent.kicking2 = false;
					if (ent.jumping) {
						ent.currentAnimation = ent.facing === "L" ? ent.attackedLeftAnimation : ent.attackedRightAnimation;
						ent.jumping = false;
						ent.y = 420;
						if (ent.currentAnimation.isDone()) {
				 			ent.currentAnimation.elapsedTime = 0;
				 			ent.gettingAttacked = false;
				 			//ent.currentAnimation = ent.facing === "L" ? ent.idleLeftAnimation : ent.idleAnimation;
				 		}
					} else if (ent.blocking) {
						if (ent.facing === "R") {
							if (ent.crouching) {
								ent.currentAnimation = ent.blockCrouchRightAnimation;
							} else {
								ent.currentAnimation = ent.blockRightAnimation;
							}
						} else {
							if (ent.crouching) {
								ent.currentAnimation = ent.blockCrouchLeftAnimation;
							} else {
								ent.currentAnimation = ent.blockLeftAnimation;
							}
						}
					} else {
						if (ent.gettingAttackedCounter >= 100) {
							ent.currentAnimation = ent.facing === "L" ? ent.knockBackLeftAnimation : ent.knockBackRightAnimation;
							if (ent.x > 10 && ent.x < 3700) {
								ent.x += ent.facing === 'L' ? 5 : -5;
							}
							if (ent.currentAnimation.isDone()) {
								console.log("should be done falling");
								ent.gettingAttacked = false;
								ent.gettingAttackedCounter = 0;
								ent.knockBackLeftAnimation.elapsedTime = 0;
								ent.knockBackRightAnimation.elapsedTime = 0;
							}
						} else {
				 			ent.currentAnimation = ent.facing === "L" ? ent.attackedLeftAnimation : ent.attackedRightAnimation;
				 			if (ent.currentAnimation.isDone()) {
				 				ent.currentAnimation.elapsedTime = 0;
				 				ent.gettingAttacked = false;
				 				//ent.currentAnimation = ent.facing === "L" ? ent.idleLeftAnimation : ent.idleAnimation;
				 			}
				 		}
				 	}	
				} else {
				//BOTS ATTACK LOGIC
				//Player on the right
				if (ent !== this && ent.currentBox && this.collide(ent)) {
					if(this.game.kick && this.currentAnimation.isDone()) {
						attack = true;
					} else {
						attack = false;
					}
					range = ent.actualWidth * ent.scaleBy;
					//console.log(Math.abs(this.x - ent.x));
					if (this.x > ent.x && Math.abs(this.x - ent.x) < range) {
						
						count++;
		
						if(count % 30 == 0) {
							rand = Math.floor(Math.random() * 3);
						}
						//console.log("Right");
						if(this.kicking){
							attack = true;
							//console.log("kicking");
							//ent.gettingAttacked == true;
						}
						if(!this.isAttacking()){
							
							//console.log("Here's the random number "+ rand);
							
							if(rand === 0){
								ent.currentAnimation = ent.kickRightAnimation;
								this.facing = "L";
								console.log("bot is kicking");
								if (this.blocking) {
									ent.attackHandler(this, 0.3);		
								} else {
									ent.attackHandler(this, 1);
									this.gettingAttacked = true;
								}
								//console.log("Elapsed " + ent.game.clockTick);
								if(ent.currentAnimation.isDone()) {
									//console.log("I'm done kicking right");
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
							if(rand === 1){
								ent.currentAnimation = ent.punchRightAnimation;
								this.facing = "L";
								console.log("bot is punching");
								if (this.blocking) {
									ent.attackHandler(this, 0.3);
								} else {
									ent.attackHandler(this, 1);
								}
								if(ent.currentAnimation.isDone()) {
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
							if(rand === 2) {
								ent.currentAnimation = ent.blockRightAnimation;
								if(ent.currentAnimation.isDone()) {
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
		
							
						} else {
							
							
							if (ent.isBlocking) {
								this.attackHandler(ent, 3);

							} else {
								this.attackHandler(ent, 9);
								//ent.currentAnimation =  ent.attackedRightAnimation;
								ent.gettingAttacked = true;
							}
							if (ent.currentAnimation.isDone()) {
			
	 							ent.currentAnimation.elapsedTime = 0;
	 							ent.gettingAttacked = false;
	 							//this.currentAnimation = this.facing === "L" ? this.idleLeftAnimation : this.idleAnimation;
	 						}	
						}
						
						//ent.velocity = 0;

						//Player on the left
					} if (this.x < ent.x && (Math.abs(this.x - ent.x) < range+60)) {
						if(this.game.kick && this.currentAnimation.isDone()) {
							attack = true;
						} else {
							attack = false;
						}
						if(count2 % 50 == 0) {
							rand2 = Math.floor(Math.random() * 3);
						}
						count2++;
						if(!this.isAttacking()){
							
							if(rand2 == 0){
								//console.log("Left");
								ent.currentAnimation = ent.kickLeftAnimation;
								if (this.blocking) {
									ent.attackHandler(this, 0.3);
								} else {
									ent.attackHandler(this, 1);
									this.facing = "R";
								}
								//console.log("Elapsed " + ent.game.clockTick)
								if(ent.currentAnimation.isDone()) {
								//	console.log("I'm done kicking right")
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
							if(rand2 == 1){
								
								ent.currentAnimation = ent.punchLeftAnimation;
								if (this.blocking) {
									ent.attackHandler(this, 0.3);
								} else {
									ent.attackHandler(this, 1);
									this.facing = "R";
								}
								if(ent.currentAnimation.isDone()) {
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
							if(rand2 == 2) {
								ent.currentAnimation = ent.blockLeftAnimation;

								if(ent.currentAnimation.isDone()) {
									
									//rand = Math.floor(Math.random() * Math.floor(2))
								}
							}
							if(ent.healthBar.hp <=0) {
								ent.isDead = true;
								ent.removeFromWorld = true;
							}
							if(this.healthBar.hp <= 0) {
								ent.currentAnimation = ent.idleAnimation;
							}
						} else {
							
							if (ent.isBlocking) {
								this.attackHandler(ent, 3)
							} else {
								this.attackHandler(ent, 9);
								ent.currentAnimation =  ent.attackedLeftAnimation;
							}
							if (ent.currentAnimation.isDone()) {
			
	 							ent.currentAnimation.elapsedTime = 0;
	 							ent.gettingAttacked = false;
	 							//this.currentAnimation = this.facing === "L" ? this.idleLeftAnimation : this.idleAnimation;
	 						}	
						}
					}
					// Scorpion.prototype.isAttacking = function() {
					//     return (this.punching || this.punching2 || this.punching3
					//         || this.kicking || this.kicking2 || this.uppercutting
					//         || this.jumpKicking);
					//}
					//this.attackHandler(ent, 0.3);
					//this.x += this.velocity.x * this.game.clockTick;
					//this.y += this.velocity.y * this.game.clockTick;
					//ent.x += ent.velocity.x * this.game.clockTick;
					//ent.y += ent.velocity.y * this.game.clockTick;
		
					//console.log("They collide!");
				}
			   
			   //BOTS FOLLOW LOGIC
				if(ent !== this && ent.currentBox && !(this.collide(ent))){
					//attack == false;
					//console.log("THE NUMBER " + Math.abs(this.x - ent.x))
					//console.log(this.x < ent.x);
					//console.log("IF " + (Math.abs(this.x - ent.x) < range));
					//this.x += this.velocity.x * this.game.clockTick;
					// console.log("Box " +ent.currentBox);
					// console.log("Goku " +this.x);
					// console.log("Scorpion "+ ent.x);
					if(this.x < ent.x && !(Math.abs(this.x - ent.x) < range - 10)) {
						ent.facing = "L";
						ent.currentAnimation = ent.moveLeftAnimation;
						ent.x -= ent.speed;
					}
					else if(this.x > ent.x && !(Math.abs(this.x - ent.x) < range-10)) {
						ent.facing = "R";
						ent.currentAnimation = ent.moveAnimation
						ent.x += ent.speed;
					}
					if(this.game.kick && this.currentAnimation.isDone()) {
						attack = true;
					} else {
						attack = false;
					}
					
					
					
		
				}
			
			}
		}
		// if (ent !== this && ent.currentBox && this.collide(ent)) {
		// 	console.log("They collide!");

		// 	if (this.isAttacking()) {
		// 		if (this.facing === "R" && this.isToTheLeftOf(ent)) {
		// 			if (!ent.blocking) {
		// 				this.attackHandler(ent, 1);
		// 			} else {
		// 				this.attackHandler(ent, 0.3);
		// 			}
		// 			ent.facing = "L";
		// 		} else if (this.facing === "L" && !this.isToTheLeftOf(ent)) {
		// 			if (!ent.blocking) {
		// 				this.attackHandler(ent, 1);
		// 			} else {
		// 				this.attackHandler(ent, 0.3);
		// 			}
		// 			ent.facing = "R";
		// 		}
		// 	}
		// }
	}


	Entity.prototype.update.call(this);
}

Subzero.prototype.collide = function(other) {
	return this.currentBox.collide(other.currentBox);
}

Subzero.prototype.isAttacking = function() {
	return (this.punching || this.punching2 || this.punching3
		|| this.kicking || this.kicking2 || this.uppercutting
		|| this.jumpKicking);
}

Subzero.prototype.isToTheLeftOf = function(other) {
	return (this.x < other.x);
}

Subzero.prototype.attackHandler = function(other, mult) {
	if (!this.isBot) {
		mult *= 2.3;
	} else {
		mult *= 2;
	}
	if (this.currentAnimation === this.punchRightAnimation
		|| this.currentAnimation === this.punchLeftAnimation) {
		other.healthBar.hp -= 0.05 * mult;
	} else if (this.currentAnimation === this.punchRight2Animation
		|| this.currentAnimation === this.punchLeft2Animation) {
		other.healthBar.hp -= 0.05 * mult;
	} else if (this.currentAnimation === this.punchRight3Animation
		|| this.currentAnimation === this.punchLeft3Animation) {
		other.healthBar.hp -= 0.0625 * mult;		
	} else if (this.currentAnimation === this.kickRightAnimation
		|| this.currentAnimation === this.kickLeftAnimation) {
		other.healthBar.hp -= 0.05 * mult;	
	} else if (this.currentAnimation === this.kickRight2Animation
		|| this.currentAnimation === this.kickLeft2Animation) {
		other.healthBar.hp -= 0.05 * mult;
	}
	
		other.gettingAttacked = true;
	
}

//Draws current frame of current animation.
Subzero.prototype.draw = function(ctx, xView, yView) {
	this.healthBar.draw(ctx);
        this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x - xView, this.y - yView, this.scaleBy);
	Entity.prototype.draw.call(this);
}