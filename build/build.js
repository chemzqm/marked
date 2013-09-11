
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("chemzqm-highlight.js/index.js", Function("exports, require, module",
"module.exports = require('./lib/highlight.js');\n\
//@ sourceURL=chemzqm-highlight.js/index.js"
));
require.register("chemzqm-highlight.js/lib/1c.js", Function("exports, require, module",
"module.exports = function(hljs){\n\
  var IDENT_RE_RU = '[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*';\n\
  var OneS_KEYWORDS = 'возврат дата для если и или иначе иначеесли исключение конецесли ' +\n\
    'конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем ' +\n\
    'перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл ' +\n\
    'число экспорт';\n\
  var OneS_BUILT_IN = 'ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ' +\n\
    'ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос ' +\n\
    'восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц ' +\n\
    'датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации ' +\n\
    'запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр ' +\n\
    'значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера ' +\n\
    'имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы ' +\n\
    'кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби ' +\n\
    'конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс ' +\n\
    'максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ ' +\n\
    'назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби ' +\n\
    'началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели ' +\n\
    'номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки ' +\n\
    'основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально ' +\n\
    'отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята ' +\n\
    'получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта ' +\n\
    'получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации ' +\n\
    'пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц ' +\n\
    'разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына ' +\n\
    'рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп ' +\n\
    'сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить ' +\n\
    'стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента ' +\n\
    'счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты ' +\n\
    'установитьтана установитьтапо фиксшаблон формат цел шаблон';\n\
  var DQUOTE =  {className: 'dquote',  begin: '\"\"'};\n\
  var STR_START = {\n\
      className: 'string',\n\
      begin: '\"', end: '\"|$',\n\
      contains: [DQUOTE],\n\
      relevance: 0\n\
    };\n\
  var STR_CONT = {\n\
    className: 'string',\n\
    begin: '\\\\|', end: '\"|$',\n\
    contains: [DQUOTE]\n\
  };\n\
\n\
  return {\n\
    case_insensitive: true,\n\
    lexems: IDENT_RE_RU,\n\
    keywords: {keyword: OneS_KEYWORDS, built_in: OneS_BUILT_IN},\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.NUMBER_MODE,\n\
      STR_START, STR_CONT,\n\
      {\n\
        className: 'function',\n\
        begin: '(процедура|функция)', end: '$',\n\
        lexems: IDENT_RE_RU,\n\
        keywords: 'процедура функция',\n\
        contains: [\n\
          {className: 'title', begin: IDENT_RE_RU},\n\
          {\n\
            className: 'tail',\n\
            endsWithParent: true,\n\
            contains: [\n\
              {\n\
                className: 'params',\n\
                begin: '\\\\(', end: '\\\\)',\n\
                lexems: IDENT_RE_RU,\n\
                keywords: 'знач',\n\
                contains: [STR_START, STR_CONT]\n\
              },\n\
              {\n\
                className: 'export',\n\
                begin: 'экспорт', endsWithParent: true,\n\
                lexems: IDENT_RE_RU,\n\
                keywords: 'экспорт',\n\
                contains: [hljs.C_LINE_COMMENT_MODE]\n\
              }\n\
            ]\n\
          },\n\
          hljs.C_LINE_COMMENT_MODE\n\
        ]\n\
      },\n\
      {className: 'preprocessor', begin: '#', end: '$'},\n\
      {className: 'date', begin: '\\'\\\\d{2}\\\\.\\\\d{2}\\\\.(\\\\d{2}|\\\\d{4})\\''}\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/1c.js"
));
require.register("chemzqm-highlight.js/lib/actionscript.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';\n\
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';\n\
\n\
  var AS3_REST_ARG_MODE = {\n\
    className: 'rest_arg',\n\
    begin: '[.]{3}', end: IDENT_RE,\n\
    relevance: 10\n\
  };\n\
  var TITLE_MODE = {className: 'title', begin: IDENT_RE};\n\
\n\
  return {\n\
    keywords: {\n\
      keyword: 'as break case catch class const continue default delete do dynamic each ' +\n\
        'else extends final finally for function get if implements import in include ' +\n\
        'instanceof interface internal is namespace native new override package private ' +\n\
        'protected public return set static super switch this throw try typeof use var void ' +\n\
        'while with',\n\
      literal: 'true false null undefined'\n\
    },\n\
    contains: [\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'package',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'package',\n\
        contains: [TITLE_MODE]\n\
      },\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'class interface',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true,\n\
            keywords: 'extends implements'\n\
          },\n\
          TITLE_MODE\n\
        ]\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        beginWithKeyword: true, end: ';',\n\
        keywords: 'import include'\n\
      },\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '[{;]',\n\
        keywords: 'function',\n\
        illegal: '\\\\S',\n\
        contains: [\n\
          TITLE_MODE,\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', end: '\\\\)',\n\
            contains: [\n\
              hljs.APOS_STRING_MODE,\n\
              hljs.QUOTE_STRING_MODE,\n\
              hljs.C_LINE_COMMENT_MODE,\n\
              hljs.C_BLOCK_COMMENT_MODE,\n\
              AS3_REST_ARG_MODE\n\
            ]\n\
          },\n\
          {\n\
            className: 'type',\n\
            begin: ':',\n\
            end: IDENT_FUNC_RETURN_TYPE_RE,\n\
            relevance: 10\n\
          }\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/actionscript.js"
));
require.register("chemzqm-highlight.js/lib/apache.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var NUMBER = {className: 'number', begin: '[\\\\$%]\\\\d+'};\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: {\n\
      keyword: 'acceptfilter acceptmutex acceptpathinfo accessfilename action addalt ' +\n\
        'addaltbyencoding addaltbytype addcharset adddefaultcharset adddescription ' +\n\
        'addencoding addhandler addicon addiconbyencoding addiconbytype addinputfilter ' +\n\
        'addlanguage addmoduleinfo addoutputfilter addoutputfilterbytype addtype alias ' +\n\
        'aliasmatch allow allowconnect allowencodedslashes allowoverride anonymous ' +\n\
        'anonymous_logemail anonymous_mustgiveemail anonymous_nouserid anonymous_verifyemail ' +\n\
        'authbasicauthoritative authbasicprovider authdbduserpwquery authdbduserrealmquery ' +\n\
        'authdbmgroupfile authdbmtype authdbmuserfile authdefaultauthoritative ' +\n\
        'authdigestalgorithm authdigestdomain authdigestnccheck authdigestnonceformat ' +\n\
        'authdigestnoncelifetime authdigestprovider authdigestqop authdigestshmemsize ' +\n\
        'authgroupfile authldapbinddn authldapbindpassword authldapcharsetconfig ' +\n\
        'authldapcomparednonserver authldapdereferencealiases authldapgroupattribute ' +\n\
        'authldapgroupattributeisdn authldapremoteuserattribute authldapremoteuserisdn ' +\n\
        'authldapurl authname authnprovideralias authtype authuserfile authzdbmauthoritative ' +\n\
        'authzdbmtype authzdefaultauthoritative authzgroupfileauthoritative ' +\n\
        'authzldapauthoritative authzownerauthoritative authzuserauthoritative ' +\n\
        'balancermember browsermatch browsermatchnocase bufferedlogs cachedefaultexpire ' +\n\
        'cachedirlength cachedirlevels cachedisable cacheenable cachefile ' +\n\
        'cacheignorecachecontrol cacheignoreheaders cacheignorenolastmod ' +\n\
        'cacheignorequerystring cachelastmodifiedfactor cachemaxexpire cachemaxfilesize ' +\n\
        'cacheminfilesize cachenegotiateddocs cacheroot cachestorenostore cachestoreprivate ' +\n\
        'cgimapextension charsetdefault charsetoptions charsetsourceenc checkcaseonly ' +\n\
        'checkspelling chrootdir contentdigest cookiedomain cookieexpires cookielog ' +\n\
        'cookiename cookiestyle cookietracking coredumpdirectory customlog dav ' +\n\
        'davdepthinfinity davgenericlockdb davlockdb davmintimeout dbdexptime dbdkeep ' +\n\
        'dbdmax dbdmin dbdparams dbdpersist dbdpreparesql dbdriver defaulticon ' +\n\
        'defaultlanguage defaulttype deflatebuffersize deflatecompressionlevel ' +\n\
        'deflatefilternote deflatememlevel deflatewindowsize deny directoryindex ' +\n\
        'directorymatch directoryslash documentroot dumpioinput dumpiologlevel dumpiooutput ' +\n\
        'enableexceptionhook enablemmap enablesendfile errordocument errorlog example ' +\n\
        'expiresactive expiresbytype expiresdefault extendedstatus extfilterdefine ' +\n\
        'extfilteroptions fileetag filterchain filterdeclare filterprotocol filterprovider ' +\n\
        'filtertrace forcelanguagepriority forcetype forensiclog gracefulshutdowntimeout ' +\n\
        'group header headername hostnamelookups identitycheck identitychecktimeout ' +\n\
        'imapbase imapdefault imapmenu include indexheadinsert indexignore indexoptions ' +\n\
        'indexorderdefault indexstylesheet isapiappendlogtoerrors isapiappendlogtoquery ' +\n\
        'isapicachefile isapifakeasync isapilognotsupported isapireadaheadbuffer keepalive ' +\n\
        'keepalivetimeout languagepriority ldapcacheentries ldapcachettl ' +\n\
        'ldapconnectiontimeout ldapopcacheentries ldapopcachettl ldapsharedcachefile ' +\n\
        'ldapsharedcachesize ldaptrustedclientcert ldaptrustedglobalcert ldaptrustedmode ' +\n\
        'ldapverifyservercert limitinternalrecursion limitrequestbody limitrequestfields ' +\n\
        'limitrequestfieldsize limitrequestline limitxmlrequestbody listen listenbacklog ' +\n\
        'loadfile loadmodule lockfile logformat loglevel maxclients maxkeepaliverequests ' +\n\
        'maxmemfree maxrequestsperchild maxrequestsperthread maxspareservers maxsparethreads ' +\n\
        'maxthreads mcachemaxobjectcount mcachemaxobjectsize mcachemaxstreamingbuffer ' +\n\
        'mcacheminobjectsize mcacheremovalalgorithm mcachesize metadir metafiles metasuffix ' +\n\
        'mimemagicfile minspareservers minsparethreads mmapfile mod_gzip_on ' +\n\
        'mod_gzip_add_header_count mod_gzip_keep_workfiles mod_gzip_dechunk ' +\n\
        'mod_gzip_min_http mod_gzip_minimum_file_size mod_gzip_maximum_file_size ' +\n\
        'mod_gzip_maximum_inmem_size mod_gzip_temp_dir mod_gzip_item_include ' +\n\
        'mod_gzip_item_exclude mod_gzip_command_version mod_gzip_can_negotiate ' +\n\
        'mod_gzip_handle_methods mod_gzip_static_suffix mod_gzip_send_vary ' +\n\
        'mod_gzip_update_static modmimeusepathinfo multiviewsmatch namevirtualhost noproxy ' +\n\
        'nwssltrustedcerts nwsslupgradeable options order passenv pidfile protocolecho ' +\n\
        'proxybadheader proxyblock proxydomain proxyerroroverride proxyftpdircharset ' +\n\
        'proxyiobuffersize proxymaxforwards proxypass proxypassinterpolateenv ' +\n\
        'proxypassmatch proxypassreverse proxypassreversecookiedomain ' +\n\
        'proxypassreversecookiepath proxypreservehost proxyreceivebuffersize proxyremote ' +\n\
        'proxyremotematch proxyrequests proxyset proxystatus proxytimeout proxyvia ' +\n\
        'readmename receivebuffersize redirect redirectmatch redirectpermanent ' +\n\
        'redirecttemp removecharset removeencoding removehandler removeinputfilter ' +\n\
        'removelanguage removeoutputfilter removetype requestheader require rewritebase ' +\n\
        'rewritecond rewriteengine rewritelock rewritelog rewriteloglevel rewritemap ' +\n\
        'rewriteoptions rewriterule rlimitcpu rlimitmem rlimitnproc satisfy scoreboardfile ' +\n\
        'script scriptalias scriptaliasmatch scriptinterpretersource scriptlog ' +\n\
        'scriptlogbuffer scriptloglength scriptsock securelisten seerequesttail ' +\n\
        'sendbuffersize serveradmin serveralias serverlimit servername serverpath ' +\n\
        'serverroot serversignature servertokens setenv setenvif setenvifnocase sethandler ' +\n\
        'setinputfilter setoutputfilter ssienableaccess ssiendtag ssierrormsg ssistarttag ' +\n\
        'ssitimeformat ssiundefinedecho sslcacertificatefile sslcacertificatepath ' +\n\
        'sslcadnrequestfile sslcadnrequestpath sslcarevocationfile sslcarevocationpath ' +\n\
        'sslcertificatechainfile sslcertificatefile sslcertificatekeyfile sslciphersuite ' +\n\
        'sslcryptodevice sslengine sslhonorciperorder sslmutex ssloptions ' +\n\
        'sslpassphrasedialog sslprotocol sslproxycacertificatefile ' +\n\
        'sslproxycacertificatepath sslproxycarevocationfile sslproxycarevocationpath ' +\n\
        'sslproxyciphersuite sslproxyengine sslproxymachinecertificatefile ' +\n\
        'sslproxymachinecertificatepath sslproxyprotocol sslproxyverify ' +\n\
        'sslproxyverifydepth sslrandomseed sslrequire sslrequiressl sslsessioncache ' +\n\
        'sslsessioncachetimeout sslusername sslverifyclient sslverifydepth startservers ' +\n\
        'startthreads substitute suexecusergroup threadlimit threadsperchild ' +\n\
        'threadstacksize timeout traceenable transferlog typesconfig unsetenv ' +\n\
        'usecanonicalname usecanonicalphysicalport user userdir virtualdocumentroot ' +\n\
        'virtualdocumentrootip virtualscriptalias virtualscriptaliasip ' +\n\
        'win32disableacceptex xbithack',\n\
      literal: 'on off'\n\
    },\n\
    contains: [\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        className: 'sqbracket',\n\
        begin: '\\\\s\\\\[', end: '\\\\]$'\n\
      },\n\
      {\n\
        className: 'cbracket',\n\
        begin: '[\\\\$%]\\\\{', end: '\\\\}',\n\
        contains: ['self', NUMBER]\n\
      },\n\
      NUMBER,\n\
      {className: 'tag', begin: '</?', end: '>'},\n\
      hljs.QUOTE_STRING_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/apache.js"
));
require.register("chemzqm-highlight.js/lib/applescript.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''});\n\
  var TITLE = {\n\
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE\n\
  };\n\
  var PARAMS = {\n\
    className: 'params',\n\
    begin: '\\\\(', end: '\\\\)',\n\
    contains: ['self', hljs.C_NUMBER_MODE, STRING]\n\
  };\n\
  var COMMENTS = [\n\
    {\n\
      className: 'comment',\n\
      begin: '--', end: '$',\n\
    },\n\
    {\n\
      className: 'comment',\n\
      begin: '\\\\(\\\\*', end: '\\\\*\\\\)',\n\
      contains: ['self', {begin: '--', end: '$'}] //allow nesting\n\
    },\n\
    hljs.HASH_COMMENT_MODE\n\
  ];\n\
\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'about above after against and around as at back before beginning ' +\n\
        'behind below beneath beside between but by considering ' +\n\
        'contain contains continue copy div does eighth else end equal ' +\n\
        'equals error every exit fifth first for fourth from front ' +\n\
        'get given global if ignoring in into is it its last local me ' +\n\
        'middle mod my ninth not of on onto or over prop property put ref ' +\n\
        'reference repeat returning script second set seventh since ' +\n\
        'sixth some tell tenth that the then third through thru ' +\n\
        'timeout times to transaction try until where while whose with ' +\n\
        'without',\n\
      constant:\n\
        'AppleScript false linefeed return pi quote result space tab true',\n\
      type:\n\
        'alias application boolean class constant date file integer list ' +\n\
        'number real record string text',\n\
      command:\n\
        'activate beep count delay launch log offset read round ' +\n\
        'run say summarize write',\n\
      property:\n\
        'character characters contents day frontmost id item length ' +\n\
        'month name paragraph paragraphs rest reverse running time version ' +\n\
        'weekday word words year'\n\
    },\n\
    contains: [\n\
      STRING,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'type',\n\
        begin: '\\\\bPOSIX file\\\\b'\n\
      },\n\
      {\n\
        className: 'command',\n\
        begin:\n\
          '\\\\b(clipboard info|the clipboard|info for|list (disks|folder)|' +\n\
          'mount volume|path to|(close|open for) access|(get|set) eof|' +\n\
          'current date|do shell script|get volume settings|random number|' +\n\
          'set volume|system attribute|system info|time to GMT|' +\n\
          '(load|run|store) script|scripting components|' +\n\
          'ASCII (character|number)|localized string|' +\n\
          'choose (application|color|file|file name|' +\n\
          'folder|from list|remote application|URL)|' +\n\
          'display (alert|dialog))\\\\b|^\\\\s*return\\\\b'\n\
      },\n\
      {\n\
        className: 'constant',\n\
        begin:\n\
          '\\\\b(text item delimiters|current application|missing value)\\\\b'\n\
      },\n\
      {\n\
        className: 'keyword',\n\
        begin:\n\
          '\\\\b(apart from|aside from|instead of|out of|greater than|' +\n\
          \"isn't|(doesn't|does not) (equal|come before|come after|contain)|\" +\n\
          '(greater|less) than( or equal)?|(starts?|ends|begins?) with|' +\n\
          'contained by|comes (before|after)|a (ref|reference))\\\\b'\n\
      },\n\
      {\n\
        className: 'property',\n\
        begin:\n\
          '\\\\b(POSIX path|(date|time) string|quoted form)\\\\b'\n\
      },\n\
      {\n\
        className: 'function_start',\n\
        beginWithKeyword: true,\n\
        keywords: 'on',\n\
        illegal: '[${=;\\\\n\
]',\n\
        contains: [TITLE, PARAMS]\n\
      }\n\
    ].concat(COMMENTS)\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/applescript.js"
));
require.register("chemzqm-highlight.js/lib/avrasm.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: {\n\
      keyword:\n\
        /* mnemonic */\n\
        'adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs ' +\n\
        'brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr ' +\n\
        'clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor ' +\n\
        'fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul ' +\n\
        'muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs ' +\n\
        'sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub ' +\n\
        'subi swap tst wdr',\n\
      built_in:\n\
        /* general purpose registers */\n\
        'r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 ' +\n\
        'r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ' +\n\
        /* IO Registers (ATMega128) */\n\
        'ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h ' +\n\
        'tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ' +\n\
        'ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ' +\n\
        'ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk ' +\n\
        'tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ' +\n\
        'ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr ' +\n\
        'porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ' +\n\
        'ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf'\n\
    },\n\
    contains: [\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      {className: 'comment', begin: ';',  end: '$'},\n\
      hljs.C_NUMBER_MODE, // 0x..., decimal, float\n\
      hljs.BINARY_NUMBER_MODE, // 0b...\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\b(\\\\$[a-zA-Z0-9]+|0o[0-7]+)' // $..., 0o...\n\
      },\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\\'', end: '[^\\\\\\\\]\\'',\n\
        illegal: '[^\\\\\\\\][^\\']'\n\
      },\n\
      {className: 'label',  begin: '^[A-Za-z0-9_.$]+:'},\n\
      {className: 'preprocessor', begin: '#', end: '$'},\n\
      {  // директивы «.include» «.macro» и т.д.\n\
        className: 'preprocessor',\n\
        begin: '\\\\.[a-zA-Z]+'\n\
      },\n\
      {  // подстановка в «.macro»\n\
        className: 'localvars',\n\
        begin: '@[0-9]+'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/avrasm.js"
));
require.register("chemzqm-highlight.js/lib/axapta.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: 'false int abstract private char interface boolean static null if for true ' +\n\
      'while long throw finally protected extends final implements return void enum else ' +\n\
      'break new catch byte super class case short default double public try this switch ' +\n\
      'continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count ' +\n\
      'order group by asc desc index hint like dispaly edit client server ttsbegin ' +\n\
      'ttscommit str real date container anytype common div mod',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#', end: '$'\n\
      },\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, end: '{',\n\
        illegal: ':',\n\
        keywords: 'class interface',\n\
        contains: [\n\
          {\n\
            className: 'inheritance',\n\
            beginWithKeyword: true,\n\
            keywords: 'extends implements',\n\
            relevance: 10\n\
          },\n\
          {\n\
            className: 'title',\n\
            begin: hljs.UNDERSCORE_IDENT_RE\n\
          }\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/axapta.js"
));
require.register("chemzqm-highlight.js/lib/bash.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var BASH_LITERAL = 'true false';\n\
  var BASH_KEYWORD = 'if then else elif fi for break continue while in do done echo exit return set declare';\n\
  var VAR1 = {\n\
    className: 'variable', begin: '\\\\$[a-zA-Z0-9_#]+'\n\
  };\n\
  var VAR2 = {\n\
    className: 'variable', begin: '\\\\${([^}]|\\\\\\\\})+}'\n\
  };\n\
  var QUOTE_STRING = {\n\
    className: 'string',\n\
    begin: '\"', end: '\"',\n\
    illegal: '\\\\n\
',\n\
    contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2],\n\
    relevance: 0\n\
  };\n\
  var APOS_STRING = {\n\
    className: 'string',\n\
    begin: '\\'', end: '\\'',\n\
    contains: [{begin: '\\'\\''}],\n\
    relevance: 0\n\
  };\n\
  var TEST_CONDITION = {\n\
    className: 'test_condition',\n\
    begin: '', end: '',\n\
    contains: [QUOTE_STRING, APOS_STRING, VAR1, VAR2],\n\
    keywords: {\n\
      literal: BASH_LITERAL\n\
    },\n\
    relevance: 0\n\
  };\n\
\n\
  return {\n\
    keywords: {\n\
      keyword: BASH_KEYWORD,\n\
      literal: BASH_LITERAL\n\
    },\n\
    contains: [\n\
      {\n\
        className: 'shebang',\n\
        begin: '(#!\\\\/bin\\\\/bash)|(#!\\\\/bin\\\\/sh)',\n\
        relevance: 10\n\
      },\n\
      VAR1,\n\
      VAR2,\n\
      hljs.HASH_COMMENT_MODE,\n\
      QUOTE_STRING,\n\
      APOS_STRING,\n\
      hljs.inherit(TEST_CONDITION, {begin: '\\\\[ ', end: ' \\\\]', relevance: 0}),\n\
      hljs.inherit(TEST_CONDITION, {begin: '\\\\[\\\\[ ', end: ' \\\\]\\\\]'})\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/bash.js"
));
require.register("chemzqm-highlight.js/lib/brainfuck.js", Function("exports, require, module",
"module.exports = function(hljs){\n\
  return {\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: '[^\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n\
]',\n\
        excludeEnd: true,\n\
        end: '[\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n\
]',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'title',\n\
        begin: '[\\\\[\\\\]]',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '[\\\\.,]'\n\
      },\n\
      {\n\
        className: 'literal',\n\
        begin: '[\\\\+\\\\-]'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/brainfuck.js"
));
require.register("chemzqm-highlight.js/lib/clojure.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var keywords = {\n\
    built_in:\n\
      // Clojure keywords\n\
      'def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem '+\n\
      'quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? '+\n\
      'set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? '+\n\
      'class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? '+\n\
      'string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . '+\n\
      'inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last '+\n\
      'drop-while while intern condp case reduced cycle split-at split-with repeat replicate '+\n\
      'iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext '+\n\
      'nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends '+\n\
      'add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler '+\n\
      'set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter '+\n\
      'monitor-exit defmacro defn defn- macroexpand macroexpand-1 for doseq dosync dotimes and or '+\n\
      'when when-not when-let comp juxt partial sequence memoize constantly complement identity assert '+\n\
      'peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast '+\n\
      'sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import '+\n\
      'intern refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! '+\n\
      'assoc! dissoc! pop! disj! import use class type num float double short byte boolean bigint biginteger '+\n\
      'bigdec print-method print-dup throw-if throw printf format load compile get-in update-in pr pr-on newline '+\n\
      'flush read slurp read-line subvec with-open memfn time ns assert re-find re-groups rand-int rand mod locking '+\n\
      'assert-valid-fdecl alias namespace resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! '+\n\
      'reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! '+\n\
      'new next conj set! memfn to-array future future-call into-array aset gen-class reduce merge map filter find empty '+\n\
      'hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list '+\n\
      'disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer '+\n\
      'chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate '+\n\
      'unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta '+\n\
      'lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize'\n\
   };\n\
\n\
  var CLJ_IDENT_RE = '[a-zA-Z_0-9\\\\!\\\\.\\\\?\\\\-\\\\+\\\\*\\\\/\\\\<\\\\=\\\\>\\\\&\\\\#\\\\$\\';]+';\n\
  var SIMPLE_NUMBER_RE = '[\\\\s:\\\\(\\\\{]+\\\\d+(\\\\.\\\\d+)?';\n\
\n\
  var NUMBER = {\n\
    className: 'number', begin: SIMPLE_NUMBER_RE,\n\
    relevance: 0\n\
  };\n\
  var STRING = {\n\
    className: 'string',\n\
    begin: '\"', end: '\"',\n\
    contains: [hljs.BACKSLASH_ESCAPE],\n\
    relevance: 0\n\
  };\n\
  var COMMENT = {\n\
    className: 'comment',\n\
    begin: ';', end: '$',\n\
    relevance: 0\n\
  };\n\
  var COLLECTION = {\n\
    className: 'collection',\n\
    begin: '[\\\\[\\\\{]', end: '[\\\\]\\\\}]'\n\
  };\n\
  var HINT = {\n\
    className: 'comment',\n\
    begin: '\\\\^' + CLJ_IDENT_RE\n\
  };\n\
  var HINT_COL = {\n\
    className: 'comment',\n\
    begin: '\\\\^\\\\{', end: '\\\\}'\n\
  };\n\
  var KEY = {\n\
    className: 'attribute',\n\
    begin: '[:]' + CLJ_IDENT_RE\n\
  };\n\
  var LIST = {\n\
    className: 'list',\n\
    begin: '\\\\(', end: '\\\\)',\n\
    relevance: 0\n\
  };\n\
  var BODY = {\n\
    endsWithParent: true, excludeEnd: true,\n\
    keywords: {literal: 'true false nil'},\n\
    relevance: 0\n\
  };\n\
  var TITLE = {\n\
    keywords: keywords,\n\
    lexems: CLJ_IDENT_RE,\n\
    className: 'title', begin: CLJ_IDENT_RE,\n\
    starts: BODY\n\
  };\n\
\n\
  LIST.contains = [{className: 'comment', begin: 'comment'}, TITLE];\n\
  BODY.contains = [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER];\n\
  COLLECTION.contains = [LIST, STRING, HINT, COMMENT, KEY, COLLECTION, NUMBER];\n\
\n\
  return {\n\
    illegal: '\\\\S',\n\
    contains: [\n\
      COMMENT,\n\
      LIST\n\
    ]\n\
  }\n\
};//@ sourceURL=chemzqm-highlight.js/lib/clojure.js"
));
require.register("chemzqm-highlight.js/lib/cmake.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: 'add_custom_command add_custom_target add_definitions add_dependencies ' +\n\
      'add_executable add_library add_subdirectory add_test aux_source_directory ' +\n\
      'break build_command cmake_minimum_required cmake_policy configure_file ' +\n\
      'create_test_sourcelist define_property else elseif enable_language enable_testing ' +\n\
      'endforeach endfunction endif endmacro endwhile execute_process export find_file ' +\n\
      'find_library find_package find_path find_program fltk_wrap_ui foreach function ' +\n\
      'get_cmake_property get_directory_property get_filename_component get_property ' +\n\
      'get_source_file_property get_target_property get_test_property if include ' +\n\
      'include_directories include_external_msproject include_regular_expression install ' +\n\
      'link_directories load_cache load_command macro mark_as_advanced message option ' +\n\
      'output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return ' +\n\
      'separate_arguments set set_directory_properties set_property ' +\n\
      'set_source_files_properties set_target_properties set_tests_properties site_name ' +\n\
      'source_group string target_link_libraries try_compile try_run unset variable_watch ' +\n\
      'while build_name exec_program export_library_dependencies install_files ' +\n\
      'install_programs install_targets link_libraries make_directory remove subdir_depends ' +\n\
      'subdirs use_mangled_mesa utility_source variable_requires write_file',\n\
    contains: [\n\
      {\n\
        className: 'envvar',\n\
        begin: '\\\\${', end: '}'\n\
      },\n\
      hljs.HASH_COMMENT_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.NUMBER_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/cmake.js"
));
require.register("chemzqm-highlight.js/lib/coffeescript.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var KEYWORDS = {\n\
    keyword:\n\
      // JS keywords\n\
      'in if for while finally new do return else break catch instanceof throw try this ' +\n\
      'switch continue typeof delete debugger super ' +\n\
      // Coffee keywords\n\
      'then unless until loop of by when and or is isnt not',\n\
    literal:\n\
      // JS literals\n\
      'true false null undefined ' +\n\
      // Coffee literals\n\
      'yes no on off ',\n\
    reserved: 'case default function var void with const let enum export import native ' +\n\
      '__hasProp __extends __slice __bind __indexOf'\n\
  };\n\
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';\n\
  var TITLE = {className: 'title', begin: JS_IDENT_RE};\n\
  var SUBST = {\n\
    className: 'subst',\n\
    begin: '#\\\\{', end: '}',\n\
    keywords: KEYWORDS,\n\
    contains: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]\n\
  };\n\
\n\
  return {\n\
    keywords: KEYWORDS,\n\
    contains: [\n\
      // Numbers\n\
      hljs.BINARY_NUMBER_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      // Strings\n\
      hljs.APOS_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\"\"\"', end: '\"\"\"',\n\
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '\"', end: '\"',\n\
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],\n\
        relevance: 0\n\
      },\n\
      // Comments\n\
      {\n\
        className: 'comment',\n\
        begin: '###', end: '###'\n\
      },\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        className: 'regexp',\n\
        begin: '///', end: '///',\n\
        contains: [hljs.HASH_COMMENT_MODE]\n\
      },\n\
      {\n\
        className: 'regexp', begin: '//[gim]*'\n\
      },\n\
      {\n\
        className: 'regexp',\n\
        begin: '/\\\\S(\\\\\\\\.|[^\\\\n\
])*/[gim]*' // \\S is required to parse x / 2 / 3 as two divisions\n\
      },\n\
      {\n\
        begin: '`', end: '`',\n\
        excludeBegin: true, excludeEnd: true,\n\
        subLanguage: 'javascript'\n\
      },\n\
      {\n\
        className: 'function',\n\
        begin: JS_IDENT_RE + '\\\\s*=\\\\s*(\\\\(.+\\\\))?\\\\s*[-=]>',\n\
        returnBegin: true,\n\
        contains: [\n\
          TITLE,\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', end: '\\\\)'\n\
          }\n\
        ]\n\
      },\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, keywords: 'class',\n\
        end: '$',\n\
        illegal: ':',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true, keywords: 'extends',\n\
            endsWithParent: true,\n\
            illegal: ':',\n\
            contains: [TITLE]\n\
          },\n\
          TITLE\n\
        ]\n\
      },\n\
      {\n\
        className: 'property',\n\
        begin: '@' + JS_IDENT_RE\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/coffeescript.js"
));
require.register("chemzqm-highlight.js/lib/cpp.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var CPP_KEYWORDS = {\n\
    keyword: 'false int float while private char catch export virtual operator sizeof ' +\n\
      'dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace ' +\n\
      'unsigned long throw volatile static protected bool template mutable if public friend ' +\n\
      'do return goto auto void enum else break new extern using true class asm case typeid ' +\n\
      'short reinterpret_cast|10 default double register explicit signed typename try this ' +\n\
      'switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype ' +\n\
      'noexcept nullptr static_assert thread_local restrict _Bool complex',\n\
    built_in: 'std string cin cout cerr clog stringstream istringstream ostringstream ' +\n\
      'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' +\n\
      'unordered_map unordered_multiset unordered_multimap array shared_ptr'\n\
  };\n\
  return {\n\
    keywords: CPP_KEYWORDS,\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\\'\\\\\\\\?.', end: '\\'',\n\
        illegal: '.'\n\
      },\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\b(\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)(u|U|l|L|ul|UL|f|F)'\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#', end: '$'\n\
      },\n\
      {\n\
        className: 'stl_container',\n\
        begin: '\\\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\\\s*<', end: '>',\n\
        keywords: CPP_KEYWORDS,\n\
        relevance: 10,\n\
        contains: ['self']\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/cpp.js"
));
require.register("chemzqm-highlight.js/lib/cs.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords:\n\
      // Normal keywords.\n\
      'abstract as base bool break byte case catch char checked class const continue decimal ' +\n\
      'default delegate do double else enum event explicit extern false finally fixed float ' +\n\
      'for foreach goto if implicit in int interface internal is lock long namespace new null ' +\n\
      'object operator out override params private protected public readonly ref return sbyte ' +\n\
      'sealed short sizeof stackalloc static string struct switch this throw true try typeof ' +\n\
      'uint ulong unchecked unsafe ushort using virtual volatile void while ' +\n\
      // Contextual keywords.\n\
      'ascending descending from get group into join let orderby partial select set value var '+\n\
      'where yield',\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: '///', end: '$', returnBegin: true,\n\
        contains: [\n\
          {\n\
            className: 'xmlDocTag',\n\
            begin: '///|<!--|-->'\n\
          },\n\
          {\n\
            className: 'xmlDocTag',\n\
            begin: '</?', end: '>'\n\
          }\n\
        ]\n\
      },\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#', end: '$',\n\
        keywords: 'if else elif endif define undef warning error line region endregion pragma checksum'\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '@\"', end: '\"',\n\
        contains: [{begin: '\"\"'}]\n\
      },\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_NUMBER_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/cs.js"
));
require.register("chemzqm-highlight.js/lib/css.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var FUNCTION = {\n\
    className: 'function',\n\
    begin: hljs.IDENT_RE + '\\\\(', end: '\\\\)',\n\
    contains: [hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]\n\
  };\n\
  return {\n\
    case_insensitive: true,\n\
    illegal: '[=/|\\']',\n\
    contains: [\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      {\n\
        className: 'id', begin: '\\\\#[A-Za-z0-9_-]+'\n\
      },\n\
      {\n\
        className: 'class', begin: '\\\\.[A-Za-z0-9_-]+',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'attr_selector',\n\
        begin: '\\\\[', end: '\\\\]',\n\
        illegal: '$'\n\
      },\n\
      {\n\
        className: 'pseudo',\n\
        begin: ':(:)?[a-zA-Z0-9\\\\_\\\\-\\\\+\\\\(\\\\)\\\\\"\\\\\\']+'\n\
      },\n\
      {\n\
        className: 'at_rule',\n\
        begin: '@(font-face|page)',\n\
        lexems: '[a-z-]+',\n\
        keywords: 'font-face page'\n\
      },\n\
      {\n\
        className: 'at_rule',\n\
        begin: '@', end: '[{;]', // at_rule eating first \"{\" is a good thing\n\
                                 // because it doesn’t let it to be parsed as\n\
                                 // a rule set but instead drops parser into\n\
                                 // the default mode which is how it should be.\n\
        excludeEnd: true,\n\
        keywords: 'import page media charset',\n\
        contains: [\n\
          FUNCTION,\n\
          hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,\n\
          hljs.NUMBER_MODE\n\
        ]\n\
      },\n\
      {\n\
        className: 'tag', begin: hljs.IDENT_RE,\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'rules',\n\
        begin: '{', end: '}',\n\
        illegal: '[^\\\\s]',\n\
        relevance: 0,\n\
        contains: [\n\
          hljs.C_BLOCK_COMMENT_MODE,\n\
          {\n\
            className: 'rule',\n\
            begin: '[^\\\\s]', returnBegin: true, end: ';', endsWithParent: true,\n\
            contains: [\n\
              {\n\
                className: 'attribute',\n\
                begin: '[A-Z\\\\_\\\\.\\\\-]+', end: ':',\n\
                excludeEnd: true,\n\
                illegal: '[^\\\\s]',\n\
                starts: {\n\
                  className: 'value',\n\
                  endsWithParent: true, excludeEnd: true,\n\
                  contains: [\n\
                    FUNCTION,\n\
                    hljs.NUMBER_MODE,\n\
                    hljs.QUOTE_STRING_MODE,\n\
                    hljs.APOS_STRING_MODE,\n\
                    hljs.C_BLOCK_COMMENT_MODE,\n\
                    {\n\
                      className: 'hexcolor', begin: '\\\\#[0-9A-F]+'\n\
                    },\n\
                    {\n\
                      className: 'important', begin: '!important'\n\
                    }\n\
                  ]\n\
                }\n\
              }\n\
            ]\n\
          }\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/css.js"
));
require.register("chemzqm-highlight.js/lib/d.js", Function("exports, require, module",
"module.exports = /**\n\
 * Known issues:\n\
 *\n\
 * - invalid hex string literals will be recognized as a double quoted strings\n\
 *   but 'x' at the beginning of string will not be matched\n\
 *\n\
 * - delimited string literals are not checked for matching end delimiter\n\
 *   (not possible to do with js regexp)\n\
 *\n\
 * - content of token string is colored as a string (i.e. no keyword coloring inside a token string)\n\
 *   also, content of token string is not validated to contain only valid D tokens\n\
 *\n\
 * - special token sequence rule is not strictly following D grammar (anything following #line\n\
 *   up to the end of line is matched as special token sequence)\n\
 */\n\
\n\
function(hljs) {\n\
\n\
\t/**\n\
\t * Language keywords\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_KEYWORDS = {\n\
\t\tkeyword:\n\
\t\t\t'abstract alias align asm assert auto body break byte case cast catch class ' +\n\
\t\t\t'const continue debug default delete deprecated do else enum export extern final ' +\n\
\t\t\t'finally for foreach foreach_reverse|10 goto if immutable import in inout int ' +\n\
\t\t\t'interface invariant is lazy macro mixin module new nothrow out override package ' +\n\
\t\t\t'pragma private protected public pure ref return scope shared static struct ' +\n\
\t\t\t'super switch synchronized template this throw try typedef typeid typeof union ' +\n\
\t\t\t'unittest version void volatile while with __FILE__ __LINE__ __gshared|10 ' +\n\
\t\t\t'__thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__',\n\
\t\tbuilt_in:\n\
\t\t\t'bool cdouble cent cfloat char creal dchar delegate double dstring float function ' +\n\
\t\t\t'idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar ' +\n\
\t\t\t'wstring',\n\
\t\tliteral:\n\
\t\t\t'false null true'\n\
\t};\n\
\n\
\t/**\n\
\t * Number literal regexps\n\
\t *\n\
\t * @type {String}\n\
\t */\n\
\tvar decimal_integer_re = '(0|[1-9][\\\\d_]*)',\n\
\t\tdecimal_integer_nosus_re = '(0|[1-9][\\\\d_]*|\\\\d[\\\\d_]*|[\\\\d_]+?\\\\d)',\n\
\t\tbinary_integer_re = '0[bB][01_]+',\n\
\t\thexadecimal_digits_re = '([\\\\da-fA-F][\\\\da-fA-F_]*|_[\\\\da-fA-F][\\\\da-fA-F_]*)',\n\
\t\thexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re,\n\
\n\
\t\tdecimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')',\n\
\t\tdecimal_float_re = '(' + decimal_integer_nosus_re + '(\\\\.\\\\d*|' + decimal_exponent_re + ')|' +\n\
\t\t\t\t\t\t\t\t'\\\\d+\\\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' +\n\
\t\t\t\t\t\t\t\t'\\\\.' + decimal_integer_re + decimal_exponent_re + '?' +\n\
\t\t\t\t\t\t\t')',\n\
\t\thexadecimal_float_re = '(0[xX](' +\n\
\t\t\t\t\t\t\t\t\thexadecimal_digits_re + '\\\\.' + hexadecimal_digits_re + '|'+\n\
\t\t\t\t\t\t\t\t\t'\\\\.?' + hexadecimal_digits_re +\n\
\t\t\t\t\t\t\t   ')[pP][+-]?' + decimal_integer_nosus_re + ')',\n\
\n\
\t\tinteger_re = '(' +\n\
\t\t\tdecimal_integer_re + '|' +\n\
\t\t\tbinary_integer_re  + '|' +\n\
\t\t \thexadecimal_integer_re   +\n\
\t\t')',\n\
\n\
\t\tfloat_re = '(' +\n\
\t\t\thexadecimal_float_re + '|' +\n\
\t\t\tdecimal_float_re  +\n\
\t\t')';\n\
\n\
\t/**\n\
\t * Escape sequence supported in D string and character literals\n\
\t *\n\
\t * @type {String}\n\
\t */\n\
\tvar escape_sequence_re = '\\\\\\\\(' +\n\
\t\t\t\t\t\t\t'[\\'\"\\\\?\\\\\\\\abfnrtv]|' +\t// common escapes\n\
\t\t\t\t\t\t\t'u[\\\\dA-Fa-f]{4}|' + \t\t// four hex digit unicode codepoint\n\
\t\t\t\t\t\t\t'[0-7]{1,3}|' + \t\t\t// one to three octal digit ascii char code\n\
\t\t\t\t\t\t\t'x[\\\\dA-Fa-f]{2}|' +\t\t// two hex digit ascii char code\n\
\t\t\t\t\t\t\t'U[\\\\dA-Fa-f]{8}' +\t\t\t// eight hex digit unicode codepoint\n\
\t\t\t\t\t\t  ')|' +\n\
\t\t\t\t\t\t  '&[a-zA-Z\\\\d]{2,};';\t\t\t// named character entity\n\
\n\
\n\
\t/**\n\
\t * D integer number literals\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_INTEGER_MODE = {\n\
\t\tclassName: 'number',\n\
    \tbegin: '\\\\b' + integer_re + '(L|u|U|Lu|LU|uL|UL)?',\n\
    \trelevance: 0\n\
\t};\n\
\n\
\t/**\n\
\t * [D_FLOAT_MODE description]\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_FLOAT_MODE = {\n\
\t\tclassName: 'number',\n\
\t\tbegin: '\\\\b(' +\n\
\t\t\t\tfloat_re + '([fF]|L|i|[fF]i|Li)?|' +\n\
\t\t\t\tinteger_re + '(i|[fF]i|Li)' +\n\
\t\t\t')',\n\
\t\trelevance: 0\n\
\t};\n\
\n\
\t/**\n\
\t * D character literal\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_CHARACTER_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: '\\'(' + escape_sequence_re + '|.)', end: '\\'',\n\
\t\tillegal: '.'\n\
\t};\n\
\n\
\t/**\n\
\t * D string escape sequence\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_ESCAPE_SEQUENCE = {\n\
\t\tbegin: escape_sequence_re,\n\
\t\trelevance: 0\n\
\t}\n\
\n\
\t/**\n\
\t * D double quoted string literal\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_STRING_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: '\"',\n\
\t\tcontains: [D_ESCAPE_SEQUENCE],\n\
\t\tend: '\"[cwd]?',\n\
\t\trelevance: 0\n\
\t};\n\
\n\
\t/**\n\
\t * D wysiwyg and delimited string literals\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_WYSIWYG_DELIMITED_STRING_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: '[rq]\"',\n\
\t\tend: '\"[cwd]?',\n\
\t\trelevance: 5\n\
\t};\n\
\n\
\t/**\n\
\t * D alternate wysiwyg string literal\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_ALTERNATE_WYSIWYG_STRING_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: '`',\n\
\t\tend: '`[cwd]?'\n\
\t};\n\
\n\
\t/**\n\
\t * D hexadecimal string literal\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_HEX_STRING_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: 'x\"[\\\\da-fA-F\\\\s\\\\n\
\\\\r]*\"[cwd]?',\n\
\t\trelevance: 10\n\
\t};\n\
\n\
\t/**\n\
\t * D delimited string literal\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_TOKEN_STRING_MODE = {\n\
\t\tclassName: 'string',\n\
\t\tbegin: 'q\"\\\\{',\n\
\t\tend: '\\\\}\"'\n\
\t};\n\
\n\
\t/**\n\
\t * Hashbang support\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_HASHBANG_MODE = {\n\
\t\tclassName: 'shebang',\n\
\t\tbegin: '^#!',\n\
\t\tend: '$',\n\
\t\trelevance: 5\n\
\t};\n\
\n\
\t/**\n\
\t * D special token sequence\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_SPECIAL_TOKEN_SEQUENCE_MODE = {\n\
\t\tclassName: 'preprocessor',\n\
\t\tbegin: '#(line)',\n\
\t\tend: '$',\n\
\t\trelevance: 5\n\
\t};\n\
\n\
\t/**\n\
\t * D attributes\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_ATTRIBUTE_MODE = {\n\
\t\tclassName: 'keyword',\n\
\t\tbegin: '@[a-zA-Z_][a-zA-Z_\\\\d]*'\n\
\t};\n\
\n\
\t/**\n\
\t * D nesting comment\n\
\t *\n\
\t * @type {Object}\n\
\t */\n\
\tvar D_NESTING_COMMENT_MODE = {\n\
\t\tclassName: 'comment',\n\
\t\tbegin: '\\\\/\\\\+',\n\
\t\tcontains: ['self'],\n\
\t\tend: '\\\\+\\\\/',\n\
\t\trelevance: 10\n\
\t}\n\
\n\
\treturn {\n\
\t\tlexems: hljs.UNDERSCORE_IDENT_RE,\n\
\t\tkeywords: D_KEYWORDS,\n\
\t\tcontains: [\n\
\t\t\thljs.C_LINE_COMMENT_MODE,\n\
  \t\t\thljs.C_BLOCK_COMMENT_MODE,\n\
  \t\t\tD_NESTING_COMMENT_MODE,\n\
  \t\t\tD_HEX_STRING_MODE,\n\
  \t\t\tD_STRING_MODE,\n\
  \t\t\tD_WYSIWYG_DELIMITED_STRING_MODE,\n\
  \t\t\tD_ALTERNATE_WYSIWYG_STRING_MODE,\n\
  \t\t\tD_TOKEN_STRING_MODE,\n\
  \t\t\tD_FLOAT_MODE,\n\
  \t\t\tD_INTEGER_MODE,\n\
  \t\t\tD_CHARACTER_MODE,\n\
  \t\t\tD_HASHBANG_MODE,\n\
  \t\t\tD_SPECIAL_TOKEN_SEQUENCE_MODE,\n\
  \t\t\tD_ATTRIBUTE_MODE\n\
\t\t]\n\
\t};\n\
};//@ sourceURL=chemzqm-highlight.js/lib/d.js"
));
require.register("chemzqm-highlight.js/lib/delphi.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var DELPHI_KEYWORDS = 'and safecall cdecl then string exports library not pascal set ' +\n\
    'virtual file in array label packed end. index while const raise for to implementation ' +\n\
    'with except overload destructor downto finally program exit unit inherited override if ' +\n\
    'type until function do begin repeat goto nil far initialization object else var uses ' +\n\
    'external resourcestring interface end finalization class asm mod case on shr shl of ' +\n\
    'register xorwrite threadvar try record near stored constructor stdcall inline div out or ' +\n\
    'procedure';\n\
  var DELPHI_CLASS_KEYWORDS = 'safecall stdcall pascal stored const implementation ' +\n\
    'finalization except to finally program inherited override then exports string read not ' +\n\
    'mod shr try div shl set library message packed index for near overload label downto exit ' +\n\
    'public goto interface asm on of constructor or private array unit raise destructor var ' +\n\
    'type until function else external with case default record while protected property ' +\n\
    'procedure published and cdecl do threadvar file in if end virtual write far out begin ' +\n\
    'repeat nil initialization object uses resourcestring class register xorwrite inline static';\n\
  var CURLY_COMMENT =  {\n\
    className: 'comment',\n\
    begin: '{', end: '}',\n\
    relevance: 0\n\
  };\n\
  var PAREN_COMMENT = {\n\
    className: 'comment',\n\
    begin: '\\\\(\\\\*', end: '\\\\*\\\\)',\n\
    relevance: 10\n\
  };\n\
  var STRING = {\n\
    className: 'string',\n\
    begin: '\\'', end: '\\'',\n\
    contains: [{begin: '\\'\\''}],\n\
    relevance: 0\n\
  };\n\
  var CHAR_STRING = {\n\
    className: 'string', begin: '(#\\\\d+)+'\n\
  };\n\
  var FUNCTION = {\n\
    className: 'function',\n\
    beginWithKeyword: true, end: '[:;]',\n\
    keywords: 'function constructor|10 destructor|10 procedure|10',\n\
    contains: [\n\
      {\n\
        className: 'title', begin: hljs.IDENT_RE\n\
      },\n\
      {\n\
        className: 'params',\n\
        begin: '\\\\(', end: '\\\\)',\n\
        keywords: DELPHI_KEYWORDS,\n\
        contains: [STRING, CHAR_STRING]\n\
      },\n\
      CURLY_COMMENT, PAREN_COMMENT\n\
    ]\n\
  };\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: DELPHI_KEYWORDS,\n\
    illegal: '(\"|\\\\$[G-Zg-z]|\\\\/\\\\*|</)',\n\
    contains: [\n\
      CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE,\n\
      STRING, CHAR_STRING,\n\
      hljs.NUMBER_MODE,\n\
      FUNCTION,\n\
      {\n\
        className: 'class',\n\
        begin: '=\\\\bclass\\\\b', end: 'end;',\n\
        keywords: DELPHI_CLASS_KEYWORDS,\n\
        contains: [\n\
          STRING, CHAR_STRING,\n\
          CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE,\n\
          FUNCTION\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/delphi.js"
));
require.register("chemzqm-highlight.js/lib/diff.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    contains: [\n\
      {\n\
        className: 'chunk',\n\
        begin: '^\\\\@\\\\@ +\\\\-\\\\d+,\\\\d+ +\\\\+\\\\d+,\\\\d+ +\\\\@\\\\@$',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'chunk',\n\
        begin: '^\\\\*\\\\*\\\\* +\\\\d+,\\\\d+ +\\\\*\\\\*\\\\*\\\\*$',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'chunk',\n\
        begin: '^\\\\-\\\\-\\\\- +\\\\d+,\\\\d+ +\\\\-\\\\-\\\\-\\\\-$',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: 'Index: ', end: '$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '=====', end: '=====$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '^\\\\-\\\\-\\\\-', end: '$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '^\\\\*{3} ', end: '$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '^\\\\+\\\\+\\\\+', end: '$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '\\\\*{5}', end: '\\\\*{5}$'\n\
      },\n\
      {\n\
        className: 'addition',\n\
        begin: '^\\\\+', end: '$'\n\
      },\n\
      {\n\
        className: 'deletion',\n\
        begin: '^\\\\-', end: '$'\n\
      },\n\
      {\n\
        className: 'change',\n\
        begin: '^\\\\!', end: '$'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/diff.js"
));
require.register("chemzqm-highlight.js/lib/django.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
\n\
  function allowsDjangoSyntax(mode, parent) {\n\
    return (\n\
      parent == undefined || // default mode\n\
      (!mode.className && parent.className == 'tag') || // tag_internal\n\
      mode.className == 'value' // value\n\
    );\n\
  }\n\
\n\
  function copy(mode, parent) {\n\
    var result = {};\n\
    for (var key in mode) {\n\
      if (key != 'contains') {\n\
        result[key] = mode[key];\n\
      }\n\
      var contains = [];\n\
      for (var i = 0; mode.contains && i < mode.contains.length; i++) {\n\
        contains.push(copy(mode.contains[i], mode));\n\
      }\n\
      if (allowsDjangoSyntax(mode, parent)) {\n\
        contains = DJANGO_CONTAINS.concat(contains);\n\
      }\n\
      if (contains.length) {\n\
        result.contains = contains;\n\
      }\n\
    }\n\
    return result;\n\
  }\n\
\n\
  var FILTER = {\n\
    className: 'filter',\n\
    begin: '\\\\|[A-Za-z]+\\\\:?', excludeEnd: true,\n\
    keywords:\n\
      'truncatewords removetags linebreaksbr yesno get_digit timesince random striptags ' +\n\
      'filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands ' +\n\
      'title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode ' +\n\
      'timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort ' +\n\
      'dictsortreversed default_if_none pluralize lower join center default ' +\n\
      'truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first ' +\n\
      'escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize ' +\n\
      'localtime utc timezone',\n\
    contains: [\n\
      {className: 'argument', begin: '\"', end: '\"'}\n\
    ]\n\
  };\n\
\n\
  var DJANGO_CONTAINS = [\n\
    {\n\
      className: 'template_comment',\n\
      begin: '{%\\\\s*comment\\\\s*%}', end: '{%\\\\s*endcomment\\\\s*%}'\n\
    },\n\
    {\n\
      className: 'template_comment',\n\
      begin: '{#', end: '#}'\n\
    },\n\
    {\n\
      className: 'template_tag',\n\
      begin: '{%', end: '%}',\n\
      keywords:\n\
        'comment endcomment load templatetag ifchanged endifchanged if endif firstof for ' +\n\
        'endfor in ifnotequal endifnotequal widthratio extends include spaceless ' +\n\
        'endspaceless regroup by as ifequal endifequal ssi now with cycle url filter ' +\n\
        'endfilter debug block endblock else autoescape endautoescape csrf_token empty elif ' +\n\
        'endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix ' +\n\
        'plural get_current_language language get_available_languages ' +\n\
        'get_current_language_bidi get_language_info get_language_info_list localize ' +\n\
        'endlocalize localtime endlocaltime timezone endtimezone get_current_timezone',\n\
      contains: [FILTER]\n\
    },\n\
    {\n\
      className: 'variable',\n\
      begin: '{{', end: '}}',\n\
      contains: [FILTER]\n\
    }\n\
  ];\n\
\n\
  var result = copy(hljs.LANGUAGES.xml);\n\
  result.case_insensitive = true;\n\
  return result;\n\
};//@ sourceURL=chemzqm-highlight.js/lib/django.js"
));
require.register("chemzqm-highlight.js/lib/dos.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: {\n\
      flow: 'if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq',\n\
      keyword: 'shift cd dir echo setlocal endlocal set pause copy',\n\
      stream: 'prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux',\n\
      winutils: 'ping net ipconfig taskkill xcopy ren del'\n\
    },\n\
    contains: [\n\
      {\n\
        className: 'envvar', begin: '%%[^ ]'\n\
      },\n\
      {\n\
        className: 'envvar', begin: '%[^ ]+?%'\n\
      },\n\
      {\n\
        className: 'envvar', begin: '![^ ]+?!'\n\
      },\n\
      {\n\
        className: 'number', begin: '\\\\b\\\\d+',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '@?rem', end: '$'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/dos.js"
));
require.register("chemzqm-highlight.js/lib/erlang-repl.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: {\n\
      special_functions:\n\
        'spawn spawn_link self',\n\
      reserved:\n\
        'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' +\n\
        'let not of or orelse|10 query receive rem try when xor'\n\
    },\n\
    contains: [\n\
      {\n\
        className: 'prompt', begin: '^[0-9]+> ',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '%', end: '$'\n\
      },\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\b(\\\\d+#[a-fA-F0-9]+|\\\\d+(\\\\.\\\\d+)?([eE][-+]?\\\\d+)?)',\n\
        relevance: 0\n\
      },\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'constant', begin: '\\\\?(::)?([A-Z]\\\\w*(::)?)+'\n\
      },\n\
      {\n\
        className: 'arrow', begin: '->'\n\
      },\n\
      {\n\
        className: 'ok', begin: 'ok'\n\
      },\n\
      {\n\
        className: 'exclamation_mark', begin: '!'\n\
      },\n\
      {\n\
        className: 'function_or_atom',\n\
        begin: '(\\\\b[a-z\\'][a-zA-Z0-9_\\']*:[a-z\\'][a-zA-Z0-9_\\']*)|(\\\\b[a-z\\'][a-zA-Z0-9_\\']*)',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'variable',\n\
        begin: '[A-Z][a-zA-Z0-9_\\']*',\n\
        relevance: 0\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/erlang-repl.js"
));
require.register("chemzqm-highlight.js/lib/erlang.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var BASIC_ATOM_RE = '[a-z\\'][a-zA-Z0-9_\\']*';\n\
  var FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';\n\
  var ERLANG_RESERVED = {\n\
    keyword:\n\
      'after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let ' +\n\
      'not of orelse|10 query receive rem try when xor',\n\
    literal:\n\
      'false true'\n\
  };\n\
\n\
  var COMMENT = {\n\
    className: 'comment',\n\
    begin: '%', end: '$',\n\
    relevance: 0\n\
  };\n\
  var NUMBER = {\n\
    className: 'number',\n\
    begin: '\\\\b(\\\\d+#[a-fA-F0-9]+|\\\\d+(\\\\.\\\\d+)?([eE][-+]?\\\\d+)?)',\n\
    relevance: 0\n\
  };\n\
  var NAMED_FUN = {\n\
    begin: 'fun\\\\s+' + BASIC_ATOM_RE + '/\\\\d+'\n\
  };\n\
  var FUNCTION_CALL = {\n\
    begin: FUNCTION_NAME_RE + '\\\\(', end: '\\\\)',\n\
    returnBegin: true,\n\
    relevance: 0,\n\
    contains: [\n\
      {\n\
        className: 'function_name', begin: FUNCTION_NAME_RE,\n\
        relevance: 0\n\
      },\n\
      {\n\
        begin: '\\\\(', end: '\\\\)', endsWithParent: true,\n\
        returnEnd: true,\n\
        relevance: 0\n\
        // \"contains\" defined later\n\
      }\n\
    ]\n\
  };\n\
  var TUPLE = {\n\
    className: 'tuple',\n\
    begin: '{', end: '}',\n\
    relevance: 0\n\
    // \"contains\" defined later\n\
  };\n\
  var VAR1 = {\n\
    className: 'variable',\n\
    begin: '\\\\b_([A-Z][A-Za-z0-9_]*)?',\n\
    relevance: 0\n\
  };\n\
  var VAR2 = {\n\
    className: 'variable',\n\
    begin: '[A-Z][a-zA-Z0-9_]*',\n\
    relevance: 0\n\
  };\n\
  var RECORD_ACCESS = {\n\
    begin: '#', end: '}',\n\
    illegal: '.',\n\
    relevance: 0,\n\
    returnBegin: true,\n\
    contains: [\n\
      {\n\
        className: 'record_name',\n\
        begin: '#' + hljs.UNDERSCORE_IDENT_RE,\n\
        relevance: 0\n\
      },\n\
      {\n\
        begin: '{', endsWithParent: true,\n\
        relevance: 0\n\
        // \"contains\" defined later\n\
      }\n\
    ]\n\
  };\n\
\n\
  var BLOCK_STATEMENTS = {\n\
    keywords: ERLANG_RESERVED,\n\
    begin: '(fun|receive|if|try|case)', end: 'end'\n\
  };\n\
  BLOCK_STATEMENTS.contains = [\n\
    COMMENT,\n\
    NAMED_FUN,\n\
    hljs.inherit(hljs.APOS_STRING_MODE, {className: ''}),\n\
    BLOCK_STATEMENTS,\n\
    FUNCTION_CALL,\n\
    hljs.QUOTE_STRING_MODE,\n\
    NUMBER,\n\
    TUPLE,\n\
    VAR1, VAR2,\n\
    RECORD_ACCESS\n\
  ];\n\
\n\
  var BASIC_MODES = [\n\
    COMMENT,\n\
    NAMED_FUN,\n\
    BLOCK_STATEMENTS,\n\
    FUNCTION_CALL,\n\
    hljs.QUOTE_STRING_MODE,\n\
    NUMBER,\n\
    TUPLE,\n\
    VAR1, VAR2,\n\
    RECORD_ACCESS\n\
  ];\n\
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;\n\
  TUPLE.contains = BASIC_MODES;\n\
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;\n\
\n\
  var PARAMS = {\n\
    className: 'params',\n\
    begin: '\\\\(', end: '\\\\)',\n\
    contains: BASIC_MODES\n\
  };\n\
  return {\n\
    keywords: ERLANG_RESERVED,\n\
    illegal: '(</|\\\\*=|\\\\+=|-=|/=|/\\\\*|\\\\*/|\\\\(\\\\*|\\\\*\\\\))',\n\
    contains: [\n\
      {\n\
        className: 'function',\n\
        begin: '^' + BASIC_ATOM_RE + '\\\\s*\\\\(', end: '->',\n\
        returnBegin: true,\n\
        illegal: '\\\\(|#|//|/\\\\*|\\\\\\\\|:',\n\
        contains: [\n\
          PARAMS,\n\
          {\n\
            className: 'title', begin: BASIC_ATOM_RE\n\
          }\n\
        ],\n\
        starts: {\n\
          end: ';|\\\\.',\n\
          keywords: ERLANG_RESERVED,\n\
          contains: BASIC_MODES\n\
        }\n\
      },\n\
      COMMENT,\n\
      {\n\
        className: 'pp',\n\
        begin: '^-', end: '\\\\.',\n\
        relevance: 0,\n\
        excludeEnd: true,\n\
        returnBegin: true,\n\
        lexems: '-' + hljs.IDENT_RE,\n\
        keywords:\n\
          '-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn ' +\n\
          '-import -include -include_lib -compile -define -else -endif -file -behaviour ' +\n\
          '-behavior',\n\
        contains: [PARAMS]\n\
      },\n\
      NUMBER,\n\
      hljs.QUOTE_STRING_MODE,\n\
      RECORD_ACCESS,\n\
      VAR1, VAR2,\n\
      TUPLE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/erlang.js"
));
require.register("chemzqm-highlight.js/lib/glsl.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default ' +\n\
        'discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 ' +\n\
        'dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray ' +\n\
        'iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube ' +\n\
        'iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect ' +\n\
        'image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray ' +\n\
        'isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer ' +\n\
        'isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 ' +\n\
        'mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict ' +\n\
        'return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray ' +\n\
        'sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow ' +\n\
        'sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth ' +\n\
        'struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray ' +\n\
        'uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray ' +\n\
        'usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer ' +\n\
        'usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly',\n\
      built_in:\n\
        'gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial ' +\n\
        'gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color ' +\n\
        'gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord ' +\n\
        'gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor ' +\n\
        'gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial ' +\n\
        'gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel ' +\n\
        'gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize ' +\n\
        'gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers ' +\n\
        'gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs ' +\n\
        'gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers ' +\n\
        'gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents ' +\n\
        'gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers ' +\n\
        'gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents ' +\n\
        'gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits ' +\n\
        'gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents ' +\n\
        'gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset ' +\n\
        'gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms ' +\n\
        'gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits ' +\n\
        'gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents ' +\n\
        'gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters ' +\n\
        'gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents ' +\n\
        'gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents ' +\n\
        'gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits ' +\n\
        'gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors ' +\n\
        'gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs ' +\n\
        'gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits ' +\n\
        'gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset'+\n\
        'gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose ' +\n\
        'gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse ' +\n\
        'gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose ' +\n\
        'gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 ' +\n\
        'gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix ' +\n\
        'gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn ' +\n\
        'gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn ' +\n\
        'gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose ' +\n\
        'gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition ' +\n\
        'gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor ' +\n\
        'gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID ' +\n\
        'gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive ' +\n\
        'abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement ' +\n\
        'atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ' +\n\
        'ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward ' +\n\
        'findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan ' +\n\
        'greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange ' +\n\
        'imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended ' +\n\
        'intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt ' +\n\
        'isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier ' +\n\
        'min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 ' +\n\
        'packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract ' +\n\
        'round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj ' +\n\
        'shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture ' +\n\
        'texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj ' +\n\
        'texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod ' +\n\
        'textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod ' +\n\
        'textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod ' +\n\
        'textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry ' +\n\
        'uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 ' +\n\
        'unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse',\n\
      literal: 'true false'\n\
    },\n\
    illegal: '\"',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#', end: '$'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/glsl.js"
));
require.register("chemzqm-highlight.js/lib/go.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var GO_KEYWORDS = {\n\
    keyword:\n\
      'break default func interface select case map struct chan else goto package switch ' +\n\
      'const fallthrough if range type continue for import return var go defer',\n\
    constant:\n\
       'true false iota nil',\n\
    typename:\n\
      'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' +\n\
      'uint16 uint32 uint64 int uint uintptr rune',\n\
    built_in:\n\
      'append cap close complex copy imag len make new panic print println real recover delete'\n\
  };\n\
  return {\n\
    keywords: GO_KEYWORDS,\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\\'', end: '[^\\\\\\\\]\\'',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '`', end: '`'\n\
      },\n\
      {\n\
        className: 'number',\n\
        begin: '[^a-zA-Z_0-9](\\\\-|\\\\+)?\\\\d+(\\\\.\\\\d+|\\\\/\\\\d+)?((d|e|f|l|s)(\\\\+|\\\\-)?\\\\d+)?',\n\
        relevance: 0\n\
      },\n\
      hljs.C_NUMBER_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/go.js"
));
require.register("chemzqm-highlight.js/lib/haskell.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var TYPE = {\n\
    className: 'type',\n\
    begin: '\\\\b[A-Z][\\\\w\\']*',\n\
    relevance: 0\n\
  };\n\
  var CONTAINER = {\n\
    className: 'container',\n\
    begin: '\\\\(', end: '\\\\)',\n\
    contains: [\n\
      {className: 'type', begin: '\\\\b[A-Z][\\\\w]*(\\\\((\\\\.\\\\.|,|\\\\w+)\\\\))?'},\n\
      {className: 'title', begin: '[_a-z][\\\\w\\']*'}\n\
    ]\n\
  };\n\
  var CONTAINER2 = {\n\
    className: 'container',\n\
    begin: '{', end: '}',\n\
    contains: CONTAINER.contains\n\
  }\n\
\n\
  return {\n\
    keywords:\n\
      'let in if then else case of where do module import hiding qualified type data ' +\n\
      'newtype deriving class instance not as foreign ccall safe unsafe',\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: '--', end: '$'\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '{-#', end: '#-}'\n\
      },\n\
      {\n\
        className: 'comment',\n\
        contains: ['self'],\n\
        begin: '{-', end: '-}'\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '\\\\s+\\'', end: '\\'',\n\
        contains: [hljs.BACKSLASH_ESCAPE],\n\
        relevance: 0\n\
      },\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'import',\n\
        begin: '\\\\bimport', end: '$',\n\
        keywords: 'import qualified as hiding',\n\
        contains: [CONTAINER],\n\
        illegal: '\\\\W\\\\.|;'\n\
      },\n\
      {\n\
        className: 'module',\n\
        begin: '\\\\bmodule', end: 'where',\n\
        keywords: 'module where',\n\
        contains: [CONTAINER],\n\
        illegal: '\\\\W\\\\.|;'\n\
      },\n\
      {\n\
        className: 'class',\n\
        begin: '\\\\b(class|instance)', end: 'where',\n\
        keywords: 'class where instance',\n\
        contains: [TYPE]\n\
      },\n\
      {\n\
        className: 'typedef',\n\
        begin: '\\\\b(data|(new)?type)', end: '$',\n\
        keywords: 'data type newtype deriving',\n\
        contains: [TYPE, CONTAINER, CONTAINER2]\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'shebang',\n\
        begin: '#!\\\\/usr\\\\/bin\\\\/env\\ runhaskell', end: '$'\n\
      },\n\
      TYPE,\n\
      {\n\
        className: 'title', begin: '^[_a-z][\\\\w\\']*'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/haskell.js"
));
require.register("chemzqm-highlight.js/lib/highlight.js", Function("exports, require, module",
"var hljs = new function() {\n\
\n\
  /* Utility functions */\n\
\n\
  function escape(value) {\n\
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');\n\
  }\n\
\n\
  function findCode(pre) {\n\
    for (var node = pre.firstChild; node; node = node.nextSibling) {\n\
      if (node.nodeName == 'CODE')\n\
        return node;\n\
      if (!(node.nodeType == 3 && node.nodeValue.match(/\\s+/)))\n\
        break;\n\
    }\n\
  }\n\
\n\
  function blockText(block, ignoreNewLines) {\n\
    return Array.prototype.map.call(block.childNodes, function(node) {\n\
      if (node.nodeType == 3) {\n\
        return ignoreNewLines ? node.nodeValue.replace(/\\n\
/g, '') : node.nodeValue;\n\
      }\n\
      if (node.nodeName == 'BR') {\n\
        return '\\n\
';\n\
      }\n\
      return blockText(node, ignoreNewLines);\n\
    }).join('');\n\
  }\n\
\n\
  function blockLanguage(block) {\n\
    var classes = (block.className + ' ' + block.parentNode.className).split(/\\s+/);\n\
    classes = classes.map(function(c) {return c.replace(/^language-/, '')});\n\
    for (var i = 0; i < classes.length; i++) {\n\
      if (languages[classes[i]] || classes[i] == 'no-highlight') {\n\
        return classes[i];\n\
      }\n\
    }\n\
  }\n\
\n\
  /* Stream merging */\n\
\n\
  function nodeStream(node) {\n\
    var result = [];\n\
    (function _nodeStream(node, offset) {\n\
      for (var child = node.firstChild; child; child = child.nextSibling) {\n\
        if (child.nodeType == 3)\n\
          offset += child.nodeValue.length;\n\
        else if (child.nodeName == 'BR')\n\
          offset += 1;\n\
        else if (child.nodeType == 1) {\n\
          result.push({\n\
            event: 'start',\n\
            offset: offset,\n\
            node: child\n\
          });\n\
          offset = _nodeStream(child, offset);\n\
          result.push({\n\
            event: 'stop',\n\
            offset: offset,\n\
            node: child\n\
          });\n\
        }\n\
      }\n\
      return offset;\n\
    })(node, 0);\n\
    return result;\n\
  }\n\
\n\
  function mergeStreams(stream1, stream2, value) {\n\
    var processed = 0;\n\
    var result = '';\n\
    var nodeStack = [];\n\
\n\
    function selectStream() {\n\
      if (stream1.length && stream2.length) {\n\
        if (stream1[0].offset != stream2[0].offset)\n\
          return (stream1[0].offset < stream2[0].offset) ? stream1 : stream2;\n\
        else {\n\
          /*\n\
          To avoid starting the stream just before it should stop the order is\n\
          ensured that stream1 always starts first and closes last:\n\
\n\
          if (event1 == 'start' && event2 == 'start')\n\
            return stream1;\n\
          if (event1 == 'start' && event2 == 'stop')\n\
            return stream2;\n\
          if (event1 == 'stop' && event2 == 'start')\n\
            return stream1;\n\
          if (event1 == 'stop' && event2 == 'stop')\n\
            return stream2;\n\
\n\
          ... which is collapsed to:\n\
          */\n\
          return stream2[0].event == 'start' ? stream1 : stream2;\n\
        }\n\
      } else {\n\
        return stream1.length ? stream1 : stream2;\n\
      }\n\
    }\n\
\n\
    function open(node) {\n\
      function attr_str(a) {return ' ' + a.nodeName + '=\"' + escape(a.value) + '\"'};\n\
      return '<' + node.nodeName + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';\n\
    }\n\
\n\
    while (stream1.length || stream2.length) {\n\
      var current = selectStream().splice(0, 1)[0];\n\
      result += escape(value.substr(processed, current.offset - processed));\n\
      processed = current.offset;\n\
      if ( current.event == 'start') {\n\
        result += open(current.node);\n\
        nodeStack.push(current.node);\n\
      } else if (current.event == 'stop') {\n\
        var node, i = nodeStack.length;\n\
        do {\n\
          i--;\n\
          node = nodeStack[i];\n\
          result += ('</' + node.nodeName.toLowerCase() + '>');\n\
        } while (node != current.node);\n\
        nodeStack.splice(i, 1);\n\
        while (i < nodeStack.length) {\n\
          result += open(nodeStack[i]);\n\
          i++;\n\
        }\n\
      }\n\
    }\n\
    return result + escape(value.substr(processed));\n\
  }\n\
\n\
  /* Initialization */\n\
\n\
  function compileLanguage(language) {\n\
\n\
    function langRe(value, global) {\n\
      return RegExp(\n\
        value,\n\
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')\n\
      );\n\
    }\n\
\n\
    function compileMode(mode, parent) {\n\
      if (mode.compiled)\n\
        return;\n\
      mode.compiled = true;\n\
\n\
      var keywords = []; // used later with beginWithKeyword but filled as a side-effect of keywords compilation\n\
      if (mode.keywords) {\n\
        var compiled_keywords = {};\n\
\n\
        function flatten(className, str) {\n\
          str.split(' ').forEach(function(kw) {\n\
            var pair = kw.split('|');\n\
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];\n\
            keywords.push(pair[0]);\n\
          });\n\
        }\n\
\n\
        mode.lexemsRe = langRe(mode.lexems || hljs.IDENT_RE, true);\n\
        if (typeof mode.keywords == 'string') { // string\n\
          flatten('keyword', mode.keywords)\n\
        } else {\n\
          for (var className in mode.keywords) {\n\
            if (!mode.keywords.hasOwnProperty(className))\n\
              continue;\n\
            flatten(className, mode.keywords[className]);\n\
          }\n\
        }\n\
        mode.keywords = compiled_keywords;\n\
      }\n\
      if (parent) {\n\
        if (mode.beginWithKeyword) {\n\
          mode.begin = '\\\\b(' + keywords.join('|') + ')\\\\s';\n\
        }\n\
        mode.beginRe = langRe(mode.begin ? mode.begin : '\\\\B|\\\\b');\n\
        if (!mode.end && !mode.endsWithParent)\n\
          mode.end = '\\\\B|\\\\b';\n\
        if (mode.end)\n\
          mode.endRe = langRe(mode.end);\n\
        mode.terminator_end = mode.end || '';\n\
        if (mode.endsWithParent && parent.terminator_end)\n\
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;\n\
      }\n\
      if (mode.illegal)\n\
        mode.illegalRe = langRe(mode.illegal);\n\
      if (mode.relevance === undefined)\n\
        mode.relevance = 1;\n\
      if (!mode.contains) {\n\
        mode.contains = [];\n\
      }\n\
      for (var i = 0; i < mode.contains.length; i++) {\n\
        if (mode.contains[i] == 'self') {\n\
          mode.contains[i] = mode;\n\
        }\n\
        compileMode(mode.contains[i], mode);\n\
      }\n\
      if (mode.starts) {\n\
        compileMode(mode.starts, parent);\n\
      }\n\
\n\
      var terminators = [];\n\
      for (var i = 0; i < mode.contains.length; i++) {\n\
        terminators.push(mode.contains[i].begin);\n\
      }\n\
      if (mode.terminator_end) {\n\
        terminators.push(mode.terminator_end);\n\
      }\n\
      if (mode.illegal) {\n\
        terminators.push(mode.illegal);\n\
      }\n\
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(s) {return null;}};\n\
    }\n\
\n\
    compileMode(language);\n\
  }\n\
\n\
  /*\n\
  Core highlighting function. Accepts a language name and a string with the\n\
  code to highlight. Returns an object with the following properties:\n\
\n\
  - relevance (int)\n\
  - keyword_count (int)\n\
  - value (an HTML string with highlighting markup)\n\
\n\
  */\n\
  function highlight(language_name, value) {\n\
\n\
    function subMode(lexem, mode) {\n\
      for (var i = 0; i < mode.contains.length; i++) {\n\
        var match = mode.contains[i].beginRe.exec(lexem);\n\
        if (match && match.index == 0) {\n\
          return mode.contains[i];\n\
        }\n\
      }\n\
    }\n\
\n\
    function endOfMode(mode, lexem) {\n\
      if (mode.end && mode.endRe.test(lexem)) {\n\
        return mode;\n\
      }\n\
      if (mode.endsWithParent) {\n\
        return endOfMode(mode.parent, lexem);\n\
      }\n\
    }\n\
\n\
    function isIllegal(lexem, mode) {\n\
      return mode.illegal && mode.illegalRe.test(lexem);\n\
    }\n\
\n\
    function keywordMatch(mode, match) {\n\
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];\n\
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];\n\
    }\n\
\n\
    function processKeywords() {\n\
      var buffer = escape(mode_buffer);\n\
      if (!top.keywords)\n\
        return buffer;\n\
      var result = '';\n\
      var last_index = 0;\n\
      top.lexemsRe.lastIndex = 0;\n\
      var match = top.lexemsRe.exec(buffer);\n\
      while (match) {\n\
        result += buffer.substr(last_index, match.index - last_index);\n\
        var keyword_match = keywordMatch(top, match);\n\
        if (keyword_match) {\n\
          keyword_count += keyword_match[1];\n\
          result += '<span class=\"'+ keyword_match[0] +'\">' + match[0] + '</span>';\n\
        } else {\n\
          result += match[0];\n\
        }\n\
        last_index = top.lexemsRe.lastIndex;\n\
        match = top.lexemsRe.exec(buffer);\n\
      }\n\
      return result + buffer.substr(last_index);\n\
    }\n\
\n\
    function processSubLanguage() {\n\
      if (top.subLanguage && !languages[top.subLanguage]) {\n\
        return escape(mode_buffer);\n\
      }\n\
      var result = top.subLanguage ? highlight(top.subLanguage, mode_buffer) : highlightAuto(mode_buffer);\n\
      // Counting embedded language score towards the host language may be disabled\n\
      // with zeroing the containing mode relevance. Usecase in point is Markdown that\n\
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown\n\
      // score.\n\
      if (top.relevance > 0) {\n\
        keyword_count += result.keyword_count;\n\
        relevance += result.relevance;\n\
      }\n\
      return '<span class=\"' + result.language  + '\">' + result.value + '</span>';\n\
    }\n\
\n\
    function processBuffer() {\n\
      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();\n\
    }\n\
\n\
    function startNewMode(mode, lexem) {\n\
      var markup = mode.className? '<span class=\"' + mode.className + '\">': '';\n\
      if (mode.returnBegin) {\n\
        result += markup;\n\
        mode_buffer = '';\n\
      } else if (mode.excludeBegin) {\n\
        result += escape(lexem) + markup;\n\
        mode_buffer = '';\n\
      } else {\n\
        result += markup;\n\
        mode_buffer = lexem;\n\
      }\n\
      top = Object.create(mode, {parent: {value: top}});\n\
      relevance += mode.relevance;\n\
    }\n\
\n\
    function processLexem(buffer, lexem) {\n\
      mode_buffer += buffer;\n\
      if (lexem === undefined) {\n\
        result += processBuffer();\n\
        return 0;\n\
      }\n\
\n\
      var new_mode = subMode(lexem, top);\n\
      if (new_mode) {\n\
        result += processBuffer();\n\
        startNewMode(new_mode, lexem);\n\
        return new_mode.returnBegin ? 0 : lexem.length;\n\
      }\n\
\n\
      var end_mode = endOfMode(top, lexem);\n\
      if (end_mode) {\n\
        if (!(end_mode.returnEnd || end_mode.excludeEnd)) {\n\
          mode_buffer += lexem;\n\
        }\n\
        result += processBuffer();\n\
        do {\n\
          if (top.className) {\n\
            result += '</span>';\n\
          }\n\
          top = top.parent;\n\
        } while (top != end_mode.parent);\n\
        if (end_mode.excludeEnd) {\n\
          result += escape(lexem);\n\
        }\n\
        mode_buffer = '';\n\
        if (end_mode.starts) {\n\
          startNewMode(end_mode.starts, '');\n\
        }\n\
        return end_mode.returnEnd ? 0 : lexem.length;\n\
      }\n\
\n\
      if (isIllegal(lexem, top))\n\
        throw 'Illegal';\n\
\n\
      /*\n\
      Parser should not reach this point as all types of lexems should be caught\n\
      earlier, but if it does due to some bug make sure it advances at least one\n\
      character forward to prevent infinite looping.\n\
      */\n\
      mode_buffer += lexem;\n\
      return lexem.length || 1;\n\
    }\n\
\n\
    var language = languages[language_name];\n\
    compileLanguage(language);\n\
    var top = language;\n\
    var mode_buffer = '';\n\
    var relevance = 0;\n\
    var keyword_count = 0;\n\
    var result = '';\n\
    try {\n\
      var match, count, index = 0;\n\
      while (true) {\n\
        top.terminators.lastIndex = index;\n\
        match = top.terminators.exec(value);\n\
        if (!match)\n\
          break;\n\
        count = processLexem(value.substr(index, match.index - index), match[0]);\n\
        index = match.index + count;\n\
      }\n\
      processLexem(value.substr(index))\n\
      return {\n\
        relevance: relevance,\n\
        keyword_count: keyword_count,\n\
        value: result,\n\
        language: language_name\n\
      };\n\
    } catch (e) {\n\
      if (e == 'Illegal') {\n\
        return {\n\
          relevance: 0,\n\
          keyword_count: 0,\n\
          value: escape(value)\n\
        };\n\
      } else {\n\
        throw e;\n\
      }\n\
    }\n\
  }\n\
\n\
  /*\n\
  Highlighting with language detection. Accepts a string with the code to\n\
  highlight. Returns an object with the following properties:\n\
\n\
  - language (detected language)\n\
  - relevance (int)\n\
  - keyword_count (int)\n\
  - value (an HTML string with highlighting markup)\n\
  - second_best (object with the same structure for second-best heuristically\n\
    detected language, may be absent)\n\
\n\
  */\n\
  function highlightAuto(text) {\n\
    var result = {\n\
      keyword_count: 0,\n\
      relevance: 0,\n\
      value: escape(text)\n\
    };\n\
    var second_best = result;\n\
    for (var key in languages) {\n\
      if (!languages.hasOwnProperty(key))\n\
        continue;\n\
      var current = highlight(key, text);\n\
      current.language = key;\n\
      if (current.keyword_count + current.relevance > second_best.keyword_count + second_best.relevance) {\n\
        second_best = current;\n\
      }\n\
      if (current.keyword_count + current.relevance > result.keyword_count + result.relevance) {\n\
        second_best = result;\n\
        result = current;\n\
      }\n\
    }\n\
    if (second_best.language) {\n\
      result.second_best = second_best;\n\
    }\n\
    return result;\n\
  }\n\
\n\
  /*\n\
  Post-processing of the highlighted markup:\n\
\n\
  - replace TABs with something more useful\n\
  - replace real line-breaks with '<br>' for non-pre containers\n\
\n\
  */\n\
  function fixMarkup(value, tabReplace, useBR) {\n\
    if (tabReplace) {\n\
      value = value.replace(/^((<[^>]+>|\\t)+)/gm, function(match, p1, offset, s) {\n\
        return p1.replace(/\\t/g, tabReplace);\n\
      });\n\
    }\n\
    if (useBR) {\n\
      value = value.replace(/\\n\
/g, '<br>');\n\
    }\n\
    return value;\n\
  }\n\
\n\
  /*\n\
  Applies highlighting to a DOM node containing code. Accepts a DOM node and\n\
  two optional parameters for fixMarkup.\n\
  */\n\
  function highlightBlock(block, tabReplace, useBR) {\n\
    var text = blockText(block, useBR);\n\
    var language = blockLanguage(block);\n\
    if (language == 'no-highlight')\n\
        return;\n\
    var result = language ? highlight(language, text) : highlightAuto(text);\n\
    language = result.language;\n\
    var original = nodeStream(block);\n\
    if (original.length) {\n\
      var pre = document.createElement('pre');\n\
      pre.innerHTML = result.value;\n\
      result.value = mergeStreams(original, nodeStream(pre), text);\n\
    }\n\
    result.value = fixMarkup(result.value, tabReplace, useBR);\n\
\n\
    var class_name = block.className;\n\
    if (!class_name.match('(\\\\s|^)(language-)?' + language + '(\\\\s|$)')) {\n\
      class_name = class_name ? (class_name + ' ' + language) : language;\n\
    }\n\
    block.innerHTML = result.value;\n\
    block.className = class_name;\n\
    block.result = {\n\
      language: language,\n\
      kw: result.keyword_count,\n\
      re: result.relevance\n\
    };\n\
    if (result.second_best) {\n\
      block.second_best = {\n\
        language: result.second_best.language,\n\
        kw: result.second_best.keyword_count,\n\
        re: result.second_best.relevance\n\
      };\n\
    }\n\
  }\n\
\n\
  /*\n\
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.\n\
  */\n\
  function initHighlighting() {\n\
    if (initHighlighting.called)\n\
      return;\n\
    initHighlighting.called = true;\n\
    Array.prototype.map.call(document.getElementsByTagName('pre'), findCode).\n\
      filter(Boolean).\n\
      forEach(function(code){highlightBlock(code, hljs.tabReplace)});\n\
  }\n\
\n\
  /*\n\
  Attaches highlighting to the page load event.\n\
  */\n\
  function initHighlightingOnLoad() {\n\
    window.addEventListener('DOMContentLoaded', initHighlighting, false);\n\
    window.addEventListener('load', initHighlighting, false);\n\
  }\n\
\n\
  var languages = {}; // a shortcut to avoid writing \"this.\" everywhere\n\
\n\
  /* Interface definition */\n\
\n\
  this.LANGUAGES = languages;\n\
  this.highlight = highlight;\n\
  this.highlightAuto = highlightAuto;\n\
  this.fixMarkup = fixMarkup;\n\
  this.highlightBlock = highlightBlock;\n\
  this.initHighlighting = initHighlighting;\n\
  this.initHighlightingOnLoad = initHighlightingOnLoad;\n\
\n\
  // Common regexps\n\
  this.IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';\n\
  this.UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';\n\
  this.NUMBER_RE = '\\\\b\\\\d+(\\\\.\\\\d+)?';\n\
  this.C_NUMBER_RE = '(\\\\b0[xX][a-fA-F0-9]+|(\\\\b\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)([eE][-+]?\\\\d+)?)'; // 0x..., 0..., decimal, float\n\
  this.BINARY_NUMBER_RE = '\\\\b(0b[01]+)'; // 0b...\n\
  this.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\\\*|\\\\*=|\\\\+|\\\\+=|,|\\\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\\\?|\\\\[|\\\\{|\\\\(|\\\\^|\\\\^=|\\\\||\\\\|=|\\\\|\\\\||~';\n\
\n\
  // Common modes\n\
  this.BACKSLASH_ESCAPE = {\n\
    begin: '\\\\\\\\[\\\\s\\\\S]', relevance: 0\n\
  };\n\
  this.APOS_STRING_MODE = {\n\
    className: 'string',\n\
    begin: '\\'', end: '\\'',\n\
    illegal: '\\\\n\
',\n\
    contains: [this.BACKSLASH_ESCAPE],\n\
    relevance: 0\n\
  };\n\
  this.QUOTE_STRING_MODE = {\n\
    className: 'string',\n\
    begin: '\"', end: '\"',\n\
    illegal: '\\\\n\
',\n\
    contains: [this.BACKSLASH_ESCAPE],\n\
    relevance: 0\n\
  };\n\
  this.C_LINE_COMMENT_MODE = {\n\
    className: 'comment',\n\
    begin: '//', end: '$'\n\
  };\n\
  this.C_BLOCK_COMMENT_MODE = {\n\
    className: 'comment',\n\
    begin: '/\\\\*', end: '\\\\*/'\n\
  };\n\
  this.HASH_COMMENT_MODE = {\n\
    className: 'comment',\n\
    begin: '#', end: '$'\n\
  };\n\
  this.NUMBER_MODE = {\n\
    className: 'number',\n\
    begin: this.NUMBER_RE,\n\
    relevance: 0\n\
  };\n\
  this.C_NUMBER_MODE = {\n\
    className: 'number',\n\
    begin: this.C_NUMBER_RE,\n\
    relevance: 0\n\
  };\n\
  this.BINARY_NUMBER_MODE = {\n\
    className: 'number',\n\
    begin: this.BINARY_NUMBER_RE,\n\
    relevance: 0\n\
  };\n\
\n\
  // Utility functions\n\
  this.inherit = function(parent, obj) {\n\
    var result = {}\n\
    for (var key in parent)\n\
      result[key] = parent[key];\n\
    if (obj)\n\
      for (var key in obj)\n\
        result[key] = obj[key];\n\
    return result;\n\
  }\n\
}();\n\
hljs.LANGUAGES['bash'] = require('./bash.js')(hljs);\n\
hljs.LANGUAGES['erlang'] = require('./erlang.js')(hljs);\n\
hljs.LANGUAGES['cs'] = require('./cs.js')(hljs);\n\
hljs.LANGUAGES['brainfuck'] = require('./brainfuck.js')(hljs);\n\
hljs.LANGUAGES['ruby'] = require('./ruby.js')(hljs);\n\
hljs.LANGUAGES['rust'] = require('./rust.js')(hljs);\n\
hljs.LANGUAGES['rib'] = require('./rib.js')(hljs);\n\
hljs.LANGUAGES['diff'] = require('./diff.js')(hljs);\n\
hljs.LANGUAGES['javascript'] = require('./javascript.js')(hljs);\n\
hljs.LANGUAGES['glsl'] = require('./glsl.js')(hljs);\n\
hljs.LANGUAGES['rsl'] = require('./rsl.js')(hljs);\n\
hljs.LANGUAGES['lua'] = require('./lua.js')(hljs);\n\
hljs.LANGUAGES['xml'] = require('./xml.js')(hljs);\n\
hljs.LANGUAGES['markdown'] = require('./markdown.js')(hljs);\n\
hljs.LANGUAGES['css'] = require('./css.js')(hljs);\n\
hljs.LANGUAGES['lisp'] = require('./lisp.js')(hljs);\n\
hljs.LANGUAGES['profile'] = require('./profile.js')(hljs);\n\
hljs.LANGUAGES['http'] = require('./http.js')(hljs);\n\
hljs.LANGUAGES['java'] = require('./java.js')(hljs);\n\
hljs.LANGUAGES['php'] = require('./php.js')(hljs);\n\
hljs.LANGUAGES['haskell'] = require('./haskell.js')(hljs);\n\
hljs.LANGUAGES['1c'] = require('./1c.js')(hljs);\n\
hljs.LANGUAGES['python'] = require('./python.js')(hljs);\n\
hljs.LANGUAGES['smalltalk'] = require('./smalltalk.js')(hljs);\n\
hljs.LANGUAGES['tex'] = require('./tex.js')(hljs);\n\
hljs.LANGUAGES['actionscript'] = require('./actionscript.js')(hljs);\n\
hljs.LANGUAGES['sql'] = require('./sql.js')(hljs);\n\
hljs.LANGUAGES['vala'] = require('./vala.js')(hljs);\n\
hljs.LANGUAGES['ini'] = require('./ini.js')(hljs);\n\
hljs.LANGUAGES['d'] = require('./d.js')(hljs);\n\
hljs.LANGUAGES['axapta'] = require('./axapta.js')(hljs);\n\
hljs.LANGUAGES['perl'] = require('./perl.js')(hljs);\n\
hljs.LANGUAGES['scala'] = require('./scala.js')(hljs);\n\
hljs.LANGUAGES['cmake'] = require('./cmake.js')(hljs);\n\
hljs.LANGUAGES['objectivec'] = require('./objectivec.js')(hljs);\n\
hljs.LANGUAGES['avrasm'] = require('./avrasm.js')(hljs);\n\
hljs.LANGUAGES['vhdl'] = require('./vhdl.js')(hljs);\n\
hljs.LANGUAGES['coffeescript'] = require('./coffeescript.js')(hljs);\n\
hljs.LANGUAGES['nginx'] = require('./nginx.js')(hljs);\n\
hljs.LANGUAGES['erlang-repl'] = require('./erlang-repl.js')(hljs);\n\
hljs.LANGUAGES['r'] = require('./r.js')(hljs);\n\
hljs.LANGUAGES['json'] = require('./json.js')(hljs);\n\
hljs.LANGUAGES['django'] = require('./django.js')(hljs);\n\
hljs.LANGUAGES['delphi'] = require('./delphi.js')(hljs);\n\
hljs.LANGUAGES['vbscript'] = require('./vbscript.js')(hljs);\n\
hljs.LANGUAGES['mel'] = require('./mel.js')(hljs);\n\
hljs.LANGUAGES['dos'] = require('./dos.js')(hljs);\n\
hljs.LANGUAGES['apache'] = require('./apache.js')(hljs);\n\
hljs.LANGUAGES['applescript'] = require('./applescript.js')(hljs);\n\
hljs.LANGUAGES['cpp'] = require('./cpp.js')(hljs);\n\
hljs.LANGUAGES['matlab'] = require('./matlab.js')(hljs);\n\
hljs.LANGUAGES['parser3'] = require('./parser3.js')(hljs);\n\
hljs.LANGUAGES['clojure'] = require('./clojure.js')(hljs);\n\
hljs.LANGUAGES['go'] = require('./go.js')(hljs);\n\
module.exports = hljs;//@ sourceURL=chemzqm-highlight.js/lib/highlight.js"
));
require.register("chemzqm-highlight.js/lib/http.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    illegal: '\\\\S',\n\
    contains: [\n\
      {\n\
        className: 'status',\n\
        begin: '^HTTP/[0-9\\\\.]+', end: '$',\n\
        contains: [{className: 'number', begin: '\\\\b\\\\d{3}\\\\b'}]\n\
      },\n\
      {\n\
        className: 'request',\n\
        begin: '^[A-Z]+ (.*?) HTTP/[0-9\\\\.]+$', returnBegin: true, end: '$',\n\
        contains: [\n\
          {\n\
            className: 'string',\n\
            begin: ' ', end: ' ',\n\
            excludeBegin: true, excludeEnd: true\n\
          }\n\
        ]\n\
      },\n\
      {\n\
        className: 'attribute',\n\
        begin: '^\\\\w', end: ': ', excludeEnd: true,\n\
        illegal: '\\\\n\
|\\\\s|=',\n\
        starts: {className: 'string', end: '$'}\n\
      },\n\
      {\n\
        begin: '\\\\n\
\\\\n\
',\n\
        starts: {subLanguage: '', endsWithParent: true}\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/http.js"
));
require.register("chemzqm-highlight.js/lib/ini.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    illegal: '[^\\\\s]',\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: ';', end: '$'\n\
      },\n\
      {\n\
        className: 'title',\n\
        begin: '^\\\\[', end: '\\\\]'\n\
      },\n\
      {\n\
        className: 'setting',\n\
        begin: '^[a-z0-9\\\\[\\\\]_-]+[ \\\\t]*=[ \\\\t]*', end: '$',\n\
        contains: [\n\
          {\n\
            className: 'value',\n\
            endsWithParent: true,\n\
            keywords: 'on off true false yes no',\n\
            contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE]\n\
          }\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/ini.js"
));
require.register("chemzqm-highlight.js/lib/java.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords:\n\
      'false synchronized int abstract float private char boolean static null if const ' +\n\
      'for true while long throw strictfp finally protected import native final return void ' +\n\
      'enum else break transient new catch instanceof byte super volatile case assert short ' +\n\
      'package default double public try this switch continue throws',\n\
    contains: [\n\
      {\n\
        className: 'javadoc',\n\
        begin: '/\\\\*\\\\*', end: '\\\\*/',\n\
        contains: [{\n\
          className: 'javadoctag', begin: '@[A-Za-z]+'\n\
        }],\n\
        relevance: 10\n\
      },\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'class interface',\n\
        illegal: ':',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true,\n\
            keywords: 'extends implements',\n\
            relevance: 10\n\
          },\n\
          {\n\
            className: 'title',\n\
            begin: hljs.UNDERSCORE_IDENT_RE\n\
          }\n\
        ]\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'annotation', begin: '@[A-Za-z]+'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/java.js"
));
require.register("chemzqm-highlight.js/lib/javascript.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'in if for while finally var new function do return void else break catch ' +\n\
        'instanceof with throw case default try this switch continue typeof delete ' +\n\
        'let yield const',\n\
      literal:\n\
        'true false null undefined NaN Infinity'\n\
    },\n\
    contains: [\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      { // \"value\" container\n\
        begin: '(' + hljs.RE_STARTERS_RE + '|\\\\b(case|return|throw)\\\\b)\\\\s*',\n\
        keywords: 'return throw case',\n\
        contains: [\n\
          hljs.C_LINE_COMMENT_MODE,\n\
          hljs.C_BLOCK_COMMENT_MODE,\n\
          {\n\
            className: 'regexp',\n\
            begin: '/', end: '/[gim]*',\n\
            illegal: '\\\\n\
',\n\
            contains: [{begin: '\\\\\\\\/'}]\n\
          },\n\
          { // E4X\n\
            begin: '<', end: '>;',\n\
            subLanguage: 'xml'\n\
          }\n\
        ],\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'function',\n\
        contains: [\n\
          {\n\
            className: 'title', begin: '[A-Za-z$_][0-9A-Za-z$_]*'\n\
          },\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', end: '\\\\)',\n\
            contains: [\n\
              hljs.C_LINE_COMMENT_MODE,\n\
              hljs.C_BLOCK_COMMENT_MODE\n\
            ],\n\
            illegal: '[\"\\'\\\\(]'\n\
          }\n\
        ],\n\
        illegal: '\\\\[|%'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/javascript.js"
));
require.register("chemzqm-highlight.js/lib/json.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var LITERALS = {literal: 'true false null'};\n\
  var TYPES = [\n\
    hljs.QUOTE_STRING_MODE,\n\
    hljs.C_NUMBER_MODE\n\
  ];\n\
  var VALUE_CONTAINER = {\n\
    className: 'value',\n\
    end: ',', endsWithParent: true, excludeEnd: true,\n\
    contains: TYPES,\n\
    keywords: LITERALS\n\
  };\n\
  var OBJECT = {\n\
    begin: '{', end: '}',\n\
    contains: [\n\
      {\n\
        className: 'attribute',\n\
        begin: '\\\\s*\"', end: '\"\\\\s*:\\\\s*', excludeBegin: true, excludeEnd: true,\n\
        contains: [hljs.BACKSLASH_ESCAPE],\n\
        illegal: '\\\\n\
',\n\
        starts: VALUE_CONTAINER\n\
      }\n\
    ],\n\
    illegal: '\\\\S'\n\
  };\n\
  var ARRAY = {\n\
    begin: '\\\\[', end: '\\\\]',\n\
    contains: [hljs.inherit(VALUE_CONTAINER, {className: null})], // inherit is also a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents\n\
    illegal: '\\\\S'\n\
  };\n\
  TYPES.splice(TYPES.length, 0, OBJECT, ARRAY);\n\
  return {\n\
    contains: TYPES,\n\
    keywords: LITERALS,\n\
    illegal: '\\\\S'\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/json.js"
));
require.register("chemzqm-highlight.js/lib/lisp.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var LISP_IDENT_RE = '[a-zA-Z_\\\\-\\\\+\\\\*\\\\/\\\\<\\\\=\\\\>\\\\&\\\\#][a-zA-Z0-9_\\\\-\\\\+\\\\*\\\\/\\\\<\\\\=\\\\>\\\\&\\\\#]*';\n\
  var LISP_SIMPLE_NUMBER_RE = '(\\\\-|\\\\+)?\\\\d+(\\\\.\\\\d+|\\\\/\\\\d+)?((d|e|f|l|s)(\\\\+|\\\\-)?\\\\d+)?';\n\
  var LITERAL = {\n\
    className: 'literal',\n\
    begin: '\\\\b(t{1}|nil)\\\\b'\n\
  };\n\
  var NUMBERS = [\n\
    {\n\
      className: 'number', begin: LISP_SIMPLE_NUMBER_RE\n\
    },\n\
    {\n\
      className: 'number', begin: '#b[0-1]+(/[0-1]+)?'\n\
    },\n\
    {\n\
      className: 'number', begin: '#o[0-7]+(/[0-7]+)?'\n\
    },\n\
    {\n\
      className: 'number', begin: '#x[0-9a-f]+(/[0-9a-f]+)?'\n\
    },\n\
    {\n\
      className: 'number', begin: '#c\\\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\\\)'\n\
    }\n\
  ]\n\
  var STRING = {\n\
    className: 'string',\n\
    begin: '\"', end: '\"',\n\
    contains: [hljs.BACKSLASH_ESCAPE],\n\
    relevance: 0\n\
  };\n\
  var COMMENT = {\n\
    className: 'comment',\n\
    begin: ';', end: '$'\n\
  };\n\
  var VARIABLE = {\n\
    className: 'variable',\n\
    begin: '\\\\*', end: '\\\\*'\n\
  };\n\
  var KEYWORD = {\n\
    className: 'keyword',\n\
    begin: '[:&]' + LISP_IDENT_RE\n\
  };\n\
  var QUOTED_LIST = {\n\
    begin: '\\\\(', end: '\\\\)',\n\
    contains: ['self', LITERAL, STRING].concat(NUMBERS)\n\
  };\n\
  var QUOTED1 = {\n\
    className: 'quoted',\n\
    begin: '[\\'`]\\\\(', end: '\\\\)',\n\
    contains: NUMBERS.concat([STRING, VARIABLE, KEYWORD, QUOTED_LIST])\n\
  };\n\
  var QUOTED2 = {\n\
    className: 'quoted',\n\
    begin: '\\\\(quote ', end: '\\\\)',\n\
    keywords: {title: 'quote'},\n\
    contains: NUMBERS.concat([STRING, VARIABLE, KEYWORD, QUOTED_LIST])\n\
  };\n\
  var LIST = {\n\
    className: 'list',\n\
    begin: '\\\\(', end: '\\\\)'\n\
  };\n\
  var BODY = {\n\
    className: 'body',\n\
    endsWithParent: true, excludeEnd: true\n\
  };\n\
  LIST.contains = [{className: 'title', begin: LISP_IDENT_RE}, BODY];\n\
  BODY.contains = [QUOTED1, QUOTED2, LIST, LITERAL].concat(NUMBERS).concat([STRING, COMMENT, VARIABLE, KEYWORD]);\n\
\n\
  return {\n\
    illegal: '[^\\\\s]',\n\
    contains: NUMBERS.concat([\n\
      LITERAL,\n\
      STRING,\n\
      COMMENT,\n\
      QUOTED1, QUOTED2,\n\
      LIST\n\
    ])\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/lisp.js"
));
require.register("chemzqm-highlight.js/lib/lua.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var OPENING_LONG_BRACKET = '\\\\[=*\\\\[';\n\
  var CLOSING_LONG_BRACKET = '\\\\]=*\\\\]';\n\
  var LONG_BRACKETS = {\n\
    begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,\n\
    contains: ['self']\n\
  };\n\
  var COMMENTS = [\n\
    {\n\
      className: 'comment',\n\
      begin: '--(?!' + OPENING_LONG_BRACKET + ')', end: '$'\n\
    },\n\
    {\n\
      className: 'comment',\n\
      begin: '--' + OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,\n\
      contains: [LONG_BRACKETS],\n\
      relevance: 10\n\
    }\n\
  ]\n\
  return {\n\
    lexems: hljs.UNDERSCORE_IDENT_RE,\n\
    keywords: {\n\
      keyword:\n\
        'and break do else elseif end false for if in local nil not or repeat return then ' +\n\
        'true until while',\n\
      built_in:\n\
        '_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load ' +\n\
        'loadfile loadstring module next pairs pcall print rawequal rawget rawset require ' +\n\
        'select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug ' +\n\
        'io math os package string table'\n\
    },\n\
    contains: COMMENTS.concat([\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '\\\\)',\n\
        keywords: 'function',\n\
        contains: [\n\
          {\n\
            className: 'title',\n\
            begin: '([_a-zA-Z]\\\\w*\\\\.)*([_a-zA-Z]\\\\w*:)?[_a-zA-Z]\\\\w*'\n\
          },\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', endsWithParent: true,\n\
            contains: COMMENTS\n\
          }\n\
        ].concat(COMMENTS)\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,\n\
        contains: [LONG_BRACKETS],\n\
        relevance: 10\n\
      }\n\
    ])\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/lua.js"
));
require.register("chemzqm-highlight.js/lib/markdown.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    contains: [\n\
      // highlight headers\n\
      {\n\
        className: 'header',\n\
        begin: '^#{1,3}', end: '$'\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '^.+?\\\\n\
[=-]{2,}$'\n\
      },\n\
      // inline html\n\
      {\n\
        begin: '<', end: '>',\n\
        subLanguage: 'xml',\n\
        relevance: 0\n\
      },\n\
      // lists (indicators only)\n\
      {\n\
        className: 'bullet',\n\
        begin: '^([*+-]|(\\\\d+\\\\.))\\\\s+'\n\
      },\n\
      // strong segments\n\
      {\n\
        className: 'strong',\n\
        begin: '[*_]{2}.+?[*_]{2}'\n\
      },\n\
      // emphasis segments\n\
      {\n\
        className: 'emphasis',\n\
        begin: '\\\\*.+?\\\\*'\n\
      },\n\
      {\n\
        className: 'emphasis',\n\
        begin: '_.+?_',\n\
        relevance: 0\n\
      },\n\
      // blockquotes\n\
      {\n\
        className: 'blockquote',\n\
        begin: '^>\\\\s+', end: '$'\n\
      },\n\
      // code snippets\n\
      {\n\
        className: 'code',\n\
        begin: '`.+?`'\n\
      },\n\
      {\n\
        className: 'code',\n\
        begin: '^    ', end: '$',\n\
        relevance: 0\n\
      },\n\
      // horizontal rules\n\
      {\n\
        className: 'horizontal_rule',\n\
        begin: '^-{3,}', end: '$'\n\
      },\n\
      // using links - title and link\n\
      {\n\
        begin: '\\\\[.+?\\\\]\\\\(.+?\\\\)',\n\
        returnBegin: true,\n\
        contains: [\n\
          {\n\
            className: 'link_label',\n\
            begin: '\\\\[.+\\\\]'\n\
          },\n\
          {\n\
            className: 'link_url',\n\
            begin: '\\\\(', end: '\\\\)',\n\
            excludeBegin: true, excludeEnd: true\n\
          }\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/markdown.js"
));
require.register("chemzqm-highlight.js/lib/matlab.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
\n\
  var COMMON_CONTAINS = [\n\
    hljs.C_NUMBER_MODE,\n\
    {\n\
      className: 'string',\n\
      begin: '\\'', end: '\\'',\n\
      contains: [hljs.BACKSLASH_ESCAPE, {begin: '\\'\\''}],\n\
      relevance: 0\n\
    }\n\
  ];\n\
\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'break case catch classdef continue else elseif end enumerated events for function ' +\n\
        'global if methods otherwise parfor persistent properties return spmd switch try while',\n\
      built_in:\n\
        'sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan ' +\n\
        'atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot ' +\n\
        'cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog ' +\n\
        'realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal ' +\n\
        'cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli ' +\n\
        'besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma ' +\n\
        'gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms ' +\n\
        'nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones ' +\n\
        'eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ' +\n\
        'ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril ' +\n\
        'triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute ' +\n\
        'shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan ' +\n\
        'isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal ' +\n\
        'rosser toeplitz vander wilkinson'\n\
    },\n\
    illegal: '(//|\"|#|/\\\\*|\\\\s+/\\\\w+)',\n\
    contains: [\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '$',\n\
        keywords: 'function',\n\
        contains: [\n\
          {\n\
              className: 'title',\n\
              begin: hljs.UNDERSCORE_IDENT_RE\n\
          },\n\
          {\n\
              className: 'params',\n\
              begin: '\\\\(', end: '\\\\)'\n\
          },\n\
          {\n\
              className: 'params',\n\
              begin: '\\\\[', end: '\\\\]'\n\
          }\n\
        ]\n\
      },\n\
      {\n\
        className: 'transposed_variable',\n\
        begin: '[a-zA-Z_][a-zA-Z_0-9]*(\\'+[\\\\.\\']*|[\\\\.\\']+)', end: ''\n\
      },\n\
      {\n\
        className: 'matrix',\n\
        begin: '\\\\[', end: '\\\\]\\'*[\\\\.\\']*',\n\
        contains: COMMON_CONTAINS\n\
      },\n\
      {\n\
        className: 'cell',\n\
        begin: '\\\\{', end: '\\\\}\\'*[\\\\.\\']*',\n\
        contains: COMMON_CONTAINS\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '\\\\%', end: '$'\n\
      }\n\
    ].concat(COMMON_CONTAINS)\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/matlab.js"
));
require.register("chemzqm-highlight.js/lib/mel.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords:\n\
      'int float string vector matrix if else switch case default while do for in break ' +\n\
      'continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic ' +\n\
      'addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey ' +\n\
      'affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve ' +\n\
      'alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor ' +\n\
      'animDisplay animView annotate appendStringArray applicationName applyAttrPreset ' +\n\
      'applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx ' +\n\
      'artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu ' +\n\
      'artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand ' +\n\
      'assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface ' +\n\
      'attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu ' +\n\
      'attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp ' +\n\
      'attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery ' +\n\
      'autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults ' +\n\
      'bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership ' +\n\
      'bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType ' +\n\
      'boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu ' +\n\
      'buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge ' +\n\
      'cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch ' +\n\
      'catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox ' +\n\
      'character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp ' +\n\
      'checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip ' +\n\
      'clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore ' +\n\
      'closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter ' +\n\
      'cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color ' +\n\
      'colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp ' +\n\
      'colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem ' +\n\
      'componentEditor compositingInterop computePolysetVolume condition cone confirmDialog ' +\n\
      'connectAttr connectControl connectDynamic connectJoint connectionInfo constrain ' +\n\
      'constrainValue constructionHistory container containsMultibyte contextInfo control ' +\n\
      'convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation ' +\n\
      'convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache ' +\n\
      'cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel ' +\n\
      'cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver ' +\n\
      'cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor ' +\n\
      'createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer ' +\n\
      'createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse ' +\n\
      'currentCtx currentTime currentTimeCtx currentUnit currentUnit curve curveAddPtCtx ' +\n\
      'curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface ' +\n\
      'curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox ' +\n\
      'defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete ' +\n\
      'deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes ' +\n\
      'delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo ' +\n\
      'dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable ' +\n\
      'disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected ' +\n\
      'displayColor displayCull displayLevelOfDetail displayPref displayRGBColor ' +\n\
      'displaySmoothness displayStats displayString displaySurface distanceDimContext ' +\n\
      'distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct ' +\n\
      'doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator ' +\n\
      'duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression ' +\n\
      'dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor ' +\n\
      'dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers ' +\n\
      'editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor ' +\n\
      'editorTemplate effector emit emitter enableDevice encodeString endString endsWith env ' +\n\
      'equivalent equivalentTol erf error eval eval evalDeferred evalEcho event ' +\n\
      'exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp ' +\n\
      'expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof ' +\n\
      'fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo ' +\n\
      'filetest filletCurve filter filterCurve filterExpand filterStudioImport ' +\n\
      'findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster ' +\n\
      'finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar ' +\n\
      'floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo ' +\n\
      'fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint ' +\n\
      'frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss ' +\n\
      'geometryConstraint getApplicationVersionAsFloat getAttr getClassification ' +\n\
      'getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes ' +\n\
      'getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender ' +\n\
      'glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl ' +\n\
      'gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid ' +\n\
      'gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap ' +\n\
      'HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor ' +\n\
      'HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached ' +\n\
      'HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel ' +\n\
      'headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey ' +\n\
      'hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender ' +\n\
      'hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox ' +\n\
      'iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ' +\n\
      'ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ' +\n\
      'ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform ' +\n\
      'insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance ' +\n\
      'instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp ' +\n\
      'interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf ' +\n\
      'isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect ' +\n\
      'itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx ' +\n\
      'jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner ' +\n\
      'keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx ' +\n\
      'keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx ' +\n\
      'keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx ' +\n\
      'keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor ' +\n\
      'layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList ' +\n\
      'lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep ' +\n\
      'listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory ' +\n\
      'listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation ' +\n\
      'listNodeTypes listPanelCategories listRelatives listSets listTransforms ' +\n\
      'listUnselected listerEditor loadFluid loadNewShelf loadPlugin ' +\n\
      'loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log ' +\n\
      'longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive ' +\n\
      'makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext ' +\n\
      'manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx ' +\n\
      'manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout ' +\n\
      'menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp ' +\n\
      'mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move ' +\n\
      'moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute ' +\n\
      'nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast ' +\n\
      'nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint ' +\n\
      'normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect ' +\n\
      'nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref ' +\n\
      'nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType ' +\n\
      'objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface ' +\n\
      'offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit ' +\n\
      'orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier ' +\n\
      'paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration ' +\n\
      'panelHistory paramDimContext paramDimension paramLocator parent parentConstraint ' +\n\
      'particle particleExists particleInstancer particleRenderInfo partition pasteKey ' +\n\
      'pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture ' +\n\
      'pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo ' +\n\
      'pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult ' +\n\
      'pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend ' +\n\
      'polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal ' +\n\
      'polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge ' +\n\
      'polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge ' +\n\
      'polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet ' +\n\
      'polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet ' +\n\
      'polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection ' +\n\
      'polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge ' +\n\
      'polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet ' +\n\
      'polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix ' +\n\
      'polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut ' +\n\
      'polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet ' +\n\
      'polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge ' +\n\
      'polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex ' +\n\
      'polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection ' +\n\
      'polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection ' +\n\
      'polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint ' +\n\
      'polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate ' +\n\
      'polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge ' +\n\
      'polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing ' +\n\
      'polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet ' +\n\
      'polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace ' +\n\
      'popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer ' +\n\
      'projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx ' +\n\
      'propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd ' +\n\
      'python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection ' +\n\
      'radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl ' +\n\
      'readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference ' +\n\
      'referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE ' +\n\
      'registerPluginResource rehash reloadImage removeJoint removeMultiInstance ' +\n\
      'removePanelCategory rename renameAttr renameSelectionList renameUI render ' +\n\
      'renderGlobalsNode renderInfo renderLayerButton renderLayerParent ' +\n\
      'renderLayerPostProcess renderLayerUnparent renderManip renderPartition ' +\n\
      'renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor ' +\n\
      'renderWindowSelectContext renderer reorder reorderDeformers requires reroot ' +\n\
      'resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget ' +\n\
      'reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx ' +\n\
      'rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout ' +\n\
      'runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage ' +\n\
      'saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale ' +\n\
      'scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor ' +\n\
      'sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable ' +\n\
      'scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt ' +\n\
      'searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey ' +\n\
      'selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType ' +\n\
      'selectedNodes selectionConnection separator setAttr setAttrEnumResource ' +\n\
      'setAttrMapping setAttrNiceNameResource setConstraintRestPosition ' +\n\
      'setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr ' +\n\
      'setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe ' +\n\
      'setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag ' +\n\
      'setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject ' +\n\
      'setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets ' +\n\
      'shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare ' +\n\
      'shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField ' +\n\
      'shortNameOf showHelp showHidden showManipCtx showSelectionInTitle ' +\n\
      'showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface ' +\n\
      'size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep ' +\n\
      'snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound ' +\n\
      'soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort ' +\n\
      'spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString ' +\n\
      'startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp ' +\n\
      'stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex ' +\n\
      'stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex ' +\n\
      'stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString ' +\n\
      'stringToStringArray strip stripPrefixFromName stroke subdAutoProjection ' +\n\
      'subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV ' +\n\
      'subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror ' +\n\
      'subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease ' +\n\
      'subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring ' +\n\
      'surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton ' +\n\
      'symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext ' +\n\
      'texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext ' +\n\
      'texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text ' +\n\
      'textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList ' +\n\
      'textToShelf textureDisplacePlane textureHairColor texturePlacementContext ' +\n\
      'textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath ' +\n\
      'toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower ' +\n\
      'toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper ' +\n\
      'trace track trackCtx transferAttributes transformCompare transformLimits translator ' +\n\
      'trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence ' +\n\
      'twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit ' +\n\
      'unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink ' +\n\
      'uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane ' +\n\
      'viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex ' +\n\
      'waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire ' +\n\
      'wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform',\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_NUMBER_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '`', end: '`',\n\
        contains: [hljs.BACKSLASH_ESCAPE]\n\
      },\n\
      {\n\
        className: 'variable',\n\
        begin: '\\\\$\\\\d',\n\
        relevance: 5\n\
      },\n\
      {\n\
        className: 'variable',\n\
        begin: '[\\\\$\\\\%\\\\@\\\\*](\\\\^\\\\w\\\\b|#\\\\w+|[^\\\\s\\\\w{]|{\\\\w+}|\\\\w+)'\n\
      },\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/mel.js"
));
require.register("chemzqm-highlight.js/lib/nginx.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var VARS = [\n\
    {\n\
      className: 'variable', begin: '\\\\$\\\\d+'\n\
    },\n\
    {\n\
      className: 'variable', begin: '\\\\${', end: '}'\n\
    },\n\
    {\n\
      className: 'variable', begin: '[\\\\$\\\\@]' + hljs.UNDERSCORE_IDENT_RE\n\
    }\n\
  ];\n\
  var DEFAULT = {\n\
    endsWithParent: true,\n\
    lexems: '[a-z/_]+',\n\
    keywords: {\n\
      built_in:\n\
        'on off yes no true false none blocked debug info notice warn error crit ' +\n\
        'select break last permanent redirect kqueue rtsig epoll poll /dev/poll'\n\
    },\n\
    relevance: 0,\n\
    illegal: '=>',\n\
    contains: [\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\"', end: '\"',\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS),\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: \"'\", end: \"'\",\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS),\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'url',\n\
        begin: '([a-z]+):/', end: '\\\\s', endsWithParent: true, excludeEnd: true\n\
      },\n\
      {\n\
        className: 'regexp',\n\
        begin: \"\\\\s\\\\^\", end: \"\\\\s|{|;\", returnEnd: true,\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)\n\
      },\n\
      // regexp locations (~, ~*)\n\
      {\n\
        className: 'regexp',\n\
        begin: \"~\\\\*?\\\\s+\", end: \"\\\\s|{|;\", returnEnd: true,\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)\n\
      },\n\
      // *.example.com\n\
      {\n\
        className: 'regexp',\n\
        begin: \"\\\\*(\\\\.[a-z\\\\-]+)+\",\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)\n\
      },\n\
      // sub.example.*\n\
      {\n\
        className: 'regexp',\n\
        begin: \"([a-z\\\\-]+\\\\.)+\\\\*\",\n\
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)\n\
      },\n\
      // IP\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\b\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}(:\\\\d{1,5})?\\\\b'\n\
      },\n\
      // units\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\b\\\\d+[kKmMgGdshdwy]*\\\\b',\n\
        relevance: 0\n\
      }\n\
    ].concat(VARS)\n\
  };\n\
\n\
  return {\n\
    contains: [\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        begin: hljs.UNDERSCORE_IDENT_RE + '\\\\s', end: ';|{', returnBegin: true,\n\
        contains: [\n\
          {\n\
            className: 'title',\n\
            begin: hljs.UNDERSCORE_IDENT_RE,\n\
            starts: DEFAULT\n\
          }\n\
        ]\n\
      }\n\
    ],\n\
    illegal: '[^\\\\s\\\\}]'\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/nginx.js"
));
require.register("chemzqm-highlight.js/lib/objectivec.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var OBJC_KEYWORDS = {\n\
    keyword:\n\
      'int float while private char catch export sizeof typedef const struct for union ' +\n\
      'unsigned long volatile static protected bool mutable if public do return goto void ' +\n\
      'enum else break extern class asm case short default double throw register explicit ' +\n\
      'signed typename try this switch continue wchar_t inline readonly assign property ' +\n\
      'protocol self synchronized end synthesize id optional required implementation ' +\n\
      'nonatomic interface super unichar finally dynamic IBOutlet IBAction selector strong ' +\n\
      'weak readonly',\n\
    literal:\n\
    \t'false true FALSE TRUE nil YES NO NULL',\n\
    built_in:\n\
      'NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView ' +\n\
      'UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread ' +\n\
      'UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool ' +\n\
      'UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray ' +\n\
      'NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController ' +\n\
      'UINavigationBar UINavigationController UITabBarController UIPopoverController ' +\n\
      'UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController ' +\n\
      'NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor ' +\n\
      'UIFont UIApplication NSNotFound NSNotificationCenter NSNotification ' +\n\
      'UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar ' +\n\
      'NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection class ' +\n\
      'UIInterfaceOrientation MPMoviePlayerController dispatch_once_t ' +\n\
      'dispatch_queue_t dispatch_sync dispatch_async dispatch_once'\n\
  };\n\
  return {\n\
    keywords: OBJC_KEYWORDS,\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\\'',\n\
        end: '[^\\\\\\\\]\\'',\n\
        illegal: '[^\\\\\\\\][^\\']'\n\
      },\n\
\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#import',\n\
        end: '$',\n\
        contains: [\n\
        {\n\
          className: 'title',\n\
          begin: '\\\"',\n\
          end: '\\\"'\n\
        },\n\
        {\n\
          className: 'title',\n\
          begin: '<',\n\
          end: '>'\n\
        }\n\
        ]\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#',\n\
        end: '$'\n\
      },\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true,\n\
        end: '({|$)',\n\
        keywords: 'interface class protocol implementation',\n\
        contains: [{\n\
          className: 'id',\n\
          begin: hljs.UNDERSCORE_IDENT_RE\n\
        }\n\
        ]\n\
      },\n\
      {\n\
        className: 'variable',\n\
        begin: '\\\\.'+hljs.UNDERSCORE_IDENT_RE\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/objectivec.js"
));
require.register("chemzqm-highlight.js/lib/parser3.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    subLanguage: 'xml',\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: '^#', end: '$'\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '\\\\^rem{', end: '}',\n\
        relevance: 10,\n\
        contains: [\n\
          {\n\
            begin: '{', end: '}',\n\
            contains: ['self']\n\
          }\n\
        ]\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'title',\n\
        begin: '@[\\\\w\\\\-]+\\\\[[\\\\w^;\\\\-]*\\\\](?:\\\\[[\\\\w^;\\\\-]*\\\\])?(?:.*)$'\n\
      },\n\
      {\n\
        className: 'variable',\n\
        begin: '\\\\$\\\\{?[\\\\w\\\\-\\\\.\\\\:]+\\\\}?'\n\
      },\n\
      {\n\
        className: 'keyword',\n\
        begin: '\\\\^[\\\\w\\\\-\\\\.\\\\:]+'\n\
      },\n\
      {\n\
        className: 'number',\n\
        begin: '\\\\^#[0-9a-fA-F]+'\n\
      },\n\
      hljs.C_NUMBER_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/parser3.js"
));
require.register("chemzqm-highlight.js/lib/perl.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var PERL_KEYWORDS = 'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ' +\n\
    'ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime ' +\n\
    'readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq' +\n\
    'fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent ' +\n\
    'shutdown dump chomp connect getsockname die socketpair close flock exists index shmget' +\n\
    'sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr ' +\n\
    'unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 ' +\n\
    'getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline ' +\n\
    'endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand ' +\n\
    'mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink ' +\n\
    'getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr ' +\n\
    'untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link ' +\n\
    'getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller ' +\n\
    'lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and ' +\n\
    'sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 ' +\n\
    'chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach ' +\n\
    'tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir' +\n\
    'ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe ' +\n\
    'atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when';\n\
  var SUBST = {\n\
    className: 'subst',\n\
    begin: '[$@]\\\\{', end: '\\\\}',\n\
    keywords: PERL_KEYWORDS,\n\
    relevance: 10\n\
  };\n\
  var VAR1 = {\n\
    className: 'variable',\n\
    begin: '\\\\$\\\\d'\n\
  };\n\
  var VAR2 = {\n\
    className: 'variable',\n\
    begin: '[\\\\$\\\\%\\\\@\\\\*](\\\\^\\\\w\\\\b|#\\\\w+(\\\\:\\\\:\\\\w+)*|[^\\\\s\\\\w{]|{\\\\w+}|\\\\w+(\\\\:\\\\:\\\\w*)*)'\n\
  };\n\
  var STRING_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST, VAR1, VAR2];\n\
  var METHOD = {\n\
    begin: '->',\n\
    contains: [\n\
      {begin: hljs.IDENT_RE},\n\
      {begin: '{', end: '}'}\n\
    ]\n\
  };\n\
  var COMMENT = {\n\
    className: 'comment',\n\
    begin: '^(__END__|__DATA__)', end: '\\\\n\
$',\n\
    relevance: 5\n\
  }\n\
  var PERL_DEFAULT_CONTAINS = [\n\
    VAR1, VAR2,\n\
    hljs.HASH_COMMENT_MODE,\n\
    COMMENT,\n\
    {\n\
      className: 'comment',\n\
      begin: '^\\\\=\\\\w', end: '\\\\=cut', endsWithParent: true\n\
    },\n\
    METHOD,\n\
    {\n\
      className: 'string',\n\
      begin: 'q[qwxr]?\\\\s*\\\\(', end: '\\\\)',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'q[qwxr]?\\\\s*\\\\[', end: '\\\\]',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'q[qwxr]?\\\\s*\\\\{', end: '\\\\}',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'q[qwxr]?\\\\s*\\\\|', end: '\\\\|',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'q[qwxr]?\\\\s*\\\\<', end: '\\\\>',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'qw\\\\s+q', end: 'q',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '\\'', end: '\\'',\n\
      contains: [hljs.BACKSLASH_ESCAPE],\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '\"', end: '\"',\n\
      contains: STRING_CONTAINS,\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '`', end: '`',\n\
      contains: [hljs.BACKSLASH_ESCAPE]\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '{\\\\w+}',\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '\\-?\\\\w+\\\\s*\\\\=\\\\>',\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'number',\n\
      begin: '(\\\\b0[0-7_]+)|(\\\\b0x[0-9a-fA-F_]+)|(\\\\b[1-9][0-9_]*(\\\\.[0-9_]+)?)|[0_]\\\\b',\n\
      relevance: 0\n\
    },\n\
    { // regexp container\n\
      begin: '(' + hljs.RE_STARTERS_RE + '|\\\\b(split|return|print|reverse|grep)\\\\b)\\\\s*',\n\
      keywords: 'split return print reverse grep',\n\
      relevance: 0,\n\
      contains: [\n\
        hljs.HASH_COMMENT_MODE,\n\
        COMMENT,\n\
        {\n\
          className: 'regexp',\n\
          begin: '(s|tr|y)/(\\\\\\\\.|[^/])*/(\\\\\\\\.|[^/])*/[a-z]*',\n\
          relevance: 10\n\
        },\n\
        {\n\
          className: 'regexp',\n\
          begin: '(m|qr)?/', end: '/[a-z]*',\n\
          contains: [hljs.BACKSLASH_ESCAPE],\n\
          relevance: 0 // allows empty \"//\" which is a common comment delimiter in other languages\n\
        }\n\
      ]\n\
    },\n\
    {\n\
      className: 'sub',\n\
      beginWithKeyword: true, end: '(\\\\s*\\\\(.*?\\\\))?[;{]',\n\
      keywords: 'sub',\n\
      relevance: 5\n\
    },\n\
    {\n\
      className: 'operator',\n\
      begin: '-\\\\w\\\\b',\n\
      relevance: 0\n\
    }\n\
  ];\n\
  SUBST.contains = PERL_DEFAULT_CONTAINS;\n\
  METHOD.contains[1].contains = PERL_DEFAULT_CONTAINS;\n\
\n\
  return {\n\
    keywords: PERL_KEYWORDS,\n\
    contains: PERL_DEFAULT_CONTAINS\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/perl.js"
));
require.register("chemzqm-highlight.js/lib/php.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var VARIABLE = {\n\
    className: 'variable', begin: '\\\\$+[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*'\n\
  };\n\
  var STRINGS = [\n\
    hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),\n\
    hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),\n\
    {\n\
      className: 'string',\n\
      begin: 'b\"', end: '\"',\n\
      contains: [hljs.BACKSLASH_ESCAPE]\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: 'b\\'', end: '\\'',\n\
      contains: [hljs.BACKSLASH_ESCAPE]\n\
    }\n\
  ];\n\
  var NUMBERS = [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE];\n\
  var TITLE = {\n\
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE\n\
  };\n\
  return {\n\
    case_insensitive: true,\n\
    keywords:\n\
      'and include_once list abstract global private echo interface as static endswitch ' +\n\
      'array null if endwhile or const for endforeach self var while isset public ' +\n\
      'protected exit foreach throw elseif include __FILE__ empty require_once do xor ' +\n\
      'return implements parent clone use __CLASS__ __LINE__ else break print eval new ' +\n\
      'catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ ' +\n\
      'enddeclare final try this switch continue endfor endif declare unset true false ' +\n\
      'namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        className: 'comment',\n\
        begin: '/\\\\*', end: '\\\\*/',\n\
        contains: [{\n\
            className: 'phpdoc',\n\
            begin: '\\\\s@[A-Za-z]+'\n\
        }]\n\
      },\n\
      {\n\
          className: 'comment',\n\
          excludeBegin: true,\n\
          begin: '__halt_compiler.+?;', endsWithParent: true\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: '<<<[\\'\"]?\\\\w+[\\'\"]?$', end: '^\\\\w+;',\n\
        contains: [hljs.BACKSLASH_ESCAPE]\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '<\\\\?php',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '\\\\?>'\n\
      },\n\
      VARIABLE,\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'function',\n\
        illegal: '\\\\$|\\\\[|%',\n\
        contains: [\n\
          TITLE,\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', end: '\\\\)',\n\
            contains: [\n\
              'self',\n\
              VARIABLE,\n\
              hljs.C_BLOCK_COMMENT_MODE\n\
            ].concat(STRINGS).concat(NUMBERS)\n\
          }\n\
        ]\n\
      },\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'class',\n\
        illegal: '[:\\\\(\\\\$]',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true, endsWithParent: true,\n\
            keywords: 'extends',\n\
            contains: [TITLE]\n\
          },\n\
          TITLE\n\
        ]\n\
      },\n\
      {\n\
        begin: '=>' // No markup, just a relevance booster\n\
      }\n\
    ].concat(STRINGS).concat(NUMBERS)\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/php.js"
));
require.register("chemzqm-highlight.js/lib/profile.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    contains: [\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'builtin',\n\
        begin: '{', end: '}$',\n\
        excludeBegin: true, excludeEnd: true,\n\
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE],\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'filename',\n\
        begin: '[a-zA-Z_][\\\\da-zA-Z_]+\\\\.[\\\\da-zA-Z_]{1,3}', end: ':',\n\
        excludeEnd: true\n\
      },\n\
      {\n\
        className: 'header',\n\
        begin: '(ncalls|tottime|cumtime)', end: '$',\n\
        keywords: 'ncalls tottime|10 cumtime|10 filename',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'summary',\n\
        begin: 'function calls', end: '$',\n\
        contains: [hljs.C_NUMBER_MODE],\n\
        relevance: 10\n\
      },\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      {\n\
        className: 'function',\n\
        begin: '\\\\(', end: '\\\\)$',\n\
        contains: [{\n\
          className: 'title',\n\
          begin: hljs.UNDERSCORE_IDENT_RE,\n\
          relevance: 0\n\
        }],\n\
        relevance: 0\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/profile.js"
));
require.register("chemzqm-highlight.js/lib/python.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var PROMPT = {\n\
    className: 'prompt',  begin: '^(>>>|\\\\.\\\\.\\\\.) '\n\
  }\n\
  var STRINGS = [\n\
    {\n\
      className: 'string',\n\
      begin: '(u|b)?r?\\'\\'\\'', end: '\\'\\'\\'',\n\
      contains: [PROMPT],\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '(u|b)?r?\"\"\"', end: '\"\"\"',\n\
      contains: [PROMPT],\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '(u|r|ur)\\'', end: '\\'',\n\
      contains: [hljs.BACKSLASH_ESCAPE],\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '(u|r|ur)\"', end: '\"',\n\
      contains: [hljs.BACKSLASH_ESCAPE],\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '(b|br)\\'', end: '\\'',\n\
      contains: [hljs.BACKSLASH_ESCAPE]\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '(b|br)\"', end: '\"',\n\
      contains: [hljs.BACKSLASH_ESCAPE]\n\
    }\n\
  ].concat([\n\
    hljs.APOS_STRING_MODE,\n\
    hljs.QUOTE_STRING_MODE\n\
  ]);\n\
  var TITLE = {\n\
    className: 'title', begin: hljs.UNDERSCORE_IDENT_RE\n\
  };\n\
  var PARAMS = {\n\
    className: 'params',\n\
    begin: '\\\\(', end: '\\\\)',\n\
    contains: ['self', hljs.C_NUMBER_MODE, PROMPT].concat(STRINGS)\n\
  };\n\
  var FUNC_CLASS_PROTO = {\n\
    beginWithKeyword: true, end: ':',\n\
    illegal: '[${=;\\\\n\
]',\n\
    contains: [TITLE, PARAMS],\n\
    relevance: 10\n\
  };\n\
\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'and elif is global as in if from raise for except finally print import pass return ' +\n\
        'exec else break not with class assert yield try while continue del or def lambda ' +\n\
        'nonlocal|10',\n\
      built_in:\n\
        'None True False Ellipsis NotImplemented'\n\
    },\n\
    illegal: '(</|->|\\\\?)',\n\
    contains: STRINGS.concat([\n\
      PROMPT,\n\
      hljs.HASH_COMMENT_MODE,\n\
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'function', keywords: 'def'}),\n\
      hljs.inherit(FUNC_CLASS_PROTO, {className: 'class', keywords: 'class'}),\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'decorator',\n\
        begin: '@', end: '$'\n\
      },\n\
      {\n\
        begin: '\\\\b(print|exec)\\\\(' // don’t highlight keywords-turned-functions in Python 3\n\
      }\n\
    ])\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/python.js"
));
require.register("chemzqm-highlight.js/lib/r.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var IDENT_RE = '([a-zA-Z]|\\\\.[a-zA-Z.])[a-zA-Z0-9._]*';\n\
\n\
  return {\n\
    contains: [\n\
      hljs.HASH_COMMENT_MODE,\n\
      {\n\
        begin: IDENT_RE,\n\
        lexems: IDENT_RE,\n\
        keywords: {\n\
          keyword:\n\
            'function if in break next repeat else for return switch while try tryCatch|10 ' +\n\
            'stop warning require library attach detach source setMethod setGeneric ' +\n\
            'setGroupGeneric setClass ...|10',\n\
          literal:\n\
            'NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 ' +\n\
            'NA_complex_|10'\n\
        },\n\
        relevance: 0\n\
      },\n\
      {\n\
        // hex value\n\
        className: 'number',\n\
        begin: \"0[xX][0-9a-fA-F]+[Li]?\\\\b\",\n\
        relevance: 0\n\
      },\n\
      {\n\
        // explicit integer\n\
        className: 'number',\n\
        begin: \"\\\\d+(?:[eE][+\\\\-]?\\\\d*)?L\\\\b\",\n\
        relevance: 0\n\
      },\n\
      {\n\
        // number with trailing decimal\n\
        className: 'number',\n\
        begin: \"\\\\d+\\\\.(?!\\\\d)(?:i\\\\b)?\",\n\
        relevance: 0\n\
      },\n\
      {\n\
        // number\n\
        className: 'number',\n\
        begin: \"\\\\d+(?:\\\\.\\\\d*)?(?:[eE][+\\\\-]?\\\\d*)?i?\\\\b\",\n\
        relevance: 0\n\
      },\n\
      {\n\
        // number with leading decimal\n\
        className: 'number',\n\
        begin: \"\\\\.\\\\d+(?:[eE][+\\\\-]?\\\\d*)?i?\\\\b\",\n\
        relevance: 0\n\
      },\n\
\n\
      {\n\
        // escaped identifier\n\
        begin: '`',\n\
        end: '`',\n\
        relevance: 0\n\
      },\n\
\n\
      {\n\
        className: 'string',\n\
        begin: '\"',\n\
        end: '\"',\n\
        contains: [hljs.BACKSLASH_ESCAPE],\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'string',\n\
        begin: \"'\",\n\
        end: \"'\",\n\
        contains: [hljs.BACKSLASH_ESCAPE],\n\
        relevance: 0\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/r.js"
));
require.register("chemzqm-highlight.js/lib/rib.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords:\n\
      'ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis ' +\n\
      'Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone ' +\n\
      'CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail ' +\n\
      'DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format ' +\n\
      'FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry ' +\n\
      'Hider Hyperboloid Identity Illuminate Imager Interior LightSource ' +\n\
      'MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte ' +\n\
      'MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option ' +\n\
      'Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples ' +\n\
      'PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection ' +\n\
      'Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ' +\n\
      'ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere ' +\n\
      'SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd ' +\n\
      'TransformPoints Translate TrimCurve WorldBegin WorldEnd',\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.HASH_COMMENT_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/rib.js"
));
require.register("chemzqm-highlight.js/lib/rsl.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        'float color point normal vector matrix while for if do return else break extern continue',\n\
      built_in:\n\
        'abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise ' +\n\
        'clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp ' +\n\
        'faceforward filterstep floor format fresnel incident length lightsource log match ' +\n\
        'max min mod noise normalize ntransform opposite option phong pnoise pow printf ' +\n\
        'ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp ' +\n\
        'setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan ' +\n\
        'texture textureinfo trace transform vtransform xcomp ycomp zcomp'\n\
    },\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#', end: '$'\n\
      },\n\
      {\n\
        className: 'shader',\n\
        beginWithKeyword: true, end: '\\\\(',\n\
        keywords: 'surface displacement light volume imager'\n\
      },\n\
      {\n\
        className: 'shading',\n\
        beginWithKeyword: true, end: '\\\\(',\n\
        keywords: 'illuminate illuminance gather'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/rsl.js"
));
require.register("chemzqm-highlight.js/lib/ruby.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var RUBY_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\\\!|\\\\?)?';\n\
  var RUBY_METHOD_RE = '[a-zA-Z_]\\\\w*[!?=]?|[-+~]\\\\@|<<|>>|=~|===?|<=>|[<>]=?|\\\\*\\\\*|[-/+%^&*~`|]|\\\\[\\\\]=?';\n\
  var RUBY_KEYWORDS = {\n\
    keyword:\n\
      'and false then defined module in return redo if BEGIN retry end for true self when ' +\n\
      'next until do begin unless END rescue nil else break undef not super class case ' +\n\
      'require yield alias while ensure elsif or include'\n\
  };\n\
  var YARDOCTAG = {\n\
    className: 'yardoctag',\n\
    begin: '@[A-Za-z]+'\n\
  };\n\
  var COMMENTS = [\n\
    {\n\
      className: 'comment',\n\
      begin: '#', end: '$',\n\
      contains: [YARDOCTAG]\n\
    },\n\
    {\n\
      className: 'comment',\n\
      begin: '^\\\\=begin', end: '^\\\\=end',\n\
      contains: [YARDOCTAG],\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'comment',\n\
      begin: '^__END__', end: '\\\\n\
$'\n\
    }\n\
  ];\n\
  var SUBST = {\n\
    className: 'subst',\n\
    begin: '#\\\\{', end: '}',\n\
    lexems: RUBY_IDENT_RE,\n\
    keywords: RUBY_KEYWORDS\n\
  };\n\
  var STR_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST];\n\
  var STRINGS = [\n\
    {\n\
      className: 'string',\n\
      begin: '\\'', end: '\\'',\n\
      contains: STR_CONTAINS,\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '\"', end: '\"',\n\
      contains: STR_CONTAINS,\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?\\\\(', end: '\\\\)',\n\
      contains: STR_CONTAINS\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?\\\\[', end: '\\\\]',\n\
      contains: STR_CONTAINS\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?{', end: '}',\n\
      contains: STR_CONTAINS\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?<', end: '>',\n\
      contains: STR_CONTAINS,\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?/', end: '/',\n\
      contains: STR_CONTAINS,\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?%', end: '%',\n\
      contains: STR_CONTAINS,\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?-', end: '-',\n\
      contains: STR_CONTAINS,\n\
      relevance: 10\n\
    },\n\
    {\n\
      className: 'string',\n\
      begin: '%[qw]?\\\\|', end: '\\\\|',\n\
      contains: STR_CONTAINS,\n\
      relevance: 10\n\
    }\n\
  ];\n\
  var FUNCTION = {\n\
    className: 'function',\n\
    beginWithKeyword: true, end: ' |$|;',\n\
    keywords: 'def',\n\
    contains: [\n\
      {\n\
        className: 'title',\n\
        begin: RUBY_METHOD_RE,\n\
        lexems: RUBY_IDENT_RE,\n\
        keywords: RUBY_KEYWORDS\n\
      },\n\
      {\n\
        className: 'params',\n\
        begin: '\\\\(', end: '\\\\)',\n\
        lexems: RUBY_IDENT_RE,\n\
        keywords: RUBY_KEYWORDS\n\
      }\n\
    ].concat(COMMENTS)\n\
  };\n\
\n\
  var RUBY_DEFAULT_CONTAINS = COMMENTS.concat(STRINGS.concat([\n\
    {\n\
      className: 'class',\n\
      beginWithKeyword: true, end: '$|;',\n\
      keywords: 'class module',\n\
      contains: [\n\
        {\n\
          className: 'title',\n\
          begin: '[A-Za-z_]\\\\w*(::\\\\w+)*(\\\\?|\\\\!)?',\n\
          relevance: 0\n\
        },\n\
        {\n\
          className: 'inheritance',\n\
          begin: '<\\\\s*',\n\
          contains: [{\n\
            className: 'parent',\n\
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE\n\
          }]\n\
        }\n\
      ].concat(COMMENTS)\n\
    },\n\
    FUNCTION,\n\
    {\n\
      className: 'constant',\n\
      begin: '(::)?(\\\\b[A-Z]\\\\w*(::)?)+',\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'symbol',\n\
      begin: ':',\n\
      contains: STRINGS.concat([{begin: RUBY_METHOD_RE}]),\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'symbol',\n\
      begin: RUBY_IDENT_RE + ':',\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'number',\n\
      begin: '(\\\\b0[0-7_]+)|(\\\\b0x[0-9a-fA-F_]+)|(\\\\b[1-9][0-9_]*(\\\\.[0-9_]+)?)|[0_]\\\\b',\n\
      relevance: 0\n\
    },\n\
    {\n\
      className: 'number',\n\
      begin: '\\\\?\\\\w'\n\
    },\n\
    {\n\
      className: 'variable',\n\
      begin: '(\\\\$\\\\W)|((\\\\$|\\\\@\\\\@?)(\\\\w+))'\n\
    },\n\
    { // regexp container\n\
      begin: '(' + hljs.RE_STARTERS_RE + ')\\\\s*',\n\
      contains: COMMENTS.concat([\n\
        {\n\
          className: 'regexp',\n\
          begin: '/', end: '/[a-z]*',\n\
          illegal: '\\\\n\
',\n\
          contains: [hljs.BACKSLASH_ESCAPE, SUBST]\n\
        }\n\
      ]),\n\
      relevance: 0\n\
    }\n\
  ]));\n\
  SUBST.contains = RUBY_DEFAULT_CONTAINS;\n\
  FUNCTION.contains[1].contains = RUBY_DEFAULT_CONTAINS;\n\
\n\
  return {\n\
    lexems: RUBY_IDENT_RE,\n\
    keywords: RUBY_KEYWORDS,\n\
    contains: RUBY_DEFAULT_CONTAINS\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/ruby.js"
));
require.register("chemzqm-highlight.js/lib/rust.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var TITLE = {\n\
    className: 'title',\n\
    begin: hljs.UNDERSCORE_IDENT_RE\n\
  };\n\
  var NUMBER = {\n\
    className: 'number',\n\
    begin: '\\\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\\\.[0-9_]+)?([uif](8|16|32|64)?)?)',\n\
    relevance: 0\n\
  };\n\
  var KEYWORDS =\n\
    'alt any as assert be bind block bool break char check claim const cont dir do else enum ' +\n\
    'export f32 f64 fail false float fn for i16 i32 i64 i8 if iface impl import in int let ' +\n\
    'log mod mutable native note of prove pure resource ret self str syntax true type u16 u32 ' +\n\
    'u64 u8 uint unchecked unsafe use vec while';\n\
  return {\n\
    keywords: KEYWORDS,\n\
    illegal: '</',\n\
    contains: [\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),\n\
      hljs.APOS_STRING_MODE,\n\
      NUMBER,\n\
      {\n\
        className: 'function',\n\
        beginWithKeyword: true, end: '(\\\\(|<)',\n\
        keywords: 'fn',\n\
        contains: [TITLE]\n\
      },\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '#\\\\[', end: '\\\\]'\n\
      },\n\
      {\n\
        beginWithKeyword: true, end: '(=|<)',\n\
        keywords: 'type',\n\
        contains: [TITLE],\n\
        illegal: '\\\\S'\n\
      },\n\
      {\n\
        beginWithKeyword: true, end: '({|<)',\n\
        keywords: 'iface enum',\n\
        contains: [TITLE],\n\
        illegal: '\\\\S'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/rust.js"
));
require.register("chemzqm-highlight.js/lib/scala.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var ANNOTATION = {\n\
    className: 'annotation', begin: '@[A-Za-z]+'\n\
  };\n\
  var STRING = {\n\
    className: 'string',\n\
    begin: 'u?r?\"\"\"', end: '\"\"\"',\n\
    relevance: 10\n\
  };\n\
  return {\n\
    keywords:\n\
      'type yield lazy override def with val var false true sealed abstract private trait ' +\n\
      'object null if for while throw finally protected extends import final return else ' +\n\
      'break new catch super class case package default try this match continue throws',\n\
    contains: [\n\
      {\n\
        className: 'javadoc',\n\
        begin: '/\\\\*\\\\*', end: '\\\\*/',\n\
        contains: [{\n\
          className: 'javadoctag',\n\
          begin: '@[A-Za-z]+'\n\
        }],\n\
        relevance: 10\n\
      },\n\
      hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE,\n\
      hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, STRING,\n\
      {\n\
        className: 'class',\n\
        begin: '((case )?class |object |trait )', end: '({|$)', // beginWithKeyword won't work because a single \"case\" shouldn't start this mode\n\
        illegal: ':',\n\
        keywords: 'case class trait object',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true,\n\
            keywords: 'extends with',\n\
            relevance: 10\n\
          },\n\
          {\n\
            className: 'title',\n\
            begin: hljs.UNDERSCORE_IDENT_RE\n\
          },\n\
          {\n\
            className: 'params',\n\
            begin: '\\\\(', end: '\\\\)',\n\
            contains: [\n\
              hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, STRING,\n\
              ANNOTATION\n\
            ]\n\
          }\n\
        ]\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      ANNOTATION\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/scala.js"
));
require.register("chemzqm-highlight.js/lib/smalltalk.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';\n\
  var CHAR = {\n\
    className: 'char',\n\
    begin: '\\\\$.{1}'\n\
  };\n\
  var SYMBOL = {\n\
    className: 'symbol',\n\
    begin: '#' + hljs.UNDERSCORE_IDENT_RE\n\
  };\n\
  return {\n\
    keywords: 'self super nil true false thisContext', // only 6\n\
    contains: [\n\
      {\n\
        className: 'comment',\n\
        begin: '\"', end: '\"',\n\
        relevance: 0\n\
      },\n\
      hljs.APOS_STRING_MODE,\n\
      {\n\
        className: 'class',\n\
        begin: '\\\\b[A-Z][A-Za-z0-9_]*',\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'method',\n\
        begin: VAR_IDENT_RE + ':'\n\
      },\n\
      hljs.C_NUMBER_MODE,\n\
      SYMBOL,\n\
      CHAR,\n\
      {\n\
        className: 'localvars',\n\
        begin: '\\\\|\\\\s*((' + VAR_IDENT_RE + ')\\\\s*)+\\\\|'\n\
      },\n\
      {\n\
        className: 'array',\n\
        begin: '\\\\#\\\\(', end: '\\\\)',\n\
        contains: [\n\
          hljs.APOS_STRING_MODE,\n\
          CHAR,\n\
          hljs.C_NUMBER_MODE,\n\
          SYMBOL\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/smalltalk.js"
));
require.register("chemzqm-highlight.js/lib/sql.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    contains: [\n\
      {\n\
        className: 'operator',\n\
        begin: '(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\\\b(?!:)', // negative look-ahead here is specifically to prevent stomping on SmallTalk\n\
        end: ';', endsWithParent: true,\n\
        keywords: {\n\
          keyword: 'all partial global month current_timestamp using go revoke smallint ' +\n\
            'indicator end-exec disconnect zone with character assertion to add current_user ' +\n\
            'usage input local alter match collate real then rollback get read timestamp ' +\n\
            'session_user not integer bit unique day minute desc insert execute like ilike|2 ' +\n\
            'level decimal drop continue isolation found where constraints domain right ' +\n\
            'national some module transaction relative second connect escape close system_user ' +\n\
            'for deferred section cast current sqlstate allocate intersect deallocate numeric ' +\n\
            'public preserve full goto initially asc no key output collation group by union ' +\n\
            'session both last language constraint column of space foreign deferrable prior ' +\n\
            'connection unknown action commit view or first into float year primary cascaded ' +\n\
            'except restrict set references names table outer open select size are rows from ' +\n\
            'prepare distinct leading create only next inner authorization schema ' +\n\
            'corresponding option declare precision immediate else timezone_minute external ' +\n\
            'varying translation true case exception join hour default double scroll value ' +\n\
            'cursor descriptor values dec fetch procedure delete and false int is describe ' +\n\
            'char as at in varchar null trailing any absolute current_time end grant ' +\n\
            'privileges when cross check write current_date pad begin temporary exec time ' +\n\
            'update catalog user sql date on identity timezone_hour natural whenever interval ' +\n\
            'work order cascade diagnostics nchar having left call do handler load replace ' +\n\
            'truncate start lock show pragma exists number',\n\
          aggregate: 'count sum min max avg'\n\
        },\n\
        contains: [\n\
          {\n\
            className: 'string',\n\
            begin: '\\'', end: '\\'',\n\
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\\'\\''}],\n\
            relevance: 0\n\
          },\n\
          {\n\
            className: 'string',\n\
            begin: '\"', end: '\"',\n\
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\"\"'}],\n\
            relevance: 0\n\
          },\n\
          {\n\
            className: 'string',\n\
            begin: '`', end: '`',\n\
            contains: [hljs.BACKSLASH_ESCAPE]\n\
          },\n\
          hljs.C_NUMBER_MODE\n\
        ]\n\
      },\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      {\n\
        className: 'comment',\n\
        begin: '--', end: '$'\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/sql.js"
));
require.register("chemzqm-highlight.js/lib/tex.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var COMMAND1 = {\n\
    className: 'command',\n\
    begin: '\\\\\\\\[a-zA-Zа-яА-я]+[\\\\*]?'\n\
  };\n\
  var COMMAND2 = {\n\
    className: 'command',\n\
    begin: '\\\\\\\\[^a-zA-Zа-яА-я0-9]'\n\
  };\n\
  var SPECIAL = {\n\
    className: 'special',\n\
    begin: '[{}\\\\[\\\\]\\\\&#~]',\n\
    relevance: 0\n\
  };\n\
\n\
  return {\n\
    contains: [\n\
      { // parameter\n\
        begin: '\\\\\\\\[a-zA-Zа-яА-я]+[\\\\*]? *= *-?\\\\d*\\\\.?\\\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?',\n\
        returnBegin: true,\n\
        contains: [\n\
          COMMAND1, COMMAND2,\n\
          {\n\
            className: 'number',\n\
            begin: ' *=', end: '-?\\\\d*\\\\.?\\\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?',\n\
            excludeBegin: true\n\
          }\n\
        ],\n\
        relevance: 10\n\
      },\n\
      COMMAND1, COMMAND2,\n\
      SPECIAL,\n\
      {\n\
        className: 'formula',\n\
        begin: '\\\\$\\\\$', end: '\\\\$\\\\$',\n\
        contains: [COMMAND1, COMMAND2, SPECIAL],\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'formula',\n\
        begin: '\\\\$', end: '\\\\$',\n\
        contains: [COMMAND1, COMMAND2, SPECIAL],\n\
        relevance: 0\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '%', end: '$',\n\
        relevance: 0\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/tex.js"
));
require.register("chemzqm-highlight.js/lib/vala.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    keywords: {\n\
      keyword:\n\
        // Value types\n\
        'char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 ' +\n\
        'uint16 uint32 uint64 float double bool struct enum string void ' +\n\
        // Reference types\n\
        'weak unowned owned ' +\n\
        // Modifiers\n\
        'async signal static abstract interface override ' +\n\
        // Control Structures\n\
        'while do for foreach else switch case break default return try catch ' +\n\
        // Visibility\n\
        'public private protected internal ' +\n\
        // Other\n\
        'using new this get set const stdout stdin stderr var',\n\
      built_in:\n\
        'DBus GLib CCode Gee Object',\n\
      literal:\n\
        'false true null'\n\
    },\n\
    contains: [\n\
      {\n\
        className: 'class',\n\
        beginWithKeyword: true, end: '{',\n\
        keywords: 'class interface delegate namespace',\n\
        contains: [\n\
          {\n\
            beginWithKeyword: true,\n\
            keywords: 'extends implements'\n\
          },\n\
          {\n\
            className: 'title',\n\
            begin: hljs.UNDERSCORE_IDENT_RE\n\
          }\n\
        ]\n\
      },\n\
      hljs.C_LINE_COMMENT_MODE,\n\
      hljs.C_BLOCK_COMMENT_MODE,\n\
      {\n\
        className: 'string',\n\
        begin: '\"\"\"', end: '\"\"\"',\n\
        relevance: 5\n\
      },\n\
      hljs.APOS_STRING_MODE,\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'preprocessor',\n\
        begin: '^#', end: '$',\n\
        relevance: 2\n\
      },\n\
      {\n\
        className: 'constant',\n\
        begin: ' [A-Z_]+ ',\n\
        relevance: 0\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/vala.js"
));
require.register("chemzqm-highlight.js/lib/vbscript.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: {\n\
      keyword:\n\
        'call class const dim do loop erase execute executeglobal exit for each next function ' +\n\
        'if then else on error option explicit new private property let get public randomize ' +\n\
        'redim rem select case set stop sub while wend with end to elseif is or xor and not ' +\n\
        'class_initialize class_terminate default preserve in me byval byref step resume goto',\n\
      built_in:\n\
        'lcase month vartype instrrev ubound setlocale getobject rgb getref string ' +\n\
        'weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency ' +\n\
        'conversions csng timevalue second year space abs clng timeserial fixs len asc ' +\n\
        'isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate ' +\n\
        'instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex ' +\n\
        'chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim ' +\n\
        'strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion ' +\n\
        'scriptengine split scriptengineminorversion cint sin datepart ltrim sqr ' +\n\
        'scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw ' +\n\
        'chrw regexp server response request cstr err',\n\
      literal:\n\
        'true false null nothing empty'\n\
    },\n\
    illegal: '//',\n\
    contains: [\n\
      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '\"\"'}]}),\n\
      {\n\
        className: 'comment',\n\
        begin: '\\'', end: '$'\n\
      },\n\
      hljs.C_NUMBER_MODE\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/vbscript.js"
));
require.register("chemzqm-highlight.js/lib/vhdl.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  return {\n\
    case_insensitive: true,\n\
    keywords: {\n\
      keyword:\n\
        'abs access after alias all and architecture array assert attribute begin block ' +\n\
        'body buffer bus case component configuration constant context cover disconnect ' +\n\
        'downto default else elsif end entity exit fairness file for force function generate ' +\n\
        'generic group guarded if impure in inertial inout is label library linkage literal ' +\n\
        'loop map mod nand new next nor not null of on open or others out package port ' +\n\
        'postponed procedure process property protected pure range record register reject ' +\n\
        'release rem report restrict restrict_guarantee return rol ror select sequence ' +\n\
        'severity shared signal sla sll sra srl strong subtype then to transport type ' +\n\
        'unaffected units until use variable vmode vprop vunit wait when while with xnor xor',\n\
      typename:\n\
        'boolean bit character severity_level integer time delay_length natural positive ' +\n\
        'string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector ' +\n\
        'std_logic std_logic_vector unsigned signed boolean_vector integer_vector ' +\n\
        'real_vector time_vector'\n\
    },\n\
    illegal: '{',\n\
    contains: [\n\
      hljs.C_BLOCK_COMMENT_MODE,        // VHDL-2008 block commenting.\n\
      {\n\
        className: 'comment',\n\
        begin: '--', end: '$'\n\
      },\n\
      hljs.QUOTE_STRING_MODE,\n\
      hljs.C_NUMBER_MODE,\n\
      {\n\
        className: 'literal',\n\
        begin: '\\'(U|X|0|1|Z|W|L|H|-)\\'',\n\
        contains: [hljs.BACKSLASH_ESCAPE]\n\
      },\n\
      {\n\
        className: 'attribute',\n\
        begin: '\\'[A-Za-z](_?[A-Za-z0-9])*',\n\
        contains: [hljs.BACKSLASH_ESCAPE]\n\
      }\n\
    ]\n\
  }; // return\n\
};//@ sourceURL=chemzqm-highlight.js/lib/vhdl.js"
));
require.register("chemzqm-highlight.js/lib/xml.js", Function("exports, require, module",
"module.exports = function(hljs) {\n\
  var XML_IDENT_RE = '[A-Za-z0-9\\\\._:-]+';\n\
  var TAG_INTERNALS = {\n\
    endsWithParent: true,\n\
    contains: [\n\
      {\n\
        className: 'attribute',\n\
        begin: XML_IDENT_RE,\n\
        relevance: 0\n\
      },\n\
      {\n\
        begin: '=\"', returnBegin: true, end: '\"',\n\
        contains: [{\n\
            className: 'value',\n\
            begin: '\"', endsWithParent: true\n\
        }]\n\
      },\n\
      {\n\
        begin: '=\\'', returnBegin: true, end: '\\'',\n\
        contains: [{\n\
          className: 'value',\n\
          begin: '\\'', endsWithParent: true\n\
        }]\n\
      },\n\
      {\n\
        begin: '=',\n\
        contains: [{\n\
          className: 'value',\n\
          begin: '[^\\\\s/>]+'\n\
        }]\n\
      }\n\
    ]\n\
  };\n\
  return {\n\
    case_insensitive: true,\n\
    contains: [\n\
      {\n\
        className: 'pi',\n\
        begin: '<\\\\?', end: '\\\\?>',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'doctype',\n\
        begin: '<!DOCTYPE', end: '>',\n\
        relevance: 10,\n\
        contains: [{begin: '\\\\[', end: '\\\\]'}]\n\
      },\n\
      {\n\
        className: 'comment',\n\
        begin: '<!--', end: '-->',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'cdata',\n\
        begin: '<\\\\!\\\\[CDATA\\\\[', end: '\\\\]\\\\]>',\n\
        relevance: 10\n\
      },\n\
      {\n\
        className: 'tag',\n\
        /*\n\
        The lookahead pattern (?=...) ensures that 'begin' only matches\n\
        '<style' as a single word, followed by a whitespace or an\n\
        ending braket. The '$' is needed for the lexem to be recognized\n\
        by hljs.subMode() that tests lexems outside the stream.\n\
        */\n\
        begin: '<style(?=\\\\s|>|$)', end: '>',\n\
        keywords: {title: 'style'},\n\
        contains: [TAG_INTERNALS],\n\
        starts: {\n\
          end: '</style>', returnEnd: true,\n\
          subLanguage: 'css'\n\
        }\n\
      },\n\
      {\n\
        className: 'tag',\n\
        // See the comment in the <style tag about the lookahead pattern\n\
        begin: '<script(?=\\\\s|>|$)', end: '>',\n\
        keywords: {title: 'script'},\n\
        contains: [TAG_INTERNALS],\n\
        starts: {\n\
          end: '</script>', returnEnd: true,\n\
          subLanguage: 'javascript'\n\
        }\n\
      },\n\
      {\n\
        begin: '<%', end: '%>',\n\
        subLanguage: 'vbscript'\n\
      },\n\
      {\n\
        className: 'tag',\n\
        begin: '</?', end: '/?>',\n\
        contains: [\n\
          {\n\
            className: 'title', begin: '[^ />]+'\n\
          },\n\
          TAG_INTERNALS\n\
        ]\n\
      }\n\
    ]\n\
  };\n\
};//@ sourceURL=chemzqm-highlight.js/lib/xml.js"
));
require.register("marked/lib/marked.js", Function("exports, require, module",
"/*jslint regexp:true */\n\
/**\n\
 * marked - a markdown parser\n\
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)\n\
 * https://github.com/chjj/marked\n\
 */\n\
\n\
;(function() {\n\
\n\
var hljs;\n\
if(typeof require !== 'undefined'){\n\
  hljs = require('highlight.js');\n\
}\n\
if(typeof window !== 'undefined' && typeof window.hljs !== 'undefined'){\n\
  hljs = window.hljs;\n\
}\n\
\n\
/**\n\
 * Block-Level Grammar\n\
 */\n\
\n\
var block = {\n\
  newline: /^\\n\
+/,\n\
  code: /^( {4}[^\\n\
]+\\n\
*)+/,\n\
  fences: noop,\n\
  hr: /^( *[-*_]){3,} *(?:\\n\
+|$)/,\n\
  heading: /^ *(#{1,6}) *([^\\n\
]+?) *#* *(?:\\n\
+|$)/,\n\
  nptable: noop,\n\
  lheading: /^([^\\n\
]+)\\n\
 *(=|-){2,} *(?:\\n\
+|$)/,\n\
  blockquote: /^( *>[^\\n\
]+(\\n\
[^\\n\
]+)*\\n\
*)+/,\n\
  list: /^( *)(bull) [\\s\\S]+?(?:hr|\\n\
{2,}(?! )(?!\\1bull )\\n\
*|\\s*$)/,\n\
  html: /^ *(?:comment|closed|closing) *(?:\\n\
{2,}|\\s*$)/,\n\
  def: /^ *\\[([^\\]]+)\\]: *<?([^\\s>]+)>?(?: +[\"(]([^\\n\
]+)[\")])? *(?:\\n\
+|$)/,\n\
  table: noop,\n\
  paragraph: /^((?:[^\\n\
]+\\n\
?(?!hr|heading|lheading|blockquote|tag|def))+)\\n\
*/,\n\
  text: /^[^\\n\
]+/\n\
};\n\
\n\
block.bullet = /(?:[*+-]|\\d+\\.)/;\n\
block.item = /^( *)(bull) [^\\n\
]*(?:\\n\
(?!\\1bull )[^\\n\
]*)*/;\n\
block.item = replace(block.item, 'gm')\n\
  (/bull/g, block.bullet)\n\
  ();\n\
\n\
block.list = replace(block.list)\n\
  (/bull/g, block.bullet)\n\
  ('hr', /\\n\
+(?=(?: *[-*_]){3,} *(?:\\n\
+|$))/)\n\
  ();\n\
\n\
block._tag = '(?!(?:'\n\
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'\n\
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'\n\
  + '|span|br|wbr|ins|del|img)\\\\b)\\\\w+(?!:/|@)\\\\b';\n\
\n\
block.html = replace(block.html)\n\
  ('comment', /<!--[\\s\\S]*?-->/)\n\
  ('closed', /<(tag)[\\s\\S]+?<\\/\\1>/)\n\
  ('closing', /<tag(?:\"[^\"]*\"|'[^']*'|[^'\">])*?>/)\n\
  (/tag/g, block._tag)\n\
  ();\n\
\n\
block.paragraph = replace(block.paragraph)\n\
  ('hr', block.hr)\n\
  ('heading', block.heading)\n\
  ('lheading', block.lheading)\n\
  ('blockquote', block.blockquote)\n\
  ('tag', '<' + block._tag)\n\
  ('def', block.def)\n\
  ();\n\
\n\
/**\n\
 * Normal Block Grammar\n\
 */\n\
\n\
block.normal = merge({}, block);\n\
\n\
/**\n\
 * GFM Block Grammar\n\
 */\n\
\n\
block.gfm = merge({}, block.normal, {\n\
  fences: /^ *(`{3,}|~{3,}) *(\\S+)? *\\n\
([\\s\\S]+?)\\s*\\1 *(?:\\n\
+|$)/,\n\
  paragraph: /^/\n\
});\n\
\n\
block.gfm.paragraph = replace(block.paragraph)\n\
  ('(?!', '(?!'\n\
    + block.gfm.fences.source.replace('\\\\1', '\\\\2') + '|'\n\
    + block.list.source.replace('\\\\1', '\\\\3') + '|')\n\
  ();\n\
\n\
/**\n\
 * GFM + Tables Block Grammar\n\
 */\n\
\n\
block.tables = merge({}, block.gfm, {\n\
  nptable: /^ *(\\S.*\\|.*)\\n\
 *([-:]+ *\\|[-| :]*)\\n\
((?:.*\\|.*(?:\\n\
|$))*)\\n\
*/,\n\
  table: /^ *\\|(.+)\\n\
 *\\|( *[-:]+[-| :]*)\\n\
((?: *\\|.*(?:\\n\
|$))*)\\n\
*/\n\
});\n\
\n\
/**\n\
 * Block Lexer\n\
 */\n\
\n\
function Lexer(options) {\n\
  this.tokens = [];\n\
  this.tokens.links = {};\n\
  this.options = options || marked.defaults;\n\
  this.rules = block.normal;\n\
\n\
  if (this.options.gfm) {\n\
    if (this.options.tables) {\n\
      this.rules = block.tables;\n\
    } else {\n\
      this.rules = block.gfm;\n\
    }\n\
  }\n\
}\n\
\n\
/**\n\
 * Expose Block Rules\n\
 */\n\
\n\
Lexer.rules = block;\n\
\n\
/**\n\
 * Static Lex Method\n\
 */\n\
\n\
Lexer.lex = function(src, options) {\n\
  var lexer = new Lexer(options);\n\
  return lexer.lex(src);\n\
};\n\
\n\
/**\n\
 * Preprocessing\n\
 */\n\
\n\
Lexer.prototype.lex = function(src) {\n\
  src = src\n\
    .replace(/\\r\\n\
|\\r/g, '\\n\
')\n\
    .replace(/\\t/g, '    ')\n\
    .replace(/\\u00a0/g, ' ')\n\
    .replace(/\\u2424/g, '\\n\
');\n\
\n\
  return this.token(src, true);\n\
};\n\
\n\
/**\n\
 * Lexing\n\
 */\n\
\n\
Lexer.prototype.token = function(src, top) {\n\
  var src = src.replace(/^ +$/gm, '')\n\
    , next\n\
    , loose\n\
    , cap\n\
    , bull\n\
    , b\n\
    , item\n\
    , space\n\
    , i\n\
    , l;\n\
\n\
  while (src) {\n\
    // newline\n\
    if (cap = this.rules.newline.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      if (cap[0].length > 1) {\n\
        this.tokens.push({\n\
          type: 'space'\n\
        });\n\
      }\n\
    }\n\
\n\
    // code\n\
    if (cap = this.rules.code.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      cap = cap[0].replace(/^ {4}/gm, '');\n\
      this.tokens.push({\n\
        type: 'code',\n\
        text: !this.options.pedantic\n\
          ? cap.replace(/\\n\
+$/, '')\n\
          : cap\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // fences (gfm)\n\
    if (cap = this.rules.fences.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      var lang = langConvert(cap[2]);\n\
      this.tokens.push({\n\
        type: 'code',\n\
        lang: lang,\n\
        text: cap[3]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // heading\n\
    if (cap = this.rules.heading.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: 'heading',\n\
        depth: cap[1].length,\n\
        text: cap[2]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // table no leading pipe (gfm)\n\
    if (top && (cap = this.rules.nptable.exec(src))) {\n\
      src = src.substring(cap[0].length);\n\
\n\
      item = {\n\
        type: 'table',\n\
        header: cap[1].replace(/^ *| *\\| *$/g, '').split(/ *\\| */),\n\
        align: cap[2].replace(/^ *|\\| *$/g, '').split(/ *\\| */),\n\
        cells: cap[3].replace(/\\n\
$/, '').split('\\n\
')\n\
      };\n\
\n\
      for (i = 0; i < item.align.length; i++) {\n\
        if (/^ *-+: *$/.test(item.align[i])) {\n\
          item.align[i] = 'right';\n\
        } else if (/^ *:-+: *$/.test(item.align[i])) {\n\
          item.align[i] = 'center';\n\
        } else if (/^ *:-+ *$/.test(item.align[i])) {\n\
          item.align[i] = 'left';\n\
        } else {\n\
          item.align[i] = null;\n\
        }\n\
      }\n\
\n\
      for (i = 0; i < item.cells.length; i++) {\n\
        item.cells[i] = item.cells[i].split(/ *\\| */);\n\
      }\n\
\n\
      this.tokens.push(item);\n\
\n\
      continue;\n\
    }\n\
\n\
    // lheading\n\
    if (cap = this.rules.lheading.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: 'heading',\n\
        depth: cap[2] === '=' ? 1 : 2,\n\
        text: cap[1]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // hr\n\
    if (cap = this.rules.hr.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: 'hr'\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // blockquote\n\
    if (cap = this.rules.blockquote.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
\n\
      this.tokens.push({\n\
        type: 'blockquote_start'\n\
      });\n\
\n\
      cap = cap[0].replace(/^ *> ?/gm, '');\n\
\n\
      // Pass `top` to keep the current\n\
      // \"toplevel\" state. This is exactly\n\
      // how markdown.pl works.\n\
      this.token(cap, top);\n\
\n\
      this.tokens.push({\n\
        type: 'blockquote_end'\n\
      });\n\
\n\
      continue;\n\
    }\n\
\n\
    // list\n\
    if (cap = this.rules.list.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      bull = cap[2];\n\
\n\
      this.tokens.push({\n\
        type: 'list_start',\n\
        ordered: bull.length > 1\n\
      });\n\
\n\
      // Get each top-level item.\n\
      cap = cap[0].match(this.rules.item);\n\
\n\
      next = false;\n\
      l = cap.length;\n\
      i = 0;\n\
\n\
      for (; i < l; i++) {\n\
        item = cap[i];\n\
\n\
        // Remove the list item's bullet\n\
        // so it is seen as the next token.\n\
        space = item.length;\n\
        item = item.replace(/^ *([*+-]|\\d+\\.) +/, '');\n\
\n\
        // Outdent whatever the\n\
        // list item contains. Hacky.\n\
        if (~item.indexOf('\\n\
 ')) {\n\
          space -= item.length;\n\
          item = !this.options.pedantic\n\
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')\n\
            : item.replace(/^ {1,4}/gm, '');\n\
        }\n\
\n\
        // Determine whether the next list item belongs here.\n\
        // Backpedal if it does not belong in this list.\n\
        if (this.options.smartLists && i !== l - 1) {\n\
          b = block.bullet.exec(cap[i + 1])[0];\n\
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {\n\
            src = cap.slice(i + 1).join('\\n\
') + src;\n\
            i = l - 1;\n\
          }\n\
        }\n\
\n\
        // Determine whether item is loose or not.\n\
        // Use: /(^|\\n\
)(?! )[^\\n\
]+\\n\
\\n\
(?!\\s*$)/\n\
        // for discount behavior.\n\
        loose = next || /\\n\
\\n\
(?!\\s*$)/.test(item);\n\
        if (i !== l - 1) {\n\
          next = item.charAt(item.length - 1) === '\\n\
';\n\
          if (!loose) loose = next;\n\
        }\n\
\n\
        this.tokens.push({\n\
          type: loose\n\
            ? 'loose_item_start'\n\
            : 'list_item_start'\n\
        });\n\
\n\
        // Recurse.\n\
        this.token(item, false);\n\
\n\
        this.tokens.push({\n\
          type: 'list_item_end'\n\
        });\n\
      }\n\
\n\
      this.tokens.push({\n\
        type: 'list_end'\n\
      });\n\
\n\
      continue;\n\
    }\n\
\n\
    // html\n\
    if (cap = this.rules.html.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: this.options.sanitize\n\
          ? 'paragraph'\n\
          : 'html',\n\
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',\n\
        text: cap[0]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // def\n\
    if (top && (cap = this.rules.def.exec(src))) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.links[cap[1].toLowerCase()] = {\n\
        href: cap[2],\n\
        title: cap[3]\n\
      };\n\
      continue;\n\
    }\n\
\n\
    // table (gfm)\n\
    if (top && (cap = this.rules.table.exec(src))) {\n\
      src = src.substring(cap[0].length);\n\
\n\
      item = {\n\
        type: 'table',\n\
        header: cap[1].replace(/^ *| *\\| *$/g, '').split(/ *\\| */),\n\
        align: cap[2].replace(/^ *|\\| *$/g, '').split(/ *\\| */),\n\
        cells: cap[3].replace(/(?: *\\| *)?\\n\
$/, '').split('\\n\
')\n\
      };\n\
\n\
      for (i = 0; i < item.align.length; i++) {\n\
        if (/^ *-+: *$/.test(item.align[i])) {\n\
          item.align[i] = 'right';\n\
        } else if (/^ *:-+: *$/.test(item.align[i])) {\n\
          item.align[i] = 'center';\n\
        } else if (/^ *:-+ *$/.test(item.align[i])) {\n\
          item.align[i] = 'left';\n\
        } else {\n\
          item.align[i] = null;\n\
        }\n\
      }\n\
\n\
      for (i = 0; i < item.cells.length; i++) {\n\
        item.cells[i] = item.cells[i]\n\
          .replace(/^ *\\| *| *\\| *$/g, '')\n\
          .split(/ *\\| */);\n\
      }\n\
\n\
      this.tokens.push(item);\n\
\n\
      continue;\n\
    }\n\
\n\
    // top-level paragraph\n\
    if (top && (cap = this.rules.paragraph.exec(src))) {\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: 'paragraph',\n\
        text: cap[1].charAt(cap[1].length - 1) === '\\n\
'\n\
          ? cap[1].slice(0, -1)\n\
          : cap[1]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // text\n\
    if (cap = this.rules.text.exec(src)) {\n\
      // Top-level should never reach here.\n\
      src = src.substring(cap[0].length);\n\
      this.tokens.push({\n\
        type: 'text',\n\
        text: cap[0]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    if (src) {\n\
      throw new\n\
        Error('Infinite loop on byte: ' + src.charCodeAt(0));\n\
    }\n\
  }\n\
\n\
  return this.tokens;\n\
};\n\
\n\
/**\n\
 * Inline-Level Grammar\n\
 */\n\
\n\
var inline = {\n\
  escape: /^\\\\([\\\\`*{}\\[\\]()#+\\-.!_>])/,\n\
  autolink: /^<([^ >]+(@|:\\/)[^ >]+)>/,\n\
  url: noop,\n\
  tag: /^<!--[\\s\\S]*?-->|^<\\/?\\w+(?:\"[^\"]*\"|'[^']*'|[^'\">])*?>/,\n\
  link: /^!?\\[(inside)\\]\\(href\\)/,\n\
  reflink: /^!?\\[(inside)\\]\\s*\\[([^\\]]*)\\]/,\n\
  nolink: /^!?\\[((?:\\[[^\\]]*\\]|[^\\[\\]])*)\\]/,\n\
  strong: /^__([\\s\\S]+?)__(?!_)|^\\*\\*([\\s\\S]+?)\\*\\*(?!\\*)/,\n\
  em: /^\\b_((?:__|[\\s\\S])+?)_\\b|^\\*((?:\\*\\*|[\\s\\S])+?)\\*(?!\\*)/,\n\
  code: /^(`+)\\s*([\\s\\S]*?[^`])\\s*\\1(?!`)/,\n\
  br: /^ {2,}\\n\
(?!\\s*$)/,\n\
  del: noop,\n\
  text: /^[\\s\\S]+?(?=[\\\\<!\\[_*`]| {2,}\\n\
|$)/\n\
};\n\
\n\
inline._inside = /(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*/;\n\
inline._href = /\\s*<?([\\s\\S]*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*/;\n\
\n\
inline.link = replace(inline.link)\n\
  ('inside', inline._inside)\n\
  ('href', inline._href)\n\
  ();\n\
\n\
inline.reflink = replace(inline.reflink)\n\
  ('inside', inline._inside)\n\
  ();\n\
\n\
/**\n\
 * Normal Inline Grammar\n\
 */\n\
\n\
inline.normal = merge({}, inline);\n\
\n\
/**\n\
 * Pedantic Inline Grammar\n\
 */\n\
\n\
inline.pedantic = merge({}, inline.normal, {\n\
  strong: /^__(?=\\S)([\\s\\S]*?\\S)__(?!_)|^\\*\\*(?=\\S)([\\s\\S]*?\\S)\\*\\*(?!\\*)/,\n\
  em: /^_(?=\\S)([\\s\\S]*?\\S)_(?!_)|^\\*(?=\\S)([\\s\\S]*?\\S)\\*(?!\\*)/\n\
});\n\
\n\
/**\n\
 * GFM Inline Grammar\n\
 */\n\
\n\
inline.gfm = merge({}, inline.normal, {\n\
  escape: replace(inline.escape)('])', '~|])')(),\n\
  url: /^(https?:\\/\\/[^\\s<]+[^<.,:;\"')\\]\\s])/,\n\
  del: /^~~(?=\\S)([\\s\\S]*?\\S)~~/,\n\
  text: replace(inline.text)\n\
    (']|', '~]|')\n\
    ('|', '|https?://|')\n\
    ()\n\
});\n\
\n\
/**\n\
 * GFM + Line Breaks Inline Grammar\n\
 */\n\
\n\
inline.breaks = merge({}, inline.gfm, {\n\
  br: replace(inline.br)('{2,}', '*')(),\n\
  text: replace(inline.gfm.text)('{2,}', '*')()\n\
});\n\
\n\
/**\n\
 * Inline Lexer & Compiler\n\
 */\n\
\n\
function InlineLexer(links, options) {\n\
  this.options = options || marked.defaults;\n\
  this.links = links;\n\
  this.rules = inline.normal;\n\
\n\
  if (!this.links) {\n\
    throw new\n\
      Error('Tokens array requires a `links` property.');\n\
  }\n\
\n\
  if (this.options.gfm) {\n\
    if (this.options.breaks) {\n\
      this.rules = inline.breaks;\n\
    } else {\n\
      this.rules = inline.gfm;\n\
    }\n\
  } else if (this.options.pedantic) {\n\
    this.rules = inline.pedantic;\n\
  }\n\
}\n\
\n\
/**\n\
 * Expose Inline Rules\n\
 */\n\
\n\
InlineLexer.rules = inline;\n\
\n\
/**\n\
 * Static Lexing/Compiling Method\n\
 */\n\
\n\
InlineLexer.output = function(src, links, options) {\n\
  var inline = new InlineLexer(links, options);\n\
  return inline.output(src);\n\
};\n\
\n\
/**\n\
 * Lexing/Compiling\n\
 */\n\
\n\
InlineLexer.prototype.output = function(src) {\n\
  var out = ''\n\
    , link\n\
    , text\n\
    , href\n\
    , cap;\n\
\n\
  while (src) {\n\
    // escape\n\
    if (cap = this.rules.escape.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += cap[1];\n\
      continue;\n\
    }\n\
\n\
    // autolink\n\
    if (cap = this.rules.autolink.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      if (cap[2] === '@') {\n\
        text = cap[1].charAt(6) === ':'\n\
          ? this.mangle(cap[1].substring(7))\n\
          : this.mangle(cap[1]);\n\
        href = this.mangle('mailto:') + text;\n\
      } else {\n\
        text = escape(cap[1]);\n\
        href = text;\n\
      }\n\
      out += '<a href=\"'\n\
        + href\n\
        + '\">'\n\
        + text\n\
        + '</a>';\n\
      continue;\n\
    }\n\
\n\
    // url (gfm)\n\
    if (cap = this.rules.url.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      text = escape(cap[1]);\n\
      href = text;\n\
      out += '<a href=\"'\n\
        + href\n\
        + '\">'\n\
        + text\n\
        + '</a>';\n\
      continue;\n\
    }\n\
\n\
    // tag\n\
    if (cap = this.rules.tag.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += this.options.sanitize\n\
        ? escape(cap[0])\n\
        : cap[0];\n\
      continue;\n\
    }\n\
\n\
    // link\n\
    if (cap = this.rules.link.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += this.outputLink(cap, {\n\
        href: cap[2],\n\
        title: cap[3]\n\
      });\n\
      continue;\n\
    }\n\
\n\
    // reflink, nolink\n\
    if ((cap = this.rules.reflink.exec(src))\n\
        || (cap = this.rules.nolink.exec(src))) {\n\
      src = src.substring(cap[0].length);\n\
      link = (cap[2] || cap[1]).replace(/\\s+/g, ' ');\n\
      link = this.links[link.toLowerCase()];\n\
      if (!link || !link.href) {\n\
        out += cap[0].charAt(0);\n\
        src = cap[0].substring(1) + src;\n\
        continue;\n\
      }\n\
      out += this.outputLink(cap, link);\n\
      continue;\n\
    }\n\
\n\
    // strong\n\
    if (cap = this.rules.strong.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += '<strong>'\n\
        + this.output(cap[2] || cap[1])\n\
        + '</strong>';\n\
      continue;\n\
    }\n\
\n\
    // em\n\
    if (cap = this.rules.em.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += '<em>'\n\
        + this.output(cap[2] || cap[1])\n\
        + '</em>';\n\
      continue;\n\
    }\n\
\n\
    // code\n\
    if (cap = this.rules.code.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
\n\
      out += '<code' \n\
      + (this.options.color ? ' style=\"margin:0 0.1em;padding:0 0.2em;background-color:#f8f8f8;border:1px solid #eaeaea;border-radius:3px;\"':'')\n\
        + '>'\n\
        + escape(cap[2], true)\n\
        + '</code>';\n\
      continue;\n\
    }\n\
\n\
    // br\n\
    if (cap = this.rules.br.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += '<br>';\n\
      continue;\n\
    }\n\
\n\
    // del (gfm)\n\
    if (cap = this.rules.del.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += '<del>'\n\
        + this.output(cap[1])\n\
        + '</del>';\n\
      continue;\n\
    }\n\
\n\
    // text\n\
    if (cap = this.rules.text.exec(src)) {\n\
      src = src.substring(cap[0].length);\n\
      out += escape(this.smartypants(cap[0]));\n\
      continue;\n\
    }\n\
\n\
    if (src) {\n\
      throw new\n\
        Error('Infinite loop on byte: ' + src.charCodeAt(0));\n\
    }\n\
  }\n\
\n\
  return out;\n\
};\n\
\n\
/**\n\
 * Compile Link\n\
 */\n\
\n\
InlineLexer.prototype.outputLink = function(cap, link) {\n\
  if (cap[0].charAt(0) !== '!') {\n\
    return '<a href=\"'\n\
      + escape(link.href)\n\
      + '\"'\n\
      + (link.title\n\
      ? ' title=\"'\n\
      + escape(link.title)\n\
      + '\"'\n\
      : '')\n\
      + '>'\n\
      + this.output(cap[1])\n\
      + '</a>';\n\
  } else {\n\
    return '<img src=\"'\n\
      + escape(link.href)\n\
      + '\" alt=\"'\n\
      + escape(cap[1])\n\
      + '\"'\n\
      + (link.title\n\
      ? ' title=\"'\n\
      + escape(link.title)\n\
      + '\"'\n\
      : '')\n\
      + '>';\n\
  }\n\
};\n\
\n\
/**\n\
 * Smartypants Transformations\n\
 */\n\
\n\
InlineLexer.prototype.smartypants = function(text) {\n\
  if (!this.options.smartypants) return text;\n\
  return text\n\
    // em-dashes\n\
    .replace(/--/g, '\\u2014')\n\
    // opening singles\n\
    .replace(/(^|[-\\u2014/(\\[{\"\\s])'/g, '$1\\u2018')\n\
    // closing singles & apostrophes\n\
    .replace(/'/g, '\\u2019')\n\
    // opening doubles\n\
    .replace(/(^|[-\\u2014/(\\[{\\u2018\\s])\"/g, '$1\\u201c')\n\
    // closing doubles\n\
    .replace(/\"/g, '\\u201d')\n\
    // ellipses\n\
    .replace(/\\.{3}/g, '\\u2026');\n\
};\n\
\n\
/**\n\
 * Mangle Links\n\
 */\n\
\n\
InlineLexer.prototype.mangle = function(text) {\n\
  var out = ''\n\
    , l = text.length\n\
    , i = 0\n\
    , ch;\n\
\n\
  for (; i < l; i++) {\n\
    ch = text.charCodeAt(i);\n\
    if (Math.random() > 0.5) {\n\
      ch = 'x' + ch.toString(16);\n\
    }\n\
    out += '&#' + ch + ';';\n\
  }\n\
\n\
  return out;\n\
};\n\
\n\
/**\n\
 * Parsing & Compiling\n\
 */\n\
\n\
function Parser(options) {\n\
  this.tokens = [];\n\
  this.token = null;\n\
  this.options = options || marked.defaults;\n\
}\n\
\n\
/**\n\
 * Static Parse Method\n\
 */\n\
\n\
Parser.parse = function(src, options) {\n\
  var parser = new Parser(options);\n\
  return parser.parse(src);\n\
};\n\
\n\
/**\n\
 * Parse Loop\n\
 */\n\
\n\
Parser.prototype.parse = function(src) {\n\
  this.inline = new InlineLexer(src.links, this.options);\n\
  this.tokens = src.reverse();\n\
\n\
  var out = '';\n\
  while (this.next()) {\n\
    out += this.tok();\n\
  }\n\
\n\
  return out;\n\
};\n\
\n\
/**\n\
 * Next Token\n\
 */\n\
\n\
Parser.prototype.next = function() {\n\
  return this.token = this.tokens.pop();\n\
};\n\
\n\
/**\n\
 * Preview Next Token\n\
 */\n\
\n\
Parser.prototype.peek = function() {\n\
  return this.tokens[this.tokens.length - 1] || 0;\n\
};\n\
\n\
/**\n\
 * Parse Text Tokens\n\
 */\n\
\n\
Parser.prototype.parseText = function() {\n\
  var body = this.token.text;\n\
\n\
  while (this.peek().type === 'text') {\n\
    body += '\\n\
' + this.next().text;\n\
  }\n\
\n\
  return this.inline.output(body);\n\
};\n\
\n\
/**\n\
 * Parse Current Token\n\
 */\n\
\n\
Parser.prototype.tok = function() {\n\
  switch (this.token.type) {\n\
    case 'space': {\n\
      return '';\n\
    }\n\
    case 'hr': {\n\
      return '<hr>\\n\
';\n\
    }\n\
    case 'heading': {\n\
      return '<h'\n\
        + this.token.depth\n\
        + ' id=\"'\n\
        + this.token.text.toLowerCase().replace(/[^\\w]+/g, '-')\n\
        + '\">'\n\
        + this.inline.output(this.token.text)\n\
        + '</h'\n\
        + this.token.depth\n\
        + '>\\n\
';\n\
    }\n\
    case 'code': {\n\
      var highlight = this.options.highlight;\n\
      if (highlight) {\n\
        var code = highlight(this.token.text, this.token.lang, this.options.color, this.options.colorscheme);\n\
        if (code != null && code !== this.token.text) {\n\
          this.token.escaped = true;\n\
          this.token.text = code;\n\
        }\n\
      }\n\
      if (!this.token.escaped) {\n\
        this.token.text = escape(this.token.text, true);\n\
      }\n\
      if(/^<pre>/.test(this.token.text)){\n\
        return this.token.text;\n\
      }\n\
\n\
      return '<pre><code'\n\
        + (this.token.lang\n\
        ? ' class=\"'\n\
        + this.options.langPrefix\n\
        + this.token.lang\n\
        + '\"'\n\
        : '')\n\
        + '>'\n\
        + this.token.text\n\
        + '</code></pre>\\n\
';\n\
    }\n\
    case 'table': {\n\
      var body = ''\n\
        , heading\n\
        , i\n\
        , row\n\
        , cell\n\
        , j;\n\
\n\
      // header\n\
      body += '<thead>\\n\
<tr>\\n\
';\n\
      for (i = 0; i < this.token.header.length; i++) {\n\
        heading = this.inline.output(this.token.header[i]);\n\
        body += '<th';\n\
        if (this.token.align[i]) {\n\
          body += ' style=\"text-align:' + this.token.align[i] + '\"';\n\
        }\n\
        body += '>' + heading + '</th>\\n\
';\n\
      }\n\
      body += '</tr>\\n\
</thead>\\n\
';\n\
\n\
      // body\n\
      body += '<tbody>\\n\
'\n\
      for (i = 0; i < this.token.cells.length; i++) {\n\
        row = this.token.cells[i];\n\
        body += '<tr>\\n\
';\n\
        for (j = 0; j < row.length; j++) {\n\
          cell = this.inline.output(row[j]);\n\
          body += '<td';\n\
          if (this.token.align[j]) {\n\
            body += ' style=\"text-align:' + this.token.align[j] + '\"';\n\
          }\n\
          body += '>' + cell + '</td>\\n\
';\n\
        }\n\
        body += '</tr>\\n\
';\n\
      }\n\
      body += '</tbody>\\n\
';\n\
\n\
      return '<table>\\n\
'\n\
        + body\n\
        + '</table>\\n\
';\n\
    }\n\
    case 'blockquote_start': {\n\
      var body = '';\n\
\n\
      while (this.next().type !== 'blockquote_end') {\n\
        body += this.tok();\n\
      }\n\
\n\
      return '<blockquote>\\n\
'\n\
        + body\n\
        + '</blockquote>\\n\
';\n\
    }\n\
    case 'list_start': {\n\
      var type = this.token.ordered ? 'ol' : 'ul'\n\
        , body = '';\n\
\n\
      while (this.next().type !== 'list_end') {\n\
        body += this.tok();\n\
      }\n\
\n\
      return '<'\n\
        + type\n\
        + '>\\n\
'\n\
        + body\n\
        + '</'\n\
        + type\n\
        + '>\\n\
';\n\
    }\n\
    case 'list_item_start': {\n\
      var body = '';\n\
\n\
      while (this.next().type !== 'list_item_end') {\n\
        body += this.token.type === 'text'\n\
          ? this.parseText()\n\
          : this.tok();\n\
      }\n\
\n\
      return '<li>'\n\
        + body\n\
        + '</li>\\n\
';\n\
    }\n\
    case 'loose_item_start': {\n\
      var body = '';\n\
\n\
      while (this.next().type !== 'list_item_end') {\n\
        body += this.tok();\n\
      }\n\
\n\
      return '<li>'\n\
        + body\n\
        + '</li>\\n\
';\n\
    }\n\
    case 'html': {\n\
      return !this.token.pre && !this.options.pedantic\n\
        ? this.inline.output(this.token.text)\n\
        : this.token.text;\n\
    }\n\
    case 'paragraph': {\n\
      return '<p>'\n\
        + this.inline.output(this.token.text)\n\
        + '</p>\\n\
';\n\
    }\n\
    case 'text': {\n\
      return '<p>'\n\
        + this.parseText()\n\
        + '</p>\\n\
';\n\
    }\n\
  }\n\
};\n\
\n\
/**\n\
 * Helpers\n\
 */\n\
\n\
function escape(html, encode) {\n\
  return html\n\
    .replace(!encode ? /&(?!#?\\w+;)/g : /&/g, '&amp;')\n\
    .replace(/</g, '&lt;')\n\
    .replace(/>/g, '&gt;')\n\
    .replace(/\"/g, '&quot;')\n\
    .replace(/'/g, '&#39;');\n\
}\n\
\n\
function replace(regex, opt) {\n\
  regex = regex.source;\n\
  opt = opt || '';\n\
  return function self(name, val) {\n\
    if (!name) return new RegExp(regex, opt);\n\
    val = val.source || val;\n\
    val = val.replace(/(^|[^\\[])\\^/g, '$1');\n\
    regex = regex.replace(name, val);\n\
    return self;\n\
  };\n\
}\n\
\n\
function noop() {}\n\
noop.exec = noop;\n\
\n\
function merge(obj) {\n\
  var i = 1\n\
    , target\n\
    , key;\n\
\n\
  for (; i < arguments.length; i++) {\n\
    target = arguments[i];\n\
    for (key in target) {\n\
      if (Object.prototype.hasOwnProperty.call(target, key)) {\n\
        obj[key] = target[key];\n\
      }\n\
    }\n\
  }\n\
  return obj;\n\
}\n\
\n\
\n\
/**\n\
 * Marked\n\
 */\n\
\n\
function marked(src, opt, callback) {\n\
  if (callback || typeof opt === 'function') {\n\
    if (!callback) {\n\
      callback = opt;\n\
      opt = null;\n\
    }\n\
\n\
    opt = merge({}, marked.defaults, opt || {});\n\
\n\
    var highlight = opt.highlight\n\
      , tokens\n\
      , pending\n\
      , i = 0;\n\
\n\
    try {\n\
      tokens = Lexer.lex(src, opt)\n\
    } catch (e) {\n\
      return callback(e);\n\
    }\n\
\n\
    pending = tokens.length;\n\
\n\
    var done = function() {\n\
      var out, err;\n\
\n\
      try {\n\
        out = Parser.parse(tokens, opt);\n\
      } catch (e) {\n\
        err = e;\n\
      }\n\
\n\
      opt.highlight = highlight;\n\
\n\
      return err\n\
        ? callback(err)\n\
        : callback(null, out);\n\
    };\n\
\n\
    if (!highlight || highlight.length < 3) {\n\
      return done();\n\
    }\n\
\n\
    delete opt.highlight;\n\
\n\
    if (!pending) return done();\n\
\n\
    for (; i < tokens.length; i++) {\n\
      (function(token) {\n\
        if (token.type !== 'code') {\n\
          return --pending || done();\n\
        }\n\
        return highlight(token.text, token.lang, function(err, code) {\n\
          if (code == null || code === token.text) {\n\
            return --pending || done();\n\
          }\n\
          token.text = code;\n\
          token.escaped = true;\n\
          --pending || done();\n\
        });\n\
      })(tokens[i]);\n\
    }\n\
\n\
    return;\n\
  }\n\
  try {\n\
    if (opt) opt = merge({}, marked.defaults, opt);\n\
    return Parser.parse(Lexer.lex(src, opt), opt);\n\
  } catch (e) {\n\
    e.message += '\\n\
Please report this to https://github.com/chjj/marked.';\n\
    if ((opt || marked.defaults).silent) {\n\
      return '<p>An error occured:</p><pre>'\n\
        + escape(e.message + '', true)\n\
        + '</pre>';\n\
    }\n\
    throw e;\n\
  }\n\
}\n\
\n\
/**\n\
 * Options\n\
 */\n\
\n\
marked.options =\n\
marked.setOptions = function(opt) {\n\
  merge(marked.defaults, opt);\n\
  return marked;\n\
};\n\
\n\
function langConvert(lang){\n\
  lang = (lang === \"js\" ? \"javascript\" : lang);\n\
  lang = (lang === \"md\" ? \"markdown\" : lang);\n\
  lang = (lang === \"html\" ? \"xml\" : lang);\n\
  return lang;\n\
}\n\
function highlight(code, lang, color, scheme){\n\
  if(!hljs){ return code; }\n\
  if(lang === undefined || !hljs.LANGUAGES[lang]){\n\
    lang = hljs.highlight('bash', code).language;\n\
    if(!lang) return code;\n\
  }\n\
  var html = hljs.highlight(lang, code).value;\n\
  if(color === true){\n\
      var parse = require(\"./style.js\").parse;\n\
      return parse(html, scheme);\n\
  }\n\
  return html;\n\
}\n\
\n\
marked.defaults = {\n\
  gfm: true,\n\
  tables: true,\n\
  breaks: false,\n\
  pedantic: false,\n\
  sanitize: false,\n\
  smartLists: false,\n\
  silent: false,\n\
  color: false,\n\
  colorscheme: 'solarized_light',\n\
  highlight: highlight,\n\
  langPrefix: 'language-',\n\
  smartypants: false\n\
};\n\
\n\
/**\n\
 * Expose\n\
 */\n\
\n\
marked.Parser = Parser;\n\
marked.parser = Parser.parse;\n\
\n\
marked.Lexer = Lexer;\n\
marked.lexer = Lexer.lex;\n\
\n\
marked.InlineLexer = InlineLexer;\n\
marked.inlineLexer = InlineLexer.output;\n\
\n\
marked.parse = marked;\n\
\n\
if (typeof exports === 'object') {\n\
  module.exports = marked;\n\
} else if (typeof define === 'function' && define.amd) {\n\
  define(function() { return marked; });\n\
} else {\n\
  this.marked = marked;\n\
}\n\
\n\
}).call(function() {\n\
  return this || (typeof window !== 'undefined' ? window : global);\n\
}());\n\
//@ sourceURL=marked/lib/marked.js"
));
require.alias("chemzqm-highlight.js/index.js", "marked/deps/highlight.js/index.js");
require.alias("chemzqm-highlight.js/lib/1c.js", "marked/deps/highlight.js/lib/1c.js");
require.alias("chemzqm-highlight.js/lib/actionscript.js", "marked/deps/highlight.js/lib/actionscript.js");
require.alias("chemzqm-highlight.js/lib/apache.js", "marked/deps/highlight.js/lib/apache.js");
require.alias("chemzqm-highlight.js/lib/applescript.js", "marked/deps/highlight.js/lib/applescript.js");
require.alias("chemzqm-highlight.js/lib/avrasm.js", "marked/deps/highlight.js/lib/avrasm.js");
require.alias("chemzqm-highlight.js/lib/axapta.js", "marked/deps/highlight.js/lib/axapta.js");
require.alias("chemzqm-highlight.js/lib/bash.js", "marked/deps/highlight.js/lib/bash.js");
require.alias("chemzqm-highlight.js/lib/brainfuck.js", "marked/deps/highlight.js/lib/brainfuck.js");
require.alias("chemzqm-highlight.js/lib/clojure.js", "marked/deps/highlight.js/lib/clojure.js");
require.alias("chemzqm-highlight.js/lib/cmake.js", "marked/deps/highlight.js/lib/cmake.js");
require.alias("chemzqm-highlight.js/lib/coffeescript.js", "marked/deps/highlight.js/lib/coffeescript.js");
require.alias("chemzqm-highlight.js/lib/cpp.js", "marked/deps/highlight.js/lib/cpp.js");
require.alias("chemzqm-highlight.js/lib/cs.js", "marked/deps/highlight.js/lib/cs.js");
require.alias("chemzqm-highlight.js/lib/css.js", "marked/deps/highlight.js/lib/css.js");
require.alias("chemzqm-highlight.js/lib/d.js", "marked/deps/highlight.js/lib/d.js");
require.alias("chemzqm-highlight.js/lib/delphi.js", "marked/deps/highlight.js/lib/delphi.js");
require.alias("chemzqm-highlight.js/lib/diff.js", "marked/deps/highlight.js/lib/diff.js");
require.alias("chemzqm-highlight.js/lib/django.js", "marked/deps/highlight.js/lib/django.js");
require.alias("chemzqm-highlight.js/lib/dos.js", "marked/deps/highlight.js/lib/dos.js");
require.alias("chemzqm-highlight.js/lib/erlang-repl.js", "marked/deps/highlight.js/lib/erlang-repl.js");
require.alias("chemzqm-highlight.js/lib/erlang.js", "marked/deps/highlight.js/lib/erlang.js");
require.alias("chemzqm-highlight.js/lib/glsl.js", "marked/deps/highlight.js/lib/glsl.js");
require.alias("chemzqm-highlight.js/lib/go.js", "marked/deps/highlight.js/lib/go.js");
require.alias("chemzqm-highlight.js/lib/haskell.js", "marked/deps/highlight.js/lib/haskell.js");
require.alias("chemzqm-highlight.js/lib/highlight.js", "marked/deps/highlight.js/lib/highlight.js");
require.alias("chemzqm-highlight.js/lib/http.js", "marked/deps/highlight.js/lib/http.js");
require.alias("chemzqm-highlight.js/lib/ini.js", "marked/deps/highlight.js/lib/ini.js");
require.alias("chemzqm-highlight.js/lib/java.js", "marked/deps/highlight.js/lib/java.js");
require.alias("chemzqm-highlight.js/lib/javascript.js", "marked/deps/highlight.js/lib/javascript.js");
require.alias("chemzqm-highlight.js/lib/json.js", "marked/deps/highlight.js/lib/json.js");
require.alias("chemzqm-highlight.js/lib/lisp.js", "marked/deps/highlight.js/lib/lisp.js");
require.alias("chemzqm-highlight.js/lib/lua.js", "marked/deps/highlight.js/lib/lua.js");
require.alias("chemzqm-highlight.js/lib/markdown.js", "marked/deps/highlight.js/lib/markdown.js");
require.alias("chemzqm-highlight.js/lib/matlab.js", "marked/deps/highlight.js/lib/matlab.js");
require.alias("chemzqm-highlight.js/lib/mel.js", "marked/deps/highlight.js/lib/mel.js");
require.alias("chemzqm-highlight.js/lib/nginx.js", "marked/deps/highlight.js/lib/nginx.js");
require.alias("chemzqm-highlight.js/lib/objectivec.js", "marked/deps/highlight.js/lib/objectivec.js");
require.alias("chemzqm-highlight.js/lib/parser3.js", "marked/deps/highlight.js/lib/parser3.js");
require.alias("chemzqm-highlight.js/lib/perl.js", "marked/deps/highlight.js/lib/perl.js");
require.alias("chemzqm-highlight.js/lib/php.js", "marked/deps/highlight.js/lib/php.js");
require.alias("chemzqm-highlight.js/lib/profile.js", "marked/deps/highlight.js/lib/profile.js");
require.alias("chemzqm-highlight.js/lib/python.js", "marked/deps/highlight.js/lib/python.js");
require.alias("chemzqm-highlight.js/lib/r.js", "marked/deps/highlight.js/lib/r.js");
require.alias("chemzqm-highlight.js/lib/rib.js", "marked/deps/highlight.js/lib/rib.js");
require.alias("chemzqm-highlight.js/lib/rsl.js", "marked/deps/highlight.js/lib/rsl.js");
require.alias("chemzqm-highlight.js/lib/ruby.js", "marked/deps/highlight.js/lib/ruby.js");
require.alias("chemzqm-highlight.js/lib/rust.js", "marked/deps/highlight.js/lib/rust.js");
require.alias("chemzqm-highlight.js/lib/scala.js", "marked/deps/highlight.js/lib/scala.js");
require.alias("chemzqm-highlight.js/lib/smalltalk.js", "marked/deps/highlight.js/lib/smalltalk.js");
require.alias("chemzqm-highlight.js/lib/sql.js", "marked/deps/highlight.js/lib/sql.js");
require.alias("chemzqm-highlight.js/lib/tex.js", "marked/deps/highlight.js/lib/tex.js");
require.alias("chemzqm-highlight.js/lib/vala.js", "marked/deps/highlight.js/lib/vala.js");
require.alias("chemzqm-highlight.js/lib/vbscript.js", "marked/deps/highlight.js/lib/vbscript.js");
require.alias("chemzqm-highlight.js/lib/vhdl.js", "marked/deps/highlight.js/lib/vhdl.js");
require.alias("chemzqm-highlight.js/lib/xml.js", "marked/deps/highlight.js/lib/xml.js");
require.alias("chemzqm-highlight.js/index.js", "marked/deps/highlight.js/index.js");
require.alias("chemzqm-highlight.js/index.js", "highlight.js/index.js");
require.alias("chemzqm-highlight.js/index.js", "chemzqm-highlight.js/index.js");
require.alias("marked/lib/marked.js", "marked/index.js");