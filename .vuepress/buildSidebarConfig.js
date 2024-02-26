const fs = require('fs');
const path = require('path');

// 递归查找目录下的所有 markdown 文件
function findMarkdownFiles(dir) {
  // 读取目录
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // 递归查找
  const files = entries.filter(fileDirent => fileDirent.isFile())
    .map(fileDirent => path.join(dir, fileDirent.name))
    .filter(file => file.endsWith('.md'));

  // 递归查找子目录
  const folders = entries.filter(folderDirent => folderDirent.isDirectory());

  for (const folder of folders) {
    // 递归查找子目录
    files.push(...findMarkdownFiles(path.join(dir, folder.name)));
  }

  return files;
}

// 构建侧边栏配置
function buildSidebarConfig(docsDir) {
  const markdownFiles = findMarkdownFiles(docsDir);

  const sidebarConfig = {};

  for (const file of markdownFiles) {
    // 获取文件相对于 docs 目录的相对路径
    const relativePath = path.relative(docsDir, file);
    // 获取文件所在目录
    const dir = path.dirname(relativePath);
    // 获取文件名（不带扩展名）
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