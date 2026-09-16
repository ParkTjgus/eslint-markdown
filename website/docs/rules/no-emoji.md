<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Some websites and Markdown parsers handle emojis natively or provide their own plugins for support. Instead of using raw emojis like `😃`, you can use the `:smiley:`-style shortcode syntax, which places colons around the emoji name.

The main purpose of this rule is to discourage the use of raw (Unicode) emojis in Markdown files and encourage the use of the `:smiley:`-style shortcode syntax for better:

- Cross-platform rendering consistency
- Accessibility (screen readers can receive clearer text equivalents)
- Diff readability (pure text instead of glyphs)
- Theming or post-processing (shortcodes are easier to map or replace)

For a full list of supported emojis, refer to:

- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
- [emoji-cheat-sheet (GitHub)](https://github.com/ikatyang/emoji-cheat-sheet#readme)

Platforms like [GitHub](https://github.com) and Markdown plugins such as [`remark-emoji`](https://github.com/rhysd/remark-emoji#readme) and [`markdown-it-emoji`](https://github.com/markdown-it/markdown-it-emoji#readme) also support this shortcode feature.

By default, this rule disallows only raw emojis. If your project prefers raw emojis instead, set the [`style`](#style) option to `['gemoji']` to disallow `:smiley:`-style shortcodes. To disallow both raw emojis and shortcodes, set it to `['emoji', 'gemoji']`.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-emoji: 'error' -->

Smiley 😃
Unicorn 🦄
+1 👍
```

#### With `{ style: ['gemoji'] }` Option

```md eslint-check
<!-- eslint md/no-emoji: ['error', { style: ['gemoji'] }] -->

Smiley :smiley:
Unicorn :unicorn:
+1 :+1:
```

#### With `{ style: ['emoji', 'gemoji'] }` Option

```md eslint-check
<!-- eslint md/no-emoji: ['error', { style: ['emoji', 'gemoji'] }] -->

Smiley 😃
Unicorn :unicorn:
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-emoji: 'error' -->

Smiley :smiley:
Unicorn :unicorn:
+1 :+1:
```

#### With `{ allow: ['😃', '🦄'] }` Option

```md eslint-check
<!-- eslint md/no-emoji: ['error', { allow: ['😃', '🦄'] }] -->

Smiley 😃
Unicorn 🦄
+1 :+1:
```

#### With `{ style: ['gemoji'] }` Option

```md eslint-check
<!-- eslint md/no-emoji: ['error', { style: ['gemoji'] }] -->

Smiley 😃
Unicorn 🦄
+1 👍
```

#### With `{ style: ['emoji', 'gemoji'], allow: ['😃', ':unicorn:'] }` Option

```md eslint-check
<!-- eslint md/no-emoji: ['error', { style: ['emoji', 'gemoji'], allow: ['😃', ':unicorn:'] }] -->

Smiley 😃
Unicorn :unicorn:
```

## Options

```js
'md/no-emoji': ['error', {
  allow: [],
  style: ['emoji'],
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When specified, specific emojis are allowed if they match one of the strings in this array. Raw Unicode emojis (e.g. `'😃'`) and shortcodes (e.g. `':smiley:'`) can both be listed, and the list applies to every style enabled by the [`style`](#style) option.

### `style`

> Type: `('emoji' | 'gemoji')[]` / Default: `['emoji']`

Specifies which styles of emojis to disallow. Each style is checked independently.

- `'emoji'`: Disallows raw Unicode emojis (e.g. `😃`).
- `'gemoji'`: Disallows shortcode style emojis (e.g. `:smile:`).

## Limitations

The `'emoji'` style uses `/\p{RGI_Emoji}/gv` internally to match emojis. Unicode property escapes rely on the Unicode data/version supported by the runtime, so matches can vary across environments. Also, `RGI_Emoji` targets only Unicode's "Recommended for General Interchange" emoji set, so it may not match some non-RGI or emoji-like sequences.

The `'gemoji'` style matches the `:name:` pattern instead of checking against an actual list of emoji names. As a result, text that merely looks like a shortcode, such as `:min:` in `hour:min:sec`, is also reported.
