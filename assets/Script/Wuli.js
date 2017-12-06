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
    tests:function(){
        cc.log("继承物理!!");
    },

    // use this for initialization
    onLoad: function () {
        this.tt = 100;
        cc.log("物理");
    },
    onCollisionEnter:function(other, self){
        cc.log("物理测试");//这个在这个系统无效 待研究
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        // cc.log("begin 测试"+contact + "    >  "+selfCollider.node.x+"  >  "+otherCollider.node.x+"     摩擦力 "+selfCollider.friction+"  name "+selfCollider.name);
        // contact.disabled = true;
        // otherCollider.node.tests();
    },
    onEndContact ( contact , selfCollider,  otherCollider ){
        // cc.log("碰撞完调用");
    },
    onPreSolve ( contact  ,selfCollider  ,otherCollider ){
        //接触时不停调用
        // cc.log(otherCollider.node.x);
    },
    onPostSolve ( contact , selfCollider,  otherCollider ){
        //不停接触完后调用
        // cc.log(">>>>> 接触完！ ");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
