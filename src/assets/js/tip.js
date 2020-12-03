import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/assets/js/lang';
import event from '@/assets/js/event';
// 使用国际化语言
Vue.use(VueI18n);
let alertTitle = '';
let alertContent = '';
let confirmTxt = '';
let cancelTxt = '';
let confirmContent = '';
let toastTitle = '';
let loadingTitle = '';
event.eventLanguageInfo.on(event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,(locale) => {
	const i18n = new VueI18n({
		locale, // 默认选择的语言
		messages,
	})
	let vueI18n = new Vue({
		i18n,
	})
	alertTitle = vueI18n.$t('tipMessage.alertTitle');
	alertContent = vueI18n.$t('tipMessage.alertContent');
	confirmTxt = vueI18n.$t('tipMessage.confirmTxt');
	cancelTxt = vueI18n.$t('tipMessage.cancelTxt');
	confirmContent = vueI18n.$t('tipMessage.confirmContent');
	toastTitle = vueI18n.$t('tipMessage.toastTitle');
	loadingTitle = vueI18n.$t('tipMessage.loadingTitle');
});


/**
 * 提示与加载工具类
 */
export default class Tips {
	constructor() {
        this.isLoading = false;
        this.loadingCustom = null;
	}
	/**
	 * 警告框
	 */
	static alert({
		title = `${alertTitle}`,
        content = `${alertContent}`,
        className = `custom-alert`,
		confirmText = `${confirmTxt}`,
		success = function() {},
	}) {
		tui.alert(content, {
            title,
            className,
            buttons: [{
                label: confirmText,
                type: 'primary',
                onClick: () => { success(); }
            }]
        });
	}
	/**
	 * 弹出确认窗口
	 */
	static confirm({
		title = `${alertTitle}`,
        content = `${confirmContent}`,
        className = `custom-confirm`,
		confirmText = `${confirmTxt}`,
		cancelText = `${cancelTxt}`,
		confirm = function() {},
		cancel = function() {},
	}) {
		tui.confirm(content, {
            title,
            className,
            buttons: [{
                label: cancelText,
                type: 'default',
                onClick: () => { cancel(); }
            }, {
                label: confirmText,
                type: 'primary',
                onClick: () => { confirm(); }
            }]
        });
	}

	static toast({
		content = `${toastTitle}`,
        duration = 1500,
        type = `success`,
		callback = function() {},
	}) {
		let className = 'custom-toast';
		if(type === 'success') {
			className = 'custom-toast';
		}else if(type === 'fail') {
			className = 'custom-toast-fail';
		}else if(type === 'alert') {
			className = 'custom-toast-alert';
		}
		tui.toast(content, {
            duration,
            className,
            callback: () => { callback(); }
        });
	}
	/**
	 * 弹出加载提示
	 */
	static loading({
        content = `${loadingTitle}`,
        className = `custom-loading`,
	}) {
		if (Tips.isLoading) {
			return;
		}
		Tips.isLoading = true;
		this.loadingCustom = tui.loading(content, {
            className,
        });
	}
	/**
	 * 加载完毕
	 */
	static loaded() {
		if (Tips.isLoading) {
			Tips.isLoading = false;
			this.loadingCustom.hide();
		}
	}

}
/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
