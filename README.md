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

<<<<<<< .merge_file_oYFd59
``` js
var a = 'hello';
console.log(a + ' world');
`` 
=======
node v0.8.x

``` bash
$ node test --bench
marked completed in 3411ms.
marked (gfm) completed in 3727ms.
marked (pedantic) completed in 3201ms.
robotskirt completed in 808ms.
showdown (reuse converter) completed in 11954ms.
showdown (new converter) completed in 17774ms.
markdown-js completed in 17191ms.
```

## Install
>>>>>>> .merge_file_XVIES6

$ marked --gfm --color gfm_code.text 
<pre><code class="language-js"><span class="keyword" style="color:#333;font-weight:bold;">var</span> a = <span class="string" style="color:#d14;">'hello'</span>;
console.log(a + <span class="string" style="color:#d14;">' world'</span>);</code></pre></span></span></span></code></pre>
```
Get more information from [marked](https://github.com/chjj/marked)

## Browser support

* *No inline parse* in browser environment, import css file is required to display colors.
* Import highlight.js file before marked.js file and make sure function `window.hljs` is availabel for converting.
* Use function `marked(src, option)` for markdown converting.
* Options `gfm` and `color` is enabled by default.

<<<<<<< .merge_file_oYFd59
=======
Along with implementing every markdown feature, marked also implements
[GFM features](http://github.github.com/github-flavored-markdown/).

## Options

>>>>>>> .merge_file_XVIES6
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
- __langPrefix__: Set the prefix for code block classes. Defaults to `lang-`.

<<<<<<< .merge_file_oYFd59
## LICENSE
=======
## Usage

``` js
// Set default options
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
});
console.log(marked('i am using __markdown__.'));
```

You also have direct access to the lexer and parser if you so desire.

``` js
var tokens = marked.lexer(text, options);
console.log(marked.parser(tokens));
```

``` js
var lexer = new marked.Lexer(options);
var tokens = lexer.lex(text);
console.log(tokens);
console.log(lexer.rules);
```

``` bash
$ node
> require('marked').lexer('> i am using marked.')
[ { type: 'blockquote_start' },
  { type: 'paragraph',
    text: 'i am using marked.' },
  { type: 'blockquote_end' },
  links: {} ]
```

## CLI

``` bash
$ marked -o hello.html
hello world
^D
$ cat hello.html
<p>hello world</p>
```

## License

Copyright (c) 2011-2013, Christopher Jeffrey. (MIT License)
>>>>>>> .merge_file_XVIES6

MIT
