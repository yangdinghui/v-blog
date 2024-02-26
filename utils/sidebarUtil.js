const { Console } = require('console');
const fs = require('fs');
const path = require('path');
// const docsDir = './docs';
const docsDir = path.join(__dirname, '../docs');

console.log('----docs----',docsDir);

// 读取docs目录下的所有文件
const files = fs.readdirSync(docsDir);
console.log('----docs-files----',files);

// 为每个文件生成一个sidebar的配置项
const sidebarItems = files.map(file => {
    const files = fs.readdirSync(docsDir);

    const newLocal = file.replace('.md', '');
    console.log('----docs-files.map----',file);
    // 去掉文件的扩展名
    const name = newLocal;
    // 返回sidebar的配置项
    return `/${name}`;
});
