cc.Class({
    extends: cc.Component,

    properties: {
        // 模式启用
        isNumberShow: {
            default: true,
            //type: cc.Boolean,
            displayName: '数字显示',
            tooltip: '显示开关，你可以通过置false来取消数字显示。',
            visible: true
        },
        font: {
            default: null,
            type: cc.Font,
            displayName: '字体',
            tooltip: '如果你需要自定义的字体，放入即可，置空为系统字体。',
            visible: true
        },
        fontColor: {
            default: cc.color(255, 255, 255),
            //type: cc.Color,
            displayName: '字体颜色',
            tooltip: '自定义的字体节点颜色。',
            visible: true
        },
        isImgShow: {
            default: true,
            //type: cc.Boolean,
            displayName: '图片显示',
            tooltip: '显示开关，你可以通过置false来取消图片显示。',
            visible: true
        },
        imgBackground: {
            default: null,
            type: cc.SpriteFrame,
            displayName: '血条背景图',
            tooltip: '血条背景图。',
            visible: true
        },
        imgHp: {
            default: null,
            type: cc.SpriteFrame,
            displayName: '血条填充图',
            tooltip: '血条图。',
            visible: true
        },
        hpNow: {
            default: 100,
            type: cc.Integer,
            displayName: '当前Hp值',
            tooltip: '当前Hp值。',
            notify: function (oldValue) {
                if (CC_EDITOR) return;
                this.upShow();
            },
            visible: true
        },
        hpMax: {
            default: 100,
            type: cc.Integer,
            displayName: '最大Hp值',
            tooltip: '最大Hp值。',
            notify: function (oldValue) {
                if (CC_EDITOR) return;
                this.upShow();
            },
            visible: true
        }
    },

    onLoad () {
        let hpMaxNode = new cc.Node('hpMaxNode');
        hpMaxNode.parent = this.node;
        this.sprite1 = hpMaxNode.addComponent(cc.Sprite);
        let hpNowNode = new cc.Node('hpNowNode');
        hpNowNode.parent = this.node;
        this.sprite2 = hpNowNode.addComponent(cc.Sprite);
        this.sprite2.type = cc.Sprite.Type.FILLED;
        this.sprite2.fillType = cc.Sprite.FillType.HORIZONTAL;
        let hpLabelNode = new cc.Node('hpLabelNode');
        hpLabelNode.parent = this.node;
        this.lab = hpLabelNode.addComponent(cc.Label);
    },

    start () {
        this.upShow();
    },

    // 刷新显示，需调用
    upShow () {
        //cc.log('血条显示刷新');
        this.sprite1.spriteFrame = this.imgBackground;
        this.sprite2.spriteFrame = this.imgHp;
        let k = this.hpNow / this.hpMax;
        if (k > 1) k = 1;
        else if (k < 0) k = 0;
        this.sprite2.fillRange = k;
        this.lab.node.color = this.fontColor;
        if (this.font) this.lab.font = this.font;
        this.lab.string = this.hpNow + '/' + this.hpMax;
    }
});
