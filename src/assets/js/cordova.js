import config from "@/assets/js/config"
import util from "@/assets/js/util"
class CordovaExec {
	constructor() {
		try {
			this.maxDoNum = 5;
			this.globalMsg = '目前仅支持T信移动端';
			this.init();
		} catch (err) {
			console.log("err:", err);
		}
	}

	// 初始化cordova
	init() {
		this.holdForDevice();
	}

	// 监听设备加载情况
	holdForDevice() {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				//等设备加载完毕后执行
				if (!cordova) {
					return reject("获取cordova失败");
				}
				document.addEventListener(
					"deviceready",
					() => {
						resolve();
					},
					false
				);
			}
		});
	}

	// 1.更新状态栏颜色(ios)  参数 ['r','g','b','a']
	statusBarColor(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"statusBarColor",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 2.保存到相册  参数 [url]
	saveToGallery(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"saveToGallery",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 3.复制  参数 [copy内容]
	copy(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"copy",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 4.粘贴  参数 []
	paste(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"paste",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 5.拨打电话  参数 [phoneNumber]
	callPhone(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"callPhone",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 6.获取多语言  参数 []
	language(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"language",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			} else {
				resolve({
					code:'1000',
					msg:this.globalMsg,
					language: "cn",
				});
			}
		});
	}

	// 7.显示原生程序标题栏  参数 []
	showNav(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"showNav",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 8.隐藏标题栏  参数 []
	hideNav(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"hideNav",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 9.退出轻应用  参数 []
	exit(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaCommon",
							"exit",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 10.返回上一个页面   参数 []
	goBack(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"goBack",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 11.退出登录   参数 []
	logout(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"logout",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 12.获取WebView高度   参数 []
	webview(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"webview",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 13.获取手机屏幕宽度   参数 []
	screen(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"screen",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 14.获取扩展字段     参数 [应用标识identifier]
	getExtra(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"getExtra",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 15.验证登录密码    参数 []
	authPassword(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"authPassword",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 16.摇一摇开始    参数 []
	shake(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"shake",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 17.摇一摇结束    参数 []
	shakeStop(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"shakeStop",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 18.获取设备信息    参数 []
	getDeviceInfo(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"getDeviceInfo",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 19.开启手机横竖屏    参数 [0表示关闭，1表示开启，2表示横竖屏都支持，3表示竖屏]
	orientation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"orientation",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 20.打开系统浏览器    参数 [网址地址]
	openSysBrowser(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"openSysBrowser",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 21.检测应用是否安装    参数 [程序包名]
	apk(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"apk",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 22.启动指定原生APP    参数 [参数1：包名的id 参数2：该包名的appkey 用户传输密码密文]
	startApp(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"startApp",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 23.获取图片Base64字符串（仅iOS）    参数 [图片路径列表]
	getBase64s(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"getBase64s",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 24.跳转指定H5轻应用    参数 [H5包名(必传),H5传参json格式字符串(可选)]
	showWidget(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"showWidget",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 25.打开URL页面(空底座只支持单个url参数)    参数 [URL链接,{"title":"是否显示标题栏，0-不显示，1-显示","mtitle":"需要显示的标题内容","platform":"选择打开平台，0-Dsbridge，1-Cordova，默认cordova"}]
	openUrl(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"openUrl",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 26.修改底座导航条标题    参数 [标题文字]
	showTitle(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"showTitle",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 27.自定义导航栏右侧按钮    参数 [文字标题(必传（无文字的传空字符串)),触发事件调起的JS函数名(必传),icon样式 1-搜索，2-我的，3-删除，4-筛选，5-编辑，6-关闭，7-自定义icon(必传),自定义icon base64(可选)]
	showRightButton(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"showRightButton",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 28.上报埋点信息至T信后台服务器    参数 [插件ID(必传),page页面参数(必传),func函数名参数(必传),res参数 0-成功，其他-失败Code(可选),msg备注信息(可选),url查询邮件列表则填写url，本地操作未空(可选)]
	recordPlugin(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"recordPlugin",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 29.PDF浏览    参数 [PDF在线地址URL]
	readPDF(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"readPDF",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 30.设置会话过期    参数 []
	sessionout(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"sessionout",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 31.发送手机短信    参数 [手机号码,短信内容]
	sendSms(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"sendSms",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 32.关闭原生返回功能(仅iOS)    参数 []
	closeSlideOut(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"closeSlideOut",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 33.显示\隐藏水印    参数 [显示标识(0-显示1-隐藏)]
	waterMarkManage(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"waterMarkManage",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 34.获取原生用户配置信息    参数 [配置表key值]
	getId(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"getId",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 35.Bugly设置关键数据    参数 [{"key":"key","value":"value"}]
	onEvent(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"onEvent",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 36.调用银联    参数 [订单信息]
	callUpPay(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"callUpPay",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 37.获取当前H5轻应用信息    参数 []
	appLogInfo(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"appLogInfo",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 38.切换H5轻应用    参数 [pluginId(切换的目标H5标识)]
	openApp(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"openApp",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 39.打开在线文件    参数 [fileUrl文件地址(必传),title文件标题(可选)]
	previewFile(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"previewFile",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 40.设置浏览器滑动能力    参数 [enable(0-不可滑动，1-可滑动)]
	setBounces(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"setBounces",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 41.发送卡片消息    参数 [uid发送目标uid(必传),content发送内容(必传),title卡片消息标题(必传),description卡片消息摘要(必传),icon卡片消息icon url(必传)]
	sendCardMessage(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"sendCardMessage",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 42.添加T信隐形水印    参数 [图片base64字符串(),水印文字()]
	addTChatWaterMask(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"addTChatWaterMask",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 43.预览多张图片    参数 [[{"type":"0-在线url，1-base64","data":"base64或者在线url"}](必传),参数数组顺序1，选择首张预览位置(可传)]
	previewPicture(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"previewPicture",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 44.播放在线视频    参数 [视频地址url]
	playVideo(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"playVideo",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 45.录制视频    参数 [time录制视频最大长度(可选)]
	videoRecord(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"videoRecord",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 46.获取是否为根目录    参数 []
	isRootNativePage(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"isRootNativePage",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 47.上传文件    参数 [{"url":"指定上传路径地址","files":"['本地文件路径']"}(必传)]
	upload(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"upload",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 48.电子定制接口-WebView栈顶通知(仅iOS)    参数 []
	moniterViewAppear(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								reject(err);
							},
							"MideaCommon",
							"moniterViewAppear",
							param
						);
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 49.电子定制接口-取消WebView栈顶通知(仅iOS)    参数 []
	closeMoniterViewAppear(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								reject(err);
							},
							"MideaCommon",
							"closeMoniterViewAppear",
							param
						);
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 50.分享选择器    参数 [{title: '测试',subTitle: '',action: 'openH5',widgetId: '', widgetExtra: '',imageUrl: '',actionType: 1,shareRange: 2,url:''}]
	showShare(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								reject(err);
							},
							"MideaCommon",
							"showShare",
							param
						);
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 51.跳转指定用户单聊页面    参数 [uid 用户UID(必传),name 昵称(可选，默认取用户详情名字)]
	chatMessage(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								reject(err);
							},
							"MideaCommon",
							"chatMessage",
							param
						);
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 52.设置手机横竖屏    参数 [0或者1(0竖屏，1横屏 必传)]
	setScreenOrientation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								reject(err);
							},
							"MideaCommon",
							"setScreenOrientation",
							param
						);
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 53.获取用户信息    参数 []
	getUser() {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(success) => {
								const result = JSON.stringify(success);
								const obj = JSON.parse(result);
								obj.sessionKey = obj.sessionkey;
								if (obj.sessionKey === undefined) {
									obj.sessionKey = obj.token;
								}
								if (obj.uphone === undefined && obj.mobile !== undefined) {
									obj.uphone = obj.mobile;
								}
								if (
									obj.gender === undefined &&
									obj.midea_gender !== undefined
								) {
									obj.gender = obj.midea_gender;
								}
								obj.usex = obj.gender === "M" ? "男" : "女";
								obj.uname = obj.cn;
								console.log("token:", obj);
								resolve(obj);
							},
							(error) => {
								fn();
								reject(error);
								console.log("token error:", error);
							},
							"MideaUser",
							"getUser",
							[]
						);
					};
					fn();
				});
			} else {
				if (config.isLocal) {
					resolve({
						uid: config.localUser.uid,
						ssoToken: config.localUser.accessToken,
						token: config.localUser.accessToken,
					});
				} else {
					resolve({
						uid: "",
						ssoToken: "",
						token: "",
					});
				}
			}
		});
	}

	// 54.组织架构单选人员    参数 []
	orgChoose(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"orgChoose",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 55.组织架构人员多选    参数 []
	orgMuChoose(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"orgMuChoose",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 56.部门选择    参数 ['orgidString_1','orgidString_2','orgidString_3',...]
	departmentChoose(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"departmentChoose",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 57.查看用户详情    参数 [用户uid]
	vcard(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"vcard",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 58.搜索用户    参数 [type搜索类型0-部门1-职位2-邮箱]
	search(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"search",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 59.获取邮箱SID    参数 []
	mailSid(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;					
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaUser",
							"mailSid",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 60.进入扫码页面    参数 []
	scan(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					// 执行次数
					let doIndex = 0;
					let fn = () => {
						doIndex++;
						cordova.exec(
							(res) => {
								resolve(res);
							},
							(err) => {
								if(doIndex < this.maxDoNum) {
									fn();
								}
								reject(err);
							},
							"MideaBarcode",
							"scan",
							param
						);
					};
					fn();
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 61.获取百度地图单次定位    参数 []
	location(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"location",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 62.获取地图定位    参数 []
	mapLocation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"mapLocation",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 63.导航至某地    参数 [latitude目的地纬度，longitude目的地经度]
	navTo(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"navTo",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 64.从某地导航至某地    参数 [latitude目的地纬度(必传),longitude目的地经度(必传),from_latitude出发地纬度(必传),from_longitude出发地经度(必传),name目的地名字(可选)]
	navToWithFrom(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"navToWithFrom",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 65.获取高德地图单次定位    参数 [(数据类型int，返回坐标系类型，0-默认、1-Baidu、2-MapBar、3-ABC、4-SoSoMap、5-AliYun、6-Google、7-GPS，不建议传值(可选)),(数据类型String，Best高精度，HundredMeters中等精度，精度越高，获取速度越慢(可选))]
	amapLocation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"amapLocation",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 66.高德开启持续定位    参数 [持续定位更新最小时间间隔，单位毫秒(可选-2000)]
	startUpdatingLocation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"startUpdatingLocation",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 67.高德关闭持续定位    参数 []
	stopUpdatingLocation(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice().then(() => {
					cordova.exec(
						(res) => {
							resolve(res);
						},
						(err) => {
							reject(err);
						},
						"MideaMap",
						"stopUpdatingLocation",
						param
					);
				});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 68.修改导航标题    参数 ['标题'(必传)]
	modifyNativeTitle(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"modifyNativeTitle",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

	// 69.服务台   参数 ['标题'(必传) 值'sz'|'wh']
	callSipService(param = []) {
		return new Promise((resolve, reject) => {
			if (util.isTLinkMobile()) {
				this.holdForDevice()
					.then(() => {
						// 执行次数
						let doIndex = 0;
						let fn = () => {
							doIndex++;
							cordova.exec(
								(res) => {
									resolve(res);
								},
								(err) => {
									if(doIndex < this.maxDoNum) {
										fn();
									}
									reject(err);
								},
								"MideaCommon",
								"callSipService",
								param
							);
						};
						fn();
					})
					.catch((err) => {
						reject(err);
					});
			}else{
				resolve({
					code:'1000',
					msg:this.globalMsg,
				})
			}
		});
	}

}

export default new CordovaExec();
