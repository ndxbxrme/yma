module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: ['build']
    coffee:
      options:
        sourceMap: false
      default:
        files: [
          expand: true
          cwd: 'src'
          src: ['yma.coffee']
          dest: 'tmp'
          ext: '.js'
        ,
          expand: true
          cwd: 'src'
          src: ['index.coffee']
          dest: 'dist'
          ext: '.js'
        ]
    clean:
      build: ['tmp', 'dist']
    file_append:
      build:
        files: [
          prepend: "var acorn = require('acorn');acorn.walk = require('acorn/dist/walk');"
          input: 'tmp/yma.js'
          output: 'dist/yma.js'
        ]
    concat:
      build:
        src: ['lib/acorn/acorn.min.js', 'lib/acorn/walk.min.js', 'tmp/yma.js']
        dest: 'dist/yma-bower.js'
  grunt.registerTask 'build', [
    'clean:build'
    'coffee'
    'file_append'
    'concat'
  ]
  grunt.registerTask 'default', [
    'build'
    'watch'
  ]
  grunt.registerTask 'test', [
    'build'
    'nodeunit'
  ]