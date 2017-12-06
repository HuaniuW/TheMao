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

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

//全局变量
window.TestG = {
    tt1:100,
    tt2:1000
}

// 取显示对象属性 先取到node   例 spr.node.width   spr.node.x

// require 导入引入 类似import

// this.node.children 取到子结点

/**
 * 场景切换 + 切换后回调函数
 * cc.director.loadScene("game",function(){
 *      cc.log("hello!Game");
 * });
 */

/**
 * 常驻结点
 * 让场景或结点不被销毁
 * cc.game.addPersistRootNode(this.node);
 * 取消常驻结点
 * cc.game.removePersistRootNode(this.node);
*/

/**
 * 设置使用物理引擎 一定要在设置重力参数之前 否则 重力参数失效
 * cc.director.getPhysicsManager().enabled = true;
 * 设置物理引擎重力参数
 * cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
 * 如果希望重力加速度为 0
 * cc.director.getPhysicsManager().gravity = cc.v2(0,0);
*/

//限制box2d 刚体旋转  true 是限制旋转
//rigidbody.fixedRotation = true;
//例 Globals.mao.body.fixedRotation = true;
//this.body = this.getComponent(cc.RigidBody);  找到自己的body


/**
 * getComponent()这个方法要注意  
 * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。
 * ***传入参数也可以是脚本的名称。
 * this.camera = this.getComponent(cc.Camera);
*/




//不是摄像头专用 都可以用
//onEnable:function(){} 启用  内置函数 启动时自动调用
//onDisable:function(){}  禁用 内置函数 关闭时自动移除



/**
 * var x = 'global';
 * let y = 'global';
 * console.log(this.x); // "global"
 * console.log(this.y); // undefined 
*/
/**
 * 以下都是在非 属性properties:{} 对象中声明的属性使用
 * 直接在类里面 声明  this.test = 10;  后面就可以取到this.test  不加this会报错  
 * 如果是var test = 10;  不能加this  直接访问test   用var  只能在局部使用 调出函数就不能使用了
 * let 同var 一样 不能在函数外访问到
*/

/**
 * 通过子结点名字 取子结点
 * var btn1 = this.node.getChildByName("btn1");
*/

/**
 * touch事件
 * this.btnFX.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
 * this.btnFX.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouch,this);
 * this.btnFX.node.on(cc.Node.EventType.TOUCH_END,this.onTouch,this);
 * this.btnFX.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouch,this);
 * e.target.off(cc.Node.EventType.TOUCH_END,this.onClick,this); 移除事件
 * once 只触发一次
*/

//cc.winSize.width 获取全局宽


// this.body.linearDamping = 10;
//这个衰减系数不能用来做摩擦力 在跳跃时也收影响
        

/**
 * 如果子节点的层次较深，你还可以使用 cc.find，cc.find 将根据传入的路径进行逐级查找：
 * cc.find("Cannon 01/Barrel/SFX", this.node);
 * 当 cc.find 只传入第一个参数时，将从场景根节点开始逐级查找：
 * this.backNode = cc.find("Canvas/Menu/Back");
 * 
 * 随机数 0-1 cc.random0To1();
 * 随机数 -1-1 cc.randomMinus1To1();
 * 
*/