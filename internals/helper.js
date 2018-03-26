/* eslint-disable */
const watch = require('node-watch');
const fs = require('fs');

let fileStructure = getStructure();

writeExports(getStructure());

watch('./app/components', () => {
    const newFileStructure = getStructure();
    if (JSON.stringify(fileStructure) !== JSON.stringify(newFileStructure)) {
        fileStructure = newFileStructure;
        console.log('writing...');
        writeExports(newFileStructure);
    }
});

function getStructure(folder = './app/components') {
    const fileContents = fs.readdirSync(folder);
    const fileTree = [];
    let stats;

    fileContents.forEach(fileName => {
        stats = fs.lstatSync(folder + '/' + fileName);

        if (stats.isDirectory()) {
            const children = getStructure(folder + '/' + fileName);
            const structure = { name: fileName };

            if (fs.existsSync(folder + '/' + fileName + '/index.jsx')) {
                if (children.length > 0) structure.children = children;
                fileTree.push(structure);
            }
        }
    });

    return fileTree;
}

function writeExports(tree) {
    let content = '';

    tree.forEach(folder => {
        content += `export ${folder.name} from './${folder.name}';\n`;
        if (folder.children) {
            folder.children.forEach(subfolder => {
                content += `export ${folder.name}_${subfolder.name} from './${folder.name}/${subfolder.name}';\n`;
            });
        }
    });

    const currentContent = fs.readFileSync('./app/components/index.js');

    if (content !== currentContent) fs.writeFileSync('./app/components/index.js', content);
}
