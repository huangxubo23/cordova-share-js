## 简介
基于Cordova插件，提供社交平台分享功能方法的封装。

目前支持分享的平台有：
* 微信（支持好友和朋友圈），支持图片、链接和页面的分享。
* QQ（支持好友和QQ空间），支持图片、文字和页面的分享。
* 微博，支持图片、文字和页面的分享。

## 使用介绍
使用私有仓库安装
```
npm install cordova-share-js
```
将`cordova-share-js`引入到到所需的项目下：
在所需的JS文件中引入方法：
```
import CordovaShare from 'cordova-share-js';
```

然后，根据项目需要支持的分享平台，选择安装对应的插件，并且根据分享的类型将数据传给`CordovaShare`对应的方法。


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