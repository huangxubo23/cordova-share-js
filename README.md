## 简介
基于Cordova插件，提供社交平台分享功能方法的封装。

目前支持分享的平台有：
* 微信（支持好友和朋友圈），支持图片、链接和页面的分享。
* QQ（支持好友和QQ空间），支持图片、文字和页面的分享。
* 微博，支持图片、文字和页面的分享。

## 使用介绍
使用私有仓库或npm安装
```
npm install cordova-share-js
```
将`cordova-share-js`引入到到所需的项目下：
在所需的JS文件中引入方法：
```
import CordovaShare from 'cordova-share-js';
```

然后，根据项目需要支持的分享平台，选择安装对应的插件，并且根据分享的类型将数据传给`CordovaShare`对应的方法。


## 分享插件
### 微信
#### 安装依赖
在Cordova项目目录下，安装`cordova-plugin-wechat`，并且将`YOUR_WECHAT_APPID`替换成微信开放平台的应用ID。
```
cordova plugin add cordova-plugin-wechat --variable wechatappid=YOUR_WECHAT_APPID
```

#### 使用示例
分享图片
```
const data = {
  title: '标题',
	description: '描述',
	image: 'base64',  // 支持base64和url图片
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'friend';   // friend:分享给朋友, article:分享到朋友圈
const type = 'image';

CordovaShare.wechat(data, target, type);
```

分享页面或链接
```
const data = {
  title: '标题',
	description: '描述',
	url: 'url',  // 页面的url
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'friend';   // friend:分享给朋友, article:分享到朋友圈
cosnt type = 'page'  // page:分享页面, link:分享链接 

CordovaShare.wechat(data, target, 'image');
```

### QQ
#### 安装依赖
在Cordova项目目录下，安装`cordova-plugin-qqsdk`，并且将`YOUR_QQ_APPID`替换成QQ开放平台的应用ID。
```
cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=YOUR_QQ_APPID
```

#### 使用示例
分享图片
```
const data = {
  title: '标题',
	description: '描述',
	image: 'base64',  // 支持base64、url图片和图片的绝对路径
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'friend';   // friend:分享给朋友, article:分享到QQ空间
const type = 'image';

CordovaShare.qq(data, target, type);
```

分享页面
```
const data = {
  title: '标题',
	description: '描述',   // qq必填
	url: 'url': // 页面的url地址
	image: 'url',  // qq必填，只支持url图片
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'friend';   // friend:分享给朋友, article:分享到QQ空间
const type = 'page';

CordovaShare.qq(data, target, type);
```

分享文字
```
const data = {
	title: '分享的文字',
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'friend';   // friend:分享给朋友, article:分享到QQ空间
const type = 'text';

CordovaShare.qq(data, target, type);
```

### 微博
#### 安装依赖
在Cordova项目目录下，安装`cordova-plugin-weibosdk`，并且将`YOUR_WEIBO_APPID`替换成微博开放平台的应用ID。
```
cordova plugin add cordova-plugin-weibosdk --variable WEIBO_APP_ID=YOUR_WEIBO_APPID
```

#### 使用示例
分享图片
```
const data = {
  title: '标题',
	description: '描述',
	image: 'url',  // 支持url图片和图片和base64，注意base64图片如果太大会报错，建议使用url图片
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'article';   // 分享微博
const type = 'image';

CordovaShare.weibo(data, target, type);
```

分享页面
```
const data = {
  title: '标题',
	description: '描述',
	url: 'url',  // 页面的url
	image: 'url',  // 支持url图片和base64，注意base64图片如果太大会报错，建议使用url图片
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'article';   // 发布微博
const type = 'page';

CordovaShare.weibo(data, target, type);
```

分享文字
```
const data = {
	title: '分享的文字',
	success: (success) => {
		console.log(success);
	},
	error: (error) => {
		console.error(error);
	}
}
const target = 'article';   // 发布微博
const type = 'text';

CordovaShare.weibo(data, target, type);
```


## 分享组件
在Cordova项目目录下，安装分享组件依赖的截图插件`cordova-screenshot`。
```
cordova plugin add https://github.com/gitawego/cordova-screenshot.git
```

### 支持平台
目前分享组件可以支持截图并分享到微信、qq和微博：
平台 | shareTypes
---- | ---
微信好友 | wechat_friend
微信朋友圈 |  wechat_article
QQ好友 | qq_friend
QQ空间 |  qq_article
微博 |  weibo
备注：微博无法直接分享大图片，需要先把图片上传到服务器上获取url，再做分享。

### 参数说明
参数 | 说明
---- | ---
title | 分享标题字符串
description | 分享描述字符串
quality | 分享图片质量，默认100，可选0-100数字
shareTypes | 分享平台类型数组
onClose | 分享关闭回调函数，包含分享成功和取消分享的情况，如：{success: false, result: "User cancel the sharing"}
onError | 分享过程中发生错误的回调函数


### 分享按钮组件：ShareButtons
在项目中引入ShareButtons组件
```
import { ShareButtons } from 'cordova-share-js';
```

示例：
```
<ShareButtons
	title={title}
	description={description}
	quality={80}
	shareTypes={['wechat_friend', 'wechat_article', 'qq_friend', 'qq_article', 'weibo']}
	onClose={onClose}
	onError={onError}
/>
```
<img src="https://github.com/huangxubo23/cordova-share-js/blob/master/screenshot/ShareButtons.png" alt="ShareButtons" title="ShareButtons" width="250" height="500" />

### 分享弹框组件：CordovaScreenshot
在项目中引入CordovaScreenshot组件
```
import { CordovaScreenshot } from 'cordova-share-js';
```

示例：
```
<CordovaScreenshot
	title={title}
	description={description}
	quality={80}
	shareTypes={['wechat_friend', 'wechat_article', 'qq_friend', 'qq_article', 'weibo']}
	onClose={onClose}
	onError={onError}
/>
```
<img src="https://github.com/huangxubo23/cordova-share-js/blob/master/screenshot/CordovaScreenshot.png" alt="CordovaScreenshot" title="CordovaScreenshot" width="550" height="250" />
