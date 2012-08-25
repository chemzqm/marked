# marked

Markdown parser with code hightlight form [highlight.js](https://github.com/isagalaev/highlight.js) and optional inline color support. It could be useful when you want to colorful your code in your email.

I'm using [css-parse](https://github.com/visionmedia/node-css-parse) to parse the style file and [cheerio](git://github.com/MatthewMueller/cheerio.git) to add the inline style.

# install

```bash
$ git clone git@github.com:chemzqm/marked.git
$ npm install
```

# example

```bash
$ cat gfm_code.text 

``` js
var a = 'hello';
console.log(a + ' world');
```

$ marked --gfm --color gfm_code.text 
<pre><code class="language-js"><span class="keyword" style="color:#333;font-weight:bold;">var</span> a = <span class="string" style="color:#d14;">'hello'</span>;
console.log(a + <span class="string" style="color:#d14;">' world'</span>);</code></pre></span></span></span></code></pre>
```
# LICENSE
Copyright (c) 2011-2012, Christopher Jeffrey. (MIT License)

See LICENSE for more info.
