require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': './libs/jquery-3.1.1.min',
        'swiper': './libs/swiper-4.3.3.min',
        'bscroll': './libs/bscroll',
        'hand': './libs/handlebars-v4.0.11',
        'index': './page/index',
        'commin': './commin/commin'
    }
})
require(['index']);