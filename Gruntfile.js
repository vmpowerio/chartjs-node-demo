var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

var files = ['modules/**/*.js', 'resource-descriptions/**/*.js', 'middleware/**/*.js', 'routes/**/*.js', 'models/**/*.js', 'test/**/*.js', './Gruntfile.js'];

grunt.initConfig({
    copy: {
        css: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'styles/style.css',
                        'bower_components/materialize/dist/css/materialize.min.css',
                        'bower_components/prism/themes/prism-dark.css',
                        'bower_components/material-design-icons/iconfont/material-icons.css'
                    ],
                    dest: 'public/stylesheets',
                    filter: 'isFile'
                }
            ]
        },
        js: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_components/ace-builds/src-min/ace.js',
                        'bower_components/ace-builds/src-min/ext-searchbox.js',
                        'bower_components/ace-builds/src-min/mode-json.js',
                        'bower_components/ace-builds/src-min/theme-monokai.js',
                        'bower_components/ace-builds/src-min/worker-json.js',
                        'bower_components/jquery/dist/jquery.min.js'
                    ],
                    dest: 'public/javascripts',
                    filter: 'isFile'
                }
            ]
        },
        fonts: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff',
                        'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
                        'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.svg',
                        'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
                        'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.eot'
                    ],
                    dest: 'public/stylesheets',
                    filter: 'isFile'
                }
            ]
        },
        images: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'img/chartjsnode.png',
                        'img/favicon.ico'
                    ],
                    dest: 'public/images',
                    filter: 'isFile'
                }
            ]
        }
    },
    jshint: {
        files: files,
        options: {
            jshintrc: '.jshintrc'
        }
    },
    jscs: {
        files: {
            src: files
        },
        options: {
            config: '.jscsrc',
            esnext: true
        }
    },
    jsbeautifier: {
        write: {
            files: {
                src: files
            },
            options: {
                config: './.beautifyrc'
            }
        }
    }
});
grunt.registerTask('build', ['copy']);
