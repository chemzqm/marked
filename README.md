# marked

Markdown parser with code hightlight form [highlight.js](https://github.com/isagalaev/highlight.js) and optional inline color support. It could be useful when you want to colorful your code in your email.

I'm using [css-parse](https://github.com/visionmedia/node-css-parse) to parse the style file and [cheerio](https://github.com/MatthewMueller/cheerio) to add the inline style.

## install

* from npm
  ```bash
  npm install -g color-marked
  ```

* from source code
  ```bash
  $ git clone git@github.com:chemzqm/marked.git
  $ cd marked
  $ npm install
  ```

## Usage

```bash
$ cat gfm_code.text 

``` js
var a = 'hello';
console.log(a + ' world');
`` 

$ marked --gfm --color gfm_code.text 
<pre><code style="display:block;padding:0.5em;color:#333;background:#f8f8ff;"><span class="keyword" style="color:#333;font-weight:bold;">var</span> a = <span class="string" style="color:#d14;">'hello'</span>;
console.log(a + <span class="string" style="color:#d14;">' world'</span>);</code></pre>

```
Get more information from [marked](https://github.com/chjj/marked)

## Browser support

* color is disabed in browser environment, import css file is required to display colors.
* When used in browser, import highlight.js file before marked.js file and make sure function `window.hljs` is availabel for converting.
* Use function `marked(src, option)` for markdown converting.
* `color` option is enabled by default in none browser environment.


## Options

marked has a few different switches which change behavior.

- __pedantic__: Conform to obscure parts of `markdown.pl` as much as possible.
  Don't fix any of the original markdown bugs or poor behavior.
- __gfm__: Enable github flavored markdown (enabled by default).
- __sanitize__: Sanitize the output. Ignore any HTML that has been input.
- __highlight__: A callback to highlight code blocks.
- __tables__: Enable GFM tables. This is enabled by default. (Requires the
  `gfm` option in order to be enabled).
- __breaks__: Enable GFM line breaks. Disabled by default.
- __smartLists__: Use smarter list behavior than the original markdown.
  Disabled by default. May eventually be default with the old behavior
  moved into `pedantic`.
- __langPrefix__: Set the prefix for code block classes. Defaults to `language-`.
- __color__: Parse style.css file and add the styles to highlight block


## License

Copyright (c) 2011-2013, Qiming Zhao. (MIT License)

MIT
