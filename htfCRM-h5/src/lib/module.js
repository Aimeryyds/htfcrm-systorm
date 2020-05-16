import React, { PropTypes } from 'react'
import API_LIST from '../config/apiList'

import { Toast } from 'antd-mobile';

import $ from 'jquery'

class Module extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.context.router;
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };
 

    request(options, success, fail) {
        let that = this;
        if(options.api !== undefined) {
            let api = API_LIST[options.api];
            let _apiArr = api.split('/');
            let _apiLastName = _apiArr[_apiArr.length -1];

            if(!api) {
                console.log('error', 'api 不存在', options.api);
                return;
            }

            !options.hideToast && Toast.loading('数据加载中...', 0);

            $.ajax({
                "url": api,
                "type": options.type || "get",
                "ContentType": options.ContentType || "application/x-www-form-urlencoded; charset=UTF-8",
                "dataType": options.dataType || "json",
                "data": options.params || "",
                "traditional": true,
                "timeout": 600000,
                //内网网关测试打开
                "beforeSend" : function(request) {
                    request.setRequestHeader("Authorization", that.getCookie("Authorization"));
                },
                // "async":false//证书过期处理方法
            })
                .done(function (result) {
                    if (result.code === '203') {
                        Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 3);
                        return false;
                    } else if (result.code === '202') {
                        Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 2);
                    } else {
                        !options.hideToast && Toast.hide();
                    }
                    success && success(result);

                })
                .fail(function (errorThrown) {
                    if( errorThrown.status === 0 || errorThrown.status === 500 ) {
                        Toast.offline("请求超时，请重试！", 3);
                    } else {
                        Toast.hide();
                        Toast.offline("接口请求失败，状态码："+ errorThrown.status +"，请联系管理员！ ", 3);
                    }
                    fail && fail();
                });

        }
    }
    formatDate(date){
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
    }

    requestPromise(options, success, fail) {
        let that = this;
        return new Promise((resolve,reject)=>{
            if(options.api !== undefined) {
                let api = API_LIST[options.api];
                let _apiArr = api.split('/');
                let _apiLastName = _apiArr[_apiArr.length -1];
                
                if(!api) {
                    console.log('error', 'api 不存在', options.api);
                    return;
                }

                !options.hideToast && Toast.loading('数据加载中...', 0);

                $.ajax({
                    "url": api,
                    "type": options.type || "get",
                    "ContentType": options.ContentType || "application/x-www-form-urlencoded; charset=UTF-8",
                    "dataType": options.dataType || "json",
                    "data": options.params || "",
                    "traditional": true,
                    "timeout": 600000,
                    //内网测试要打开
                    "beforeSend" : function(request) {
                        request.setRequestHeader("Authorization", that.getCookie("Authorization"));
                    },
                    // "async":false//证书过期处理方法，打包时记得取消
                })
                    .done(function (result) {
                        if (result.code === '203') {
                            Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 3);
                            return false;
                        } else if (result.code === '202') {
                            Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 2);
                        } else {
                            !options.hideToast && Toast.hide();
                        }
                        resolve(result);
                    })
                    .fail(function (errorThrown) {
                        if( errorThrown.status === 0 || errorThrown.status === 500 ) {
                            Toast.offline("请求超时，请重试！", 3);
                        } else {
                            Toast.hide();
                            Toast.offline("接口请求失败，状态码："+ errorThrown.status +"，请联系管理员！ ", 3);
                        }
                        reject(errorThrown);
                    });

            }
        })
    }


    /**
     *
     *  利用递归返回一个深度克隆的对象
     * @param {Object} data 需要被clone 的元素
     */
    deepClone(data) {
        let _data;
        switch(typeof data) {
            case 'string':
                _data = data + '';
                break;
            case 'number':
                _data = + data;
                break;
            case 'boolean':
                _data = !!data;
                break;
            default:
            case 'object':
                _data = this._clone(data);
                break;
        }
        return _data;
    }

    /**
     *
     *  递归克隆
     * @private
     * @param {Object} data
     * @param {Boolean} isFormatData        是否需要格式化
     */
    _clone(data, isFormatData) {
        var isArray = data instanceof Array,
            o = isArray ? [] : {},
            i, ni, it, itType;
        if (isArray) {
            for (i = 0, ni = data.length; i < ni; i++) {
                it = data[i];
                itType = typeof it;
                o.push(itType === 'object' ?
                    this._clone(it, isFormatData) : it);
            }
        } else if (data === null) {
            o = null;
        } else {
            for (i in data) {
                it = data[i];
                itType = typeof it;
                o[isFormatData ? '"' + i + '"' : i] = itType === 'object' ?
                    this._clone(it, isFormatData) : it;
            }
        }
        return o;
    }

    setCookie(key, val) {
        document.cookie = key + "="+ escape (val);
    }
    
    getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else {
            return null;
        }
    }

    changeTilte(name) {
        document.title = name;
    }

    formatPhone(val) {
        let reg = /^[0-9]*$/;
        if(!val || (val.length !== 11)) {
            return val;
        }
        if(val && reg.test(val)) {
            let reg = /^(\d{3})(\d{4})(\d{4})$/;
            let matches = reg.exec(val);
            let newNum = matches[1] + ' ' + matches[2] + ' ' + matches[3];
            return newNum;
        } else {
            return '---'
        }
    }

    //千分位处理
    fmoney(val, noDecimal) {
        let reg = /^\d+(\.\d+)?$/;
        if(val && reg.test(val)) {
            let n = 2;
            let s= val;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            let t = "";
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            if(noDecimal) {
                return t.split('').reverse().join('');
            } else {
                return t.split('').reverse().join('') + "." + r;
            }

        } else {
           return val;
        }
    }

    //超长显示省略号
    ellipsis(str,max) {
        if (str.length > max) {
            return str.substring(0, max) + "…";
        } else {
            return str;
        }
    }


    watermark(settings) {
        //默认设置
        var defaultSettings={
            watermark_txt:"text",
            watermark_x:15,//水印起始位置x轴坐标
            watermark_y:15,//水印起始位置Y轴坐标
            watermark_rows:20,//水印行数
            watermark_cols:0,//水印列数
            watermark_x_space:30,//水印x轴间隔
            watermark_y_space:0,//水印y轴间隔
            watermark_color:'#ccc',//水印字体颜色
            watermark_alpha:0.4,//水印透明度
            watermark_fontsize:'.12rem',//水印字体大小
            // watermark_font:'微软雅黑',//水印字体
            watermark_width:65,//水印宽度
            watermark_height:75,//水印长度
            watermark_angle:20//水印倾斜度数
        };
        //采用配置项替换默认值，作用类似jquery.extend
        if(arguments.length===1&&typeof arguments[0] ==="object" )
        {
            var src=arguments[0]||{};
            for(let key in src)
            {
                if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
                    continue;
                else if(src[key])
                    defaultSettings[key]=src[key];
            }
        }

        var oTemp = document.createDocumentFragment();

        //获取页面最大宽度
        var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
        var cutWidth = page_width*0.03;
        var page_width=page_width-cutWidth;
        //获取页面最大高度
        var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+450;
        // var page_height = document.body.scrollHeight+document.body.scrollTop;
        //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
        if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
            defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
            defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
        }
        //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
        if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
            defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
            defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
        }
        var x;
        var y;


        for (var i = 0; i < defaultSettings.watermark_rows; i++) {
            y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
            for (var j = 0; j < defaultSettings.watermark_cols; j++) {
                x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
                if(i%2 !== 1 || j !==2) {
                    var mask_div = document.createElement('div');
                    mask_div.id = 'mask_div' + i + j;
                    mask_div.className = 'mask_div';
                    mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
                    //设置水印div倾斜显示
                    mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.visibility = "";
                    mask_div.style.position = "fixed";
                    mask_div.style.left = (x + 60*(i%2) )+ 'px';
                    mask_div.style.top = y + 'px';
                    mask_div.style.whiteSpace = "nowrap";
                    // mask_div.style.overflow = "hidden";
                    mask_div.style.zIndex = "9999";
                    mask_div.style.pointerEvents='none';//pointer-events:none  让水印不遮挡页面的点击事件
                    //mask_div.style.border="solid #eee 1px";
                    mask_div.style.opacity = defaultSettings.watermark_alpha;
                    mask_div.style.fontSize = defaultSettings.watermark_fontsize;
                    mask_div.style.fontFamily = defaultSettings.watermark_font;
                    mask_div.style.color = defaultSettings.watermark_color;
                    mask_div.style.textAlign = "center";
                    mask_div.style.width = defaultSettings.watermark_width + 'px';
                    mask_div.style.height = defaultSettings.watermark_height + 'px';
                    mask_div.style.display = "block";
                    oTemp.appendChild(mask_div);
                }
            };
        };
        document.body.appendChild(oTemp);
    }

}

module.exports = Module;