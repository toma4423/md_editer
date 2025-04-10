//! MarkdownエディタのWebAssemblyモジュール
//! 
//! このモジュールは、Rustで実装されたMarkdownパーサーをWebAssemblyとして提供します。
//! JavaScriptから呼び出して使用することができます。

use wasm_bindgen::prelude::*;
use pulldown_cmark::{Parser, Options, html};
use regex::Regex;

/// WebAssemblyモジュールの初期化
/// 
/// パニックハンドラを設定し、エラーメッセージをコンソールに出力できるようにします。
#[wasm_bindgen]
pub fn init() {
    console_error_panic_hook::set_once();
}

/// MarkdownテキストをHTMLに変換する関数
/// 
/// # Arguments
/// 
/// * `markdown` - 変換するMarkdownテキスト
/// 
/// # Returns
/// 
/// 変換されたHTML文字列
#[wasm_bindgen]
pub fn markdown_to_html(markdown: &str) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_TASKLISTS);
    
    let parser = Parser::new_ext(markdown, options);
    let mut html = String::new();
    html::push_html(&mut html, parser);
    
    // 数式の処理
    let html = process_math(&html);
    
    html
}

/**
 * 数式を処理する関数
 * @param html - 処理対象のHTML文字列
 * @return 処理済みのHTML文字列
 */
fn process_math(html: &str) -> String {
    let mut result = html.to_string();
    
    // ブロック数式の処理（先に処理する）
    let block_math = Regex::new(r"\$\$([^$]+)\$\$").unwrap();
    result = block_math.replace_all(&result, |caps: &regex::Captures| {
        let math = &caps[1];
        format!("<div class=\"math-block\">${}$</div>", math)
    }).to_string();
    
    // インライン数式の処理
    let inline_math = Regex::new(r"\$([^$]+)\$").unwrap();
    result = inline_math.replace_all(&result, |caps: &regex::Captures| {
        let math = &caps[1];
        format!("<span class=\"math-inline\">${}$</span>", math)
    }).to_string();
    
    result
}

/// テスト用の関数
/// 
/// # Returns
/// 
/// テスト用の文字列
#[wasm_bindgen]
pub fn hello_world() -> String {
    "Hello from Rust!".to_string()
}

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
