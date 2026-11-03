import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const context = {window:{}};
vm.runInNewContext(fs.readFileSync('dist/notes.js','utf8'), context);
const notes=context.window.NOTES, ids=new Set();
assert.ok(Array.isArray(notes) && notes.length);
for (const n of notes) {
  assert.match(n.id,/^[a-z]+(?:-[a-z0-9]+)*$/);
  assert.ok(!ids.has(n.id),'重複 id：'+n.id); ids.add(n.id);
  for(const k of ['title','summary','category','date']) assert.ok(typeof n[k]==='string'&&n[k].trim(),k);
  assert.match(n.date,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Number.isInteger(n.minutes)&&n.minutes>0);
  assert.ok(n.goals.length>=2&&n.goals.every(x=>typeof x==='string'&&x.trim()));
  assert.equal(n.points.length,3);
  for(const p of n.points) assert.ok(p.title&&p.text);
  assert.equal(n.quiz.length,2);
  for(const q of n.quiz) {assert.ok(q.question&&q.explanation);assert.equal(q.options.length,3);assert.ok(q.options.every(x=>typeof x==='string'&&x.trim()));assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);}
  assert.ok(n.sources.length);
  for(const s of n.sources) {assert.ok(s.label);assert.equal(new URL(s.url).protocol,'https:');}
}
for(const f of ['index.html','styles.css','app.js','notes.js','note-template.txt','vendor/katex/katex.min.js','vendor/katex/katex.min.css','vendor/katex/contrib/auto-render.min.js','vendor/katex/fonts/KaTeX_Main-Regular.woff2']) assert.ok(fs.existsSync('dist/'+f));
for(const f of ['app.js','notes.js']) execFileSync(process.execPath,['--check','dist/'+f]);
console.log('PASS：'+notes.length+' 篇筆記、內容欄位、唯一網址、測驗答案、來源格式與 JavaScript 語法。');

const katexContext = {};
vm.runInNewContext(fs.readFileSync('dist/vendor/katex/katex.min.js','utf8'), katexContext);
let formulas = 0;
function checkMath(value) {
  if (typeof value === 'string') {
    const pattern = /\\\((.*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$|\$([^$]+)\$/g;
    for (const match of value.matchAll(pattern)) {
      katexContext.katex.renderToString(match[1] ?? match[2] ?? match[3] ?? match[4], {throwOnError:true,trust:false});
      formulas++;
    }
  } else if (Array.isArray(value)) value.forEach(checkMath);
  else if (value && typeof value === 'object') Object.values(value).forEach(checkMath);
}
notes.forEach(checkMath);
assert.ok(formulas > 0);
console.log('PASS：'+formulas+' 個 LaTeX 公式可正確排版。');
