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
            displayName: '在onLoad中开启',
            tooltip: '你可以通过置false来禁止一开始就打开触摸监听。你可以在需要时调用openTouch方法。',
            visible: true
        },
        // 类型选择
        moveType: {
            default: MoveType.Pos,
            type: MoveType,
            displayName: '类型选择',
            tooltip: '指定为直接位置模式或拖动模式。注意：同时只能有一种模式生效。',
            visible: true
        },

        deltaK: {
            default: 1,
            displayName: '拖动系数',
            tooltip: '1为正常拖动系数，当你采用2时，拖动速度为2倍。',
            visible: function () {
                return this.moveType === MoveType.Delta;
            }
        },

        // 指定移动节点
        moveNode: {
            default: null,
            type: cc.Node,
            displayName: '被控节点',
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
            this.moveNode.x += this.deltaK * delta.x;
            this.moveNode.y += this.deltaK * delta.y;
        }
    }

});
