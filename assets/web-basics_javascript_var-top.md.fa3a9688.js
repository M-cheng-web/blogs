import{_ as s,c as n,o as a,d as l}from"./app.502a3a89.js";const F=JSON.parse('{"title":"\u53D8\u91CF\u63D0\u5347","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u51FD\u6570\u63D0\u5347","slug":"\u51FD\u6570\u63D0\u5347","link":"#\u51FD\u6570\u63D0\u5347","children":[]},{"level":2,"title":"var \u53D8\u91CF\u63D0\u5347","slug":"var-\u53D8\u91CF\u63D0\u5347","link":"#var-\u53D8\u91CF\u63D0\u5347","children":[]},{"level":2,"title":"let & const \u63D0\u5347","slug":"let-const-\u63D0\u5347","link":"#let-const-\u63D0\u5347","children":[]},{"level":2,"title":"class \u63D0\u5347","slug":"class-\u63D0\u5347","link":"#class-\u63D0\u5347","children":[]},{"level":2,"title":"\u9690\u5F0F\u58F0\u660E\u63D0\u5347","slug":"\u9690\u5F0F\u58F0\u660E\u63D0\u5347","link":"#\u9690\u5F0F\u58F0\u660E\u63D0\u5347","children":[]}],"relativePath":"web-basics/javascript/var-top.md","lastUpdated":null}'),p={name:"web-basics/javascript/var-top.md"},o=l(`<h1 id="\u53D8\u91CF\u63D0\u5347" tabindex="-1">\u53D8\u91CF\u63D0\u5347 <a class="header-anchor" href="#\u53D8\u91CF\u63D0\u5347" aria-hidden="true">#</a></h1><blockquote><p>JS\u4E2D\u6709\u4E00\u4E2A\u7279\u6027,\u5C31\u662F\u5728\u53D8\u91CF\u548C\u51FD\u6570\u58F0\u660E\u4E4B\u524D\u5C31\u53EF\u4EE5\u4F7F\u7528\u5B83\u4EEC,\u5C31\u50CF\u662F\u53D8\u91CF\u58F0\u660E\u548C\u51FD\u6570\u58F0\u660E\u88ABJS\u63D0\u5347\u5230\u4E86\u4EE3\u7801\u9876\u90E8,\u5B9E\u9645\u4E2DJS\u5E76\u4E0D\u4F1A\u79FB\u52A8\u6211\u4EEC\u7684\u4EE3\u7801,\u6240\u4EE5\u8FD9\u5E76\u4E0D\u662F\u771F\u6B63\u610F\u4E49\u4E0A\u7684\u63D0\u5347</p></blockquote><p>JS\u662F\u5355\u7EBF\u7A0B\u8BED\u8A00,\u4F1A\u5148\u8FDB\u884C\u7F16\u8BD1\u9636\u6BB5\u7136\u540E\u624D\u662F\u6267\u884C\u9636\u6BB5<br> \u5728\u7F16\u8BD1\u9636\u6BB5\u4F1A\u68C0\u6D4B\u5230\u6240\u6709\u7684\u53D8\u91CF\u4EE5\u53CA\u51FD\u6570\u58F0\u660E,\u8FD9\u4E9B\u53D8\u91CF\u548C\u51FD\u6570\u58F0\u660E\u90FD\u88AB\u6DFB\u52A0\u5230\u8BCD\u6CD5\u73AF\u5883(Lexical Environment) \u8FD9\u4E2A\u5BF9\u8C61\u4E2D(\u6B64\u5BF9\u8C61\u5B58\u653E\u5728JS\u6570\u636E\u7ED3\u6784\u5185\u7684\u5185\u5B58\u4E2D),\u6240\u4EE5\u8FD9\u4E9B\u53D8\u91CF\u548C\u51FD\u6570\u80FD\u5728\u5B83\u4EEC\u771F\u6B63\u58F0\u660E\u4E4B\u524D\u4F7F\u7528</p><p><strong>\u5176\u5B9E\u90FD\u6709\u53D8\u91CF\u63D0\u5347,\u4F46\u53EA\u6709var\u624D\u4F1A\u5728\u7F16\u8BD1\u9636\u6BB5\u9ED8\u8BA4\u8D4B\u503C\u4E3Aundefined</strong></p><h2 id="\u51FD\u6570\u63D0\u5347" tabindex="-1">\u51FD\u6570\u63D0\u5347 <a class="header-anchor" href="#\u51FD\u6570\u63D0\u5347" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u51FD\u6570\u58F0\u660E\u65B9\u5F0F</span></span>
<span class="line"><span style="color:#82AAFF;">sayHi</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;">// Hi there!</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sayHi</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hi there!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u51FD\u6570\u8868\u8FBE\u5F0F\u65B9\u5F0F</span></span>
<span class="line"><span style="color:#82AAFF;">sayNo</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;">// \u62A5\u9519</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> sayNo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">No there!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u51FD\u6570\u58F0\u660E: \u5728\u7F16\u8BD1\u9636\u6BB5\u4F1A\u88AB\u6DFB\u52A0\u5230<code>\u8BCD\u6CD5\u73AF\u5883(Lexical Environment)</code>\u4E2D,\u5F53JS\u5F15\u64CE\u9047\u5230sayHi()\u51FD\u6570\u65F6,\u5B83\u4F1A\u4ECE\u8BCD\u6CD5\u73AF\u5883\u4E2D\u627E\u5230\u8FD9\u4E2A\u51FD\u6570\u5E76\u6267\u884C\u5B83</p><p>\u51FD\u6570\u8868\u8FBE\u5F0F: \u5728\u7F16\u8BD1\u9636\u6BB5\u4F1A\u88AB\u6DFB\u52A0\u5230\u8BCD\u6CD5\u73AF\u5883\u4E14\u521D\u59CB\u5316\u4E3A<code>undefined</code>,\u5BF9undefined\u6267\u884C\u65B9\u6CD5\u80AF\u5B9A\u4F1A\u62A5\u9519</p><p>\u7F16\u8F91\u9636\u6BB5\u7684\u8BCD\u6CD5\u73AF\u5883\u5BF9\u8C61</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> lexicalEnvironment </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sayHi</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt; </span><span style="color:#F07178;">func</span><span style="color:#89DDFF;"> &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="var-\u53D8\u91CF\u63D0\u5347" tabindex="-1">var \u53D8\u91CF\u63D0\u5347 <a class="header-anchor" href="#var-\u53D8\u91CF\u63D0\u5347" aria-hidden="true">#</a></h2><p>\u4E3A\u4EC0\u4E48name\u4F1A\u521D\u59CB\u5316\u4E3Aundefined? \u56E0\u4E3AJS\u5728\u7F16\u8BD1\u9636\u6BB5\u4F1A\u627E\u5230var\u5173\u952E\u5B57\u58F0\u660E\u7684\u53D8\u91CF\u5E76\u6DFB\u52A0\u5230 <code>\u8BCD\u6CD5\u73AF\u5883</code> \u4E2D\u5E76\u521D\u59CB\u5316\u4E3A <code>undefined</code> ,\u5728\u540E\u9762\u7684\u8D4B\u503C\u8BED\u53E5\u65F6\u624D\u4F1A\u628A\u8FD9\u4E2A\u503C\u8D4B\u503C\u5230\u8FD9\u4E2A\u53D8\u91CF</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(name)   </span><span style="color:#676E95;">// &#39;undefined&#39;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John Doe</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(name)   </span><span style="color:#676E95;">// &#39;John Doe&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u6B64\u65F6\u7684\u8BCD\u6CD5\u73AF\u5883\u5BF9\u8C61</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u7F16\u8BD1\u9636\u6BB5</span></span>
<span class="line"><span style="color:#A6ACCD;">lexicalEnvironment </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6267\u884C\u9636\u6BB5</span></span>
<span class="line"><span style="color:#A6ACCD;">lexicalEnvironment </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John Doe</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="let-const-\u63D0\u5347" tabindex="-1">let &amp; const \u63D0\u5347 <a class="header-anchor" href="#let-const-\u63D0\u5347" aria-hidden="true">#</a></h2><p>\u6240\u6709\u7684\u58F0\u660E( <code>function, var, let, const, class</code> )\u90FD\u4F1A\u53D8\u91CF\u63D0\u5347,\u4F46\u662F\u53EA\u6709\u4F7F\u7528 <code>var</code> \u5173\u952E\u5B57\u58F0\u660E\u7684\u53D8\u91CF,\u624D\u4F1A\u88AB\u521D\u59CB\u5316\u4E3A <code>undefined</code> ,\u800C <code>let</code> \u548C <code>const</code> \u662F\u4E0D\u4F1A\u88AB\u521D\u59CB\u5316\u7684,\u610F\u5473\u7740\u53EA\u6709\u5728\u58F0\u660E\u4E4B\u540E\u624D\u80FD\u6B63\u5E38\u8BBF\u95EE\u8BE5\u53D8\u91CF,\u5982\u679C <code>let</code> \u548C <code>const</code> \u5728\u88AB\u58F0\u660E\u7684\u5730\u65B9\u8FD8\u627E\u4E0D\u5230\u503C\u7684\u8BDD,\u5C31\u4F1A\u88AB\u8D4B\u503C\u4E3A <code>undefined</code> (\u5C31\u662F <code>let a</code> \u8FD9\u6837\u7684)</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a)  </span><span style="color:#676E95;">// ReferenceError: a is not defined</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span></span>
<span class="line"></span></code></pre></div><p>\u7F16\u8BD1\u9636\u6BB5\u7684\u8BCD\u6CD5\u73AF\u5883\u5BF9\u8C61</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> lexicalEnvironment </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt; </span><span style="color:#F07178;">uninitialized</span><span style="color:#89DDFF;"> &gt;</span><span style="color:#A6ACCD;"> // \u8868\u793A\u672A\u521D\u59CB\u5316\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="class-\u63D0\u5347" tabindex="-1">class \u63D0\u5347 <a class="header-anchor" href="#class-\u63D0\u5347" aria-hidden="true">#</a></h2><p>\u540Clet\u548Cconst\u4E00\u6837,class\u5728JavaScript\u4E2D\u4E5F\u662F\u4F1A\u88AB\u63D0\u5347\u7684,\u5728\u88AB\u771F\u6B63\u8D4B\u503C\u4E4B\u524D\u90FD\u4E0D\u4F1A\u88AB\u521D\u59CB\u5316\u503C</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> peter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Peter</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;">// ReferenceError: Person is not defined</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">age</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">age</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> John </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(John) </span><span style="color:#676E95;">// Person { name: &#39;John&#39;, age: 25 }</span></span>
<span class="line"></span></code></pre></div><h2 id="\u9690\u5F0F\u58F0\u660E\u63D0\u5347" tabindex="-1">\u9690\u5F0F\u58F0\u660E\u63D0\u5347 <a class="header-anchor" href="#\u9690\u5F0F\u58F0\u660E\u63D0\u5347" aria-hidden="true">#</a></h2><p>JS\u4E2D\u7684\u53D8\u91CF\u58F0\u660E\u5206\u663E\u5F0F\u58F0\u660E\u548C\u9690\u5F0F\u58F0\u660E</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u663E\u5F0F\u58F0\u660E</span></span>
<span class="line"><span style="color:#A6ACCD;">bigAge </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cccc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9690\u5F0F\u58F0\u660E</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u90FD\u662F\u5728\u5168\u5C40\u8303\u56F4\u5185,\u8FD9\u4FE9\u58F0\u660E\u90FD\u4F1A\u58F0\u660E\u4E3Awindow\u4E0B\u7684\u53D8\u91CF,\u4F46\u662F\u5982\u679C\u5728\u7F16\u8BD1\u9636\u6BB5\u8FD9\u4E24\u79CD\u58F0\u660E\u662F\u4E0D\u540C\u7684\u8868\u73B0</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(age) </span><span style="color:#676E95;">// undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bigAge) </span><span style="color:#676E95;">// \u62A5\u9519(\u672A\u58F0\u660E)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u663E\u5F0F\u58F0\u660E</span></span>
<span class="line"><span style="color:#A6ACCD;">bigAge </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cccc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9690\u5F0F\u58F0\u660E</span></span>
<span class="line"></span></code></pre></div><p>age\u7684\u8F93\u51FA\u662F\u7B26\u5408\u9884\u671F\u7684 <code>undefined</code> ,bigAge\u56E0\u4E3A\u5728\u7F16\u8BD1\u9636\u6BB5\u5E76\u6CA1\u6709\u521D\u59CB\u5316,\u6240\u4EE5\u4F1A\u62A5\u9519</p><p><strong>\u6240\u4EE5\u8981\u7262\u8BB0\u53EA\u6709var\u624D\u4F1A\u5728\u7F16\u8BD1\u9636\u6BB5\u9ED8\u8BA4\u8D4B\u503C\u4E3Aundefined</strong></p>`,30),e=[o];function c(t,r,y,D,C,A){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{F as __pageData,d as default};
