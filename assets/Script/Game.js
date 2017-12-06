var theCamera = require("Camera-control");
cc.Class({
    extends: cc.Component,

    properties: {
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
        //设定为常驻结点
        cc.game.addPersistRootNode(this.node);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1360);

        // cc.log("getNodeInCamera> "+theCamera.getNodeInCamera);
        // var tts = this.getComponent("Camera-control");
        // cc.log("tts>  "+tts);

        // var c = this.node.getComponent("Canvas");
        var tttt  = cc.find("Canvas");
        cc.log("length>  "+tttt.children.length);
        // tttt.y = 10;
        cc.log("canvas "+tttt.y);
        // tttt.y+=10;

        Globals.GCamera.getNodeInCamera(tttt.children);

        for(var i in tttt.children){
            cc.log(tttt.children[i].name);
            if(tttt.children[i].name == "mao"){
                cc.log("mao");
                // tttt.children[i].test(); 报错
            }
            if(tttt.children[i].name == "diban"){
                this.db = tttt.children[i];
                
            }
        }

        cc.log(">>>>db   "+this.db.children.length);

       

        // this._camera = cc.find("camera");
        // cc.log("_camrea  "+this._camera.name);
       

        // cc.loader.loadRes("tests/diban1", function (err, prefab) {
        //     var newNode = cc.instantiate(prefab);
        //     cc.log(">>>>>>   "+newNode.name);
        //     // cc.director.getScene().addChild(newNode);
        // });



        Globals._w = cc.winSize.width;
        Globals._h = cc.winSize.height;
        // this.getdiban();
        // cc.log(">>>>>>w  "+cc.winSize.width);
        // if(Globals.GCamera)cc.log(">>>??  "+Globals.GCamera.getNodeInCamera);  
        
        // cc.loader.loadRes
    },
    getdiban:function(){
        var self = this;
        cc.loader.loadResDir("tests",function(progress,total){
            cc.log("progress>>>  "+progress);
        }, function (err, assets) {
            for(var i=0;i<10;i++){
                var newNode = cc.instantiate(assets[0]);
                self.db.addChild(newNode);
                newNode.setPosition(self.getNewPosition());
                
            }
        });
    },
    getNewPosition: function () {
        var randX = 400+Globals._w*cc.random0To1();
        var randY = Globals._h*cc.random0To1();
        // 返回星星坐标
        return cc.p(randX, randY);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
           
    // },
});
