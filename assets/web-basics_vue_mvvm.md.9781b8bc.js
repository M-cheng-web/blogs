import{_ as o,c as l,a as e,t as c,b as a,d,o as s}from"./app.502a3a89.js";const G=JSON.parse('{"title":"MVVM\u603B\u7ED3","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7B80\u4ECB","slug":"\u7B80\u4ECB","link":"#\u7B80\u4ECB","children":[]},{"level":2,"title":"\u9879\u76EE\u8FD0\u884C","slug":"\u9879\u76EE\u8FD0\u884C","link":"#\u9879\u76EE\u8FD0\u884C","children":[]},{"level":2,"title":"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","slug":"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","link":"#\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","children":[]},{"level":2,"title":"\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58?","slug":"\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58","link":"#\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58","children":[]},{"level":2,"title":"\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","slug":"\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","link":"#\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","children":[{"level":3,"title":"Object.defineProperty","slug":"object-defineproperty","link":"#object-defineproperty","children":[]},{"level":3,"title":"Watcher","slug":"watcher","link":"#watcher","children":[]},{"level":3,"title":"dep\u4F9D\u8D56\u6536\u96C6\u5668","slug":"dep\u4F9D\u8D56\u6536\u96C6\u5668","link":"#dep\u4F9D\u8D56\u6536\u96C6\u5668","children":[]},{"level":3,"title":"\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","slug":"\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","link":"#\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","children":[]},{"level":3,"title":"targetStack","slug":"targetstack","link":"#targetstack","children":[]}]},{"level":2,"title":"\u5404\u4E2A\u6A21\u5757\u89E3\u6790","slug":"\u5404\u4E2A\u6A21\u5757\u89E3\u6790","link":"#\u5404\u4E2A\u6A21\u5757\u89E3\u6790","children":[{"level":3,"title":"index.js","slug":"index-js","link":"#index-js","children":[]},{"level":3,"title":"observer.js","slug":"observer-js","link":"#observer-js","children":[]},{"level":3,"title":"computed.js","slug":"computed-js","link":"#computed-js","children":[]},{"level":3,"title":"watcher.js","slug":"watcher-js","link":"#watcher-js","children":[]},{"level":3,"title":"watch.js","slug":"watch-js","link":"#watch-js","children":[]},{"level":3,"title":"compile.js","slug":"compile-js","link":"#compile-js","children":[]}]}],"relativePath":"web-basics/vue/mvvm.md","lastUpdated":null}'),r={name:"web-basics/vue/mvvm.md"},n=d('<h1 id="mvvm\u603B\u7ED3" tabindex="-1">MVVM\u603B\u7ED3 <a class="header-anchor" href="#mvvm\u603B\u7ED3" aria-hidden="true">#</a></h1><p>\u4EE3\u7801\u5B9E\u73B0\u5730\u5740: <a href="https://github.com/M-cheng-web/vue-sound-mvvm" target="_blank" rel="noreferrer">https://github.com/M-cheng-web/vue-sound-mvvm</a></p><h2 id="\u7B80\u4ECB" tabindex="-1">\u7B80\u4ECB <a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a></h2><p>\u8FD9\u5957\u4EE3\u7801\u7B80\u5355\u5B9E\u73B0\u4E86 vue\u6846\u67B6\u7684\u53CC\u5411\u7ED1\u5B9A\u6838\u5FC3\u529F\u80FD<br> \u5B9E\u73B0\u529F\u80FD\u70B9:</p>',4),p=e("li",null,"\u6A21\u62DF Vue,\u901A\u8FC7\u521B\u5EFA Vue\u5B9E\u4F8B\u5BF9\u8C61\u7684\u65B9\u5F0F\u5B8C\u6210\u6570\u636E\u7684\u6E32\u67D3\u4EE5\u53CA\u53CC\u5411\u7ED1\u5B9A\u7684\u914D\u7F6E",-1),i=e("li",null,"watch\u76D1\u542C(\u53EF\u4EE5\u62FF\u5230\u65B0\u503C\u65E7\u503C)",-1),h=e("li",null,"data\u503C\u6E32\u67D3\u9875\u9762",-1),u=e("li",null,"computed\u5C5E\u6027\u6E32\u67D3\u5230\u9875\u9762",-1),b=e("li",null,"computed\u5C5E\u6027\u7F13\u5B58",-1),_=e("li",null,"computed\u5C5E\u6027\u6CA1\u7528\u5230\u65F6\u4E0D\u4F1A\u8BA1\u7B97",-1),D=e("li",null,"computed\u5C5E\u6027\u4F9D\u8D56\u4E8E\u591A\u91CD\u5C5E\u6027(\u8BA1\u7B97\u5C5E\u6027A = \u8BA1\u7B97\u5C5E\u6027B + dataA, \u8BA1\u7B97\u5C5E\u6027B = dataB + dataC)",-1),v=e("li",null,"methods\u65B9\u6CD5",-1),m=e("h2",{id:"\u9879\u76EE\u8FD0\u884C",tabindex:"-1"},[a("\u9879\u76EE\u8FD0\u884C "),e("a",{class:"header-anchor",href:"#\u9879\u76EE\u8FD0\u884C","aria-hidden":"true"},"#")],-1),g=e("ol",null,[e("li",null,[a("vscode\u5185\u4E0B\u8F7D"),e("code",null,"Live Server"),a("\u63D2\u4EF6")]),e("li",null,[a("\u9879\u76EE\u62C9\u5230\u672C\u5730\u540E\u70B9\u5F00 www => index.html,\u53F3\u952E\u9009\u62E9"),e("code",null,"Open With Live Server")])],-1),w=e("h2",{id:"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32",tabindex:"-1"},[a("\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32 "),e("a",{class:"header-anchor",href:"#\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","aria-hidden":"true"},"#")],-1),A=e("br",null,null,-1),y=e("br",null,null,-1),C=e("br",null,null,-1),j=e("a",{href:"https://github.com/M-cheng-web/vue-sound-mustache",target:"_blank",rel:"noreferrer"},"https://github.com/M-cheng-web/vue-sound-mustache",-1),k=d('<h2 id="\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58" tabindex="-1">\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58? <a class="header-anchor" href="#\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58" aria-hidden="true">#</a></h2><p>\u4F8B\u5982\u5F53A\u8BA1\u7B97\u5C5E\u6027 = B\u8BA1\u7B97\u5C5E\u6027 + C\u8BA1\u7B97\u5C5E\u6027, \u800CC\u8BA1\u7B97\u5C5E\u6027 = dataA + dataB<br> \u5982\u679CC\u8BA1\u7B97\u5C5E\u6027\u5148\u4E8EA\u8BA1\u7B97\u5C5E\u6027\u6267\u884C,\u90A3\u4E48\u8FD0\u7B97A\u8BA1\u7B97\u5C5E\u6027\u7684\u65F6\u5019\u5E76\u4E0D\u4F1A\u518D\u6B21\u53BB\u8FD0\u7B97C\u8BA1\u7B97\u5C5E\u6027,\u800C\u662F\u53BB\u62FF\u5B83\u7684\u7F13\u5B58(\u9664\u975E\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u4E2DdataA\u6216\u8005dataB\u53D1\u751F\u6539\u53D8)<br> \u5982\u679CA\u8BA1\u7B97\u5C5E\u6027\u5148\u4E8EC\u8BA1\u7B97\u5C5E\u6027\u6267\u884C,\u90A3\u4E48\u8FD0\u7B97A\u8BA1\u7B97\u5C5E\u6027\u7684\u65F6\u5019\u4F1A\u53BB\u8FD0\u7B97C\u8BA1\u7B97\u5C5E\u6027,\u5F53\u5176\u4ED6\u5730\u65B9\u7528\u5230C\u7684\u65F6\u5019\u540C\u6837\u4E5F\u4F1A\u53BB\u62FFC\u7684\u7F13\u5B58,\u800C\u4E0D\u662F\u518D\u6B21\u8FD0\u7B97(\u9664\u975EdataA\u6216\u8005dataB\u53D1\u751F\u6539\u53D8)<br></p><h2 id="\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3" tabindex="-1">\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3 <a class="header-anchor" href="#\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3" aria-hidden="true">#</a></h2><h3 id="object-defineproperty" tabindex="-1">Object.defineProperty <a class="header-anchor" href="#object-defineproperty" aria-hidden="true">#</a></h3><p>\u8FD9\u4E2A\u5C31\u662F\u57FA\u7840\u539F\u7406,\u4E86\u89E3 <code>api</code> \u540E\u6211\u4EEC\u80FD\u77E5\u9053\u4F9D\u8D56\u4E8E\u8FD9\u4E2A\u80FD\u8BA9\u6211\u4EEC\u77E5\u9053\u67D0\u4E2A\u503C\u4F9D\u8D56\u4E8E\u67D0\u4E9B\u503C,\u7136\u540E\u624D\u80FD\u8BA9\u6211\u4EEC\u62FF\u5230\u4F9D\u8D56\u7684\u503C\u63A5\u7740\u518D\u505A\u4E00\u4E9B\u4F9D\u8D56\u9879\u7684\u7ED1\u5B9A</p><p>\u5728\u5B9E\u9645\u8FD0\u7528\u4E2D,\u6211\u4EEC\u4F1A\u7ED9 <code>data</code> \u5185\u7684\u6240\u6709\u503C\u4EE5\u53CA\u503C\u5185\u7684\u5BF9\u8C61\u90FD\u5957\u4E0A <code>Object.defineProperty</code> \u6765\u622A\u53D6\u5176 <code>get() set()</code>, <code>computed</code> \u4E5F\u4F1A\u5957\u4E0A\u7528\u6765\u622A\u53D6\u5176 <code>get()</code></p><h3 id="watcher" tabindex="-1">Watcher <a class="header-anchor" href="#watcher" aria-hidden="true">#</a></h3><p>\u53CC\u5411\u7ED1\u5B9A\u6838\u5FC3\u5BF9\u8C61<br> \u4E3B\u8981\u5B8C\u6210\u4EE5\u4E0B\u529F\u80FD:<br></p><ol><li>\u878D\u5408data,computed,watch\u9700\u8981\u7684\u529F\u80FD(\u6E32\u67D3,\u66F4\u6539,\u83B7\u53D6,\u7F13\u5B58)</li><li>\u751F\u6210\u6240\u6709\u503C\u7684\u5B9E\u4F8B\u5BF9\u8C61,\u5728\u67D0\u4E2A\u5C5E\u6027\u4F9D\u8D56\u5176\u4ED6\u5C5E\u6027\u65F6\u4F1A\u5C06\u5176\u5C5E\u6027\u7684watcher\u5B9E\u4F8B\u653E\u5165\u81EA\u8EAB,\u4EE5\u6B64\u6765\u5B9E\u73B0\u67E5\u627E\u529F\u80FD</li></ol><h3 id="dep\u4F9D\u8D56\u6536\u96C6\u5668" tabindex="-1">dep\u4F9D\u8D56\u6536\u96C6\u5668 <a class="header-anchor" href="#dep\u4F9D\u8D56\u6536\u96C6\u5668" aria-hidden="true">#</a></h3><p>\u6211\u4EEC\u90FD\u77E5\u9053\u901A\u8FC7 <code>Object.defineProperty</code> \u80FD\u8BA9\u6211\u4EEC\u77E5\u9053\u8C01\u7528\u5230\u4E86\u8FD9\u4E2A\u503C,\u53EF\u5177\u4F53\u5B9E\u73B0\u662F\u4F9D\u8D56\u4E8E <code>Dep</code> \u6784\u9020\u51FD\u6570\u7684,\u5185\u90E8\u5176\u5B9E\u5F88\u7B80\u5355, \u5C31\u53EA\u6709\u4E00\u4E2A <code>dep</code> \u6570\u7EC4\u5C5E\u6027,\u91CC\u9762\u4F1A\u5B58\u653E\u4F9D\u8D56\u4E8E\u8FD9\u4E2A\u503C\u7684 <code>watcher</code> \u5B9E\u4F8B,\u6253\u4E2A\u6BD4\u65B9: <code>a = b + c</code>,\u90A3\u4E48b\u7684 dep \u5185\u4F1A\u5B58\u653E\u7740 a \u7684watcher\u5B9E\u4F8B\u5BF9\u8C61</p><p>\u5728\u5B9E\u9645\u8FD0\u7528\u4E2D,\u6211\u4EEC\u4F1A\u7ED9\u6BCF\u4E2A <code>data</code>, <code>computed</code> \u5C5E\u6027\u90FD\u521B\u5EFA\u4E00\u4E2A <code>Dep</code> \u5B9E\u4F8B(\u5982\u679C\u67D0\u4E2Adata\u503C\u5185\u662F\u5BF9\u8C61\u4E5F\u4F1A\u7ED9\u5176\u521B\u5EFADep\u5B9E\u4F8B,\u4F1A\u4E00\u76F4\u9012\u5F52\u5230\u975E\u5BF9\u8C61\u7684\u5C5E\u6027),\u8FD9\u6837\u5728\u62E6\u622A\u5230\u67D0\u4E2A\u5C5E\u6027\u88AB <code>get</code> \u65F6,\u6211\u4EEC\u5C31\u53EF\u4EE5\u5229\u7528\u95ED\u5305\u539F\u7406,\u5728\u5176 <code>dep</code> \u6570\u7EC4\u4E2D\u52A0\u5165\u90A3\u4E2A\u8C03\u7528\u6B64\u5C5E\u6027\u7684 <code>watcher</code> \u5B9E\u4F8B</p><p>\u4EE5\u6B64\u5C31\u5B8C\u6210\u4E86\u4F9D\u8D56\u6536\u96C6\u7684\u4F5C\u7528,\u7136\u540E\u5728\u5F53\u67D0\u4E2A\u5C5E\u6027\u53D1\u751F\u53D8\u5316\u65F6,\u4F1A\u89E6\u53D1 <code>Object.defineProperty</code> \u7684 <code>set</code>,\u5185\u90E8\u4F1A\u5FAA\u73AF <code>dep</code> \u6570\u7EC4\u7528\u6765\u901A\u77E5\u4F9D\u8D56\u6B64\u503C\u7684 <code>watcher</code> \u5B9E\u4F8B\u5BF9\u8C61\u8981\u505A\u51FA\u52A8\u4F5C</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u4E3A\u4EC0\u4E48\u7528 Set \u7ED3\u6784\u6765\u9632\u6B62\u91CD\u590D?<br> \u4F8B\u5982\u6709\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027\u662F\u4F9D\u8D56\u4E8EdataA,\u7B2C\u4E00\u904D\u8BA1\u7B97\u51FA\u90A3\u4E24\u4E2A\u8BA1\u7B97\u5C5E\u6027\u65F6,dataA\u7684dep\u662F\u6536\u96C6\u4E86\u4ED6\u4FE9\u7684watcher \u4F46\u662F\u5F53\u5176\u4E2D\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\u91CD\u65B0\u8BA1\u7B97\u65F6(\u6BD4\u5982\u53E6\u5916\u4E00\u4E2A\u4F9D\u8D56\u9879\u6539\u52A8\u4E86\u4F1A\u5F71\u54CD\u6B64\u8BA1\u7B97\u5C5E\u6027\u91CD\u65B0\u8BA1\u7B97),\u4F1A\u518D\u6B21\u8C03\u53D6dataA \u7684get\u62E6\u622A,\u4E5F\u5C31\u662F\u4F1A\u518D\u6B21\u89E6\u53D1 dep.addSub(),\u5982\u679C\u4E0D\u52A0\u91CD\u590D\u8FC7\u6EE4\u8FD9\u6837\u7684\u573A\u666F\u4F1A\u4E00\u76F4\u9012\u589E\u4E0B\u53BB,\u7136\u540E\u5F53dataA\u53D1\u751F \u66F4\u6539\u65F6\u904D\u5386\u5176subs,\u5C4A\u65F6\u6709\u592A\u591A\u4E0D\u9700\u8981\u904D\u5386\u7684watcher,\u5F88\u5927\u6982\u7387\u5361\u6B7B</p></div><h3 id="\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808" tabindex="-1">\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808 <a class="header-anchor" href="#\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808" aria-hidden="true">#</a></h3><p><code>Dep</code> \u6784\u9020\u51FD\u6570\u6709\u4E00\u4E2A\u9759\u6001\u5C5E\u6027 <code>target</code></p><ul><li><p>\u4E3A\u4EC0\u4E48\u9700\u8981\u8FD9\u4E2A\u5C5E\u6027? \u5728\u4E0A\u9762\u6211\u4EEC\u8BB2\u5230 <code>Dep</code> \u662F\u4E13\u95E8\u7528\u6765\u6536\u96C6\u4F9D\u8D56\u7684,\u53EF\u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u8F7D\u4F53\u6765\u5148\u5B58\u50A8\u7740\u90A3\u4E2A\u9700\u8981\u88AB\u6536\u96C6\u7684 <code>watcher</code>, \u56E0\u4E3A\u6211\u4EEC\u5E76\u4E0D\u80FD\u505A\u5230\u5B9E\u65F6\u7684\u5B58\u50A8\u4F9D\u8D56,\u53EA\u80FD\u901A\u8FC7\u7B2C\u4E09\u65B9\u6765\u4E2D\u8F6C\u4E00\u4E0B( \u7C7B\u4F3C\u4E8E\u628A A\u503C\u8D4B\u503C\u7ED9B,\u9700\u8981C\u6765\u4E2D\u8F6C\u4E00\u4E0B )</p></li><li><p>\u4E3A\u4EC0\u4E48\u662F\u9759\u6001\u5C5E\u6027? \u56E0\u4E3A\u4FDD\u8BC1\u4E86\u5168\u5C40\u552F\u4E00</p></li><li><p>\u600E\u4E48\u53BB\u7BA1\u7406\u5B83? \u5047\u8BBE\u4E00\u4E2A\u573A\u666F: <code>\u8BA1\u7B97\u5C5E\u6027 A = \u8BA1\u7B97\u5C5E\u6027 B + \u666E\u901A\u5C5E\u6027 C</code> <code>\u8BA1\u7B97\u5C5E\u6027B = \u666E\u901A\u5C5E\u6027 D + \u666E\u901A\u5C5E\u6027 E</code></p></li></ul><p>\u6211\u4EEC\u5728\u5F97\u5230A\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u5C06A\u7684 <code>watcher</code> \u5BF9\u8C61\u5B58\u5165 <code>Dep.target</code>,\u7136\u540E\u521A\u521A\u5B58\u5165\u7684\u4F1A\u653E\u5230B\u548CC\u7684 <code>dep</code> \u6570\u7EC4\u4E2D(\u80AF\u5B9A\u4F1A\u5148\u8BA1\u7B97B,\u6211\u8FD9\u8FB9\u53EA\u662F\u5148\u8FD9\u6837\u6982\u62EC),\u76EE\u524D\u4E3A\u6B62\u90FD\u662F\u6CA1\u95EE\u9898\u7684,\u4F46\u662F,\u63A5\u7740\u5728\u5F97\u5230B\u7684\u8FC7\u7A0B\u4E2D, <code>Dep.target</code> \u4E2D\u653E\u7684\u8FD8\u662F A\u7684 <code>watcher</code> \u5BF9\u8C61,\u7136\u540E\u5728D\u548CE\u4E2D\u7684 <code>dep</code> \u6570\u7EC4\u4E2D\u653E\u5165, \u9884\u671F\u5E94\u8BE5\u662F\u5728D\u548CE\u4E2D\u7684 <code>dep</code> \u6570\u7EC4\u4E2D\u653E\u5165B\u7684 <code>wathcer</code> \u5BF9\u8C61</p><p>\u76F4\u63A5\u5C06 <code>Dep.target</code> \u66FF\u6362\u4E3AB\u7684 <code>watcher</code> \u5BF9\u8C61\u4E5F\u4E0D\u5408\u7406,\u90A3\u4E48\u5728\u540E\u7EED\u7684C\u7684 <code>dep</code> \u6570\u7EC4\u4E2D\u653E\u5165\u7684\u4E5F\u4F1A\u662FB\u7684 <code>watcher</code> \u5BF9\u8C61,\u9884\u671F\u4E5F\u5E94\u8BE5\u662F\u653E\u5165A\u7684</p><p>\u7ED3\u8BBA: \u8FD9\u5C31\u8981\u6C42\u6211\u4EEC\u6709\u4E00\u4E2A\u673A\u5236\u53EF\u4EE5\u5B58\u50A8 <code>Dep.target</code>,\u5728\u6211\u4EEC\u9700\u8981\u7684\u65F6\u5019\u7ED9\u51FA\u76EE\u6807\u5BF9\u8C61,\u5728\u4E0D\u9700\u8981\u7684\u65F6\u5019\u5C31\u5F39\u51FA\u5B83,\u90A3\u5C31\u662F\u6808\u7ED3\u6784<br> \u89E3\u51B3\u65B9\u6848: \u8FD8\u662F\u63A5\u7740\u4E0A\u9762\u7684\u4F8B\u5B50,\u5728\u5B58\u50A8 <code>Dep.target</code> \u4E4B\u524D,\u6211\u4EEC\u53EF\u4EE5\u5148\u5224\u65AD\u5F53\u524D <code>Dep.target</code> \u6709\u6CA1\u6709\u503C,\u5982\u679C\u6709\u503C\u7684\u8BDD\u4F1A\u5C06\u6B64\u503C\u4FDD\u5B58\u5230\u6808\u7ED3\u6784\u540E\u518D\u8FDB\u884C\u66FF\u6362,\u7528\u5B8C\u4E86\u4E4B\u540E\u518D\u66FF\u6362\u56DE\u6765</p><h3 id="targetstack" tabindex="-1">targetStack <a class="header-anchor" href="#targetstack" aria-hidden="true">#</a></h3><p>\u5BF9Dep.target\u9759\u6001\u5C5E\u6027\u64CD\u4F5C\u7684\u5C01\u88C5<br></p><p>\u5E94\u7528\u573A\u666F: A\u8BA1\u7B97\u5C5E\u6027 = B\u8BA1\u7B97\u5C5E\u6027 + C\u8BA1\u7B97\u5C5E\u6027, B\u8BA1\u7B97\u5C5E\u6027 = dataA + dataB, C\u8BA1\u7B97\u5C5E\u6027 = dataC + dataD<br> \u5728\u7B97A\u7684\u65F6\u5019\u4F1A\u5C06A\u7684watcher\u5B9E\u4F8B\u653E\u5165Dep.target,\u7136\u540E\u518D\u6267\u884CA\u7684\u83B7\u53D6\u503C\u7684\u65B9\u6CD5(B\u8BA1\u7B97\u5C5E\u6027 + C\u8BA1\u7B97\u5C5E\u6027)<br> \u5728\u7B97B\u7684\u65F6\u5019\u4F1A\u5C06\u5F53\u524DDep.target\u5B58\u7684\u503C\u653E\u5165B\u7684subs\u4E2D(\u4E5F\u5C31\u662F\u5B58\u50A8\u4E86A\u7684\u4F9D\u8D56,\u5728B\u53D8\u5316\u65F6\u4F1A\u80FD\u901A\u77E5\u5230A\u4E5F\u66F4\u65B0\u7684\u64CD\u4F5C)<br> \u7136\u540E\u5C06B\u7684watcher\u5B9E\u4F8B\u653E\u5165\u5168\u5C40\u7684Dep.target,\u6CE8\u610F,\u8FD9\u4E2A\u65F6\u5019\u5982\u679C\u76F4\u63A5\u66FF\u6362\u4F1A\u628A\u4E4B\u524D\u5B58\u5165Dep.target\u7684A\u7684watcher\u5B9E\u4F8B\u7ED9\u66FF\u6362\u6389<br> \u5728\u8BA1\u7B97(dataA + dataB)\u7684\u8FC7\u7A0B\u4E2D,\u8FD9\u4FE9\u4E2A\u503C\u90FD\u80FD\u6B63\u786E\u5B58\u50A8\u4F9D\u8D56\u4ED6\u4EEC\u7684\u503C<br> \u6700\u540E\u518D\u7B97C\u7684\u65F6\u5019,\u4E5F\u4F1A\u5C06\u5F53\u524DDep.target\u5B58\u7684\u503C\u653E\u5165C\u7684subs\u4E2D,\u4F46\u662F\u8FD9\u4E2A\u65F6\u5019Dep.target\u5B58\u7684\u662FB\u7684watcher,\u6309\u9053\u7406\u8FD9\u4E2A\u65F6\u5019Dep.target\u5E94\u8BE5\u5B58\u7684\u662F A\u7684watcher,\u8FD9\u6837C\u624D\u80FD\u77E5\u9053\u5F53C\u6539\u53D8\u7684\u65F6\u5019\u9700\u8981\u901A\u77E5A<br></p><p>\u7ED3\u8BBA: \u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u80FD\u81EA\u52A8\u63A7\u5236\u5F53\u524DDep.target\u503C\u7684\u7B97\u6CD5,\u4E14\u5F53\u524DDep.target\u6709\u503C\u7684\u65F6\u5019\u8981\u5B58\u50A8\u8D77\u6765,\u4E0D\u80FD\u76F4\u63A5\u66FF\u6362<br> \u89E3\u51B3: targetStack\u5229\u7528\u6808\u539F\u7406\u5F88\u597D\u7684\u89E3\u51B3\u4E86\u8FD9\u4E2A\u95EE\u9898</p><h2 id="\u5404\u4E2A\u6A21\u5757\u89E3\u6790" tabindex="-1">\u5404\u4E2A\u6A21\u5757\u89E3\u6790 <a class="header-anchor" href="#\u5404\u4E2A\u6A21\u5757\u89E3\u6790" aria-hidden="true">#</a></h2><h3 id="index-js" tabindex="-1">index.js <a class="header-anchor" href="#index-js" aria-hidden="true">#</a></h3><p>\u9879\u76EE\u5165\u53E3<br> MVVM\u5B9E\u4F8B\u5BF9\u8C61(\u4E0B\u9762\u7EDF\u79F0vue\u5B9E\u4F8B)\u7684\u521B\u5EFA,\u5728\u5B9E\u4F8B\u5316\u5BF9\u8C61\u4E2D\u4F1A\u521D\u59CB\u5316data,computed,watch<br> \u4F1A\u5C06data\u4E2D\u7684\u6240\u6709\u5C5E\u6027\u9644\u52A0\u5230vue\u5B9E\u4F8B\u4E0A,\u5E76\u4E0Edata\u4E2D\u6240\u6709\u5C5E\u6027\u4E92\u76F8\u7ED1\u5B9A(vue\u5B9E\u4F8B\u4E2D\u8FD9\u4E2A\u5C5E\u6027\u6539\u53D8\u4E5F\u4F1A\u89E6\u53D1data\u7684\u8FD9\u4E2A\u5C5E\u6027\u6539\u53D8)</p><h3 id="observer-js" tabindex="-1">observer.js <a class="header-anchor" href="#observer-js" aria-hidden="true">#</a></h3><p>\u4E3A\u6240\u6709data\u5C5E\u6027\u6DFB\u52A0\u54CD\u5E94\u5F0F<br> \u4F1A\u5728 <code>vue\u5B9E\u4F8B</code> \u4EE5\u53CA <code>vue\u5B9E\u4F8B.data</code> \u4E2D\u6302\u8F7D\u6240\u6709\u7684data\u503C<br> \u4E4B\u6240\u4EE5\u4E5F\u8981\u5728 <code>vue\u5B9E\u4F8B.data</code> \u6302\u8F7D\u662F\u56E0\u4E3A\u7A0B\u5E8F\u5185\u90E8\u5176\u4ED6\u5730\u65B9\u90FD\u662F\u901A\u8FC7 <code>data[key]</code> \u7684\u65B9\u5F0F\u8C03\u7528 data\u5C5E\u6027,\u5E76\u4E0D\u662F\u901A\u8FC7 <code>this[key]</code> \u7684\u65B9\u5F0F<br> \u901A\u8FC7 <code>this[key]</code> \u7684\u65B9\u5F0F\u6700\u7EC8\u90FD\u4F1A\u8F6C\u79FB\u5230 <code>this.data[key]</code> \u4E2D</p><h3 id="computed-js" tabindex="-1">computed.js <a class="header-anchor" href="#computed-js" aria-hidden="true">#</a></h3><p>\u4E3A\u6240\u6709computed\u5C5E\u6027\u6DFB\u52A0\u54CD\u5E94\u5F0F<br></p><p>\u7279\u6027:</p><ol><li>\u6CA1\u6709\u8C03\u7528\u7684\u65F6\u5019\u4E0D\u4F1A\u6267\u884C\u5185\u90E8\u65B9\u6CD5</li><li>\u6709\u7F13\u5B58,\u91CD\u590D\u8C03\u7528\u4F1A\u76F4\u63A5\u53D6\u5176\u7F13\u5B58\u503C</li><li>\u8BA1\u7B97\u5C5E\u6027\u7684\u4F9D\u8D56\u503C\u53D1\u751F\u66F4\u6539\u540E\u4E0D\u4F1A\u7ACB\u523B\u91CD\u65B0\u8FD0\u7B97\u8FD9\u4E2A\u8BA1\u7B97\u5C5E\u6027,\u800C\u662F\u7B49\u9700\u8981\u5B83\u7684\u65F6\u5019\u624D\u4F1A\u518D\u6B21\u6267\u884C(\u5982\u679C\u662F\u5728DOM\u4E0A\u7684\u8BA1\u7B97\u5C5E\u6027\u5C31\u4F1A\u7ACB\u523B\u91CD\u65B0\u8FD0\u7B97)</li></ol><p>\u5728\u4E3A\u6240\u6709computed\u5C5E\u6027\u751F\u6210watcher\u5B9E\u4F8B\u540E,\u4F1A\u5F00\u542F\u5BF9\u5C5E\u6027\u7684\u76D1\u542C,\u5F53\u8FD9\u4E2A\u5C5E\u6027\u88ABget\u7684\u65F6\u5019\u4F1A\u5224\u65AD\u8FD9\u4E2A\u5C5E\u6027\u7684\u503C\u662F\u5426\u4E3A\u6700\u65B0\u503C<br> \u5982\u679C\u662F\u6700\u65B0\u503C\u5219\u4E0D\u9700\u8981\u518D\u8FDB\u884C\u8FD0\u7B97,\u76F4\u63A5\u53D6\u65E7\u503C(\u6CE8\u610F,\u53D6\u65E7\u503C\u4E5F\u8981\u5C06\u5F53\u524DDep.target\u6240\u5B58\u7684watcher\u5B9E\u4F8B\u653E\u5165\u8FD9\u4E2A\u8BA1\u7B97\u5C5E\u6027\u7684subs\u4E2D)<br> \u5982\u679C\u4E0D\u662F\u6700\u65B0\u503C\u5219\u9700\u8981\u518D\u6B21\u8FD0\u7B97,\u5148\u5C06\u5F53\u524DDep.target\u5B58\u5165subs,\u7136\u540E\u518D\u8FD0\u7B97\u8FD9\u4E2A\u8BA1\u7B97\u5C5E\u6027\u7684\u503C,\u5728\u8FD0\u7B97\u7ED3\u675F\u540E\u4F1A\u5C06\u8FD9\u4E2A\u503C\u6807\u8BB0\u4E3A\u6700\u65B0\u503C,\u4E14\u5B58\u50A8\u4E86\u8FD9\u4E2A\u6700\u65B0\u503C<br> \u5982\u679C\u8FD9\u4E2A\u6807\u8BB0\u4E0D\u53D8\u7684\u8BDD,\u4EE5\u540E\u4F1A\u76F4\u63A5\u7528\u8FD9\u4E2A\u5B58\u50A8\u7684\u6700\u65B0\u503C(\u53EA\u6709\u5F53\u8FD9\u4E2A\u503C\u6240\u4F9D\u8D56\u7684\u503C\u53D1\u751F\u6539\u53D8\u624D\u4F1A\u6539\u53D8\u8FD9\u4E2A\u503C\u7684\u6807\u8BB0)</p><h3 id="watcher-js" tabindex="-1">watcher.js <a class="header-anchor" href="#watcher-js" aria-hidden="true">#</a></h3><p>\u4E3A\u9700\u8981\u7684\u5C5E\u6027\u521B\u5EFAwatcher\u5B9E\u4F8B<br> \u5145\u5F53\u7740\u89C2\u5BDF\u8005\u7684\u8EAB\u4EFD,\u7ED9 <code>computed</code>, <code>watch</code> \u8FD8\u6709\u6E32\u67D3\u51FD\u6570\u4F7F\u7528\u7684,\u5728\u521B\u5EFA\u65F6\u5C31\u4F1A\u7ED9\u6BCF\u4E2A\u5C5E\u6027\u6216\u8005watch\u7ED1\u5B9A\u4E00\u4E2Awatcher\u5B9E\u4F8B,\u91CC\u9762\u8BB0\u5F55\u4E86\u4E00\u4E9B\u5173\u4E8E\u5C5E\u6027\u7684\u4FE1\u606F\u4EE5\u53CA\u5FC5\u8981\u7684\u65B9\u6CD5,\u7136\u540E\u4F1A\u628A\u8FD9\u4E2A\u5B9E\u4F8B\u653E\u5165\u5176\u4F9D\u8D56\u7684\u5C5E\u6027\u7684 dep\u6570\u7EC4\u4E2D,\u5728\u88AB\u4F9D\u8D56\u5C5E\u6027\u53D1\u751F\u6539\u53D8\u65F6\u5C31\u4F1A\u901A\u77E5\u5230\u8FD9\u4E2Awatcher\u5B9E\u4F8B</p><blockquote><p>\u5176\u5B9E\u5728\u6211\u770B\u6765\u5C31\u662F\u4E00\u4E2A\u7EDF\u4E00\u7BA1\u7406\u7684\u5730\u65B9,\u5F53\u5C5E\u6027\u521B\u5EFA\u7684\u65F6\u5019\u8981\u7ED1\u5B9A\u6B64\u5B9E\u4F8B,\u5728\u66F4\u6539\u65F6\u4E5F\u901A\u77E5\u6B64\u5B9E\u4F8B,\u6574\u4E2A\u53CC\u5411\u7ED1\u5B9A\u5C31\u662F\u56F4\u7ED5\u7740\u8FD9\u4E2A\u5173\u952E\u7684watcher</p></blockquote><p>\u5B83\u7684\u539F\u578B\u94FE\u4E0A\u6709\u56DB\u4E2A\u65B9\u6CD5,\u5206\u522B\u4E3A: <code>update</code> <code>get</code> <code>watchGet</code> <code>depend</code>,\u8BE6\u7EC6\u4EE3\u7801\u5728\u6587\u4EF6\u4E2D</p><ul><li>update: \u5728\u4F9D\u8D56\u7684\u5C5E\u6027\u53D1\u751F\u53D8\u5316\u65F6\u4F1A\u901A\u77E5\u5230\u8FD9\u4E2A\u65B9\u6CD5,\u901A\u8FC7\u6B64\u65B9\u6CD5\u6765\u6267\u884C\u76F8\u5BF9\u5E94\u64CD\u4F5C</li><li>get: \u83B7\u53D6\u503C,\u5E76\u5904\u7406 <code>Dep.target</code> \u7684\u51FA\u6808\u5165\u6808,\u4ECE\u800C\u8FBE\u5230\u7ED1\u5B9A\u4F9D\u8D56\u9879</li><li>watchGet: \u7ED9\u76D1\u542C\u4F7F\u7528,\u5728watch\u521D\u59CB\u5316\u65F6\u4F1A\u8C03\u7528\u76EE\u6807\u5C5E\u6027\u7136\u540E\u8BA9\u5176\u6536\u96C6\u6B64\u76D1\u542C\u7684 <code>watcher</code>,\u4EE5\u8FBE\u5230\u5728\u503C\u53D1\u751F\u6539\u53D8\u901A\u77E5\u5230\u76D1\u542C</li><li>depend: \u7ED9\u8BA1\u7B97\u5C5E\u6027\u6DFB\u52A0 dep\u7684</li></ul><h3 id="watch-js" tabindex="-1">watch.js <a class="header-anchor" href="#watch-js" aria-hidden="true">#</a></h3><p>\u5B9E\u73B0\u76D1\u542C<br> \u904D\u5386\u6240\u6709watch,\u5C06\u88ABwatch\u7684\u5C5E\u6027\u6539\u53D8\u540E\u9700\u8981\u89E6\u53D1\u7684\u51FD\u6570\u653E\u5165watcher\u7684callback\u56DE\u8C03\u4E2D<br> \u5728\u7B2C\u4E00\u6B21\u52A0\u8F7D\u7684\u65F6\u5019\u5C31\u4F1A\u8C03\u7528\u4E00\u6B21\u88AB\u76D1\u542C\u7684\u5C5E\u6027,\u4EE5\u8FBE\u5230\u88AB\u8FD9\u4E2A\u5C5E\u6027\u5B58\u653E\u5728\u5176subs\u4E2D,\u5F53\u8FD9\u4E2A\u5C5E\u6027\u53D8\u5316\u65F6\u81EA\u7136\u80FD\u901A\u77E5\u5230watch</p><blockquote><p>watch \u76D1\u542C\u4E00\u4E2A computed \u5C5E\u6027,\u5982\u679C\u8FD9\u4E2A\u5C5E\u6027\u4E00\u5F00\u59CB\u5E76\u4E0D\u4F1A\u6267\u884C,\u90A3\u4E48\u4E5F\u5E94\u8BE5\u5728\u88AB\u76D1\u542C\u7684\u65F6\u5019\u4E5F\u4E0D\u8981\u6267\u884C,\u4F46\u662F\u6211\u5199\u7684\u8FD9\u4E00\u5757\u8FD8\u662F\u4F1A\u6267\u884C\u7684,\u540E\u7EED\u5EB7\u5EB7\u628A...</p></blockquote><h3 id="compile-js" tabindex="-1">compile.js <a class="header-anchor" href="#compile-js" aria-hidden="true">#</a></h3>',43),F=e("br",null,null,-1),f=e("code",null,"v-model",-1),B=e("code",null,"v-on:click",-1),x=e("code",null,"v-on:click",-1),T=e("br",null,null,-1),S=e("code",null,"v-model",-1),V=e("code",null,"watcher",-1),M=e("code",null,"watcher",-1),P=e("br",null,null,-1),O=d(`<div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">updateText</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">undefined</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u6E32\u67D3\u8FD9\u4E00\u5757\u6211\u4E5F\u662F\u770B\u7F51\u4E0A\u7684\u4F8B\u5B50\u62FF\u5230\u7684,\u771F\u5B9E\u6E32\u67D3\u5E76\u4E0D\u662F\u8FD9\u6837,\u4F46\u8FD9\u662F\u6700\u5FEB\u7684\u65B9\u5F0F,\u6240\u4EE5\u4EC5\u4F9B\u53C2\u8003,\u6700\u4E3B\u8981\u7684\u662F\u53CC\u5411\u7ED1\u5B9A\u90A3\u4E00\u5757\u903B\u8F91</p></div>`,2);function E(t,I,N,q,$,R){return s(),l("div",null,[n,e("ul",null,[p,i,h,u,b,_,D,v,e("li",null,"v-model "+c(t.data)+" v-on \u529F\u80FD\u7684\u7B80\u5355\u5B8C\u6210",1)]),m,g,w,e("p",null,[a("\u5185\u90E8\u7684 v-model,\u4E8B\u4EF6\u4EE5\u53CA\u6A21\u677F\u5B57\u7B26\u4E32\u7684\u5B9E\u73B0\u53EF\u4EE5\u5148\u4E0D\u7528\u5728\u610F(\u8FD9\u91CC\u53EA\u662F\u7B80\u5355\u5E94\u7528,\u5E76\u4E0D\u662Fvue\u5B9E\u9645\u5B9E\u73B0\u65B9\u5F0F)"),A,a(" \u5EFA\u8BAE\u76F4\u63A5\u770B compole.js\u4E2DcompileText() \u4EE5\u53CA compileModel()\u65B9\u6CD5"),y,a(" \u8FD9\u4FE9\u4E2A\u65B9\u6CD5\u662F\u5C06 v-model='title' \u4EE5\u53CA "+c(t.title)+" \u4E2D\u7684title\u8F6C\u5316\u4E3A\u5B9E\u9645\u503C\u5E76\u4E14\u6E32\u67D3\u9875\u9762\u7684\u5173\u952E\u65B9\u6CD5",1),C,a(" \u5982\u679C\u5BF9\u6A21\u677F\u5B57\u7B26\u4E32\u611F\u5174\u8DA3\u7684\u8BDD\u53EF\u4EE5\u53C2\u8003\u6211\u5173\u4E8E\u8FD9\u4E00\u5757\u7684\u6E90\u7801\u5B9E\u73B0 "),j]),k,e("p",null,[a("html\u9875\u9762\u7684\u529F\u80FD\u5B9E\u73B0,\u4E3B\u8981\u5B9E\u73B0\u4E86v-model,v-on,"+c(t.title)+"\u6A21\u677F\u5B57\u7B26\u4E32\u529F\u80FD",1),F,a(" \u5BF9\u9875\u9762DOM\u505A\u4E86\u5904\u7406,\u4F7F\u5176\u53EF\u4EE5\u652F\u6301\u7C7B\u4F3C\u4E8Evue\u7684 "),f,a(),B,a(",\u540C\u6837\u4E5F\u5BF9\u8FD9\u4E9B\u65B9\u6CD5\u8FDB\u884C\u4E86\u4E8B\u4EF6\u7ED1\u5B9A \u6BD4\u5982\u4F7F\u7528\u4E86 "),x,a("\u4F1A\u76D1\u542C\u90A3\u4E2A\u5143\u7D20\u7684\u70B9\u51FB\u4E8B\u4EF6,\u89E6\u53D1\u540E\u4F1A\u6267\u884C\u76EE\u6807\u65B9\u6CD5"),T,a(" \u6BD4\u5982\u4F7F\u7528\u4E86 "),S,a("\u4F1A\u4E3A\u5176\u521B\u5EFA\u4E00\u4E2A "),V,a(" \u5B9E\u4F8B\u5E76\u6807\u660E\u6B64\u662F\u6E32\u67D3\u51FD\u6570,\u7136\u540E\u4F1A\u6267\u884C\u5185\u90E8\u7684 update\u65B9\u6CD5\u4F7F\u4F9D\u8D56\u5C5E\u6027\u7684dep\u4E2D\u5B58\u653E\u6B64 "),M,P]),e("p",null,[a("\u540C\u7406\u4E00\u822C\u7684\u8BA1\u7B97\u5C5E\u6027\u6216\u8005data\u503C\u653E\u5728\u9875\u9762\u4E2D\u901A\u8FC7 "),e("code",null,c(t.name),1),a(" \u7684\u65B9\u5F0F\u4E5F\u4F1A\u88AB\u68C0\u6D4B\u5230\u6B64DOM\u5143\u7D20\u9700\u8981\u5C06name\u8F6C\u5316\u4E3A\u771F\u5B9E\u503C,\u5728\u8F6C\u5316\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u5F97\u5230\u771F\u5B9Ename \u7684\u503C,\u540C\u65F6\u4E5F\u4F1A\u5C06\u4E0B\u9762\u7684\u66F4\u6539DOM\u5143\u7D20textContent\u65B9\u6CD5\u66B4\u9732\u51FA\u53BB,\u4EE5\u4FBF\u5728\u503C\u53D1\u751F\u53D8\u5316\u540E\u80FD\u6267\u884C\u6B64\u65B9\u6CD5\u6765\u6539\u53D8\u9875\u9762\u7684\u503C")]),O])}const L=o(r,[["render",E]]);export{G as __pageData,L as default};
