# marked

Markdown parser with code hightlight form [highlight.js](https://github.com/isagalaev/highlight.js) and optional inline color support. It could be useful when you want to colorful your code in your email.

Using [css-parse](https://github.com/visionmedia/node-css-parse) to parse the style file and [cheerio](https://github.com/MatthewMueller/cheerio) to add the inline style.

## install as global command

    npm install -g color-marked

## Command line Usage

**Note**: `gfm` `color` `tables` options are enabled by default, `breaks` is not enabled by default, you can enable an option by add an option like `--breaks` or disable an option like `--no-breaks`.

The default colorscheme is [solarized_light](http://ethanschoonover.com/solarized).

```
$ cat gfm_code.text 


``` js
var a = 'hello';
console.log(a + ' world');
``

$ marked --gfm gfm_code.text 
<pre><code style="display:block;padding:0.5em;color:#333;background:#f8f8ff;"><span class="keyword" style="color:#333;font-weight:bold;">var</span> a = <span class="string" style="color:#d14;">'hello'</span>;
console.log(a + <span class="string" style="color:#d14;">' world'</span>);</code></pre>

```
Get more information from [marked](https://github.com/chjj/marked)

## Options

See [orignal README](https://github.com/chjj/marked) to get understand of most options.

Addtional options include `color` and `colorscheme`

* `color` parse the css file and add inline color for the code element.

* `colorscheme` which colorscheme to use, see [highlight.js demo](http://softwaremaniacs.org/media/soft/highlight/test.html) to get all the colorschemes and supported languages.

* The value of `langPrefix` was changed to `language-`

## Browser support

* import css file is required to display colors.

* When used in browser, import highlight.js file before marked.js file and make sure function `window.hljs` is availabel for converting.

* Use function `marked(src, option)` for markdown converting.

## Javascript API usage

``` js
// Set default options
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
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

## License

Copyright (c) 2011-2013, Qiming Zhao. (MIT License)

MIT
