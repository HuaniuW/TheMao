var wuli = require("Wuli");
cc.Class({
    extends: wuli,

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
        this.body = this.getComponent(cc.RigidBody);
        cc.log("摩擦力   "+this.friction);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // var speed = this.body.linearVelocity;
        // speed.y+=10*dt;
        // this.body.linearVelocity = speed;
        // cc.log(this.node.y);
    },
});
