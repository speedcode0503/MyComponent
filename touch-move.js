// 拖动组件，有两种模式可选
let MoveType = cc.Enum({
    // 位置模式
    Pos: 0,
    // 偏移模式
    Delta: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        // 一开始开启触摸
        openOnLoad: {
            default: true,
            displayName: 'openOnLoad',
            tooltip: '触摸开关，你可以通过置false来禁止一开始就打开触摸监听。',
            visible: true
        },
        // 类型选择
        moveType: {
            default: MoveType.Pos,
            type: MoveType,
            displayName: 'MoveType',
            tooltip: '指定为直接位置模式或拖动模式。注意：同时只能有一种模式生效。',
            visible: true
        },
        // 指定移动节点
        moveNode: {
            default: null,
            type: cc.Node,
            tooltip: '指定移动节点',
            visible: true
        }
    },

    onLoad () {
        if (this.openOnLoad) {
            this.openTouch();
        }
    },

    openTouch () {
        this.node.on('touchstart', this._touchStart, this);
        this.node.on('touchmove', this._touchMove, this);
    },

    closeTouch () {
        this.node.off('touchstart', this._touchStart, this);
        this.node.off('touchmove', this._move, this);
    },

    _touchStart (event) {
        if (this.moveType === MoveType.Pos) {
            let pos = this.node.convertToNodeSpaceAR(event.getLocation());
            this.moveNode.x = pos.x;
            this.moveNode.y = pos.y;
        }
    },

    _touchMove (event) {
        if (this.moveType === MoveType.Pos) {
            let pos = this.node.convertToNodeSpaceAR(event.getLocation());
            this.moveNode.x = pos.x;
            this.moveNode.y = pos.y;
        } else if (this.moveType === MoveType.Delta) {
            let delta = event.getDelta();
            this.moveNode.x += delta.x;
            this.moveNode.y += delta.y;
        }
    }

});
