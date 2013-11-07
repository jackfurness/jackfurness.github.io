module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			version: '0.1.0'
		},
		banner: '/*! <%= pkg.name %> - v<%= meta.version %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>*/\n',
		jekyll: {                               // Task
	      options: {                            // Universal options
	        bundleExec: true,
	        src : ''
	      },
	    dist: {                             // Target
	      options: {                           // Target options
	        dest: '<%= dist %>',
	        config: '_config.yml'
	      },
	    serve: {                            // Another target
	      options: {
	        dest: '.jekyll',
	        drafts: true
	      }
	    }
	    },
	    serve: {
	    	serve : true
	    }
	  },
		copy: {
			fonts: {
				files: [
					{expand: true, flatten: true, src: ['src/fonts/**'], dest: 'fonts/', filter: 'isFile'}
				]
			}
		},
		sass: {
			jack: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: ['css/style.scss'],
					dest: '',
					ext: '.css'
				}]
			}
		},
		csslint: {
			dev: {
				options: {
					"outline-none": false,
					"star-property-hack": false,
					"adjoining-classes": false,
					"unqualified-attributes": false,
					"regex-selectors": false,
					"box-model": false,
					"box-sizing": false,
					"compatible-vendor-prefixes": false,
					"universal-selector": false,
					"important": false,
					"unique-headings": false,
					"font-sizes": false,
					"fallback-colors": false,
					"errors": false /* considers -ms-viewport an error */
				},
				src: ['css/**/*.css']
			},
		},
		
		watch: {
			dev: {
				files: 'src/css/**/*.scss'
			}
		},
		imagemin: {
			dev: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**/*.{png,jpg,jpeg}'],
					dest: 'img/'
				}]
			}
		}
	});

	grunt.registerTask('default');
	grunt.registerTask('build', ['jekyll:dist', 'sass:jack', 'imagemin:dev', 'copy:fonts']);
};