
//瀑布流布局
function waterFall(parent,child) {
    //使父盒子居中，先设置宽度
    //父盒子宽度 = 列数 *box宽度
    //box宽度 =box.offsetWidth
    //获取所有子盒子
    var allBox = $(parent).getElementsByClassName(child);
    //获取自盒子宽度
    var boxWidth = allBox[0].offsetWidth;
    //屏幕宽度
    var screenX = $(parent).offsetWidth;
    //列数 = 屏幕宽度／box宽度
    var col = parseInt(screenX / boxWidth);
    var xyMargin = 16;

    //计算每个盒子的高度。并且取出前几个盒子 放到每一行，每一行的盒子高度相当于一个数组
    var heightArr = [], boxHeight, minBoxHeight, minBoxIndex;

    for (var i = 0; i < allBox.length; i++) {
        boxHeight = allBox[i].offsetHeight +xyMargin;
        if (i < col) {//取出第一行高度数组（5列，放5个元素，index为4）
            heightArr.push(boxHeight);
            allBox[i].style.position = "absolute";
            allBox[i].style.left = i * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top =  xyMargin + 'px';
        } else {//剩余行
            //取出一行中高度最矮的盒子及其索引，并将下一行的第一个盒子放在其后
            minBoxHeight = _.min(heightArr); //取出一行中最矮的盒子高度
            //取出最矮盒子的索引
            minBoxIndex = getMinIndex(heightArr, minBoxHeight);
            //子盒子定位
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top = minBoxHeight +  xyMargin + 'px';
            //更新最矮盒子高度
            heightArr[minBoxIndex] = minBoxHeight + boxHeight;
        }
    }
    // 5. 更新父盒子的高度
    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    $(parent).style.height = parentHeight+'px';

}

/**
 * 取出最矮盒子高度的索引
 * @param arr 遍历的数组
 * @param val 最低高度
 * @returns {number}  最低高度盒子的索引
 */
function getMinIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}




//检查图片是否允许加载
function checkLoadImage() {
    //当最后一张图片加载过半，允许继续加载图片
    //最后一张图片距离顶部的距离<= 屏幕高度+滚动距离
    //    获取最后一张图片
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];
    //最后一张图片距离顶部的距离
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    var screenH = document.documentElement.clientHeight || document.body.clientHeight; // 屏幕高度
    var scrollTop = scroll().top; //滚动距离

    return lastBoxDis <= screenH + scrollTop;
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}