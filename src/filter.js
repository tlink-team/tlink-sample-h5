export default {
    // 转换为大写
    uppercase(value) {
        if (!value) return;
        return value.toString().toUpperCase();
    },
    // 转换为小写
    lowercase(value) {
        if (!value) return;
        return value.toString().toLowerCase();
    },
    miniName(value) {
        if (!value || typeof value !== "string") {
            return value;
        }
        // 提取的前提是去除了名字中含有()及()内的字段,
        //中文字符>=2显示最后2个字符，中文字符=1显示最后个中文字符，中文字符=0显示名字首位字符大写
        if (/\((.+?)\)/g.test(value)) {
            value = value.substr(0, value.indexOf("("));
        }
        // 是否含有中文
        if (/^[\u4e00-\u9fa5]/.test(value)) {
            return value.substr(-2);
        } else {
            // 英文
            return value.substr(0, 1).toUpperCase();
        }
    },
};
