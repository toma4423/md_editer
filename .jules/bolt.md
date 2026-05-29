## 2025-05-15 - [Regex Compilation Caching in WASM]
**Learning:** Re-compiling regexes in hot paths (like every keystroke in an editor) is a major performance bottleneck. Caching them with `OnceLock` or `lazy_static` significantly improves throughput. Additionally, leveraging `Cow<str>` from regex's `replace_all` avoids unnecessary string allocations when no matches are found.
**Action:** Always check for regex compilation in repeated function calls and prefer `OnceLock` for static initialization. Use `Cow` to minimize allocations in string processing.
