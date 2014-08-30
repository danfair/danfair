
module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['wp-content/themes/danfair_v1/js/waypoints/*.js', 'wp-content/themes/danfair_v1/js/*.js'],
        dest: 'wp-content/themes/danfair_v1/js/global.min.js'
      }
    },

    jshint: {
      src: ['Gruntfile.js', 'wp-content/themes/danfair_v1/js/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
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

    watch: {
        files: '<%= uglify.build.src %>',
        tasks: 'uglify',
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['uglify', 'watch']);


};