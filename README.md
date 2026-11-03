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

## 本機預覽
在專案資料夾執行：

```sh
python -m http.server 8000 --directory dist
```

瀏覽 http://localhost:8000 。檢查內容與程式語法：

```sh
node scripts/check.mjs
```

## 新增一篇筆記
1. 閱讀 AGENTS.md。
2. 複製 dist/note-template.txt 的物件到 dist/notes.js 的 NOTES 陣列。
3. 填完所有欄位，設定唯一英文 id。
4. 執行檢查並預覽。首頁、分類、搜尋與文章自動更新。

給 AI 的範例指令：
「請閱讀 AGENTS.md，在微積分類新增『導數的概念』筆記，id 使用 calculus-derivatives。依現有模板撰寫內容與 LaTeX 公式，補上可靠參考來源，執行檢查並驗證文章、搜尋和測驗。」

## 上傳 GitHub 並公開
1. 在 GitHub 建立公開 Repository，例如 learning-notes。
2. 上傳本資料夾的所有原始碼（包括 .github/workflows/pages.yml；不需要上傳 .openai，那是另一個預覽服務的設定）。
3. 確認預設分支是 main。
4. 在 Repository 的 Settings → Pages，將 Source 設為 GitHub Actions。
5. 在 Actions 選取 Deploy learning notes，必要時執行 Run workflow。
6. 等待成功後，由 Settings → Pages 取得實際網站網址。
7. 實際開啟網站與一篇文章，確認可讀取後再提交。

GitHub 網站設定介面可能隨時間調整。未完成以上流程前，不代表已上傳或公開。

## 作業繳交草稿
標題：［學校］［學號］［系級］［姓名］ 一頁學會：我的學習筆記站

專案簡介：我建立一個數學學習筆記網站，支援不同數學領域，目前包含微積分與線性代數範例。每篇統一包含學習目標、三個核心概念、自我測驗與參考資料。網站支援 LaTeX 公式排版、搜尋、分類與閱讀進度，方便持續整理課程知識。

GitHub Repository：［填入實際連結］

公開網頁：［填入實際連結］

規則文件：Repository 根目錄的 AGENTS.md。

延伸說明：AGENTS.md 定義內容欄位、命名方式、檔案位置、視覺規則與驗證流程。之後 AI 只要依模板在 notes.js 新增一筆內容，網站就會自動產生卡片、分類與文章內頁，不必重寫 HTML。check.mjs 也能檢查資料格式，降低新增內容時的遺漏。
