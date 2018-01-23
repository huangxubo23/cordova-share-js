require("babel-core/register");
require("babel-polyfill");

/**
 * 分享方法
 */
import CordovaShare from './cordovaShare';

export default CordovaShare;

/**
 * 分享组件
 */
import CordovaScreenshot from './components/CordovaScreenshot';
import ShareButtons from './components/ShareButtons';

export { CordovaScreenshot, ShareButtons };