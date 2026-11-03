const app = document.querySelector('#app');
function typeset(element) {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(element, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false,
      trust: false
    });
  }
}
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let completed = [];
try { const saved = JSON.parse(localStorage.getItem('learning-notes-completed') || '[]'); if (Array.isArray(saved)) completed = saved.filter(x => typeof x === 'string'); } catch {}
let category = '全部筆記', query = '';
const validCompleted = () => NOTES.filter(n => completed.includes(n.id)).length;
function cards() {
  const list = NOTES.filter(n => (category === '全部筆記' || n.category === category) && (n.title + n.summary + n.category).toLowerCase().includes(query.toLowerCase()));
  document.querySelector('#count').textContent = list.length + ' 篇筆記';
  document.querySelector('#cards').innerHTML = list.length ? list.map(n => '<a class="card" href="#note/' + n.id + '"><div class="card-top"><span class="tag">' + esc(n.category) + '</span><span class="number">' + String(NOTES.indexOf(n) + 1).padStart(2, '0') + '</span></div><h3>' + esc(n.title) + '</h3><p>' + esc(n.summary) + '</p><div class="card-bottom"><span>' + n.minutes + ' 分鐘閱讀' + (completed.includes(n.id) ? ' · 已讀 ✓' : '') + '</span><span class="read">打開筆記 ↗</span></div></a>').join('') : '<p class="empty">沒有找到符合的筆記。試試其他關鍵字或分類。</p>';
  typeset(document.querySelector('#cards'));
}
function home() {
  document.title = '一頁學會數學｜我的數學筆記';
  app.innerHTML = '<section class="hero"><div><span class="eyebrow">A LITTLE LEARNING, EVERY DAY</span><h1>每次一頁，<br>把知識變成<em>自己的。</em></h1><p class="intro">把課堂上的靈光，整理成讀得懂的筆記。<br>從一個概念、一個範例開始，慢慢建立自己的知識書架。</p><div class="stats"><span><strong>' + NOTES.length + '</strong>篇學習筆記</span><span><strong>' + new Set(NOTES.map(n => n.category)).size + '</strong>個主題分類</span><span><strong>' + validCompleted() + '</strong>篇已讀</span></div></div><div class="notebook" aria-hidden="true"><div class="paper"><small>MY LEARNING JOURNAL</small><h2>今天的好奇，<br>明天的能力。</h2><p>01　理解核心概念</p><p>02　讀懂公式推導</p><p>03　完成練習與解析 ✓</p></div></div></section><div class="math-divider" aria-hidden="true">∫ · ∞ · ∑</div><section aria-label="筆記書架"><div class="section-head"><div><h2>我的筆記書架 <small id="count" class="notice"></small></h2><p>挑一篇感興趣的，開始今天的小小進步。</p></div><input class="search" id="search" type="search" aria-label="搜尋筆記" placeholder="搜尋標題、主題或關鍵字…" value="' + esc(query) + '"></div><div class="filters" aria-label="筆記分類">' + ['全部筆記', ...new Set(NOTES.map(n => n.category))].map(c => '<button class="filter' + (category === c ? ' active' : '') + '" aria-pressed="' + (category === c) + '" data-category="' + esc(c) + '">' + esc(c) + '</button>').join('') + '</div><div class="grid" id="cards" aria-live="polite"></div></section><aside class="callout"><div><h3>不只是筆記，也是一套可以延伸的做法。</h3><p>每篇都有學習目標、三個核心概念與自我測驗。</p></div><a href="#about">一頁學會數學 ↗</a></aside>';
  cards();
  document.querySelector('#search').addEventListener('input', e => {query = e.target.value; cards();});
  document.querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => {category = b.dataset.category; document.querySelectorAll('[data-category]').forEach(x => {x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', String(x === b));}); cards();}));
}
function article(note) {
  document.title = note.title + '｜一頁學會';
  app.innerHTML = '<article class="article"><a class="back" href="#">← 回到筆記書架</a><p><span class="tag">' + esc(note.category) + '</span></p><h1>' + esc(note.title) + '</h1><p class="meta">' + note.date + ' · ' + note.minutes + ' 分鐘閱讀</p><p>' + esc(note.summary) + '</p><h2>這一頁會學到</h2><ul>' + note.goals.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul><h2>三個核心概念</h2>' + note.points.map(p => '<section><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></section>').join('') + '<h2>換你試看看</h2><p>選擇答案，立即查看解析；可以重新選擇練習。</p>' + note.quiz.map((q,i) => '<fieldset class="question"><legend>' + (i+1) + '. ' + esc(q.question) + '</legend>' + q.options.map((o,j) => '<button class="option" data-q="' + i + '" data-a="' + j + '" aria-pressed="false">' + esc(o) + '</button>').join('') + '<p id="feedback-' + i + '" class="feedback" aria-live="polite"></p></fieldset>').join('') + '<h2>延伸閱讀</h2><ul class="sources">' + note.sources.map(s => '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + ' ↗</a></li>').join('') + '</ul><button id="complete" class="primary">' + (completed.includes(note.id) ? '已標記讀完 ✓（點擊取消）' : '這一頁，我讀完了 ✓') + '</button><p class="notice" id="storage-notice">閱讀進度只保存在此瀏覽器，換裝置不會同步。</p></article>';
  document.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => {const i = Number(b.dataset.q), j = Number(b.dataset.a), q = note.quiz[i]; document.querySelectorAll('[data-q="' + i + '"]').forEach(x => {x.classList.toggle('selected', x === b); x.setAttribute('aria-pressed', String(x === b));}); const feedback = document.querySelector('#feedback-' + i); feedback.textContent = (j === q.answer ? '答對了！' : '再想一想。') + q.explanation; typeset(feedback);}));
  document.querySelector('#complete').addEventListener('click', e => {completed = completed.includes(note.id) ? completed.filter(x => x !== note.id) : [...completed, note.id]; try {localStorage.setItem('learning-notes-completed', JSON.stringify(completed));} catch {document.querySelector('#storage-notice').textContent = '瀏覽器無法儲存，這次進度僅在開啟期間有效。';} e.target.textContent = completed.includes(note.id) ? '已標記讀完 ✓（點擊取消）' : '這一頁，我讀完了 ✓';});
}
function route() {
  if (location.hash.startsWith('#note/')) {const n = NOTES.find(x => '#note/' + x.id === location.hash); if(n) article(n); else app.innerHTML = '<div class="article"><h1>找不到這篇筆記</h1><a href="#">回到書架 →</a></div>';}
  else if (location.hash === '#about') {document.title = '一頁學會數學｜關於本站'; app.innerHTML = '<article class="article"><a class="back" href="#">← 回到筆記書架</a><span class="about-label">ONE PAGE · ONE CONCEPT</span><h1>一頁學會數學</h1><p class="about-lead">把抽象的符號，變成一步一步讀得懂的概念。</p><div class="math-divider" aria-hidden="true">∫ · ∞ · ∑</div><p>數學的世界很廣，每一頁都是理解它的一個起點。這裡用清楚的概念、公式與練習，整理不同領域的數學知識，讓零散的學習逐漸連成完整的脈絡。</p><h2>讓知識持續延伸</h2><p>依照自己的興趣與學習進度探索主題，從基礎觀念走向更深入的內容。隨著筆記累積，也能加入新的數學領域，慢慢建立屬於自己的數學知識書架。</p><h2>每篇筆記的固定旅程</h2><ol><li>先確認學習目標。</li><li>閱讀三個核心概念。</li><li>完成兩題自我測驗，查看解析。</li><li>利用參考資料繼續探索。</li></ol><h2>下一篇，照同一套規則完成</h2><p>專案根目錄的 AGENTS.md 定義資料結構、命名方式、設計規則與驗證步驟。新增 notes.js 內容後，首頁、分類、搜尋與文章版型自動沿用。</p><h2>你的閱讀進度</h2><p>標記讀完的紀錄只儲存在此瀏覽器，沒有帳號，也不會跨裝置同步。清除瀏覽器資料可能移除紀錄。</p></article>';}
  else home();
  typeset(app);
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', route);
route();
