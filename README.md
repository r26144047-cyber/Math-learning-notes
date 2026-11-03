# 一頁學會數學｜我的數學筆記站

一個無須安裝套件的繁體中文數學筆記網站，以固定內容格式與 AGENTS.md 支援持續擴充。

## 功能
搜尋、可擴充的數學領域分類、兩篇獨立網址的示範筆記、即時測驗解析、瀏覽器閱讀進度與響應式版面。
示範內容：極限的概念、向量與加法，各有兩題練習。
文章固定保留「這一頁會學到」「三個核心概念」「換你試看看」，不使用生活應用區塊。

## LaTeX 數學排版
網站內附 KaTeX 0.19.1 與數學字型，不依賴外部 CDN。
內容使用行內公式 \(...\) 與獨立公式 \[...\]；也支援 $...$ 與 $$...$$。
在 JavaScript 字串裡將反斜線寫成兩個，或用 String.raw 樣板字串。範例見 notes.js。
切換文章與顯示測驗解析後會自動排版。check.mjs 也會檢查所有內容公式。
KaTeX 的 MIT 授權保留於 dist/vendor/katex/LICENSE，使用方式見 https://katex.org/docs/autorender.html 。

## 新增一篇筆記
1. 閱讀 AGENTS.md。
2. 複製 dist/note-template.txt 的物件到 dist/notes.js 的 NOTES 陣列。
3. 填完所有欄位，設定唯一英文 id。
4. 執行檢查並預覽。首頁、分類、搜尋與文章自動更新。

給 AI 的範例指令

```text
請閱讀 AGENTS.md，在微積分類新增「導數的概念」筆記，id 使用 calculus-derivatives。依現有模板撰寫內容與 LaTeX 公式，補上可靠參考來源，執行檢查並驗證文章、搜尋和測驗。
```

## 專案結構

Math-learning-notes/
├── README.md                   專案介紹、操作說明與部署步驟
├── AGENTS.md                   AI 開發協作規則與筆記內容格式
├── .gitignore                  設定不需要加入 Git 的檔案
├── .github/
│   └── workflows/
│       └── pages.yml           自動檢查並部署網站到 GitHub Pages
├── dist/                       實際發布的網站內容
│   ├── index.html              網站入口、導覽列與頁尾
│   ├── styles.css              綠色主題、版面留白與手機排版
│   ├── app.js                  搜尋、分類、文章顯示、測驗與閱讀進度
│   ├── notes.js                所有筆記的內容資料，新增筆記主要修改此檔
│   ├── note-template.txt       新增筆記時使用的固定格式範本
│   ├── math-lines.svg          數學曲線、幾何與向量線條裝飾
│   └── vendor/
│       └── katex/              LaTeX 數學公式排版程式、字型與授權
└── scripts/
    └── check.mjs               檢查筆記格式、文章 ID、測驗與公式語法

## 開發協作
ChatGPT：協助修改與開發。
