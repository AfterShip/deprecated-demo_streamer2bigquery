'use strict';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc'
			},
			target: ['**/*.js', '!**/node_modules/**']
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-eslint');

	// Default task.
	grunt.registerTask('default', [
		'eslint'
	]);
};
