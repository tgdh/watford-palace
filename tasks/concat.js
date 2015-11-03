'use strict';
module.exports = {
    inline: {
        src: [
            '<%= assetsFolder %>/js/enhance.js'
        ],
        dest: '<%= assetsBuildFolder %>/js/inline.js'
    },
    head: {
        src: [
            '<%= assetsBuildFolder %>/js/lib/modernizr.js',
            '<%= assetsFolder %>/_components/picturefill/dist/picturefill.js',
            '<%= assetsFolder %>/js/lib/lazysizes.config.js',
            '<%= assetsFolder %>/_components/lazysizes/lazysizes.js',
            '<%= assetsFolder %>/_components/lazysizes/plugins/unveilhooks/ls.unveilhooks.js'
        ],
        dest: '<%= assetsBuildFolder %>/js/head.js'
    },
    fulljs: {
        src: [
            '<%= assetsFolder %>/_components/OnMediaQuery/js/onmediaquery.js',
            '<%= assetsFolder %>/_components/jquery-sliding-menu/js/jquery-sliding-menu.js',
            '<%= assetsFolder %>/_components/OwlCarousel2/dist/owl.carousel.js',
            '<%= assetsFolder %>/_components/SelectOrDie/_src/selectordie.js',
            '<%= assetsFolder %>/_components/magnific-popup/dist/jquery.magnific-popup.js',
            '<%= assetsFolder %>/_components/tabby/dist/js/tabby.js',
            '<%= assetsFolder %>/_components/jquery.fitvids/jquery.fitvids.js',
            '<%= assetsFolder %>/js/utils/*js',
            '<%= assetsFolder %>/js/components/*js',
            '<%= assetsFolder %>/js/main.js'
        ],
        dest: '<%= assetsBuildFolder %>/js/main.js'
    }
};
