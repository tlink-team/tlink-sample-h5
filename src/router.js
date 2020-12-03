import Vue from "vue";
import Router from "vue-router";
/* Layout */
import layout from "./pages/layout/layout";
Vue.use(Router);

export const constantRouterMap = [
    {
        path: "/404",
        component: layout,
        redirect: "/404/index",
        name: "parent404",
        meta: {
            title: "404",
        },
        children: [
            {
                path: "index",
                component: () => import("@/pages/404/index"),
                name: "404",
                meta: {
                    title: "inexistence",
                },
            },
        ],
    },
    {
        path: "/",
        component: layout,
        redirect: "/",
        name: "parentSample",
        meta: {
            title: "",
        },
        children: [
            {
                path: "/",
                component: () => import("@/pages/sample/sample-01"),
                name: "index",
                meta: {
                    title: "sampleTitle1", // 方便多语言获取字段，这里写标题的字段名称
                    moreNView: false, // 是否在导航上显示三个点
                    isMode: false, // 是否可返回
                },
            },
            {
                path: "sample",
                component: () => import("@/pages/sample/sample-02"),
                name: "sample",
                meta: {
                    title: "sampleTitle2", // 方便多语言获取字段，这里写标题的字段名称
                    moreNView: false, // 是否在导航上显示三个点
                    isMode: true, // 是否可返回
                },
            },
        ],
    },
];

export default new Router({
    //mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
});
