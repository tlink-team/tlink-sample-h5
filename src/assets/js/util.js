import Vue from "vue";
import VueI18n from "vue-i18n";
import md5 from "js-md5";
import messages from "@/assets/js/lang";
import event from "@/assets/js/event";
import moment from "moment";
import config from "@/assets/js/config";
import api from "@/assets/js/api";
import tip from "@/assets/js/tip";
import store from "@/vuex/store";
import router from "@/router";

// util 公共对象函数
class Util {
    //初始化对象
    constructor() {
        // 超时
        this.timer = null;
        event.eventLanguageInfo.on(
            event.EVENT_TYPE.UPDATE_LANGUAGE_TIP,
            (lang) => {
                const i18n = new VueI18n({
                    locale: lang, // 默认选择的语言
                    messages,
                });
                this.vueI18n = new Vue({
                    i18n,
                    router,
                });
                this.formatTimeTips1 = this.vueI18n.$t(
                    "common.formatTimeTips1"
                );
                this.formatTimeTips2 = this.vueI18n.$t(
                    "common.formatTimeTips2"
                );
                this.formatTimeTips3 = this.vueI18n.$t(
                    "common.formatTimeTips3"
                );
                this.formatTimeTips4 = this.vueI18n.$t(
                    "common.formatTimeTips4"
                );
                this.locale = lang;
            }
        );
    }
    /*获取 storage 缓存数据
     * type  类型   local：localStorage   session：sessionStorage
     * name  缓存数据name名
     */
    getStorage(type = "local", name) {
        let result = "";
        if (type == "local") {
            result = localStorage.getItem(name)
                ? localStorage.getItem(name)
                : "";
        } else if (type == "session") {
            result = sessionStorage.getItem(name)
                ? sessionStorage.getItem(name)
                : "";
        }
        return result;
    }
    /*设置 storage 缓存数据
     *type  类型   local：localStorage   session：sessionStorage
     *name  缓存数据name名
     *content  缓存的数据内容
     */
    setStorage(type = "local", name, content) {
        if (typeof content == "object") {
            content = JSON.stringify(content);
        }
        if (type == "local") {
            localStorage.setItem(name, content);
        } else if (type == "session") {
            sessionStorage.setItem(name, content);
        }
    }
    /*设置 移除当前某个缓存
     *type  类型   local：localStorage   session：sessionStorage
     *name  缓存数据name名
     */
    removeStorage(type = "local", name) {
        if (type == "local") {
            localStorage.removeItem(name);
        } else if (type == "session") {
            sessionStorage.removeItem(name);
        }
    }
    /*设置 移除所有缓存
     *type  类型   local：localStorage   session：sessionStorage
     */
    clearStorage(type = "local") {
        if (type == "local") {
            localStorage.clear();
        } else if (type == "session") {
            sessionStorage.clear();
        }
    }
    // 判断是否为空
    isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    }
    // 获取设备信息，判断是不是iphoneX
    isIphoneX() {
        // 这个条件成立即为iphoneX
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        if (
            this.isIosOrAndroid() == "ios" &&
            (screenWidth == 375 || screenWidth == 414) &&
            (screenHeight == 812 || screenHeight == 896)
        ) {
            return true;
        } else {
            return false;
        }
    }
    // 获取设备信息，判断是安卓还是苹果
    isIosOrAndroid() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let device = "";
        if (isAndroid) {
            //这个是安卓操作系统
            device = "android";
        } else if (isIOS) {
            //这个是ios操作系统
            device = "ios";
        } else {
            device = "other";
        }
        return device;
    }
    // 获取当前时间
    getCurrentTime(str = "", isFull = true, isSpecial) {
        let keep = "";
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let f =
            date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes();
        let s =
            date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();
        let rand = Math.round(Math.random() * 899 + 100);
        if (isFull) {
            if (!this.isEmpty(str)) {
                keep = y + str + m + str + d + " " + h + ":" + f + ":" + s;
                if (isSpecial == "text") {
                    keep = y + "年" + m + "月" + d + "日";
                } else if (isSpecial == "time") {
                    keep = h + ":" + f + ":" + s;
                }
            } else {
                keep = y + "" + m + "" + d + "" + h + "" + f + "" + s;
            }
        } else {
            if (!this.isEmpty(str)) {
                keep = y + str + m + str + d;
            } else {
                keep = y + "" + m + "" + d;
            }
        }
        return keep; //20160614134947
    }
    // 格式化时间戳
    date(value, ty = "-", type = "s", lan) {
        if (!value) return;
        if (type == "s") {
            return moment(value).format(
                "YYYY" + ty + "MM" + ty + "DD HH:mm:ss"
            );
        } else if (type == "m") {
            return moment(value).format("YYYY" + ty + "MM" + ty + "DD HH:mm");
        } else if (type == "h") {
            return moment(value).format("YYYY" + ty + "MM" + ty + "DD  HH");
        } else if (type == "d") {
            return moment(value).format("YYYY" + ty + "MM" + ty + "DD");
        } else if (type == "md") {
            return moment(value).format("MM" + ty + "DD");
        } else if (type == "ym") {
            return moment(value).format("YYYY" + ty + "MM");
        } else if (type == "hms") {
            return moment(value).format("HH:mm:ss");
        } else if (type == "hm") {
            return moment(value).format("HH:mm");
        } else if (type == "M") {
            return moment(value).format("YYYY" + ty + "MM");
        } else if (type == "Y") {
            return moment(value).format("YYYY");
        } else if (type == "MDhmT") {
            if (lan == config.lang.cn) {
                return moment(value).format(
                    "MM" + "月" + "DD" + "日" + " HH:mm"
                );
            } else if (lan == config.lang.en) {
                let momentMD = moment(value).format(
                    "MM" + "-" + "DD" + "-" + "HH:mm"
                );
                let momentArr = [];
                let momentStr = "";
                if (!this.isEmpty(momentMD) && momentMD.includes("-")) {
                    momentArr = momentMD.split("-");
                    momentStr = `${momentArr[1]} ${this.getEnMonth(
                        momentArr[0]
                    )} ${momentArr[2]}`;
                }
                return momentStr;
            }
        } else if (type == "YMDhmT") {
            if (lan == config.lang.cn) {
                return moment(value).format(
                    "YYYY" + "年" + "MM" + "月" + "DD" + "日" + " HH:mm"
                );
            } else if (lan == config.lang.en) {
                let momentMD = moment(value).format(
                    "YYYY" + "-" + "MM" + "-" + "DD" + "-" + "HH:mm"
                );
                let momentArr = [];
                let momentStr = "";
                if (!this.isEmpty(momentMD) && momentMD.includes("-")) {
                    momentArr = momentMD.split("-");
                    momentStr = `${momentArr[2]} ${this.getEnMonth(
                        momentArr[1]
                    )},${momentArr[0]} ${momentArr[3]}`;
                }
                return momentStr;
            }
        }
    }
    // 获取详细格式化时间
    getDetailFormatTime(timestamp, lan, isMul) {
        let str = "";
        if (!this.isEmpty(timestamp)) {
            if (typeof timestamp == "string") {
                timestamp = Number(timestamp);
            }
            let nowDateTimestamp = new Date().getTime();
            let timeFromNow = nowDateTimestamp - timestamp;
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1;
            let currentDate = new Date().getDate();
            let fromYear = new Date(timestamp).getFullYear();
            let fromMonth = new Date(timestamp).getMonth() + 1;
            let fromDate = new Date(timestamp).getDate();
            if (!isMul) {
                if (timeFromNow < 60 * 1000) {
                    // 当前60秒内
                    str = this.formatTimeTips1;
                } else if (timeFromNow < 60 * 60 * 1000) {
                    // 当前1小时内
                    str = `${Math.floor(timeFromNow / (60 * 1000))} ${
                        this.formatTimeTips2
                    }`;
                } else if (timeFromNow < 60 * 60 * 24 * 1000) {
                    // 当前今天内
                    str = `${Math.floor(timeFromNow / (60 * 60 * 1000))} ${
                        this.formatTimeTips3
                    }`;
                } else if (
                    currentYear == fromYear &&
                    currentMonth == fromMonth &&
                    currentDate == fromDate + 1
                ) {
                    // 当前昨天内
                    str = `${this.formatTimeTips4} ${this.date(
                        timestamp,
                        "-",
                        "hm"
                    )}`;
                } else {
                    // 获取当前年份
                    let currentYear = new Date().getFullYear();
                    // 获取传入时间戳年份
                    let tampCurrentYear = new Date(timestamp).getFullYear();
                    // 判断是不是当前年份
                    if (currentYear == tampCurrentYear) {
                        str = this.date(timestamp, "-", "MDhmT", lan);
                    } else {
                        str = this.date(timestamp, "-", "YMDhmT", lan);
                    }
                }
            } else {
                // 获取当前年份
                let currentYear = new Date().getFullYear();
                // 获取传入时间戳年份
                let tampCurrentYear = new Date(timestamp).getFullYear();
                // 判断是不是当前年份
                if (currentYear == tampCurrentYear) {
                    str = this.date(timestamp, "-", "MDhmT", lan);
                } else {
                    str = this.date(timestamp, "-", "YMDhmT", lan);
                }
            }
        }
        return str;
    }
    // 获取英文月份
    getEnMonth(value) {
        let str = "";
        if (typeof value === "string") {
            value = Number(value);
        }
        switch (value) {
            case 1:
                str = "Jan";
                break;
            case 2:
                str = "Feb";
                break;
            case 3:
                str = "Mar";
                break;
            case 4:
                str = "Apr";
                break;
            case 5:
                str = "May";
                break;
            case 6:
                str = "Jun";
                break;
            case 7:
                str = "Jul";
                break;
            case 8:
                str = "Aug";
                break;
            case 9:
                str = "Sept";
                break;
            case 10:
                str = "Oct";
                break;
            case 11:
                str = "Nov";
                break;
            case 12:
                str = "Dec";
                break;
        }
        return str;
    }
    // 判断是不是移动端
    IsPC() {
        const userAgentInfo = navigator.userAgent;
        const agents = [
            "Android",
            "iPhone",
            "SymbianOS",
            "Windows Phone",
            "iPad",
            "iPod",
        ];
        let flag = true;
        for (let v = 0; v < agents.length; v++) {
            if (userAgentInfo.indexOf(agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    // 序列化url
    serializeUrl(str) {
        let param = {},
            hash = {},
            anchor;
        let url = str || location.href;
        let arr = /([^?]*)([^#]*)(.*)/.exec(url);
        let ar1 = /(.*:)?(?:\/?\/?)([\.\w]*)(:\d*)?(.*?)([^\/]*)$/.exec(arr[1]);
        let ar2 = arr[2].match(/[^?&=]*=[^?&=]*/g);
        let ar3 = arr[3].match(/[^#&=]*=[^#&=]*/g);

        if (ar2) {
            for (let i = 0, l = ar2.length; i < l; i++) {
                let ar22 = /([^=]*)(?:=*)(.*)/.exec(ar2[i]);
                param[ar22[1]] = ar22[2];
            }
        }

        if (ar3) {
            for (let i = 0, l = ar3.length; i < l; i++) {
                let ar33 = /([^=]*)(?:=*)(.*)/.exec(ar3[i]);
                hash[ar33[1]] = ar33[2];
            }
        }

        if (arr[3] && !/[=&]/g.test(arr[3])) {
            anchor = arr[3];
        }

        function getUrl() {
            let that = this,
                url = [],
                param = [],
                hash = [];

            url.push(
                that.protocol,
                (that.protocol && "//") || "",
                that.host,
                that.port,
                that.path,
                that.file
            );

            for (let p in that.param) {
                param.push(p + "=" + that.param[p]);
            }

            for (let p in that.hash) {
                hash.push(p + "=" + that.hash[p]);
            }

            url.push((param.length && "?" + param.join("&")) || "");

            if (that.anchor) {
                url.push(that.anchor);
            } else {
                url.push((hash.length && "#" + hash.join("&")) || "");
            }

            return url.join("");
        }

        return {
            href: arr[0],
            protocol: ar1[1],
            host: ar1[2],
            port: ar1[3] || "",
            path: ar1[4],
            file: ar1[5],
            param: param,
            hash: hash,
            anchor: anchor,
            getUrl: getUrl,
        };
    }
    // 获取滚动条的高度
    getScrollTop() {
        let scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
            bodyScrollTop - documentScrollTop > 0
                ? bodyScrollTop
                : documentScrollTop;
        return scrollTop;
    }
    // 设置滚动条的高度
    setScrollTop(top) {
        let scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        if (bodyScrollTop - documentScrollTop > 0) {
            document.body.scrollTop = top;
        } else {
            document.documentElement.scrollTop = top;
        }
    }
    // 获取滚动的高度
    getScrollHeight() {
        let scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight =
            bodyScrollHeight - documentScrollHeight > 0
                ? bodyScrollHeight
                : documentScrollHeight;
        return scrollHeight;
    }
    // 设置滚动的高度
    setScrollHeight(height) {
        let scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        if (bodyScrollHeight - documentScrollHeight > 0) {
            document.body.scrollHeight = height;
        } else {
            document.documentElement.scrollHeight = height;
        }
    }
    // 获取窗口的高度
    getWindowHeight() {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
    // 判断是不是T信客户端
    isTLinkClient() {
        const userAgent = navigator.userAgent;
        let flag = false;
        if (userAgent.includes(config.appName)) {
            flag = true;
        }
        return flag;
    }
    // 判断是不是T信移动客户端
    isTLinkMobile() {
        let flag = false;
        if (!this.IsPC() && this.isTLinkClient()) {
            flag = true;
        }
        return flag;
    }
    // 判断是不是T信PC端
    isTLinkPC() {
        let flag = false;
        if (this.IsPC() && this.isTLinkClient()) {
            flag = true;
        }
        return flag;
    }
    // 判断微信内核浏览器
    isWeChatClient() {
        const userAgent = navigator.userAgent;
        let flag = false;
        if (userAgent.includes("MicroMessenger")) {
            flag = true;
        }
        return flag;
    }
    // 是否显示自定义导航
    isShowNav() {
        let flag = false;
        // if (
        //     this.isTLinkMobile() ||
        //     (config.isLocal && !this.isWeChatClient())
        // ) {
        //     flag = true;
        // }
        if (config.isLocal) {
            flag = true;
        }
        return flag;
    }
    // 复制链接
    copyLink(url) {
        return new Promise((resolve, reject) => {
            try {
                let oInput = document.createElement("input");
                oInput.value = url;
                document.body.appendChild(oInput);
                oInput.select();
                document.execCommand("Copy");
                oInput.style.display = "none";
                document.body.removeChild(oInput);
                resolve(url);
            } catch (err) {
                reject(err);
            }
        });
    }

    // 传入一个对象，返回该对象的值不为空的所有参数，并返回一个对象
    objDislodge(obj) {
        let objData = JSON.parse(JSON.stringify(obj));
        for (let i in objData) {
            if (
                objData[i] === null ||
                objData[i] === "" ||
                objData[i] === NaN ||
                objData[i] === undefined
            ) {
                delete objData[i];
            }
        }
        return objData;
    }

    // element组件表单校验
    elementValidator(tip1, tip2, data = {}) {
        /*
			Element表单正则校验
			tip1: 为空的提示语
			tip2: 合法性的提示语
			json:{min:2,max:30}
        */
        // 初始化默认值
        data.min = data.min ? data.min : 2;
        data.max = data.max ? data.max : 30;
        data.var1 = data.var1 ? data.var1 : "";
        data.var2 = data.var2 ? data.var2 : "";
        data.var3 = data.var3 ? data.var3 : "";
        // 设置校验对象
        let json = {
            // 用户名验证
            user: (rule, value, callback) => {
                // 校验用户名，只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
                const user = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!user.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 密码验证
            pwd: (rule, value, callback) => {
                // 校验密码，只能输入6-20位字母数字组合
                const pwd = /^[A-Za-z0-9]{6,20}$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!pwd.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 重复密码验证
            pwdAgain: (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (data.var1 !== data.var2) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 邮箱验证
            email: (rule, value, callback) => {
                const email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!email.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 手机号验证
            tel: (rule, value, callback) => {
                const tel = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!tel.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 1～100之间的正整数包括1和100
            hunNum: (rule, value, callback) => {
                const hunNum = /(^[1-9][0-9]$)|(^100$)|(^[1-9]$)$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!hunNum.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 校验税率数字0-99
            rating: (rule, value, callback) => {
                const hunNum = /(^[1-9][0-9]$)|(^[0-9]$)$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!hunNum.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 标题长度限制
            titleLenLimit: (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (
                    value.toString().length < data.min ||
                    value.toString().length > data.max
                ) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 非负整数
            n: (rule, value, callback) => {
                const n = /^[0-9]*$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!n.test(value)) {
                    callback(new Error(`${tip2}`));
                } else {
                    callback();
                }
            },
            // 保留2位小数点的正数
            numLimitTo2: (rule, value, callback) => {
                const numLimitTo2 = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
                if (!value) {
                    return callback(new Error(`${tip1}`));
                }
                if (!numLimitTo2.test(value)) {
                    callback(new Error(`${tip2}必须是最多两位小数的非负数`));
                } else {
                    if (Number(value) > data.max) {
                        callback(new Error(`${tip2}最大只能是${data.max}`));
                    } else {
                        callback();
                    }
                }
            },
            // 开始时间不能早于当前时间
            checkBegin: (rule, value, callback) => {
                console.log("checkBegin:", value, data);
                if (data.var2) {
                    if (!value) {
                        return callback(new Error(`${tip1}`));
                    }
                    const now = new Date().getTime();
                    const set = new Date(value).getTime();
                    const end = data.var1 ? new Date(data.var1).getTime() : "";
                    if (tip2.includes(",")) {
                        if (this.isEmpty(end)) {
                            if (set < now) {
                                callback(new Error(`${tip2.split(",")[0]}`));
                            } else {
                                callback(new Error(` `));
                            }
                        } else {
                            if (set < now) {
                                callback(new Error(`${tip2.split(",")[0]}`));
                            } else if (set > end) {
                                if (!data.var3) {
                                    callback(
                                        new Error(`${tip2.split(",")[1]}`)
                                    );
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        }
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            // 结束时间不能早于当前时间，也不能晚于开始时间
            checkEnd: (rule, value, callback) => {
                console.log("checkEnd:", value, data);
                if (data.var2) {
                    if (!value) {
                        return callback(new Error(`${tip1}`));
                    }
                    const now = new Date().getTime();
                    const set = new Date(value).getTime();
                    const begin = data.var1
                        ? new Date(data.var1).getTime()
                        : "";
                    if (tip2.includes(",")) {
                        if (this.isEmpty(begin)) {
                            if (set < now) {
                                callback(new Error(`${tip2.split(",")[0]}`));
                            } else {
                                callback();
                            }
                        } else {
                            if (set < begin) {
                                if (data.var3 === 1) {
                                    callback();
                                } else {
                                    callback(
                                        new Error(`${tip2.split(",")[1]}`)
                                    );
                                }
                            } else {
                                callback();
                            }
                        }
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
        };
        return json;
    }

    // 限制输入框字数 type: title:中文30，英文200  desc:中文200，英文2000
    limitNum(type) {
        let num = 0;
        if (type == "title") {
            if (this.locale == config.lang.cn) {
                num = 30;
            } else if (this.locale == config.lang.en) {
                num = 200;
            }
        } else if (type == "desc") {
            if (this.locale == config.lang.cn) {
                num = 200;
            } else if (this.locale == config.lang.en) {
                num = 2000;
            }
        } else if (type == "fill") {
            if (this.locale == config.lang.cn) {
                num = 2000;
            } else if (this.locale == config.lang.en) {
                num = 10000;
            }
        }
        return num;
    }

    // 数组元素交换位置
    swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }

    // 上移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
    zIndexUp(arr, index, length) {
        if (index != 0) {
            this.swapArray(arr, index, index - 1);
        } else {
            this.zIndexBottom(arr, index, length);
        }
    }

    // 下移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
    zIndexDown(arr, index, length) {
        if (index + 1 != length) {
            this.swapArray(arr, index, index + 1);
        } else {
            this.zIndexTop(arr, index, length);
        }
    }

    // 置顶，即将当前元素移到数组的第一位
    zIndexTop(arr, index, length) {
        if (index != 0) {
            //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
            let moveNum = index - 0;
            //循环出需要一个一个上移的次数
            for (let i = 0; i < moveNum; i++) {
                this.swapArray(arr, index, index - 1);
                index--;
            }
        }
    }

    // 置底，即将当前元素移到数组的最后一位
    zIndexBottom(arr, index, length) {
        if (index + 1 != length) {
            //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
            let moveNum = length - 1 - index;
            //循环出需要一个一个上移的次数
            for (let i = 0; i < moveNum; i++) {
                this.swapArray(arr, index, index + 1);
                index++;
            }
        }
    }

    // 把指定的元素移动到指定的位置
    arrayMove(arr, dragingIndex, targetIndex) {
        if (targetIndex >= arr.length) {
            let k = targetIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(targetIndex, 0, arr.splice(dragingIndex, 1)[0]);
        return arr;
    }

    // 拖拽
    dragNode(dom, formData) {
        return new Promise((resolve, reject) => {
            try {
                let draging = null;
                dom.ondragstart = (e) => {
                    e.dataTransfer.setData("text", e.target.innerText);
                    draging = e.target;
                };
                dom.ondragover = (e) => {
                    e.preventDefault();
                    let target = e.target;
                    if (target.className === "item") {
                        if (target !== draging) {
                            let targetRect = target.getBoundingClientRect();
                            let dragingRect = draging.getBoundingClientRect();
                            if (target) {
                                if (target.animated) {
                                    return;
                                }
                            }
                            // 执行拖拽
                            let dragingIndex = this.getEleIndex(draging);
                            let targetIndex = this.getEleIndex(target);
                            console.log("formData:", dragingIndex, targetIndex);
                            let data = this.arrayMove(
                                formData,
                                dragingIndex,
                                targetIndex
                            );
                            data = data.map((items, indexs) => {
                                items.index = indexs;
                                return items;
                            });
                            console.log("arr:", data);
                            // 执行拖拽动画
                            this.setAnimate(dragingRect, draging);
                            this.setAnimate(targetRect, target);
                            // 清除拖拽
                            event.eventDragInfo.emit(
                                event.EVENT_TYPE.DRAG_DOM,
                                null
                            );
                            resolve(data);
                        }
                    }
                };
            } catch (err) {
                reject(err);
            }
        });
    }

    // 获取元素的索引
    getEleIndex(ele) {
        let index = 0;
        if (!ele || !ele.parentNode) {
            return -1;
        }
        while (ele && (ele = ele.previousElementSibling)) {
            index++;
        }
        return index;
    }

    // 设置元素的样式
    setCss(el, prop, val) {
        let style = el && el.style;
        if (style) {
            if (val === void 0) {
                if (
                    document.defaultView &&
                    document.defaultView.getComputedStyle
                ) {
                    val = document.defaultView.getComputedStyle(el, "");
                } else if (el.currentStyle) {
                    val = el.currentStyle;
                }
                return prop === void 0 ? val : val[prop];
            } else {
                if (!(prop in style)) {
                    prop = "-webkit-" + prop;
                }
                style[prop] = val + (typeof val === "string" ? "" : "px");
            }
        }
    }

    // 设置元素的动画
    setAnimate(prevRect, target) {
        let ms = 300;
        if (ms) {
            let currentRect = target.getBoundingClientRect();
            if (prevRect.nodeType === 1) {
                prevRect = prevRect.getBoundingClientRect();
            }
            this.setCss(target, "transition", "none");
            this.setCss(
                target,
                "transform",
                "translate3d(" +
                    (prevRect.left - currentRect.left) +
                    "px," +
                    (prevRect.top - currentRect.top) +
                    "px,0)"
            );
            target.offsetWidth; // 触发重绘
            this.setCss(target, "transition", "all " + ms + "ms");
            this.setCss(target, "transform", "translate3d(0,0,0)");
            clearTimeout(target.animated);
            target.animated = setTimeout(() => {
                this.setCss(target, "transition", "");
                this.setCss(target, "transform", "");
                target.animated = false;
            }, ms);
        }
    }

    /*判断是否为图片*/
    isImageFile(file) {
        let reg = /\.jpg|\.jpeg|\.png|\.webp|\.gif|\.tiff|\.bmp|\.svg$/i;
        if (file.match(reg)) {
            return true;
        } else {
            return false;
        }
    }

    /*判断是否为音视频*/
    isAudioVideoFile(file) {
        let reg = /\.wmv|\.avi|\.dat|\.asf|\.mpeg|\.mpg|\.rm|\.rmvb|\.ram|\.flv|\.mp4|\.3gp|\.mov|\.divx|\.dv|\.vob|\.mkv|\.qt|\.cpk|\.fli|\.flc|\.f4v|\.m4v|\.mod|\.m2t|\.swf|\.webm|\.mts|\.m2ts|\.3g2|\.mpe|\.ts|\.div|\.lavf|\.dirac|\.div|\.cda|\.wav|\.mp3|\.wma|\.ra|\.midi|\.ogg|\.ape|\.flac|\.aac|\.amr|\.vqf$/i;
        if (file.match(reg)) {
            return true;
        } else {
            return false;
        }
    }

    // 获取七牛token
    getQiniuToken(blobFile) {
        console.log("getQiniuToken");
        return new Promise((resolve, reject) => {
            console.log("getImageData");
            this.getImageData(blobFile).then((imgRes) => {
                // 获取的是带后缀的文件名
                let blobFileName = blobFile.name;
                let width = imgRes.width;
                let height = imgRes.height;
                let fileArr = blobFileName.includes(".")
                    ? blobFileName.split(".")
                    : [blobFileName, ""];
                let len = fileArr.length;
                // 获取文件名
                let fileName = fileArr[len - 2];
                // 获取文件类型
                let type = "." + fileArr[len - 1];
                // 获取文件的md5
                let fileMD5Name = md5(fileName);
                if (blobFile.type.includes("image/")) {
                    fileName =
                        fileMD5Name + type + "_" + width + "x" + height + type;
                } else {
                    fileName = fileMD5Name + type;
                }
                console.log("fileName:", fileName);
                api.getQiniuToken({
                    isShowLoading: false,
                    method: "GET",
                    query: {
                        fileName,
                    },
                })
                    .then((res) => {
                        if (res && res.code && res.code != "0") {
                            return;
                        }
                        let token = res.data;
                        console.log("api.getQiniuToken success");
                        resolve({
                            token,
                            fileName,
                        });
                    })
                    .catch((err) => {
                        console.log("api.getQiniuToken error:", err);
                        tip.loaded();
                        store.dispatch("setFileTimeout", false);
                    });
            });
        });
    }

    // 七牛上传
    qiniuUpload(blobFile, next, error, complete) {
        const qiniu = require("qiniu-js");
        return this.getQiniuToken(blobFile).then((res) => {
            let token = res.token;
            let fileName = res.fileName;
            console.log("token:", res);
            try {
                let putExtra = {
                    fname: blobFile.name, //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null, //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                };
                let qiniuConfig = {
                    useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: qiniu.region.z2, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
                };
                let observable = qiniu.upload(
                    blobFile,
                    fileName,
                    token,
                    putExtra,
                    qiniuConfig
                );
                let subscription = observable.subscribe(next, error, complete);
                // 存储在store中
                store.dispatch("setSubscription", subscription);
                // 超时取消
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    console.log("fileTimeout util:", store.state.fileTimeout);
                    if (store.state.fileTimeout) {
                        subscription.unsubscribe();
                        tip.loaded();
                        tip.toast({
                            content: `${this.vueI18n.$t(
                                "tipMessage.uploadImgTip4"
                            )}`,
                        });
                        console.log("上传超时,超时时间:", config.timeout);
                    }
                }, config.timeout);
                return subscription;
            } catch (err) {
                tip.loaded();
                store.dispatch("setFileTimeout", false);
                console.log("上传七牛失败:", err);
                return err;
            }
        });
    }

    // 获取图片信息
    getImageData(file) {
        return new Promise((resolve, reject) => {
            if (file && file.type.includes("image/")) {
                if (file.type.includes("image/heic")) {
                    tip.alert({
                        content: this.vueI18n.$t("tipMessage.uploadImgTip2"),
                    });
                    tip.loaded();
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(theFile) {
                    let image = new Image();
                    image.src = theFile.target.result;
                    image.onload = function() {
                        let fileInfo = {
                            width: this.width,
                            height: this.height,
                        };
                        resolve(fileInfo);
                    };
                    image.onerror = function(err) {
                        tip.alert({
                            content: this.vueI18n.$t(
                                "tipMessage.uploadImgTip3"
                            ),
                        });
                        tip.loaded();
                        store.dispatch("setFileTimeout", false);
                        reject(err);
                    };
                };
            } else {
                let fileInfo = {
                    width: 0,
                    height: 0,
                };
                resolve(fileInfo);
            }
        });
    }

    // 将blobUrl转化成文件信息
    blobUrlToFile(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                let reg = /^data:image/;
                if (!reader.result.match(reg)) {
                    tip.alert({
                        content: this.vueI18n.$t("tipMessage.uploadImgTip1"),
                    });
                    tip.loaded();
                    return;
                }
                let base64Data = reader.result.replace(
                    /^data:image\/\w+;base64,/,
                    ""
                );
                let dataBuffer = new Buffer(base64Data, "base64");
                let file = new File(
                    [dataBuffer],
                    new Date().getTime() + ".png",
                    {
                        type: "image/png",
                    }
                );
                console.log("blobUrlToFile:", file);
                callback(file);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.send();
    }

    // 保存草稿有内容判断
    judgeIsHasContent(json) {
        let flag = false;
        for (let key in json) {
            if (!this.isEmpty(json[key])) {
                // 判断是数组
                if (typeof json[key] == "object") {
                    if (Array.isArray(json[key])) {
                        let arr = json[key];
                        for (let i = 0; i < arr.length; i++) {
                            let item = arr[i];
                            for (let key2 in item) {
                                if (typeof item[key2] == "object") {
                                    if (Array.isArray(item[key2])) {
                                        let arr2 = item[key2];
                                        for (let j = 0; j < arr2.length; j++) {
                                            let item2 = arr2[j];
                                            for (let key3 in item2) {
                                                if (
                                                    key3 == "title" ||
                                                    key3 == "imgPath"
                                                ) {
                                                    if (
                                                        !this.isEmpty(
                                                            item2[key3]
                                                        )
                                                    ) {
                                                        flag = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (
                                        !this.isEmpty(item.title) ||
                                        item.switch
                                    ) {
                                        flag = true;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    flag = true;
                }
            }
        }
        return flag;
    }
    // 解析拼接字符串
    parseStrToArr(str, sep = "_") {
        let arr = [];
        if (str && str.includes(sep)) {
            arr = str.split(sep);
        } else {
            arr = [str];
        }
        return arr;
    }

    // 将数组等分
    uniformArr(data, num) {
        let index = 0;
        let array = [];
        while (data && index < data.length) {
            array.push(data.slice(index, (index += num)));
        }
        return array;
    }

    // 控制ios端的input/textarea元素失去焦点时隐藏键盘
    iosInputBlur(container, dom, time = 10) {
        // 判断是ios
        if (this.isIosOrAndroid() === "ios") {
            let containerDom = document.querySelector(container);
            setTimeout(() => {
                let inputDoms = containerDom.querySelectorAll(dom);
                for (let i = 0; i < inputDoms.length; i++) {
                    this.elementBlur(inputDoms[i], time);
                }
                console.log("inputDoms:", inputDoms);
            }, 400);
        }
    }

    // 元素失去焦点
    elementBlur(dom, time) {
        let docTouchend = (e) => {
            if (e.target != dom) {
                setTimeout(() => {
                    dom.blur();
                    document.removeEventListener(
                        "touchend",
                        docTouchend,
                        false
                    );
                }, time);
            }
        };
        if (dom) {
            dom.addEventListener(
                "focus",
                () => {
                    document.addEventListener("touchend", docTouchend, false);
                },
                false
            );
        } else {
            console.log("没找到元素");
        }
    }
}

export default new Util();
