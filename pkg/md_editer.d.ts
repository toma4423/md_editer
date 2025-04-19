/* tslint:disable */
/* eslint-disable */
/**
 * WebAssemblyモジュールの初期化
 * 
 * パニックハンドラを設定し、エラーメッセージをコンソールに出力できるようにします。
 */
export function init(): void;
/**
 * MarkdownテキストをHTMLに変換する関数
 * 
 * # Arguments
 * 
 * * `markdown` - 変換するMarkdownテキスト
 * 
 * # Returns
 * 
 * 変換されたHTML文字列
 */
export function markdown_to_html(markdown: string): string;
/**
 * テスト用の関数
 * 
 * # Returns
 * 
 * テスト用の文字列
 */
export function hello_world(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly init: () => void;
  readonly markdown_to_html: (a: number, b: number) => [number, number];
  readonly hello_world: () => [number, number];
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
