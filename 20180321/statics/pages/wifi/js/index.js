/**
 * Package:
 * User: 刘卫程
 * Email: bjliuweicheng@jd.com
 * Date: 2017/11/30
 * Time: 下午1:34
 * Description:
 */
$(document).ready(function () {
    var apmac = $("#apmac").val();
    var uaddress = $("#uaddress").val();
    var umac = $("#umac").val();
    var ssid = $("#ssid").val();
    var nodeIp = $("#nodeIp").val();
    var urlPrefix = $("#urlPrefix").val();

    var authType = "";
    var pushPageId = "";
    var lang = "";
    var zh_CN = "";

    //禁止打开App Store
    JSSDK.CallApp.options.isAppInstalled = true;

    //App内打开m页
    JSSDK.Native.Jump.Mpage.toUrl({
        url: urlPrefix + "/page/wifi/check_login.html?&apMac=" + apmac
        + "&deviceMac=" + apmac
        + "&ssid=" + ssid
        + "&terminalIpV4=" + uaddress
        + "&terminalMac=" + umac
        + "&nodeIp=" + nodeIp
        + "&authType=" + authType
        + "&pushPageId=" + pushPageId
        + "&lang=" + lang
        + "&zh_CN=" + zh_CN
    });
});