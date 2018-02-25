/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

export function ISURL(string: string): boolean {
    if(!string){
        return false;
    }

    let strRegex = "^((https|http|ftp|rtsp|mms)?://)"

        + "?(([0-9a-z_!~*'().&amp;=+$%-]+: )?[0-9a-z_!~*'().&amp;=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&amp;=+$,%#-]+)+/?)$";

    let re = new RegExp(strRegex);

    if (re.test(string)) {
        return (true);
    } else {
        return (false);
    }
}

export function Base64ToArrayBuffer(base64 :string): ArrayBuffer {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}