/**
 * 获取标签到顶部距离
 * @returns {*}
 */
function scroll() {
    if (window.pageYOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode === "CSS1Compat") { //严格模式 遵守W3C标准
        return {
            top: document.documentElement.offsetTop,
            left: document.documentElement.offsetLeft
        }
    } else {
        // 怪异模式，并未遵守W3C标准 document.compatMode ==="BackCompat"
        return {
            top: document.body.offsetTop,
            left: document.body.offsetLeft
        }
    }

}

//获取标签ID
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

//获取屏幕宽度高度
function client() {
    if (window.innerWidth) { //ie9最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {  //严格模式
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}

//阻止冒泡
function stopPop() {
    if (event && event.stopPropagation()) { //w3c
        event.stopPropagation();
    } else {//IE 678
        event.cancelBubble = true;
    }
}

//匀速动画函数
function move(ele, end, speed) {
    //清除定时器
    clearInterval(ele.timer);
    //判断运动方向
    var dir = ele.offsetLeft < end ? speed : -speed;
    //设置定时器
    ele.timer = setInterval(function () {
        ele.style.left = ele.offsetLeft + dir + 'px';
        if (Math.abs(end - ele.offsetLeft) <= Math.abs(speed)) {
            clearInterval(ele.timer);
            ele.style.left = end + 'px';
        }
    }, 20);
}

/**
 * 获取css属性值
 * @param {string} obj
 * @param {string}attr
 * @returns {*}
 */
function getCSSValue(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

//缓动动画函数

function buffer(obj, json, fn) {
    clearInterval(obj.timer);
    var begin = 0, step = 0, target = 0;
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {

            //求出初始值
            if (k === "opacity") { //透明度
                begin = parseInt(parseFloat(getCSSValue(obj, k) * 100)) || 0;
                target = parseInt(parseFloat(json[k] * 100));
            } else if ("scrollTop" === k) {
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            } else {
                begin = parseInt(getCSSValue(obj, k)) || 0;
                target = parseInt(json[k]);
            }

            //求出步长
            step = (target - begin) * 0.2;

            //判断 是否向上取整
            step = target > begin ? Math.ceil(step) : Math.floor(step);

            //使box移动
            if (k === "opacity") {//透明度
                // w3c的浏览器
                obj.style.opacity = (begin + step) / 100;
                // ie 浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + step) + ')';
            } else if ("scrollTop" === k) {
                obj.scrollTop = begin + step;
            } else if (k === "zIndex") { //z-index
                obj.style[k] = json[k];
            } else {
                obj.style[k] = begin + step + "px";
            }
            //清除定时器条件

            if (target !== begin) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            //判断是否有回调函数
            if (fn) {
                fn();
            }
        }

    }, 20);

}

