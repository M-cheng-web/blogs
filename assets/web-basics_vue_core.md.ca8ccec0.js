import{_ as s,c as a,o as l,d as n}from"./app.502a3a89.js";const h=JSON.parse('{"title":"vue","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","slug":"\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","link":"#\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","children":[]},{"level":2,"title":"nextTick","slug":"nexttick","link":"#nexttick","children":[]},{"level":2,"title":"\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570","slug":"\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570","link":"#\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570","children":[]},{"level":2,"title":"router","slug":"router","link":"#router","children":[]},{"level":2,"title":"key","slug":"key","link":"#key","children":[]},{"level":2,"title":"data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C","slug":"data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C","link":"#data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C","children":[{"level":3,"title":"\u503C\u7684\u52A8\u4F5C","slug":"\u503C\u7684\u52A8\u4F5C","link":"#\u503C\u7684\u52A8\u4F5C","children":[]},{"level":3,"title":"\u6E32\u67D3\u7684\u52A8\u4F5C","slug":"\u6E32\u67D3\u7684\u52A8\u4F5C","link":"#\u6E32\u67D3\u7684\u52A8\u4F5C","children":[]}]},{"level":2,"title":"\u5176\u4ED6","slug":"\u5176\u4ED6","link":"#\u5176\u4ED6","children":[{"level":3,"title":"v2 \u548C v3 \u7684 slot","slug":"v2-\u548C-v3-\u7684-slot","link":"#v2-\u548C-v3-\u7684-slot","children":[]},{"level":3,"title":"v3\u7684\u547D\u540D\u95EE\u9898","slug":"v3\u7684\u547D\u540D\u95EE\u9898","link":"#v3\u7684\u547D\u540D\u95EE\u9898","children":[]},{"level":3,"title":"\u5176\u4ED6\u95EE\u9898","slug":"\u5176\u4ED6\u95EE\u9898","link":"#\u5176\u4ED6\u95EE\u9898","children":[]}]}],"relativePath":"web-basics/vue/core.md","lastUpdated":null}'),e={name:"web-basics/vue/core.md"},o=n(`<h1 id="vue" tabindex="-1">vue <a class="header-anchor" href="#vue" aria-hidden="true">#</a></h1><h2 id="\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" tabindex="-1">\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F <a class="header-anchor" href="#\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" aria-hidden="true">#</a></h2><h2 id="nexttick" tabindex="-1">nextTick <a class="header-anchor" href="#nexttick" aria-hidden="true">#</a></h2><p>nextTick \u4E3B\u8981\u4F7F\u7528\u4E86\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1,\u6839\u636E\u6267\u884C\u73AF\u5883\u5206\u522B\u5C1D\u8BD5\u91C7\u7528</p><ul><li>Promise</li><li>MutationObserver</li><li>setImmediate</li><li>\u5982\u679C\u4EE5\u4E0A\u90FD\u4E0D\u884C\u5219\u91C7\u7528 setTimeout</li></ul><p>\u7531\u4E8EVue\u7684\u5F02\u6B65\u66F4\u65B0\u7B56\u7565\u5BFC\u81F4\u6211\u4EEC\u5BF9\u6570\u636E\u7684\u4FEE\u6539\u4E0D\u4F1A\u7ACB\u9A6C\u4F53\u73B0\u5230\u90FD\u6CA1\u53D8\u5316\u4E0A,\u6B64\u65F6\u5982\u679C\u60F3\u8981\u7ACB\u5373\u83B7\u53D6\u66F4\u65B0\u540E\u7684dom\u7684\u72B6\u6001,\u5C31\u9700\u8981\u4F7F\u7528\u8FD9\u4E2A\u65B9\u6CD5,\u6BD4\u5982\u4EE5\u4E0B\u4EE3\u7801</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">mounted</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">123</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5177\u4F53\u610F\u601D\u4E0D\u7528\u7BA1,\u77E5\u9053\u8FD9\u4E2A\u6253\u5370\u8F93\u51FA\u7684\u5143\u7D20\u662F\u8D1F\u8D23\u5C55\u793A this.name \u7684\u5C31\u884C</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$refs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;">) </span><span style="color:#676E95;">// undefined</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setTimeOut</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$refs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;">) </span><span style="color:#676E95;">// 123</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Vue\u5728\u66F4\u65B0dom\u65F6\u662F\u5F02\u6B65\u6267\u884C\u7684,\u53EA\u8981\u76D1\u542C\u5230\u6570\u636E\u53D8\u5316,Vue\u5C06\u5F00\u542F\u4E00\u4E2A\u961F\u5217,\u5E76\u7F13\u51B2\u5728\u540C\u4E00\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\u53D1\u751F\u7684\u6240\u6709\u6570\u636E\u53D8\u66F4 \u5982\u679C\u540C\u4E00\u4E2Awatcher\u88AB\u591A\u6B21\u89E6\u53D1,\u53EA\u4F1A\u88AB\u63A8\u5165\u5230\u961F\u5217\u4E2D\u4E00\u6B21,\u8FD9\u79CD\u5728\u7F13\u5B58\u65F6\u53BB\u91CD\u5BF9\u4E8E\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u8BA1\u7B97\u548Cdom\u64CD\u4F5C\u662F\u975E\u5E38\u91CD\u8981\u7684nextTick\u65B9\u6CD5\u4F1A\u5728\u961F\u5217\u4E2D\u52A0\u5165\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570,\u786E\u4FDD\u8BE5\u51FD\u6570\u5728\u524D\u9762\u7684dom\u64CD\u4F5C\u5B8C\u6210\u540E\u624D\u8C03\u7528</p><p>nextTick \u5C31\u662F\u5229\u7528\u4EFB\u52A1\u961F\u5217\u7684\u539F\u7406,\u4E3A\u4EC0\u4E48\u8981\u7528\u5F02\u6B65,\u56E0\u4E3A\u6570\u636E\u66F4\u65B0\u540E\u7684DOM\u64CD\u4F5C\u90FD\u662F\u5F02\u6B65,\u6211\u4EEC\u8981\u505A\u7684\u662F\u5728\u540C\u4E00\u4E8B\u4EF6\u5FAA\u73AF\u7684\u672B\u5C3E\u63A5\u4E0A\u4E00\u4E2A\u961F\u5217\u5C31\u884C,\u6709\u56DB\u4E2A\u9009\u9879\u4F9B\u6211\u4EEC\u9009\u62E9</p><h2 id="\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570" tabindex="-1">\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570 <a class="header-anchor" href="#\u7EC4\u4EF6\u4E2D\u7684data\u4E3A\u4EC0\u4E48\u662F\u4E00\u4E2A\u51FD\u6570" aria-hidden="true">#</a></h2><p>\u4E00\u4E2A\u7EC4\u4EF6\u88AB\u590D\u7528\u591A\u6B21\u7684\u8BDD,\u4E5F\u5C31\u4F1A\u521B\u5EFA\u591A\u4E2A\u5B9E\u4F8B \u672C\u8D28\u4E0A,\u8FD9\u4E9B\u5B9E\u4F8B\u7528\u7684\u90FD\u662F\u540C\u4E00\u4E2A\u6784\u9020\u51FD\u6570,\u5982\u679Cdata\u662F\u5BF9\u8C61\u7684\u8BDD,\u5BF9\u8C61\u5C5E\u4E8E\u5F15\u7528\u7C7B\u578B,\u4F1A\u5F71\u54CD\u5230\u6240\u6709\u7684\u5B9E\u4F8B \u6240\u4EE5\u4E3A\u4E86\u4FDD\u8BC1\u7EC4\u4EF6\u4E0D\u540C\u7684\u5B9E\u4F8B\u4E4B\u95F4data\u4E0D\u51B2\u7A81,data\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570</p><p>\u5173\u4E8E\u8FD9\u4E00\u70B9\u53EF\u4EE5\u53C2\u8003\u539F\u578B\u94FE\u90A3\u4E00\u5757\u77E5\u8BC6\u70B9,\u81EA\u5DF1\u8BD5\u4E00\u4E0B\u5C31\u77E5\u9053\u6539\u53D8 <code>Object.prototype.A\u5C5E\u6027</code> \u4F1A\u89E6\u53D1\u6240\u6709\u5B9E\u4F8B\u7684 <code>A\u5C5E\u6027</code> \u6539\u53D8</p><h2 id="router" tabindex="-1">router <a class="header-anchor" href="#router" aria-hidden="true">#</a></h2><ul><li>beforeEach afterEach</li><li>beforeEnter</li><li>beforeRouteEnter beofreRouteUpdate beforeRouteLeave</li></ul><h2 id="key" tabindex="-1">key <a class="header-anchor" href="#key" aria-hidden="true">#</a></h2><p>\u80FD\u5E2E\u52A9vue\u9AD8\u6548 diff,\u6BD4\u5982\u5728\u4E00\u4E2A <code>for</code> \u5FAA\u73AF\u6E32\u67D3\u51FA\u7684\u5217\u8868\u4E2D,\u5F53\u8FD9\u4E2A\u5217\u8868\u67D0\u51E0\u6761\u6570\u636E\u53D1\u751F\u66F4\u6539\u65F6,\u4F1A\u7ECF\u5386\u4EE5\u4E0B\u6B65\u9AA4 (\u53EF\u4EE5\u4ECE\u7B2C6\u6B65\u5F00\u59CB\u770B),\u5728\u77E5\u9053\u6E32\u67D3\u8FC7\u7A0B\u540E,\u53EF\u4EE5\u5047\u8BBE\u8FD9\u6837\u7684\u573A\u666F: \u6709\u4E00\u4E2A\u5217\u8868\u6E32\u67D3,\u90FD\u662F\u62FFindex\u4F5C\u4E3Akey,\u5F53\u63D2\u5165\u4E00\u6761\u6570\u636E\u7684\u65F6\u5019,\u540E\u9762\u7684key\u90FD\u4F1A\u53D1\u751F\u53D8\u5316,\u90FD\u4F1A\u91CD\u65B0\u6E32\u67D3,\u8FD9\u6837\u662F\u4E0D\u7B26\u5408key\u7684\u521D\u8877\u7684</p><ol><li>\u89E6\u53D1watcher,\u968F\u4E4B\u89E6\u53D1watcher\u5BF9\u8C61\u7684 update(), \u7136\u540E\u518D\u89E6\u53D1\u6E32\u67D3\u51FD\u6570</li><li>\u6E32\u67D3\u51FD\u6570\u5229\u7528 h \u51FD\u6570\u751F\u6210\u8FD9\u4E00\u5757\u6700\u65B0\u7684\u865A\u62DFDOM\u6811</li><li>\u968F\u540E\u4F1A\u89E6\u53D1 patch \u51FD\u6570\u5BF9\u6BD4\u65B0\u65E7\u865A\u62DFDOM\u6811</li><li>patch \u51FD\u6570\u5185\u90E8\u4F1A\u5224\u65AD\u51FA\u7236\u7EA7\u6CA1\u6709\u53D8\u5316,\u53D8\u5316\u662F\u5B50\u7EA7</li><li>\u968F\u540E\u4F1A\u8FDB\u884C\u6DF1\u5C42\u7684 diff \u7B97\u6CD5\u6BD4\u8F83(\u53C2\u8003diff\u7B97\u6CD5\u7BC7)</li><li>diff \u7B97\u6CD5\u5185\u90E8\u4F1A\u4F9D\u8D56\u4E8E <code>sel</code> \u4EE5\u53CA <code>key</code> \u6765\u5224\u65AD\u662F\u4E0D\u662F\u540C\u4E00\u4E2A\u5143\u7D20</li><li>\u5982\u679C\u662F\u540C\u4E00\u4E2A\u5143\u7D20\u5C31\u4F1A\u53EA\u6539\u53D8\u5176\u5185\u5BB9\u6216\u8005\u79FB\u4E00\u4E0B\u4F4D\u7F6E\u5C31\u884C</li><li>\u8FD9\u6837\u5C31\u4E0D\u7528\u91CD\u590D\u521B\u5EFA\u771F\u5B9EDOM\u5143\u7D20\u4E86,\u80FD\u590D\u7528\u7684\u90FD\u590D\u7528</li></ol><h2 id="data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C" tabindex="-1">data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C <a class="header-anchor" href="#data\u503C\u53D8\u5316\u89E6\u53D1\u7684\u52A8\u4F5C" aria-hidden="true">#</a></h2><h3 id="\u503C\u7684\u52A8\u4F5C" tabindex="-1">\u503C\u7684\u52A8\u4F5C <a class="header-anchor" href="#\u503C\u7684\u52A8\u4F5C" aria-hidden="true">#</a></h3><ul><li>\u573A\u666F\u4E00 data\u7684\u503C\u6CA1\u6709\u5728\u9875\u9762\u6E32\u67D3</li><li>\u573A\u666F\u4E8C data\u7684\u503C\u5728\u9875\u9762\u4E0A\u6709\u4F7F\u7528</li><li>\u573A\u666F\u4E09 data\u7684\u503C\u5728\u9875\u9762\u4E0A\u6709\u4F7F\u7528,\u4E14\u88ABcomputed\u5C5E\u6027\u8C03\u7528</li><li>\u573A\u666F\u56DB data\u7684\u503C\u5728\u9875\u9762\u4E0A\u6709\u4F7F\u7528,\u4E14\u88ABcomputed\u5C5E\u6027\u8C03\u7528,\u4E14computed\u5C5E\u6027\u88AB\u9875\u9762\u4F7F\u7528</li></ul><h3 id="\u6E32\u67D3\u7684\u52A8\u4F5C" tabindex="-1">\u6E32\u67D3\u7684\u52A8\u4F5C <a class="header-anchor" href="#\u6E32\u67D3\u7684\u52A8\u4F5C" aria-hidden="true">#</a></h3><p>\u6A21\u677F\u8BED\u6CD5 =&gt; \u62BD\u8C61\u8BED\u6CD5\u6811ast =&gt; \u6E32\u67D3\u51FD\u6570(h\u51FD\u6570) =&gt; \u865A\u62DF\u8282\u70B9 =&gt; \u754C\u9762</p><p>\u5728data\u503C\u6539\u53D8\u4E4B\u524D,\u9875\u9762\u5C31\u5DF2\u7ECF\u7ECF\u8FC7\u4E86\u4E0A\u9762\u7684\u6B65\u9AA4( \u5728\u751F\u6210\u865A\u62DFDOM\u65F6\u4F1A\u628Adata\u7684\u771F\u5B9E\u65F6\u653E\u5728\u865A\u62DFDOM\u5BF9\u8C61\u4E2D ),\u6B64\u65F6\u66F4\u6539\u4F1A\u89E6\u53D1\u4EE5\u4E0B\u6B65\u9AA4( \u8FD9\u91CC\u7684\u524D\u63D0\u662Fdata\u5C5E\u6027\u88AB\u9875\u9762\u8C03\u7528 ):</p><ol><li>data\u503C\u7684\u53D8\u5316\u4F1A\u89E6\u53D1\u62E6\u622A,\u968F\u540E\u4F1A\u89E6\u53D1\u6E32\u67D3 <code>watcher</code>\u5BF9\u8C61\u7684update</li><li>update\u65B9\u6CD5\u53C8\u4F1A\u89E6\u53D1\u5176\u6E32\u67D3\u51FD\u6570</li><li>\u6E32\u67D3\u51FD\u6570\u5185\u90E8\u53C8\u4F1A\u7531 h \u51FD\u6570\u8F6C\u5316\u4E3A\u865A\u62DFDOM</li><li>\u968F\u540E\u6BD4\u8F83\u65B0\u65E7\u865A\u62DFDOM</li><li>\u7531\u4E8E\u8FD9\u91CC\u53EA\u662F\u66F4\u6539\u4E86\u5185\u5BB9,\u5E76\u4E0D\u6D89\u53CA\u5B50\u7EA7\u7684\u6BD4\u8F83,\u6240\u4EE5\u4E0D\u7528 diff\u7B97\u6CD5</li><li>\u5728\u5BF9\u6BD4\u8FC7\u7A0B\u4E2D\u53D1\u73B0\u65B0\u65E7\u865A\u62DFDOM\u53EA\u662F\u5185\u5BB9\u53D1\u751F\u4E86\u53D8\u5316</li><li>\u5C06\u65B0\u865A\u62DFDOM\u7684\u5185\u5BB9\u8D4B\u503C\u7ED9\u65E7\u865A\u62DFDOM,\u5E76\u4E0D\u4F1A\u91CD\u65B0\u521B\u5EFA\u4E2A\u65B0\u5143\u7D20</li><li>\u4E5F\u5C31\u662F\u8FD9\u6837\u7684\u64CD\u4F5C: <code>oldVnode.elm.innerText = newVnode.text</code></li></ol><h2 id="\u5176\u4ED6" tabindex="-1">\u5176\u4ED6 <a class="header-anchor" href="#\u5176\u4ED6" aria-hidden="true">#</a></h2><h3 id="v2-\u548C-v3-\u7684-slot" tabindex="-1">v2 \u548C v3 \u7684 slot <a class="header-anchor" href="#v2-\u548C-v3-\u7684-slot" aria-hidden="true">#</a></h3><ul><li>\u5728vue2.0\u4E2D,\u88AB\u89E3\u6790\u5230 this.$slots.default[0].data.attrs \u8FD9\u4E2A\u5BF9\u8C61\u4E2D</li><li>\u5728vue3.0\u4E2D,\u88AB\u89E3\u6790\u5230 this.$slots.default()[0].props \u8FD9\u4E2A\u5BF9\u8C61\u4E2D</li></ul><p>\u50CF\u8FD9\u4E2A\u7EC4\u4EF6\u7684\u9ED8\u8BA4\u63D2\u69FD\u91CC\u9762\u8FD8\u6709\u9ED8\u8BA4\u63D2\u69FD</p><ul><li>\u5728vue2.0\u4E2D,\u4F1A\u88AB\u89E3\u6790\u5230 this.$slots.default[0].data.scopedSlots \u8FD9\u4E2A\u5BF9\u8C61\u4E2D</li><li>\u5728vue3.0\u4E2D,\u4F1A\u88AB\u89E3\u6790\u5230 this.$slots.default()[0].children \u8FD9\u4E2A\u6570\u7EC4\u4E2D</li></ul><p>\u9519\u8BEF\u573A\u666F:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// \u7236\u7EA7</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">slot</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:selfTextArr</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">selfTextArr</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:fontStyle</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fontStyle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:isCenterLine</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">isCenterLine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// \u5B50\u7EA7</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-slot:default</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">slotProps</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">drag-area</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-show</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">slotProps.selfTextArr.length === 0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{&#39;drag-area-text&#39;: slotProps.isCenterLine}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">slotProps.fontStyle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u70B9\u51FB\u8F93\u5165\u6587\u5B57</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u7236\u7EA7\u901A\u8FC7 <code>this.$slots.default()[0]</code> \u8BED\u53E5\u53D1\u73B0\u4F1A\u62A5\u9519, <code>isCenterLine is undefined</code> \u8FD9\u6837\u7684,\u65E0\u5948\u53EA\u80FD\u7ED9\u7236\u7EA7 slot \u5916\u5C42\u52A0\u4E2A div,\u7136\u540E\u901A\u8FC7\u90A3\u4E2Adiv\u53BB\u83B7\u53D6\u5230\u63D2\u69FD\u4F5C\u7528\u57DF</p><p>\u540E\u7EED: \u53EF\u4EE5\u901A\u8FC7 <code>useSlots</code> hook\u51FD\u6570\u83B7\u53D6\u5230(\u6CA1\u8BD5\u8FC7,\u5E94\u8BE5\u53EF\u4EE5)</p><h3 id="v3\u7684\u547D\u540D\u95EE\u9898" tabindex="-1">v3\u7684\u547D\u540D\u95EE\u9898 <a class="header-anchor" href="#v3\u7684\u547D\u540D\u95EE\u9898" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">originCanvas</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u4E0B\u9762\u8FD9\u79CD\u547D\u540D\u4F1A\u5BFC\u81F4\u8D4B\u503C\u5931\u6548</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$originCanvas</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5176\u4ED6\u95EE\u9898" tabindex="-1">\u5176\u4ED6\u95EE\u9898 <a class="header-anchor" href="#\u5176\u4ED6\u95EE\u9898" aria-hidden="true">#</a></h3><p>vue3\u7684\u8BED\u6CD5,\u600E\u4E48\u533A\u5206\u5757\u5462? \u8FD8\u662F\u4E07\u7269\u90FD\u662F\u51FD\u6570\u5F0F?</p><p>vue3\u7684\u8BED\u6CD5,\u5E94\u8BE5\u5F88\u5BB9\u6613\u5BFC\u81F4\u63A5\u624B\u4E00\u5F20\u522B\u4EBA\u5199\u597D\u7684\u65B0\u9875\u9762\u65F6,\u5F88\u96BE\u4E00\u773C\u5C31\u77E5\u9053\u9875\u9762\u521D\u59CB\u505A\u4E86\u5199\u4EC0\u4E48\u628A? \u8981\u4E0D\u7136\u4FEE\u6539\u7A0B\u5E8F\u7684\u65F6\u5019,\u9519\u8BEF\u4FE1\u606F\u5F88\u9690\u6666\u7684\u8BDD,\u627E\u9519\u5F88\u96BE</p>`,38),t=[o];function p(r,c,i,d,D,F){return l(),a("div",null,t)}const u=s(e,[["render",p]]);export{h as __pageData,u as default};
