var showPage = (function () {
    /*
     * @Author: your name
     * @Date: 2021-05-08 22:05:43
 * @LastEditTime: 2021-05-12 17:46:18
 * @LastEditors: Please set LastEditors
     * @Description: In User Settings Edit
     * @FilePath: \英雄联盟手游移动\js\page.js
     */

    var pageIndex = 0; // 显示那一个页面的标记
    var pages = $$('.page'); // 获取所有的page页面
    var nextPageIndex = null; // 默认是没有下一个页面,来存储下一个移动后成为显示页面的标记 

    /**
     * @description: 静态定位函数
     * @param {*}
     * @return {*}
     */
    function setStatic() {

        for (var i = 0; i < pages.length; i++) {
            // 计算每个页面的top值
            var topValue = (i - pageIndex) * height();
            // 获取每个page元素
            var page = pages[i];
            page.style.top = topValue + 'px';
            // 设置每个页面的z-index的值
            if (i == pageIndex) {
                page.style.zIndex = 1;
            } else {
                page.style.zIndex = 30;
            }
        }
    }
    // 页面定位初始化
    setStatic();

    /**
     * @description: 移动页面函数
     * @param {*} dis 手指滑动的距离
     * @return {*}
     */
    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; // 获取每一个页面元素
            var topValue = (i - pageIndex) * height(); // 计算每个元素的top值
            if (i !== pageIndex) {
                page.style.top = topValue + dis + 'px';
            }
            // 向上滑动时，即将要显示的页面标记
            if (dis < 0 && pageIndex < pages.length - 1) {
                nextPageIndex = pageIndex + 1;
            }
            // 向下滑动时，即将要显示的页面标记
            else if (dis > 0 && pageIndex > 0) {
                nextPageIndex = pageIndex - 1;
            } else {
                nextPageIndex = null;
            }
        }
    }

    /**
     * @description: 完成移动复位
     * @param {*}
     * @return {*}
     */
    function finishMove() {
        // 复位
        if (nextPageIndex === null) {
            setStatic();
            return;
        }
        // 获取下一个页面的显示元素
        var nextPage = pages[nextPageIndex];
        nextPage.style.transition = '.5s'; // 500ms过渡
        nextPage.style.top = 0;
        setTimeout(function () {
            // 当过渡完需要做的事情
            pageIndex = nextPageIndex;
            nextPage.style.transition = '';
            // 所有元素进行复位
            setStatic();
        }, 500);
    }

    // 滑动事件
    var pageContainer = $('.page_container'); // 获得滑动的容器
    pageContainer.ontouchstart = function (e) {
        // 获得第一个手指按下时的位置
        var y = e.touches[0].clientY;
        /**
        * @description: 处理手指移动函数
        * @param {*} e
        * @return {*}
        */
        function handler(e) {
            var moveY = e.touches[0].clientY;
            var dis = moveY - y;  // 获得手指移动的距离
            // 如果手指移动的距离不超过20，那么就不移动
            if (Math.abs(dis) < 20) {
                dis = 0;
            }
            if (e.cancelable) {
                // 如果事件可以取消，俺么就取消默认事件
                e.preventDefault();
            }
            moving(dis); // 进行页面的移动
        }
        // 手指移动时的距离
        pageContainer.addEventListener('touchmove',handler ,{
            passive: false,
        })
            
        // 手指抬起完成移动
        pageContainer.ontouchend = function () {
            finishMove();
            pageContainer.removeEventListener('touchmove', handler);
        }
    }


    function showPage(index) {
        var nextPage = pages[index];
        nextPageIndex = index; // 设置下一个页面的索引
        // 点击的页面和当前页面是同一个页面的话
        if (pageIndex == index) {
            if (pageIndex == 0) {
                pageIndex++;
            } else {
                pageIndex--;
            }
            // 进行复位
            setStatic();
        }
        // 因为浏览器的渲染是非常快的，确定最后的值后才会进行页面渲染
        // 强行让浏览器进行渲染
        nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
        finishMove(); // 完成移动
    }
    return showPage;
})();