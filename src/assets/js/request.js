import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/assets/js/lang";
import event from "@/assets/js/event";
import axios from "axios";
import qs from "qs";
import tip from "@/assets/js/tip";
import util from "@/assets/js/util";
import config from "@/assets/js/config";
import store from "@/vuex/store";

let loadingTitle = "";
let errorTxt1 = "";
let errorTxt2 = "";
let errorTxt3 = "";
let errorTxt4 = "";
let errorTxt5 = "";
let locale = "";
let isShowToast = false;
event.eventLanguageInfo.on(event.EVENT_TYPE.UPDATE_LANGUAGE_TIP, (lang) => {
    const i18n = new VueI18n({
        locale: lang, // 默认选择的语言
        messages,
    });
    let vueI18n = new Vue({
        i18n,
    });
    loadingTitle = vueI18n.$t("tipMessage.loadingTitle");
    errorTxt1 = vueI18n.$t("tipMessage.errorTxt1");
    errorTxt2 = vueI18n.$t("tipMessage.errorTxt2");
    errorTxt3 = vueI18n.$t("tipMessage.errorTxt3");
    errorTxt4 = vueI18n.$t("tipMessage.errorTxt4");
    errorTxt5 = vueI18n.$t("tipMessage.errorTxt5");
    locale = lang;
});
event.eventNoticeInfo.on(event.EVENT_TYPE.NOTICE_TOAST, (bool) => {
    isShowToast = bool;
});
// 创建axios实例
const service = axios.create({
    baseURL: "/",
    timeout: config.timeout,
});
let isShowLoading = true;
// http request 拦截器
service.interceptors.request.use(
    (config) => {
        if (isShowLoading) {
            tip.loading({ content: `${loadingTitle}` });
        }
        config.headers["Content-Type"] = config.headers["Content-Type"]
            ? config.headers["Content-Type"]
            : "application/x-www-form-urlencoded";
        if (
            config.headers["Content-Type"] ==
            "application/x-www-form-urlencoded"
        ) {
            // 将json对象转换成name,value格式
            config.transformRequest = [
                (data) => {
                    return qs.stringify(data);
                },
            ];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//http response 拦截器
service.interceptors.response.use(
    (response) => {
        if (isShowLoading) {
            tip.loaded();
        }
        if (response.status == 200) {
            if (response.data.code !== "0") {
                let content = "";
                if (locale == config.lang.en && response.data.lang) {
                    content = response.data.lang;
                } else if (locale == config.lang.cn && response.data.msg) {
                    content = response.data.msg;
                } else {
                    content = response.data.msg;
                }
                if (isShowToast) {
                    tip.toast({
                        content,
                        type: "alert",
                    });
                    isShowToast = false;
                } else {
                    tip.alert({
                        content,
                    });
                }
            }
            return response.data;
        }
    },
    (error) => {
        if (isShowLoading) {
            tip.loaded();
        }
        if (error.response.status == 500 || error.response.status == 502) {
            tip.alert({
                content: `${errorTxt1}`,
            });
            return Promise.reject(errorTxt1);
        } else if (error.response.status == 400) {
            tip.alert({
                content: `${errorTxt2}`,
            });
            return Promise.reject(errorTxt2);
        } else if (error.response.status == 401) {
            tip.alert({
                content: `${errorTxt3}`,
            });
            return Promise.reject(errorTxt3);
        } else if (error.response.status == 404) {
            tip.alert({
                content: `${errorTxt4}`,
            });
            return Promise.reject(errorTxt4);
        } else {
            tip.alert({
                content: `${errorTxt5}`,
            });
            return Promise.reject(errorTxt5);
        }
    }
);
/*
封装request网络请求
params：请求参数【query：接口查询参数，appjson：判断是提交json数据还是form数据--值：true，false，'form'，值如果是form的话表示是导入文件；isShowLoading：判断是否显示loading】
url：请求接口地址
*/
const request = (params = {}, urls) => {
    // 获取当前时间
    let TIMESTAMP = util.getCurrentTime();
    // 构建带有时间的url地址
    let url =
        urls.indexOf("?") != -1
            ? `${urls}&_=${TIMESTAMP}`
            : `${urls}?&_=${TIMESTAMP}`;
    // 判断是不是本地请求
    if (config.env == "local") {
        url = `${url}&username=${config.localUser.uid}&name=${config.localUser.userName}`;
    }
    // 构建查询参数
    let data = params.query || {};
    // 构建请求方式，默认POST请求
    let method = params.method || "post";
    method = method.toLowerCase();
    // 是否显示loading
    if (params.isShowLoading == true || params.isShowLoading == undefined) {
        isShowLoading = true;
    } else {
        isShowLoading = false;
    }
    // 获取accessToken
    // 先从store里面取
    let accessToken = store.state.common.accessToken;
    if (util.isEmpty(accessToken)) {
        // 再从url取
        let href = window.location.href;
        let serializeData = util.serializeUrl(href);
        console.log("serializeData:", serializeData);
        if (!util.isEmpty(serializeData.param.accessToken)) {
            accessToken =
                serializeData.param.accessToken ||
                serializeData.param.gcmt ||
                "";
            store.dispatch("setAccessToken", accessToken);
        }
    }
    // 如果请求参数中带有，优先级最高
    if (
        !util.isEmpty(params.query) &&
        !util.isEmpty(params.query.accessToken)
    ) {
        accessToken = params.query.accessToken;
        store.dispatch("setAccessToken", accessToken);
        delete params.query.accessToken;
    }
    console.log("header accessToken:", accessToken);
    // 设置请求头语言
    let headerLang = "zh";
    if (locale == config.lang.cn) {
        headerLang = "zh";
    } else if (locale == config.lang.en) {
        headerLang = "en";
    }
    // 判断是提交json格式的数据还是form格式的数据
    let json = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Biz-Language": headerLang,
            accessToken,
        },
        method,
        url,
        params: data,
    };
    if (method == "post") {
        if (params.appjson) {
            json.headers["Content-Type"] = "application/json";
            if (params.appjson == "form") {
                json.headers["Content-Type"] = "multipart/form-data";
            }
        }
        Object.assign(json, { data });
        delete json.params;
    }
    return service(json);
};
export default request;
