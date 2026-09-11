const fs = require('fs');
const path = require('path');
const zh = JSON.parse(fs.readFileSync('locales/zh-cn.json', 'utf8'));
const files = [];
(function walk(d) {
    for (const f of fs.readdirSync(d)) {
        const p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (/\.(html|js)$/.test(f)) files.push(p);
    }
})('.');
const keys = new Set();
for (const f of files) {
    let c;
    try { c = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
    let m;
    const re = /data-i18n="([^"]*)"/g;
    while ((m = re.exec(c))) {
        m[1].split(';').forEach(k => {
            k = k.replace(/^\[[^\]]+\]/, '').trim();
            if (k) keys.add(k);
        });
    }
    const re2 = /\bt`([^`]*)`/g;
    while ((m = re2.exec(c))) {
        const s = m[1].replace(/\$\{[^}]*\}/g, '${0}');
        keys.add(s);
    }
}
const missing = [...keys].filter(k => !(k in zh));
const dyn = missing.filter(k => k.includes('${0}'));
const plain = missing.filter(k => !k.includes('${0}'));
console.log('缺失总数:', missing.length);
console.log('带 ${0} 占位符(运行时模板):', dyn.length);
console.log('纯文本 key:', plain.length);
// 按是否出现在 index.html 判定优先级
let htmlKeys = new Set();
try {
    const html = fs.readFileSync('index.html', 'utf8');
    let m; const re = /data-i18n="([^"]*)"/g;
    while ((m = re.exec(html))) {
        m[1].split(';').forEach(k => { k = k.replace(/^\[[^\]]+\]/, '').trim(); if (k) htmlKeys.add(k); });
    }
} catch (e) {}
const missingInHtml = plain.filter(k => htmlKeys.has(k));
console.log('纯文本缺失且直接出现在 index.html 主界面:', missingInHtml.length);
console.log('--- 主界面缺失(需优先处理) ---');
console.log(missingInHtml.join('\n'));
