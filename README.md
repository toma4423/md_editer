# Markdown Editor

RustとWebAssemblyを使用した、数式や化学式、プログラミングコードに対応したMarkdownエディタです。

## デモ

[GitHub Pagesで公開されたデモ](https://toma4423.github.io/md_editer/)で実際に動作を確認できます。

## 機能

### 基本的なMarkdown記法
- 見出し（`#`, `##`, `###`）
- 太字（`**太字**`）
- イタリック（`*イタリック*`）
- 取り消し線（`~~取り消し線~~`）
- リスト（`- リスト`）
- 番号付きリスト（`1. リスト`）

### 数式
- インライン数式：`$E = mc^2$`
- ブロック数式：
  ```latex
  $$
  \frac{n!}{k!(n-k)!} = \binom{n}{k}
  $$
  ```

### 化学式
- 化学式：`$\ce{H2O}$`
- 化学反応式：`$\ce{CO2 + C -> 2 CO}$`

### 物理単位
- 力：`$\unit{kg\cdot m/s^2}$`
- 速度：`$\unit{m/s}$`
- エネルギー：`$\unit{J}$`

### 行列
- 2x2行列：
  ```latex
  $$
  \begin{pmatrix} a & b \\ c & d \end{pmatrix}
  $$
  ```
- 3x3行列：
  ```latex
  $$
  \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}
  $$
  ```

### プログラミングコード
- コードブロック：
  ````markdown
  ```rust
  fn main() {
      println!("Hello, World!");
  }
  ```
  ````
- インラインコード：`` `console.log("Hello, World!");` ``

## 使用方法

1. エディタにMarkdownを入力
2. プレビューがリアルタイムで更新されます
3. 数式、化学式、コードなどが適切に表示されます

## 技術スタック

- Rust
- WebAssembly
- MathJax
- HTML/CSS/JavaScript

## 開発環境のセットアップ

1. Rustのインストール
2. wasm-packのインストール
3. プロジェクトのビルド
   ```bash
   wasm-pack build --target web
   ```
4. ローカルサーバーの起動
   ```bash
   python -m http.server
   ```

## GitHub Pagesへのデプロイ

1. リポジトリの設定でGitHub Pagesを有効化
   - Settings > Pages > Source: GitHub Actions
2. メインブランチにプッシュすると自動的にデプロイ
3. デプロイ後、`https://toma4423.github.io/md-editer/`でアクセス可能

## ライセンス

MIT License
