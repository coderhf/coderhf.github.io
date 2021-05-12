/*
 * @Author: your name
 * @Date: 2021-05-08 10:19:43
 * @LastEditTime: 2021-05-08 15:53:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \英雄联盟手游移动\js\menu.js
 */
(function () {
    var menuSwitch = $('.menu_switch');
    var menuNav = $('.menu_nav');
    /**
     * @description: 切换样式功能
     * @param {*}
     * @return {*}
     */
    function toggleNav() {
        menuSwitch.classList.toggle("menu_switch--expand");
        menuNav.classList.toggle("menu_nav--expand");
    }
    // 点击事件
    menuSwitch.onclick = toggleNav;
    menuNav.addEventListener('click', function () {
        toggleNav();
    });
})();