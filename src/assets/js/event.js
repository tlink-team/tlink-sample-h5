const Event = require('events')
const EVENT_TYPE = {
    UPDATE_LANGUAGE_TIP: 'UPDATE_LANGUAGE_TIP',
    PULL_REFRESH: 'PULL_REFRESH',
    PREVIEW_IMAGE: 'PREVIEW_IMAGE',
    DRAG_DOM: 'DRAG_DOM',
    NOTICE_TOAST: 'NOTICE_TOAST',
    ELEMENT_VALIDATOR: 'ELEMENT_VALIDATOR',
};
// 设置多语言事件
let eventLanguageInfo = new Event();
eventLanguageInfo.setMaxListeners(100);
// 设置下拉刷新事件
let eventpullRefreshInfo = new Event();
eventpullRefreshInfo.setMaxListeners(100);
// 设置拖拽事件
let eventDragInfo = new Event();
eventDragInfo.setMaxListeners(100);
// 设置通知toast事件
let eventNoticeInfo = new Event();
eventNoticeInfo.setMaxListeners(100);
// 设置通知toast事件
let eventValidatorInfo = new Event();
eventValidatorInfo.setMaxListeners(100);

export default {
    EVENT_TYPE,
    eventLanguageInfo,
    eventpullRefreshInfo,
    eventDragInfo,
    eventNoticeInfo,
    eventValidatorInfo,
}