module.exports = {
	apps: [
		{
			name: 'api-app',
			script: './server/src/index.js',
			watch: false,
			max_memory_restart: '500M',
			instances: 'max',
			instance_var: 'INSTANCE_ID',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};