import Vue from "vue";
import App from "@/App.vue";
import VueI18n from "vue-i18n";
import router from "@/router";
import filter from "@/filter";
import store from "@/vuex/store";
import "@/assets/less/index.less";
import request from "@/assets/js/request";
import config from "@/assets/js/config";
import api from "@/assets/js/api";
import util from "@/assets/js/util";
import tip from "@/assets/js/tip";
import event from "@/assets/js/event";
import cordovaExec from "@/assets/js/cordova";
import messages from "@/assets/js/lang";

// 引入公用组件
import pullRefresh from "@/components/pullRefresh/index";
// 全局注册公用组件
Vue.component("pullRefresh", pullRefresh);
Vue.config.productionTip = false;
// 使用国际化语言
Vue.use(VueI18n);
// 设置默认语言
let language = config.lang.cn;
// 原型全局挂载
Vue.prototype.router = router;
Vue.prototype.request = request;
Vue.prototype.config = config;
Vue.prototype.api = api;
Vue.prototype.util = util;
Vue.prototype.tip = tip;
Vue.prototype.cordovaExec = cordovaExec;
Vue.prototype.event = event;

// 自动注册过滤器
for (const key in filter) {
    Vue.filter(key, filter[key]);
}
// 控制路由跳转
router.beforeEach((to, from, next) => {
    // 如果路由不存在就跳转到404页面
    if (
        to.name == null ||
        to.name == "" ||
        to.name == undefined ||
        to.name == "undefined"
    ) {
        next("/404/index");
        return;
    }

    // 获取token
    let getTokenFn = () => {
        if (util.isTLinkMobile()) {
            cordovaExec
                .getUser()
                .then((res) => {
                    let userInfo = {
                        userName:
                            res.cn || res.uname || config.localUser.userName,
                        uid: res.uid || "",
                        headUrl: res.headUrl || "",
                        ssoToken: res.ssoToken || "",
                    };
                    let tokenInfo = {
                        accessToken: res.token,
                        userInfo,
                    };
                    console.log("mobile tokenInfo:", tokenInfo);
                    store.dispatch("getAccessToken", tokenInfo);
                    next();
                })
                .catch((err) => {
                    next();
                    reject(err);
                    console.log("cordovaExec err:", err);
                });
        } else if (util.isTLinkPC()) {
            callPc
                .callTlinkpc("getUserInfo_cb")
                .then((res) => {
                    console.log("getUserInfo_cb:", res);
                    let userInfo = {
                        userName: res.user.name,
                        uid: res.user.username || "",
                        headUrl: res.user.headUrl || "",
                        ssoToken: res.epToken || "",
                    };
                    let tokenInfo = {
                        accessToken: res.token,
                        userInfo,
                    };
                    console.log("pc tokenInfo:", tokenInfo);
                    store.dispatch("getAccessToken", tokenInfo);
                    next();
                })
                .catch((err) => {
                    next();
                    reject(err);
                    console.log("callPc err:", err);
                });
        } else {
            if (config.isLocal) {
                let userInfo = {
                    userName: config.localUser.userName,
                    uid: config.localUser.uid,
                };
                let tokenInfo = {
                    accessToken: config.localUser.accessToken,
                    userInfo,
                };
                console.log("local tokenInfo:", tokenInfo);
                store.dispatch("getAccessToken", tokenInfo);
            }
            next();
            console.log("NO Tchat");
        }
    };
    setTimeout(() => {
        getTokenFn();
    }, 200);
});
router.afterEach((to, from, next) => {});
let mountApp = () => {
    const i18n = new VueI18n({
        locale: language, // 默认选择的语言
        messages,
    });
    Vue.prototype.i18n = i18n;
    new Vue({
        i18n,
        router,
        store,
        render: (h) => h(App),
    }).$mount("#app");
};
try {
    // 获取多语言
    if (util.isTLinkMobile()) {
        cordovaExec
            .language()
            .then((res) => {
                console.log("language success", res, location.href);
                let lan = res.language;
                if (lan == "en") {
                    language = config.lang.en;
                } else if (lan == "zh" || lan == "cn") {
                    language = config.lang.cn;
                } else {
                    language = config.lang.en;
                }
                console.log("mobile language:", language);
                util.setStorage("local", "locale", language);
                store.dispatch("setLanguage", language);
                event.eventLanguageInfo.emit(
                    event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,
                    language
                );
                // 挂在实例
                mountApp();
            })
            .catch((err) => {
                // 挂在实例
                mountApp();
                console.log("language err:", err);
            });
    } else if (util.isTLinkPC()) {
        // PC端通过userAgent获取
        let userAgent = navigator.userAgent;
        if (userAgent.includes("systemLang/")) {
            language = userAgent.split("systemLang/")[1].replace("_", "-");
        }
        console.log("pc language:", language);
        util.setStorage("local", "locale", language);
        store.dispatch("setLanguage", language);
        event.eventLanguageInfo.emit(
            event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,
            language
        );
        // 挂在实例
        mountApp();
    } else {
        language = config.lang.cn;
        console.log("local language:", language);
        util.setStorage("local", "locale", language);
        store.dispatch("setLanguage", language);
        event.eventLanguageInfo.emit(
            event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,
            language
        );
        // 挂在实例
        mountApp();
    }
} catch (err) {
    // 挂在实例
    mountApp();
    console.log("获取错误err:", err);
}
// 判断当前域名是测试还是生产
if (config.env == "test") {
    const vconsole = require("vconsole");
    const nconsole = new vconsole();
}
