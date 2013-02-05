var css = require('css-parse'),
    fs = require('fs'),
    path = require('path'),
    cheerio = require('cheerio');

var content = fs.readFileSync(path.resolve( __dirname, './style.css'));

var rules = css(content).stylesheet.rules;

function stringfyCss(declarations){
  return declarations.reduce(function(p, v){
      return p + v.property + ":" + v.value + ";";
    },"");
}
function parse (html){
  html = '<pre><code>' + html + '</code></pre>';
  var $ = cheerio.load(html);
  rules.forEach(function(rule){
      var style = stringfyCss(rule.declarations);
      if(rule.selector){
        $(rule.selector).attr('style', style);
      }
      else{
        rule.selectors.forEach(function(selector){
          $(selector).attr('style', style);
        })
      }
  });
  return $.html();
}

exports.parse = parse;

