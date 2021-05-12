/*
 * @Author: your name
 * @Date: 2021-05-07 19:02:38
 * @LastEditTime: 2021-05-12 13:30:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \英雄联盟手游移动\js\common.js
 */
function $(className) {
    return document.querySelector(className);
}

function $$(className) {
    return document.querySelectorAll(className);
}

function width() {
    return document.documentElement.clientWidth;
}

function height() {
    return document.documentElement.clientHeight;
}


/**
 * @description: 轮播图组件
 * @param {*} carouselId 容器id
 * @param {*} datas 轮播图数据
 * @return {*}
 */
function createCarousel(carouselId, datas) {
    var container = document.getElementById(carouselId); // 获取轮播图容器
    // 获取各个dom元素
    var carouselList = container.querySelector('.g_carousel-list');
    var carouselIndicator = container.querySelector('.g_carousel-indicator');
    var carouselPrev = container.querySelector('.g_carousel_prev');
    var carouselNext = container.querySelector('.g_carousel_next');
    var curIndex = 0; // 当前索引
    var timer = null; // 定时器标记

    /**
     * @description: 创建轮播图中数据的元素
     * @param {*}
     * @return {*}
     */
    function creatCarouselElements() {
        var carouselHtmls = ''; // 轮播图列表内部的html结构
        var indicatorHtmls = ''; // 指示器内部的html结构
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i]; // 拿到每一个数据（对象)
            // 用ES6的模板字符串进行拼接
            // 判断是否有链接
            if (data.link) {
                carouselHtmls += `<li>
                                <a href="${data.link}"
                                    target="_blank">
                                    <img src="${data.image}">
                                </a>
                              </li>`
            } else {
                carouselHtmls += `<li>
                                <img src="${data.image}">
                              </li>`
            }


            indicatorHtmls += `<li class=""></li>`;
        }
        // 设置轮播容器ul的宽度
        carouselList.style.width = datas.length * 100 + '%';
        carouselList.innerHTML = carouselHtmls;
        carouselIndicator.innerHTML = indicatorHtmls;
    }

    creatCarouselElements();

    /**
     * @description: 设置轮播图的状态
     * @param {*}
     * @return {*}
     */
    function setStatus() {
        carouselList.style.marginLeft = -curIndex * width() + 'px';  // 轮播图每一次要移动的距离
        // 设置指示器的变化
        // 清除当前的selected
        var beforeSelected = container.querySelector('.selected'); // 获取当前游状态的指示器项目
        beforeSelected && beforeSelected.classList.remove('selected');
        carouselIndicator.children[curIndex].classList.add('selected');

        // 设置箭头的状态切换
        // 如果有前箭头，因为组件里面可能会不设置箭头，所以需要进行箭头的判断
        if (carouselPrev) {
            if (curIndex == 0) {
                // 第一张
                carouselPrev.classList.add('disabled');
            } else {
                carouselPrev.classList.remove('disabled');
            }
        }
        // 如果有下箭头
        if (carouselNext) {
            if (curIndex == datas.length - 1) {
                // 最后一张
                carouselNext.classList.add('disabled');
            } else {
                carouselNext.classList.remove('disabled');
            }
        }
    }

    setStatus();

    /**
     * @description: 去上一个
     * @param {*}
     * @return {*}
     */
    function toPrev() {
        // 没有上一个则返回
        if (curIndex == 0) {
            return;
        }
        curIndex--;
        setStatus();
    }

    /**
     * @description: 去下一个
     * @param {*}
     * @return {*}
     */
    function toNext() {
        // 没有下一个则返回
        if (curIndex == datas.length - 1) {
            return;
        }
        curIndex++;
        setStatus();
    }

    /**
     * @description: 开始自动切换
     * @param {*}
     * @return {*}
     */
    function start() {
        // 如果已经开启定时器就不用在开启了（已经开始切换了）
        if (timer) {
            return;
        }
        timer = setInterval(function () {
            curIndex++;
            // 如果切换超过最后一张，那就切换到第一张
            if (curIndex == datas.length) {
                curIndex = 0;
            }
            setStatus();
        }, 2000)
    }

    start();

    /**
     * @description: 停止自动切换
     * @param {*}
     * @return {*}
     */
    function stop() {
        clearInterval(timer);
        timer = null;
    }

    // 点击事件
    if (carouselPrev) {
        carouselPrev.onclick = toPrev;
    }

    if (carouselNext) {
        carouselNext.onclick = toNext;
    }

    // 手指滑动进行切换
    container.ontouchstart = function (e) {
        // 阻止事件冒泡
        e.stopPropagation();
        var x = e.touches[0].clientX; // 记录手指按下去的横坐标
        stop(); // 停止自动切换
        carouselList.style.transition = 'none'; // 去掉过渡
        var pressTime = Date.now(); // 手指按下的时间
        // 手指移动事件
        container.ontouchmove = function (e) {
            var dis = e.touches[0].clientX - x; // 计算拖动的距离
            // 手指拖动轮播图该走的距离
            carouselList.style.marginLeft = -curIndex * width() + dis + 'px';
        }
        // 手指抬起事件
        container.ontouchend = function (e) {
            var dis = e.changedTouches[0].clientX - x; // 获取从手指触摸屏幕到手指离开平魔的距离
            start(); // 自动切换开始
            carouselList.style.transition = ''; // 添加原来的过渡时间
            container.ontouchmove = null; // 取消监听
            var duration = Date.now() - pressTime; // 得到手指滑动的时间
            // 滑动时间少于300毫秒
            if (duration < 300) {
                // 手指滑动距离必须超过20，并且不是第一张
                if (dis > 20 && curIndex > 0) {
                    // 切换到上一张
                    toPrev();
                } else if (dis < - 20 && curIndex < datas.length - 1) {
                    // 切换到下一张
                    toNext();
                } else {
                    setStatus(); // 不用切换（切换到原来的位置）
                }
            } else {
                // 滑动时间大于300毫秒必须要滑动一半的距离才会切换
                if (dis > width() / 2 && curIndex > 0) {
                    toPrev();
                } else if (dis < - width() / 2 && curIndex < datas.length - 1) {
                    toNext();
                } else {
                    setStatus();
                }
            }

        }
    }
}

// ajax请求 cors-跨域资源共享（解决方案）
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
        throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
        headers: {
            target,
        },
    }).then((r) => r.json());
}