window.NOTES = [
  {
    "id": "calculus-limits",
    "title": "極限的概念：靠近，不一定要到達",
    "summary": "從「越來越接近」理解極限，分清函數值與趨近的目標。",
    "category": "微積分",
    "date": "2026-11-03",
    "minutes": 8,
    "goals": [
      "用自己的話說明極限與函數值的差別。",
      "計算簡單多項式與可約分有理式的極限。"
    ],
    "points": [
      {
        "title": "01 / 極限關心的是靠近時的趨勢",
        "text": "當 \\(x\\) 越來越接近 \\(a\\)（但不等於 \\(a\\)）時，如果 \\(f(x)\\) 越來越接近同一個數 \\(L\\)，就寫成：\\[\\lim_{x\\to a}f(x)=L.\\]例如 \\(f(x)=2x+1\\)，當 \\(x\\) 靠近 \\(2\\) 時，函數值靠近 \\(5\\)，所以 \\(\\lim_{x\\to 2}(2x+1)=5\\)。"
      },
      {
        "title": "02 / 極限不一定等於該點的函數值",
        "text": "考慮 \\(f(x)=\\frac{x^2-1}{x-1}\\)，其中 \\(x\\ne1\\)。因為 \\(x^2-1=(x-1)(x+1)\\)，在 \\(x\\ne1\\) 時可約分為 \\(x+1\\)。因此：\\[\\lim_{x\\to1}\\frac{x^2-1}{x-1}=\\lim_{x\\to1}(x+1)=2.\\]原式在 \\(x=1\\) 沒有定義，但極限仍存在。不能直接把 \\(0/0\\) 當成答案。"
      },
      {
        "title": "03 / 左右兩邊必須靠近同一個值",
        "text": "雙側極限存在，必須左右極限都存在且相等：\\[\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L.\\]例如 \\(f(x)=\\frac{x}{|x|}\\) 在 \\(x\\ne0\\) 時，左側值為 \\(-1\\)，右側值為 \\(1\\)，所以 \\(x\\to0\\) 的雙側極限不存在。"
      }
    ],
    "quiz": [
      {
        "question": "求 \\(\\displaystyle\\lim_{x\\to3}(2x+1)\\)。",
        "options": [
          "\\(6\\)",
          "\\(7\\)",
          "不存在"
        ],
        "answer": 1,
        "explanation": "多項式在此處連續，可直接代入：\\(2\\times3+1=7\\)。"
      },
      {
        "question": "求 \\(\\displaystyle\\lim_{x\\to2}\\frac{x^2-4}{x-2}\\)。",
        "options": [
          "\\(0\\)",
          "不存在",
          "\\(4\\)"
        ],
        "answer": 2,
        "explanation": "在 \\(x\\ne2\\) 時，\\(\\frac{(x-2)(x+2)}{x-2}=x+2\\)，所以極限是 \\(2+2=4\\)。原式在 \\(x=2\\) 未定義，不妨礙極限存在。"
      }
    ],
    "sources": [
      {
        "label": "OpenStax Calculus Volume 1：The Limit of a Function",
        "url": "https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function"
      }
    ]
  },
  {
    "id": "linear-algebra-vectors",
    "title": "向量與加法：從兩個分量開始",
    "summary": "把向量看成有方向的位移，學會分量加法與純量乘法。",
    "category": "線性代數",
    "date": "2026-11-03",
    "minutes": 7,
    "goals": [
      "讀懂二維向量的分量與幾何意義。",
      "計算向量加法，並理解純量如何縮放向量。"
    ],
    "points": [
      {
        "title": "01 / 向量可以用分量表示",
        "text": "在平面上，向量可用兩個分量表示：\\[\\mathbf{u}=\\begin{pmatrix}2\\\\1\\end{pmatrix}.\\]第一個分量表示水平方向，第二個分量表示垂直方向；這個向量代表向右 \\(2\\) 單位、向上 \\(1\\) 單位的位移。向量描述位移，不限定起點在哪裡。"
      },
      {
        "title": "02 / 向量相加，對應分量分別相加",
        "text": "若 \\(\\mathbf{u}=\\begin{pmatrix}2\\\\1\\end{pmatrix}\\)、\\(\\mathbf{v}=\\begin{pmatrix}-1\\\\3\\end{pmatrix}\\)，則：\\[\\mathbf{u}+\\mathbf{v}=\\begin{pmatrix}2+(-1)\\\\1+3\\end{pmatrix}=\\begin{pmatrix}1\\\\4\\end{pmatrix}.\\]幾何上，可以先沿著第一個向量移動，再接著沿第二個向量移動，得到總位移。"
      },
      {
        "title": "03 / 純量乘法同時縮放每個分量",
        "text": "純量就是一個數；將 \\(c\\) 乘上向量時，每個分量都乘上 \\(c\\)：\\[c\\begin{pmatrix}u_1\\\\u_2\\end{pmatrix}=\\begin{pmatrix}cu_1\\\\cu_2\\end{pmatrix}.\\]對非零向量，乘 \\(2\\) 會保持方向、長度變成兩倍；乘 \\(-1\\) 會反轉方向、保持長度。乘 \\(0\\) 則得到零向量。"
      }
    ],
    "quiz": [
      {
        "question": "若 \\(\\mathbf{u}=\\begin{pmatrix}1\\\\2\\end{pmatrix}\\)、\\(\\mathbf{v}=\\begin{pmatrix}3\\\\-1\\end{pmatrix}\\)，求 \\(\\mathbf{u}+\\mathbf{v}\\)。",
        "options": [
          "\\(\\begin{pmatrix}4\\\\1\\end{pmatrix}\\)",
          "\\(\\begin{pmatrix}3\\\\-2\\end{pmatrix}\\)",
          "\\(\\begin{pmatrix}2\\\\3\\end{pmatrix}\\)"
        ],
        "answer": 0,
        "explanation": "對應分量相加：\\(\\begin{pmatrix}1+3\\\\2+(-1)\\end{pmatrix}=\\begin{pmatrix}4\\\\1\\end{pmatrix}\\)。"
      },
      {
        "question": "若 \\(\\mathbf{u}=\\begin{pmatrix}2\\\\-3\\end{pmatrix}\\)，求 \\(-2\\mathbf{u}\\)。",
        "options": [
          "\\(\\begin{pmatrix}4\\\\-6\\end{pmatrix}\\)",
          "\\(\\begin{pmatrix}-4\\\\6\\end{pmatrix}\\)",
          "\\(\\begin{pmatrix}0\\\\-5\\end{pmatrix}\\)"
        ],
        "answer": 1,
        "explanation": "每個分量都乘上 \\(-2\\)：\\((-2)\\times2=-4\\)，\\((-2)\\times(-3)=6\\)。"
      }
    ],
    "sources": [
      {
        "label": "OpenStax Calculus Volume 3：Vectors in the Plane",
        "url": "https://openstax.org/books/calculus-volume-3/pages/2-1-vectors-in-the-plane"
      }
    ]
  }
];
