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
        cc.log(this.node.name);
        this.ccs1 = this.node.position;
        // this.node.position = ccs1;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // cc.log(this.ccs1.x);
        // this.ccs1.x+=0.3;
        // this.node.position = this.ccs1;
        // this.node.position.x+=10;
        // cc.log(this.node.position.x);
        
    },
});
