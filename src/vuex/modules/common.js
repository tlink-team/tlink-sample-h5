import * as types from "../mutation-types";
import config from "@/assets/js/config";
import util from "@/assets/js/util";
const state = {
    hasLogin: false,
    accessToken: null,
    userInfo: { uid: "" },
    locale: config.lang.cn,
    isShowMore: false,
    subscription: {}, // 上传对象
    fileTimeout: true, // 默认文件允许超时提示
};

const getters = {};

const mutations = {
    [types.LOGIN](state) {
        state.hasLogin = true;
    },
    [types.LOGOUT](state) {
        state.hasLogin = false;
        state.accessToken = null;
    },
    [types.SET_ACCESSTOKEN](state, accessToken) {
        state.accessToken = accessToken;
    },
    [types.SET_USERINFO](state, preload) {
        state.userInfo = preload;
    },
    [types.SET_LANGUAGE](state, preload) {
        state.locale = preload;
    },
    [types.SET_SHOWMORE](state, preload) {
        state.isShowMore = preload;
    },
    [types.SET_SUB_SCRIPTION](state, preload) {
        state.subscription = preload;
    },
    [types.SET_FILE_TIMEOUT](state, preload) {
        state.fileTimeout = preload;
    },
};

const actions = {
    getAccessToken({ commit, state }, preload) {
        return new Promise((resolve, reject) => {
            if (util.isEmpty(preload.accessToken)) {
                console.log("accessToken不能为空");
                return;
            }
            let accessToken = preload.accessToken;
            let userInfo = preload.userInfo;
            console.log("获得accessToken：", accessToken);
            // 存储登录状态
            commit(types.LOGIN);
            // 存储accessToken
            commit(types.SET_ACCESSTOKEN, accessToken);
            // 存储用户信息
            commit(types.SET_USERINFO, userInfo);
            resolve(accessToken);
        });
    },
    setAccessToken({ commit, state }, preload) {
        commit(types.SET_ACCESSTOKEN, preload);
    },
    setUserInfo({ commit, state }, preload) {
        commit(types.SET_USERINFO, preload);
    },
    setLanguage({ commit, state }, preload) {
        commit(types.SET_LANGUAGE, preload);
    },
    setShowMore({ commit, state }, preload) {
        commit(types.SET_SHOWMORE, preload);
    },
    setSubscription({ commit, state }, preload) {
        commit(types.SET_SUB_SCRIPTION, preload);
    },
    setFileTimeout({ commit, state }, preload) {
        commit(types.SET_FILE_TIMEOUT, preload);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
