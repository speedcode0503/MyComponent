cc.Class({
    extends: cc.Component,

    properties: {
        /** 摇杆移动中心 */
        midNode: {
            default: null,
            type: cc.Node,
            displayName: '移动中心节点'
        },
        /** 摇杆背景做监听，体验好些 */
        joyBk: {
            default: null,
            type: cc.Node,
            displayName: '摇杆背景节点'
        },
        /** 摇杆最大移动半径 */
        maxR: {
            default: 100,
            displayName: '摇杆活动半径'
        },
        /** 摇杆移动回调 */
        joyCallBack:  {
            default: [],
            type: cc.Component.EventHandler,
            displayName: '摇杆移动回调',
            tooltip: '触发touchmove后分发数据'
        }
    },

    onLoad () {
        // 归位
        this.goBackMid();
    },

    start () {
        this.joyBk.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    },

    /** 回归中心 */
    goBackMid () {
        this.joyBk.setPosition(0, 0);
        this.midNode.setPosition(0, 0);
    },

    onTouchStart (e) {
        let pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.clampPos(pos);
        this.midNode.setPosition(pos.x, pos.y);
        let angle = this.covertToAngle(pos);
        console.log(this.joyCallBack);
        // 触发回调
        this.joyCallBack[0].emit([pos, angle]);
    },

    onTouchMove (e) {
        let pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.clampPos(pos);
        this.midNode.setPosition(pos.x, pos.y);
        let angle = this.covertToAngle(pos);
        // 触发回调
        this.joyCallBack[0].emit([pos, angle]);
    },

    onTouchEnd (e) {
        this.goBackMid();
        this.joyCallBack[0].emit([cc.v2(0, 0)]);
    },

    /** 根据半径限制位置 */
    clampPos (pos) {
        let len = pos.mag();
        if (len > this.maxR) {
            let k = this.maxR / len;
            pos.x *= k;
            pos.y *= k;
        }
    },

    /** 根据位置转化角度 */
    covertToAngle (pos) {
        let r = Math.atan2(pos.y, pos.x);
        let d = cc.misc.radiansToDegrees(r);
        return d;
    },

});
