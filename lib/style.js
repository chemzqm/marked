var css = require('css-parse'),
    fs = require('fs'),
    cheerio = require('cheerio');

var content = fs.readFileSync('lib/github.css');

var rules = css(content).stylesheet.rules;

function stringfyCss(declarations){
  return declarations.reduce(function(p, v){
      return p + v.property + ":" + v.value + ";";
    },"");
}
function parse (html){
  var $ = cheerio.load(html);
  rules.forEach(function(rule){
      var style = stringfyCss(rule.declarations);
      if(rule.selector){
        $(rule.selector.replace(/^pre /,'')).attr('style', style);
      }
      else{
        rule.selectors.forEach(function(selector){
          $(selector.replace(/^pre /,'')).attr('style', style);
        })
      }
  });
  return $.html();
}

exports.parse = parse;

