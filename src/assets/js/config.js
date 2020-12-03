const cubeModule = require("../../../public/CubeModule");
const env = cubeModule.env; // 运行的环境
const isLocal = cubeModule.isLocal; // 是否是本地运行
let baseApi = ""; // 根路径
// 七牛上传域名
let qiniuDomain = "";
// 先判断是测试环境还是生产环境
if (env == "local") {
    baseApi = "http://10.8.32.74:8648"; // 本地服务器地址
    qiniuDomain = "https://mtestdl.getech.cn";
} else if (env == "test") {
    baseApi = "https://mtest.getech.cn";
    qiniuDomain = "https://mtestdl.getech.cn";
} else if (env == "prod") {
    baseApi = "https://teamwork.getech.cn";
    qiniuDomain = "https://teamworkdl.getech.cn";
}
console.log("config:", {
    isLocal,
    env,
    baseApi,
});
export default {
    env,
    isLocal,
    baseApi,
    appName: "teamwork", // 应用名称
    pageSize: 15,
    pluginId: cubeModule.identifier,
    version: cubeModule.version,
    appId: "Ti9f1nQ7",
    lang: {
        en: "en-US",
        cn: "zh-CN",
    },
    localUser: {
        accessToken: "ut_SBVGe2eeMNJmsG1UiXKFC6GrlZDs1ySxnqX",
        uid: "test",
        userName: "ceshi",
    },
    qiniuDomain,
    maxFileLength: 1, //图片上传最大不能超过值
    timeout: 30000, // 超时时间
};
