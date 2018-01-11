

// node_modules
const fs = require('fs'),
  path = require('path'),
  md = require('markdown-it')(),  // markdown渲染
  chalk = require('chalk');
// variables
const posts = [];
let startPart = '',
  endPart = '',
  output = ''; // 输出
// const
const postsPath = './posts',
  staticPartsPath = 'static-parts';

// helper functions


// start the timer of the script
console.time('Builder');

const postsFilenames = fs.readdirSync('./posts');// 同步读取post目录下的所有文件名
// 从小到大排序
postsFilenames.sort((a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a > b;
});

for (const item of postsFilenames) {
  posts.push({
    title: item.replace('.md', ''),
    createTime: new Date(fs.statSync(path.join(postsPath, item), 'utf8').atime),
    content: fs.readFileSync(path.join(postsPath, item), 'utf8'),
  });
}

startPart = fs.readFileSync(path.join(staticPartsPath, 'index-start.html'), 'utf8');
endPart = fs.readFileSync(path.join(staticPartsPath, 'index-end.html'), 'utf8');


let sidebar = '<aside class="sidebar"><ul class="list">';
for (const item of posts) {
  sidebar += `
    <li class="list-item ripple">
        <span class="list-item-icon"></span> 
        <span class="list-item-text"> <a href="#${item.title}">${item.title}</a></span> 
        
    </li>`;
}
/** Sidebar */
sidebar += '</ul></aside>';
output = `${startPart}\n${sidebar}
    <div class="main">
    <div class="main-content">
        <div class='main-content-intro'>
            任何技术，基础知识都是最重要的，我们希望建立这样一个组织，在写业务代码之余夯实前端基础知识，不断学习进步。
        </div>
`;
/** Content */
for (const item of posts) {
  output += `
<div class="panel panel-style" id=${item.title}>
<div class="panel-title">
    <span class="panel-title-text">
          ${item.title.toUpperCase()}
    </span>
    <time datetime=${item.createTime} class="panel-title-right">
       ${item.createTime.toLocaleDateString()}
    </time>
</div>
<div class="panel-content markdown-body">
    ${md.render(item.content)}
</div>
</div>`;
}

output += `${endPart} \n`;

// output readme.md
fs.writeFile('index.html', output, 'utf8', () => {
    /* eslint no-console:off */
  console.log(`${chalk.green('SUCCESS!')} html file generated!`);
  console.timeEnd('Builder');
});

