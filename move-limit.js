// 限位组件，有两种模式可选
let LimitType = cc.Enum({
    // 数字模式
    Number: 0,
    // 节点模式
    Node: 1,
});

cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        executeInEditMode: true
    },

    properties: {
        // 是否预览
        preview: {
            default: false,
            //type: cc.Boolean,
            displayName: '启用预览',
            tooltip: '预览开关，你可以通过置false来取消预览',
            visible: true
        },
        // 是否启用
        isRun: {
            default: true,
            //type: cc.Boolean,
            displayName: '启用开关',
            tooltip: '限位开关，你可以通过置false来取消限位。比如飞机需要飞出屏幕时，应该关掉它。',
            visible: true
        },
        // 类型选择
        limitType: {
            default: LimitType.Number,
            type: LimitType,
            displayName: '类型选择',
            tooltip: '指定为数值模式或节点模式。注意：同时只能有一种模式生效。',
            visible: true
        },
        minXY: {
            default: cc.v2(-100, -100),
            displayName: 'minX minY',
            tooltip: 'X轴Y轴最小值',
            visible: function () {
                return this.limitType === LimitType.Number;
            }
        },
        maxXY: {
            default: cc.v2(100, 100),
            displayName: 'maxX maxY',
            tooltip: 'X轴Y轴最大值',
            visible: function () {
                return this.limitType === LimitType.Number;
            }
        },

        // 指定限制节点
        limitNode: {
            default: null,
            type: cc.Node,
            displayName: '被限节点',
            tooltip: '根据该节点边界进行限位，同级节点或其父节点位置相同',
            visible: function () {
                return this.limitType === LimitType.Node;
            }
        }
    },

    start () {
        // 自行决定是否打印
        if (this.limitType === LimitType.Number) {
            // cc.log('数值限位');
        } else if (this.limitType === LimitType.Node) {
            // cc.log('节点限位');
        }
    },

    update (dt) {
        if (CC_EDITOR && !this.preview) {
            return;
        }
        if (!this.isRun) {
            return;
        }
        if (this.limitType === LimitType.Node && !this.limitNode) {
            cc.error('无限位节点');
            return;
        }
        // 数值限位
        if (this.limitType === LimitType.Number) {
            if (this.node.x < this.minXY.x) {
                this.node.x = this.minXY.x;
            } else if (this.node.x > this.maxXY.x) {
                this.node.x = this.maxXY.x;
            }
            if (this.node.y < this.minXY.y) {
                this.node.y = this.minXY.y;
            } else if (this.node.y > this.maxXY.y) {
                this.node.y = this.maxXY.y;
            }
        }
        // 节点限位
        if (this.limitType === LimitType.Node) {
            // 四个边界值
            let left = this.limitNode.x - this.limitNode.width * this.limitNode.anchorX;
            let right = this.limitNode.x + this.limitNode.width * (1 - this.limitNode.anchorX);
            let top = this.limitNode.y + this.limitNode.height * (1 - this.limitNode.anchorY);
            let bottom = this.limitNode.y - this.limitNode.height * this.limitNode.anchorY;
            if (this.node.x < left) {
                this.node.x = left;
            } else if (this.node.x > right) {
                this.node.x = right;
            }
            if (this.node.y < bottom) {
                this.node.y = bottom;
            } else if (this.node.y > top) {
                this.node.y = top;
            }
        }
    }

});
