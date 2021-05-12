/*
 * @Author: your name
 * @Date: 2021-05-08 15:55:14
 * @LastEditTime: 2021-05-12 12:01:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \英雄联盟手游移动\js\pop.js
 */

var showPop = (function () {
    /**
     * @description: 显示弹出框
     * @param {*} id
     * @return {*}
     */
    function showPop(id) {
        var container = $('#' + id);
        // 显示弹框
        container.style.display = '';
        if (id == 'popVideo') {
            // 自动播放
            var vdo = container.querySelector('video');
            vdo.play();
        }
    }

    // 获取所有的关闭按钮
    var closeBtns = $$('.pop_close');
    for(var i = 0; i < closeBtns.length; i++) {
        closeBtns[i].onclick = function () {
            var container = this.parentElement.parentElement;
            container.style.display = 'none';
        }
    }

    // 处理敬请关注弹框中的微信和qq选中效果
    var popWx = $('.pop_wx');
    var popQQ = $('.pop_qq');
    popWx.onclick = function () {
        this.classList.add('selected');  // 如果没有的话就会添加这个类，不然就不会添加
        popQQ.classList.remove('selected');
    }
    popQQ.onclick = function () {
        this.classList.add('selected');
        popWx.classList.remove('selected');
    }

    // 关闭视频弹窗
    var closeBtn = $('#popVideo .pop_close');
    closeBtn.addEventListener('click', function () {
        $('#popVideo video').pause();
    })

    //  将showPop返回出去（全局使用）
    return showPop;
})();