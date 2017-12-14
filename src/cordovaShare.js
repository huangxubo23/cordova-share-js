
class CordovaShare {
	constructor(props) {
		super(props);
		this.initData = {
			title: '',
			description: '',
			image: null,
			url: '',
			success: (success) => {
				console.log(success || 'Share successful');
			},
			error: (error) => {
				console.error('Share failed', error);
			}
		}
	}
 	
	/**
	 * 
	 * @param {object: 分享的数据} data 
	 * @param {string: friend/article, 好友/朋友圈} target 
	 * @param {string: image, 图片} type 
	 */
	wechat(data, target='friend', type='image') {
		if(!Wechat || !Wechat.share) {
			return this.pluginCheckError('cordova-plugin-wechat');
		}

		const shareData = {
			...this.initData,
			...data,
		};

		switch (type) {
			case 'image': {
				Wechat.share({
					message: {
						title: shareData.title,
						description: shareData.description,
						media: {
							// type: Wechat.Type.WEBPAGE,
							// webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
							// type: Wechat.Type.LINK,
							// webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm",
							type: Wechat.Type.IMAGE,
							image: shareData.image,
						},
					},
					// 微信好友: Wechat.Scene.SESSION, 朋友圈: Wechat.Scene.TIMELINE
					scene: target === 'friend' ? Wechat.Scene.SESSION :  Wechat.Scene.TIMELINE,
				}, () => {
					shareData.success(this.shareSuccessText('Wechat', type));
				}, (failReason) => {
					shareData.error(failReason);
				});
				break;
			}
			case 'page':
		  case 'link': {
				Wechat.share({
					message: {
						title: shareData.title,
						description: shareData.description,
						media: {
							type: type === 'page' ? Wechat.Type.WEBPAGE : Wechat.Type.LINK,
							webpageUrl: shareData.url,
						},
					},
					// 微信好友: Wechat.Scene.SESSION, 朋友圈: Wechat.Scene.TIMELINE
					scene: target === 'friend' ? Wechat.Scene.SESSION :  Wechat.Scene.TIMELINE,
				}, () => {
					shareData.success(this.shareSuccessText('Wechat', type));
				}, (failReason) => {
					shareData.error(failReason);
				});
			}
			default: {
				this.canNotSupport('Wechat', type);
			}
		}
	}

	/**
	 * 
	 * @param {object: 分享的数据} data 
	 * @param {string: friend/article, 好友/QQ空间} target 
	 * @param {string: image, 图片} type 
	 */
	qq(data, target='friend', type='image') {
		if(!QQSDK) {
			return this.pluginCheckError('cordova-plugin-qqsdk');
		}

		const shareData = {
			...this.initData,
			...data,
		};

		switch (type) {
			case 'image': {
				QQSDK.shareImage(() => {
					shareData.success(this.shareSuccessText('QQ', type));
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					client: QQSDK.ClientType.QQ,
					scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
					title: shareData.title,
					description: shareData.description,
					image: shareData.image,
				});
				break;
			}
			case 'text': {
				QQSDK.shareText(() => {
					shareData.success(this.shareSuccessText('QQ', type));
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					client: QQSDK.ClientType.QQ,
					scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
					text: shareData.title,
				});
				break;
			}
			case 'page': {
				QQSDK.shareNews(() => {
					shareData.success(this.shareSuccessText('QQ', type));					
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					client: QQSDK.ClientType.QQ,
					scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
					title: shareData.title,
					description: shareData.description,
					image: shareData.image,
				});
				break;
			}
			default: {
				this.canNotSupport('QQ', type);
				break;
			}
		}
	}

	/**
	 * 
	 * @param {object: 分享的数据} data 
	 * @param {string: article, 发享到微博} target 
	 * @param {string: image, 图片} type 
	 */
	weibo(data, target='article', type='image') {
		if(!WeiboSDK) {
			return this.pluginCheckError('cordova-plugin-weibosdk');
		}

		const shareData = {
			...this.initData,
			...data,
		};

		switch (type) {
			case 'image': {
				WeiboSDK.shareToWeibo(() => {
					shareData.success();
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					image: shareData.image,  // Support types: network url image, base64(不支持base64比较大的数据)
				});
				break;
			}
			case 'text': {
				WeiboSDK.shareTextToWeibo(() => {
					shareData.success(this.shareSuccessText('Weibo', type));
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					text: shareData.title,
				});
				break;
			}
			case 'page': {
				WeiboSDK.shareToWeibo(() => {
					shareData.success(this.shareSuccessText('Weibo', type));
				}, (failReason) => {
					shareData.error(failReason);
				}, {
					title: shareData.title,
					description: shareData.description,
					url: shareData.url,  // Support types: network url page
					image: shareData.image,  // Support types: network url image
				});
				break;
			}
			default: {
				this.canNotSupport('Weibo', type);
				break;
			}
		}
	}

	pluginCheckError(pluginName) {
		console.error(`The plugin '${pluginName}' is not installed`);
	}

	canNotSupport(platform, type) {
		console.warn(`Can not support to sharing ${type} to ${platform}, please check!`);
	}

	shareSuccessText(platform, type) {
		return `Share ${type} to ${platform} successfully`;
	}
}

const cordovaShare = new CordovaShare();
export default cordovaShare;