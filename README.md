# marked
- - -

Markdown parser with code hightlight form [highlight.js](https://github.com/isagalaev/highlight.js) and optional inline color support. It could be useful when you want to colorful your code in your email.

I'm using [css-parse](https://github.com/visionmedia/node-css-parse) to parse the style file and [cheerio](https://github.com/MatthewMueller/cheerio) to add the inline style.

# install
- - -

```bash
$ git clone git@github.com:chemzqm/marked.git
$ cd marked
$ npm install
```

# example
- - -

```bash
$ cat gfm_code.text 

``` js
var a = 'hello';
console.log(a + ' world');
`` 

$ marked --gfm --color gfm_code.text 
<pre><code class="language-js"><span class="keyword" style="color:#333;font-weight:bold;">var</span> a = <span class="string" style="color:#d14;">'hello'</span>;
console.log(a + <span class="string" style="color:#d14;">' world'</span>);</code></pre></span></span></span></code></pre>
```
Get more information from [marked](https://github.com/chjj/marked)

# For vim users
- - -
For convert the file content of markdown into html and copy them to your system clipboard, you can make an alias in your `vimrc` file. For example, if you are using vim (like me) under terminal, you have to install a terminal tool `xclip` at first, in the debain system, you can do that like this:

``` bash
    sudo apt-get install xclip
```
Then add the code below to your vim profile, you can find it at `$HOME/.vimrc` 

``` viml
nnoremap <leader>md :w !marked --gfm --color \| xclip<cr>
```
Now, you can use command `<leader>md` to have the converted html contents directly copied into your system clipboard.

# LICENSE
- - -
Copyright (c) 2011-2012, Christopher Jeffrey. (MIT License)

See LICENSE for more info.
