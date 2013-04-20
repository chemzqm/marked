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
  var flat_rules = [];
  rules.forEach(function(rule){
    var style = stringfyCss(rule.declarations);
    if(rule.selector){
      flat_rules.push({
        count: rule.selector.split(/\s+/).length,
        selector:rule.selector,
        style:style
      });
    }
    else{
      rule.selectors.forEach(function(selector){
        flat_rules.push({
          count: selector.split(/\s+/).length,
          selector:selector,
          style:style
        });
      })
    }
  });
  flat_rules.sort(function (a, b) {
     return a.count > b.count;
  }).forEach(function(v) {
    $(v.selector).attr('style', v.style);
  });
  return $.html();
}

exports.parse = parse;

