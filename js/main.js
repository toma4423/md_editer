/**
 * Markdownエディタのメインスクリプト
 * @module main
 */

import init, { markdown_to_html, init as wasmInit } from '../pkg/md_editer.js';

// MathJaxの初期化が完了したかどうかを追跡
let isMathJaxReady = false;

/**
 * MathJaxの設定
 */
window.MathJax = {
    loader: {
        load: ['input/tex', 'output/chtml', '[tex]/mhchem', '[tex]/physics', '[tex]/ams']
    },
    tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
        processEscapes: true,
        packages: {
            '[+]': ['mhchem', 'physics', 'ams']
        },
        macros: {
            '\\unit': '\\mathrm{#1}'
        }
    },
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();
            isMathJaxReady = true;
            console.log('MathJax is ready');
        }
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
    }
};

/**
 * プレビューを更新する関数
 * @param {HTMLElement} editor - エディタ要素
 * @param {HTMLElement} preview - プレビュー要素
 */
function updatePreview(editor, preview) {
    const markdown = editor.value;
    console.log('Converting markdown:', markdown);
    const html = markdown_to_html(markdown);
    console.log('Converted HTML:', html);
    
    // HTMLを正しく表示
    preview.innerHTML = html;
    
    // MathJaxで数式をレンダリング
    if (isMathJaxReady) {
        MathJax.typesetPromise([preview])
            .then(() => console.log('Math typeset completed'))
            .catch((err) => console.error('MathJax error:', err));
    } else {
        console.warn('MathJax is not ready yet');
        // MathJaxの準備ができるまで待ってから再試行
        const checkInterval = setInterval(() => {
            if (isMathJaxReady) {
                clearInterval(checkInterval);
                MathJax.typesetPromise([preview])
                    .then(() => console.log('Math typeset completed (delayed)'))
                    .catch((err) => console.error('MathJax error:', err));
            }
        }, 100);
    }
}

/**
 * アプリケーションの初期化と実行
 */
async function run() {
    try {
        console.log('Initializing WebAssembly...');
        await init();
        console.log('WebAssembly initialized');
        
        console.log('Initializing panic hook...');
        wasmInit();
        console.log('Panic hook initialized');

        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');

        // 入力イベントのリスナーを設定
        editor.addEventListener('input', () => updatePreview(editor, preview));
        
        // 初期表示時のプレビュー更新
        updatePreview(editor, preview);
    } catch (error) {
        console.error('Error:', error);
    }
}

// アプリケーションを実行
run().catch(console.error); 