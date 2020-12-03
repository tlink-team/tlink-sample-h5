const WebpackZipPlugin = require('zip-webpack-plugin');
const path = require('path');
const fs = require("fs");
const cubeModule = require("./public/CubeModule");
const cubePath = path.join(__dirname, './public/CubeModule.json');
const env = process.env.NODE_URL; // 运行的环境
let version = cubeModule.version;
let build = cubeModule.build;
// 版本递增的方法
let increaseVersion = (v) => {
	let vArr = v.includes('.') ? v.split('.') : [];
	let vOne = vArr[0];
	let vTwo = vArr[1];
	let vThree = vArr[2];
	vThree++;
	if (vThree == 100) {
		vTwo++;
		vThree = 0;
	}
	if (vTwo == 10) {
		vOne++;
		vTwo = 0;
	}
	let newBuildArr = [vOne, vTwo, vThree];
	let newVersion = newBuildArr.join('.');
	let newBuild = newBuildArr.join('');
	return {
		newVersion,
		newBuild
	}
}
// 打测试包和生产包，版本递增
switch (env) {
	case 'test-cur':
		version = cubeModule.testVersion;
		build = cubeModule.testBuild;
		break;
	case 'test':
		let testIncreaseVersion = increaseVersion(cubeModule.testVersion);
		version = testIncreaseVersion.newVersion;
		build = testIncreaseVersion.newBuild;
		cubeModule.testVersion = version;
		cubeModule.testBuild = build;
		break;
	case 'prod-cur':
		version = cubeModule.prodVersion;
		build = cubeModule.prodBuild;
		break;
	case 'prod':
		let prodIncreaseVersion = increaseVersion(cubeModule.prodVersion);
		version = prodIncreaseVersion.newVersion;
		build = prodIncreaseVersion.newBuild;
		cubeModule.prodVersion = version;
		cubeModule.prodBuild = build;
		break;
}
cubeModule.version = version;
cubeModule.build = build;
if(env.includes('local')){
	cubeModule.env = 'local';
}else if(env.includes('test')){
	cubeModule.env = 'test';
}else if(env.includes('prod')){
	cubeModule.env = 'prod';
}
// 判断是不是本地运行
if(env.includes('dev')){
	cubeModule.isLocal = true;
}else{
	cubeModule.isLocal = false;
}
// 更新版本内容写入到文件
if (fs.existsSync(cubePath)) {
	fs.writeFileSync(cubePath, JSON.stringify(cubeModule, null, '\t'));
}
console.log('NODE_ENV:', process.env.NODE_URL, cubeModule, process.env.NODE_ENV)
module.exports =  {
	publicPath:'./',
	lintOnSave:false,
	productionSourceMap:true,
	assetsDir: "static",
	configureWebpack: {
        plugins: [
            new WebpackZipPlugin({
				path: path.join(__dirname, './dist'),
				filename: `${cubeModule.identifier}-${cubeModule.version}-${cubeModule.env}.zip`
			}),
        ]
	},
	devServer: {
		port: 9997,
	},
}