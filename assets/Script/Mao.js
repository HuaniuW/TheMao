var wuli = require("Wuli");
cc.Class({
    extends: wuli,
    properties: {
        t1:100,
        minSpeed:100,
        maxSpeed:400,
        jiajumppower:100,
        maxJumpPower:1000,
        _jumpPower:100,
        jiasudu:10,
        _speed:null,
        _isInAir:false
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    reSet:function(){
        // this.accLeft = false;
        this.accLefting = false;
        // this.accRight = false;
        this.accRighting = false;
        // this.accJump = false;
        this.accJumping = false;
        this.accJumpUping = false;
        this.accJumpDowning = false;
        this.isJump = false;
    },
    runLeft:function(){
        if(!this.accLefting){
            this.reSet();
            this.accLefting = true;
            this.armature.animation.gotoAndPlay("run",0);
        }
    }
    ,
    test:function(){
        cc.log("mao test");
    },
    // use this for initialization
    onLoad: function () {
        // cc.log(this.tt);
        
        this.reSet();
        this.body = this.getComponent(cc.RigidBody);
        this.body.fixedRotation = true;
        cc.log("摩擦力 "+this.body.friction);
        //这个衰减系数不能用来做摩擦力 在跳跃时也收影响
        // this.body.linearDamping = 10;
        // cc.log("linearDamping> "+this.body.linearDamping);


        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
        
        this.armature = this.armatureDisplay.armature();
        // this.armature.animation.fadeIn("jumpUp", 0, 1);
        
        // 播放动画的方法 播到了那一帧 返回控制  动态调用骨骼动画

        cc.log("armatureName> "+this.armatureDisplay.armatureName);
        cc.log("name> "+this.armatureDisplay.name);
        // ArmatureDisplay.animationName  当前播放动画的名字
        cc.log("animationName> "+this.armatureDisplay.animationName);
        cc.log("playTimes> "+this.armatureDisplay.playTimes);
        cc.log(this.armature.play);//undefined

        // cc.log(armatureDisplay.getBone);

        //Animation
        // cc.log("Animation>>>>   "+this.armature.animation.gotoAndPlay);

        //	animations
        cc.log(">>  "+this.armatureDisplay.animations);
        //	isPlaying 
        cc.log(this.armature.animation.animationNames);
        
        //this.armature  是龙骨动画核心  animation 是动作核心

        //All
        cc.log(this.armature.animation.All); //undefined

        // cc.log("playAnimation> "+this.armatureDisplay.playAnimation);
        // getArmatureNames 获取 DragonBones 数据中所有的 armature 名称
        // cc.log("getArmatureNames> "+this.armatureDisplay.getArmatureNames);
       

        // ArmatureDisplay.getAnimationNames  获取指定的 armature 的所有动画名称。
        // var dbts = this.armatureDisplay.getAnimationNames;
        // cc.log("------------------------------ "+dbts.length);
        // if(dbts.length){
        //     for(var i in dbts){
        //         cc.log(">?????  >  "+dbts[i]);
        //     }
        // }
        



        // this.armatureDisplay.playAnimation("jumpUp",1);
        // this.armatureDisplay.gotoAndPlay("jumpUp");gotoAndPlay
        
        // playAnimation
        

        cc.log("骨骼动画>>>-------   "+this.armatureDisplay+"  this.armature>  "+this.armature);






        // cc.log("> "+this.body);
        this.getKeyBoardCrotrol();
        //继承方法调用
        this.tests();

        cc.log("mao  t1>>>>> "+this.t1);

        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

    },
    getKeyBoardCrotrol:function(){
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                // cc.log(keyCode);
                switch(keyCode) {
                    case cc.KEY.left:
                        // cc.log("left");
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.right:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                    case cc.KEY.up:
                        self.accJump = true;
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                        self.accLeft = false;
                        self.accLefting = false;
                        break;
                    case cc.KEY.right:
                        self.accRight = false;
                        self.accRighting = false;
                        break;
                    case cc.KEY.up:
                        self.accJump = false;
                        // self.accJumping = false;
                        if(!self._isInAir){
                            self._isInAir = true;
                            self.isJump = true;
                            self._speed.y = self._jumpPower;
                            self.body.linearVelocity = self._speed;
                            self._jumpPower = 100;
                        }
                        break;  
                }
            }
        }, self.node);
    },
    jump:function(){        
        if(!this.accJumpUping){
            this.reSet();
            this.accJumpUping = true;
            this.armature.animation.gotoAndPlay("jumpUp",1);
        }
    }
    ,

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._speed = this.body.linearVelocity;
        // cc.log("???? "+this.accJump);
        //1.控制跳跃 2.碰撞地板的方位 3.判断是否在空中 4.动作判断


        if(this.accJump){
            if(!this.isJump){   
                // cc.log("self._jumpPower>>>>  "+this._jumpPower);
                this._jumpPower+=(this.maxJumpPower-this._jumpPower)*0.16;
                // if(this._jumpPower<this.maxJumpPower){
                //     this._jumpPower+=this.jiajumppower;
                
                // }
            }
        }

        if(this.accJumping){
            this.jump();
        }

        if(this.accLeft){
            if(this.node.scaleX < 0) {
                this.node.scaleX *= -1;   
            }
            
            if(!this.accLefting&&!this.accJumping){
                this.reSet();
                this.accLefting = true;
                this.armature.animation.gotoAndPlay("run",0);
            }
            if(this._speed.x>-this.maxSpeed)this._speed.x+=-this.minSpeed-this.jiasudu*dt;
            
        }else if(this.accRight){
            if(this.node.scaleX > 0) {
                this.node.scaleX *= -1;
            }
            if(!this.accRighting&&!this.accJumping){
                this.reSet();
                this.accRighting = true;
                this.armature.animation.gotoAndPlay("run",0);
            }
            if(this._speed.x<this.maxSpeed)this._speed.x+=this.minSpeed+this.jiasudu*dt;
            
        }else{
            // this.reSet();
            // this.armature.animation.gotoAndPlay("stand",0);
            
        }

        if(!this.accJumping&&!this.accLefting&&!this.accRighting){
            // cc.log("animationName>   "+this.armatureDisplay.animationName);
            this.armature.animation.gotoAndPlay("stand",0);
        }
        
        this.body.linearVelocity = this._speed;

        // cc.log(this.armature.animation.isCompleted);
    },
    onCollisionEnter: function (other, self) {
        // cc.log("碰撞");
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        // cc.log("begin 测试"+contact + "    s y >  "+selfCollider.node.y+" o y >  "+otherCollider.node.y+"     摩擦力 "+selfCollider.friction+"  name "+selfCollider.name);
        // cc.log("自己的宽高 "+selfCollider.node.width+"   "+selfCollider.getAABB().width);
        // cc.log("自己的X "+selfCollider.node.x+"   "+selfCollider.getAABB().x);
        // cc.log("被碰撞物体的宽高  "+otherCollider.node.width+"    "+otherCollider.getAABB().width);


        
      
        // contact.disabled = true; 不产生物理效果
        // otherCollider.node.tests();
    },
    onEndContact ( contact , selfCollider,  otherCollider ){
        // cc.log("碰撞完调用");
    },
    onPreSolve ( contact  ,selfCollider  ,otherCollider ){
        //接触时不停调用
        // cc.log(otherCollider.node.x);

        let sy = selfCollider.getAABB().y;
        let sw = selfCollider.getAABB().width;
        let sx = selfCollider.getAABB().x-sw*0.5;
        let sh = selfCollider.getAABB().height;

        let ox = otherCollider.getAABB().x;
        let oy = otherCollider.getAABB().y;
        let ow = otherCollider.getAABB().width;
        let oh = otherCollider.getAABB().height;

        // cc.log(sx +" ----- "+(ox-ow*0.5)+"  ?  "+(ox + ow*0.5)+"   "+this._isInAir);


        if(sx>=ox - ow*0.5&&sx<=ox + ow*0.5){
            //落地 更新跳跃
            if(sy>=oy+oh*0.5+sh*0.5){
                // cc.log("触地 刷新跳跃");      
                this._isInAir = false;
                this.isJump = false;
            }
            // cc.log("落在里面 ");
        }else{
            if(sy<=oy+oh*0.5){
                // cc.log("碰到侧边");
            }
            
        }
    },
    onPostSolve ( contact , selfCollider,  otherCollider ){
        //不停接触完后调用
        // cc.log(">>>>> 接触完！ ");
    }
});
