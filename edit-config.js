const YAML = require('yaml');
const fs = require('fs');

const path = __dirname + '/static/admin/config.yml';

const cfg = YAML.parse(fs.readFileSync(path, 'utf8'));

switch (process.argv[2]) {
    case 'enable':
        cfg.local_backend = true;
        break;
    case 'disable':
        cfg.local_backend = false;
        break;
}

fs.writeFileSync(path, YAML.stringify(cfg), 'utf8');