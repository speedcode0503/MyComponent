cc.Class({
    extends: cc.Component,

    properties: {
        k_start: {
            default: [],
            type: cc.Component.EventHandler,
            displayName: 'touchstart',
            tooltip: '触发touchstart后分发事件'
        },
        k_move: {
            default: [],
            type: cc.Component.EventHandler,
            displayName: 'touchmove',
            tooltip: '触发touchmove后分发事件'
        },
        k_end: {
            default: [],
            type: cc.Component.EventHandler,
            displayName: 'touchend',
            tooltip: '触发touchend后分发事件'
        },
        k_cancel: {
            default: [],
            type: cc.Component.EventHandler,
            displayName: 'touchcancel',
            tooltip: '触发touchcancel后分发事件'
        }
    },

    onLoad () {
        this.node.on('touchstart', (event) => {
            cc.Component.EventHandler.emitEvents(this.k_start, event);
            event.stopPropagation();
        },this);
        this.node.on('touchmove', (event) => {
            cc.Component.EventHandler.emitEvents(this.k_move, event);
            event.stopPropagation();
        },this);
        this.node.on('touchend', (event) => {
            cc.Component.EventHandler.emitEvents(this.k_end, event);
            event.stopPropagation();
        },this);
        this.node.on('touchcancel', (event) => {
            cc.Component.EventHandler.emitEvents(this.k_cancel, event);
            event.stopPropagation();
        },this);
    }
});
