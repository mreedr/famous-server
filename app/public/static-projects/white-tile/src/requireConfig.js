/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '/static-projects/white-tile/lib/famous',
        requirejs: '/static-projects/white-tile/lib/requirejs/require',
        almond: '/static-projects/white-tile/lib/almond/almond'
    },
    packages: [

    ]
});
require(['main']);
