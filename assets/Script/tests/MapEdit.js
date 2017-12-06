var theCamera = require("Camera-control");
cc.Class({
    extends: cc.Component,

    properties: {
        Mwidth:2000,
        Mheight:1000

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

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1360);

        cc.log("地图编辑器 "+this.node.children);
        this.cengArr = this.node.children;
        for(var i in this.cengArr){
            if(this.cengArr[i].name == "diban"){
                this.db = this.cengArr[i];
            }
        }
        
        this.dt_shangyikuai = null;
       

        this.getElementArr("tests");

        var tttt  = cc.find("Canvas");
        cc.log(">>>>>>>>>>>>>>>>>>> "+Globals._h);
        Globals.GCamera.getNodeInCamera(tttt.children);

    },
    getElementArr:function(resourceRoot){
        var self = this;
        cc.loader.loadResDir(resourceRoot,function(progress,total){
            cc.log("progress>>>  "+progress);
        }, function (err, assets) {
            cc.log("------------------->> "+assets.length);
            // for(var i=0;i<10;i++){
            //     var newNode = cc.instantiate(assets[0]);
            //     self.db.addChild(newNode);
            //     newNode.setPosition(self.getNewPosition());
                
            // }
            self.createMap(assets);
        });
    }
    ,
    getNewPosition: function () {
        var randX = this.Mwidth*cc.random0To1();
        var randY = this.Mheight*cc.random0To1();
        // 返回星星坐标
        return cc.p(randX, randY);
    },
    createMap:function(objArr){
        this.kcArr = [];
        this.guaiArr = [];
        this.jgArr = [];

        //资源关键字分配
            //地板 可以踩的怪 _kc

        for(var i in objArr){
            if(objArr[i].name.split("_")[1] == "kc"){
                this.kcArr.push(objArr[i]);
            }
            // CC.log(cc.String.substr(objArr[i].name));
            
        }

        
       this.makeDiBan();
        

        //1.分类
        //2.选择线路类型
        //3.起点 方法同4
        //4.选择大块 或者小块 是否混合 是否跳跃（一些特定模块必须跳跃 比如移动块） 完毕--距离计算 --循环（选择大块或者小块）  混合机关
        //5.给门 
    },
    makeDiBan:function(){
        if(this.dt_shangyikuai && this.dt_shangyikuai.x>this.Mwidth)return;
        var tt = cc.random0To1()*this.kcArr.length>>0;
        cc.log("随机数> "+tt);
        var newNode = cc.instantiate(this.kcArr[tt]);
        cc.log("newNode>   "+newNode);
        var sx = 0;
        var sy = 0;
        var sjx = 200;
        var sjy = 200;
        if(this.dt_shangyikuai){
            sx = this.dt_shangyikuai.x+this.dt_shangyikuai.width*0.5;
            sy = this.dt_shangyikuai.y+this.dt_shangyikuai.height*0.5;
        }


        if(this.dt_shangyikuai == null){
            newNode.x = 0;
            newNode.y = cc.random0To1()*this.Mheight*0.7;
        }else{
            var ttt = cc.random0To1()*10;
            if(ttt>=-10){
                //跟
                newNode.x = sx+newNode.width*0.5;
                newNode.y = sy-newNode.height*0.5;
            }else{
                //跳
                newNode.x = sx+newNode.width*0.5 + cc.random0To1()*sjx;
                newNode.y = sy-newNode.height*0.5 + cc.randomMinus1To1()*sjy;
            }
        }

        this.db.addChild(newNode);
        
        this.dt_shangyikuai = newNode;

        this.makeDiBan();

        cc.log(newNode.y);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
