/*
 * @Author: your name
 * @Date: 2021-05-11 11:07:45
 * @LastEditTime: 2021-05-12 13:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \英雄联盟手游移动\js\news.js
 */

(function () {
    // 轮播图
    var carouselDatas = [
        {
            link:
                "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
            image:
                "https://ossweb-img.qq.com/upload/adw/image/20191015/80cbdbaff4a1aa009f61f9240a910933.jpeg",
        },
        {
            link:
                "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
            image:
                "https://ossweb-img.qq.com/upload/adw/image/20191015/696545e262f2cbe66a70f17bf49f81e0.jpeg",
        },
        {
            link:
                "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
            image:
                "https://ossweb-img.qq.com/upload/adw/image/20191018/3c910d44898d7221344718ef3b7c0a7e.jpeg",
        },
    ];
    createCarousel('news_container', carouselDatas);

    // 请求数据
    ajax(
        "https://apps.game.qq.com/cmc/cross?serviceId=166&source=web_pc&filter=channel&chanid=4897&typeids=1&limit=4&start=0&sortby=sIdxTime"
    ).then(function (resp) {
        var ulList = $('.news_container .news_list');
        var html = ''; // 字符串拼接
        for(var i = 0; i < resp.data.items.length; i++) {
            var data = resp.data.items[i];
            var type = data.sTagInfo.split(",")[0].split("|")[1];
            html += `<li>
                        <span>${type}</span>
                        <p>${data.sTargetIdxTime}</p>
                        <a href="https://lolm.qq.com/m/news_detail.html?docid=8804770001019449555" target="_blank">
                            ${data.sTitle}
                        </a>
                    </li>
                    `
        }
        ulList.innerHTML = html;
    })
})();