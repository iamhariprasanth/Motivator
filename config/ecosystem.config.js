module.exports = {
  apps: [{
    name: 'mybraindoctor',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/mybraindoctor',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/mybraindoctor/error.log',
    out_file: '/var/log/mybraindoctor/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
