import request from "@/assets/js/request";
import config from "@/assets/js/config";
class Api {
    constructor() {}
    // 获取数据 测试接口
    getData(params) {
        return request(params, `${config.baseApi}/api/test/get.do`);
    }
}
export default new Api();
