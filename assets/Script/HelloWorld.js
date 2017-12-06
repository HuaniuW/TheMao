cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        var btn1 = this.node.getChildByName("btn1"); //this.getComponent("btn1");


        // cc.log("> "+this.node.children);
        cc.log(">btn1 "+btn1);   
        
        //var 定义的不能用this 
        // btn1.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
        //once 只触发一次
        btn1.once(cc.Node.EventType.TOUCH_END,this.onClick,this);


        // for(var i in this.node.children){
        //     cc.log("> "+this.node.children[i].name);     
        // }      
        // Tools.getNodeChildrenName(this.node.children);

        this.tt = 10;
        // cc.log("> "+this.tt);

        let tt2 = 100;
        // cc.log(this.tt2);
    }
    ,
    onClick:function(e){
        // e.target.off(cc.Node.EventType.TOUCH_END,this.onClick,this);
        cc.log(">OK! Game Start! "+e.target.name);
    }
    ,
    onEnable:function(){
        // cc.log("启用");
    },

    // called every frame
    update: function (dt) {
        // cc.log(this.tt);
    },
});
