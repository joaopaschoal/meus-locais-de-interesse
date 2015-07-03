module.exports = function(grunt) {
    grunt.initConfig({
        intern: {
            dev: {
                options: {
                    runType: 'runner',
                    config: 'tests/intern'
                }
            }
        },
        esri_slurp: {
            dev: {
                options: {
                    version: '3.13'
                },
                dest: 'src/esri'
            }
        },
        jshint: {
            src: ['Gruntfile.js', 'app/js/**/*.js', 'tests/**/*.js'],
            options: {
                jshintrc: true
            }
        }
    });

    // Loading using a local copy
    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-esri-slurp');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [ 'intern' ]);
};