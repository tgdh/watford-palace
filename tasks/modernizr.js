'use strict';
module.exports = {
    dist: {
        'cache' : true,
        'devFile' : '<%= assetsFolder %>/_components/modernizr/modernizr.js',
        'dest' : '<%= assetsBuildFolder %>/js/lib/modernizr.js',

        // Based on default settings on http://modernizr.com/download/
        'options' : [
            'setClasses',
            'addTest',
            'html5printshiv',
            'testProp',
            'fnBind'
        ],
        'enableJSClass': true,
        'uglify' : false,
        'tests' : [],
        'excludeTests': [],
        'crawl' : true,
        'useBuffers' : false,
        'files' : {
            'src': [
                '<%= assetsFolder %>/js/**/*.js',
                '<%= assetsFolder %>/sass/**/*.scss'
            ]
        },
        'customTests' : []
    }
};
