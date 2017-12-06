cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.camera = this.getComponent(cc.Camera);
        cc.log("camera w h  > "+this.node.width);

        this.p2 = cc.v2(0,0);

        this.cameraTarget = this.target;
        this.targetPos = this.cameraTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
        
        this.p2.x=this.targetPos.x;
        this.p2.y=this.targetPos.y;

        this.iszhendonging = false;
        this.isZhendong = false;
        this.zhendongTragetY = 0;
        this.zdnums=20;

   

        Globals.GCamera = this;
    },
    getNodeInCamera:function(arr){
        //传入游戏场景的 子node 数组

        //清楚掉摄像头 已经有的 监视对象
        var hasTargetArr = this.camera.getTargets();
        while(hasTargetArr.length){
            this.camera.removeTarget(hasTargetArr.pop());
        }

        //取到游戏层 地板的宽度 做边界限定
        for(var i in arr){
            if(arr[i].name == "diban"){
                this.diban_w = arr[i].width;
                this.diban_h = arr[i].height;
            }
            this.camera.addTarget(arr[i]);
        }

         //1.初始位置
        //2.移动距离 越远移动越多 要不要移动参数 越远越快 远景和摄像头移动方向一致
        //速率参数 和摄像机一样 区别在于移动距离
        var cameraTagArr = this.camera.getTargets();
        this.jingArr = [];
        for(var i in cameraTagArr){
            if(cameraTagArr[i].name!="diban"&&cameraTagArr[i].name!="mao"){
                this.jingArr.push({"_node":cameraTagArr[i],"pos":this["pos"+i]=cameraTagArr[i].position,"julibi":this.getCengCS(cameraTagArr[i].name),"csx":cameraTagArr[i].position.x,"csy":cameraTagArr[i].position.y});     
            }      
        }
    },
    start:function(){
        cc.log("this target   "+this.target.name);
        cc.log("t1> "+this.target.node);
    },

    onEnable: function () {
        cc.log(">>启用摄像机 camera");
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },
    // called every frame, uncomment this function to activate update callback
    lateUpdate: function (dt) {
        this.bianjiexianzhi();
        if(this.isZhendonging){
            this.zhendong();
        }
        
    },
    bianjiexianzhi:function(){
        this.targetPos = this.cameraTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.p2.x+=(this.targetPos.x - this.p2.x)*0.1;
        this.p2.y+=(this.targetPos.y - this.p2.y)*0.1;
        //测试切换 焦点
        // this.ttar = cc.find("Canvas/yuanjing2");
        // this.changeTarget(this.ttar);

        if(this.p2.x>=this.diban_w - cc.winSize.width*0.5){
            // this.isZhendonging = true;
            // this.changeZoomRatio(0.7);
            this.p2.x = this.diban_w - cc.winSize.width*0.5;    
        }else if(this.p2.x<=cc.winSize.width*0.5){
            this.p2.x = cc.winSize.width*0.5;
            for(var i in this.jingArr){
                this.jingArr[i]["pos"].x = this.jingArr[i]["csx"];
            }
        }else{
            for(var i in this.jingArr){
                this.jingArr[i]["pos"].x+= (this.targetPos.x - this.p2.x)*0.1*this.jingArr[i]["julibi"]; 
            }
        }

        if(this.p2.y>=this.diban_h - cc.winSize.height*0.5){
            this.p2.y = this.diban_h - cc.winSize.height*0.5;     
        }else if(this.p2.y<=cc.winSize.height*0.5){
            this.p2.y = cc.winSize.height*0.5;
            for(var i in this.jingArr){
                this.jingArr[i]["pos"].y = this.jingArr[i]["csy"];
            }   
        }else{
            for(var i in this.jingArr){
                this.jingArr[i]["pos"].y+=(this.targetPos.y - this.p2.y)*0.1*this.jingArr[i]["julibi"]*0.5;
            }
        }

        for(var i in this.jingArr){
            this.jingArr[i]["_node"].position = this.jingArr[i]["pos"];
        }

        // this.node.rotation = 30; 
        
        this.node.position = this.node.parent.convertToNodeSpaceAR(this.p2);

        // this.changeZoomRatio(0.8);
    }
    ,
    zhendong:function(){
        var zf = this.zdnums%2==0?1:-1;
        this.p2.y+=2*zf*this.zdnums*0.1;
        if(this.zdnums>0)this.zdnums--;
        this.node.position = this.node.parent.convertToNodeSpaceAR(this.p2);
    }
    ,
    changeTarget:function(obj){
        this.cameraTarget = obj;
    }
    ,
    changeZoomRatio:function(num){
        this.camera.zoomRatio += (num-this.camera.zoomRatio)*0.08;
    },
    getCengCS:function(_name){
        var ccs = {"yuanjing1":0.5,"yuanjing2":0.7,"yuanjing3":0.8,"yuanjing4":0.8,"yuanjing5":0.9,"yuanjing6":0.98,"jinjing1":-0.8,"jinjing2":-1.4};
        return ccs[_name];
    }
   

});


