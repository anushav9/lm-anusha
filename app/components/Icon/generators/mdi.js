/* MDI map generator
 */

const fs = require('fs');
const path = require('path');

const variables_scss = fs.readFileSync(path.resolve(process.cwd(), 'node_modules/mdi/scss/_variables.scss'), 'utf8');

const vars_string = variables_scss.substr(
    variables_scss.indexOf('$mdi-icons: ('),
    variables_scss.length
);

const variableRegex = /"((?:[a-z0-9-]*))": ((?:[a-z0-9]*))/i;

let map = '/* eslint-disable */ \nconst map = {\n';
vars_string.split('\n').forEach(line => {
    if (variableRegex.test(line.trim())) {
        const match = line.trim().match(variableRegex);
        map += "    '" + match[1] + "': '\\u" + match[2] + "',\n";
    }
});
map += '}\nexport default map;\n';

if (!fs.existsSync(path.join(__dirname, '../fonts/mdi'))) {
    fs.mkdirSync(path.join(__dirname, '../fonts/mdi'));
}
fs.writeFileSync(path.join(__dirname, '../fonts/mdi/map.js'), map);
