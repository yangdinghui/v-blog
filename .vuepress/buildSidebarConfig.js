const fs = require('fs');
const path = require('path');

function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries
    .filter(fileDirent => fileDirent.isFile())
    .map(fileDirent => path.join(dir, fileDirent.name))
    .filter(file => file.endsWith('.md'));

  const folders = entries.filter(folderDirent => folderDirent.isDirectory());

  for (const folder of folders) {
    files.push(...findMarkdownFiles(path.join(dir, folder.name)));
  }

  return files;
}

function buildSidebarConfig(docsDir) {
  const markdownFiles = findMarkdownFiles(docsDir);

  const sidebarConfig = {};

  for (const file of markdownFiles) {
    const relativePath = path.relative(docsDir, file);
    const dir = path.dirname(relativePath);
    const base = path.basename(relativePath, '.md');

    if (!sidebarConfig[`/docs/${dir}/`]) {
      sidebarConfig[`/docs/${dir}/`] = [''];
    }
    if (base !== 'README') {
      sidebarConfig[`/docs/${dir}/`].push(base);
    }
  }

  return sidebarConfig;
}
module.exports = buildSidebarConfig;
// const sidebarConfig = buildSidebarConfig('./docs');
// console.log(sidebarConfig);