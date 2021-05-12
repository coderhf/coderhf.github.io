/*
 * @Author: your name
 * @Date: 2021-05-11 11:18:28
 * @LastEditTime: 2021-05-12 13:24:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \英雄联盟手游移动\js\games.js
 */

(function () {
    var carouselData = [
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
        },
    ];
    createCarousel("games_container", carouselData);

    var container = $('.games_container');
    container.ontouchstart = function (e) {
        if (container.scrollTop >= 10) {
            e.stopPropagation(); // 阻止事件冒泡
        }
    }
})();