require(['jquery', 'swiper', 'bscroll', 'commin'], function($, swiper, bscroll, commin) {
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                commin('#swiper', res.mag, '.swiper-wrapper');
                new swiper('.banner')
            }
        }
    })


    function Ajax(limit) {
        $.ajax({
            url: '/api/list',
            dataType: 'json',
            data: {
                limit: limit,
                sum: sum
            },
            success: function(res) {
                if (res.code === 1) {
                    commin('#list', res.mag, '.con');
                    onbs.refresh();
                }
            }
        })
    }
    var onbs = new bscroll('.main', {
        probeType: 2,
        click: true
    });
    var limit = 1,
        sum = 10,
        len = 3;
    Ajax(limit);
    onbs.on('scroll', function() {
        if (this.y < this.maxScrollY - 44) {
            $('.cont').attr('down', '释放加载更多')
        } else if (this.y < this.maxScrollY - 20) {
            $('.cont').attr('down', '上拉加载更多')
        } else if (this.y > 44) {
            $('.cont').attr('up', '释放刷新')
        }

    });
    onbs.on('touchEnd', function() {
        if ($('.cont').attr('down') === '释放加载更多') {
            if (limit < len) {
                limit++;
                Ajax(limit);
                $('.cont').attr('down', '上拉加载更多')
            } else {
                $('.cont').attr('down', '暂无更多数据')
            }
        } else if ($('.cont').attr('up') === '释放刷新') {
            location.reload();
        }
    })

})