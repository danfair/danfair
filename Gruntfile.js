
module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'wp-content/themes/danfair_v1/js/script.js',
        dest: 'wp-content/themes/danfair_v1/js/global.min.js'
      }
    },

    jshint: {
      src: ['Gruntfile.js', 'wp-content/themes/danfair_v1/js/script.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,  // avoid some non-errors
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    },

    less: {
      development: {
        files: {
          'wp-content/themes/danfair_v1/style.css': 'wp-content/themes/danfair_v1/style.less'
        }
      },
      production: {
        files: {
          'wp-content/themes/danfair_v1/style.css': 'wp-content/themes/danfair_v1/style.less'
        }
      }
    },

    watch: {
        scripts: {
          files: '<%= uglify.build.src %>',
          tasks: ['uglify', 'jshint']
        },
        css: {
          files: 'wp-content/themes/danfair_v1/style.less',
          tasks: 'less'
        }
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['uglify', 'less', 'watch']);


};