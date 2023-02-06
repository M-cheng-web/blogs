import{_ as e,c as l,o as a,a as r}from"./app.b4ca2f86.js";const u=JSON.parse('{"title":"Charles","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E0B\u8F7D","slug":"\u4E0B\u8F7D","link":"#\u4E0B\u8F7D","children":[]},{"level":2,"title":"\u914D\u7F6E","slug":"\u914D\u7F6E","link":"#\u914D\u7F6E","children":[{"level":3,"title":"\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42","slug":"\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42","link":"#\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42","children":[]}]},{"level":2,"title":"\u6CE8\u610F","slug":"\u6CE8\u610F","link":"#\u6CE8\u610F","children":[]}],"relativePath":"tools/charles/core.md","lastUpdated":1675691846000}'),o={name:"tools/charles/core.md"},t=r('<h1 id="charles" tabindex="-1">Charles <a class="header-anchor" href="#charles" aria-hidden="true">#</a></h1><p>\u6293\u5305\u5DE5\u5177\u7684\u5B89\u88C5</p><h2 id="\u4E0B\u8F7D" tabindex="-1">\u4E0B\u8F7D <a class="header-anchor" href="#\u4E0B\u8F7D" aria-hidden="true">#</a></h2><p><a href="https://www.charlesproxy.com/latest-release/download.do" target="_blank" rel="noreferrer">Charles \u4E0B\u8F7D</a></p><h2 id="\u914D\u7F6E" tabindex="-1">\u914D\u7F6E <a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a></h2><p>\u6253\u5F00 <code>Charles</code>,\u6B64\u65F6\u662F\u4E0D\u80FD\u6B63\u5E38\u4F7F\u7528\u7684,\u9700\u8981\u4EE5\u4E0B\u914D\u7F6E</p><ul><li>\u52FE\u9009 <code>Proxy &gt; macos proxy</code>,\u52FE\u9009\u540E\u5219\u53EF\u4EE5\u6355\u6349\u5230\u7F51\u7EDC\u8BF7\u6C42,\u4F46\u6B64\u65F6\u53EA\u662F\u6355\u6349\u5230\u4E86\u5E76\u4E0D\u80FD\u6B63\u5E38\u7ED9\u6211\u4EEC\u5C55\u793A</li><li>\u70B9\u51FB <code>Proxy &gt; SSL Proxy Settings</code>, \u6DFB\u52A0 <code>host: *</code> \u4EE5\u53CA <code>post: *</code> \u7684\u4E00\u6761\u89C4\u5219</li><li>\u70B9\u51FB <code>Help &gt; SSL Proxying &gt; install Charles Root Certificate</code> \u4F1A\u81EA\u52A8\u4E0B\u8F7D\u5B89\u88C5\u8BC1\u4E66 (\u5982\u51FA\u73B0\u4E0D\u53D7\u4FE1\u4EFB\u6807\u8BC6,\u9700\u8981\u8BBE\u7F6E\u4E3A\u5168\u4FE1\u4EFB)</li></ul><h3 id="\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42" tabindex="-1">\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42 <a class="header-anchor" href="#\u6355\u6349\u79FB\u52A8\u7AEF\u8BF7\u6C42" aria-hidden="true">#</a></h3><ul><li>\u79FB\u52A8\u8BBE\u5907\u4EE5\u53CA\u7535\u8111\u9700\u5728\u4E00\u4E2A\u5C40\u57DF\u7F51\u5185</li><li>pc\u7AEF\u70B9\u51FB <code>Help &gt; SSL Proxying &gt; install Charles Root Certificate on a Mobile Device or Remote Browser</code> \u4F1A\u6709\u5F39\u51FA\u6846</li><li>\u6309\u7167\u6846\u5185\u63D0\u793A,\u79FB\u52A8\u7AEF\u8BBE\u7F6EWIFI\u4EE3\u7406IP\u4EE5\u53CAHOST</li><li>\u79FB\u52A8\u7AEF\u6D4F\u89C8\u5668\u8BBF\u95EE\u6846\u5185\u63D0\u793A\u7684\u5730\u5740\u53BB\u4E0B\u8F7D\u8BC1\u4E66,\u5982: <code>chls.pro/ssl</code></li><li>\u4E0B\u8F7D\u5B8C\u6210\u540E\u5728\u8BBE\u7F6E\u4E2D\u53EF\u4EE5\u770B\u5230 <code>\u5DF2\u4E0B\u8F7D\u63CF\u8FF0\u6587\u4EF6</code>,\u70B9\u51FB\u8FDB\u5165\u5B89\u88C5\u521A\u4E0B\u8F7D\u7684\u63CF\u8FF0\u6587\u4EF6</li><li>\u5B89\u88C5\u597D\u540E\u8FDB\u5165 <code>\u8BBE\u7F6E &gt; \u901A\u7528 &gt; \u5173\u4E8E\u672C\u673A &gt; \u8BC1\u4E66\u4FE1\u4EFB\u8BBE\u7F6E</code>, \u5F00\u542F\u5BF9\u521A\u5B89\u88C5\u597D\u7684\u8BC1\u4E66\u7684\u5B8C\u5168\u4FE1\u4EFB</li><li>\u6B64\u65F6\u5C31\u53EF\u4EE5\u5728pc\u7AEF Charles \u770B\u5230\u79FB\u52A8\u7AEF\u7684\u8BF7\u6C42\u4FE1\u606F\u4E86</li></ul><h2 id="\u6CE8\u610F" tabindex="-1">\u6CE8\u610F <a class="header-anchor" href="#\u6CE8\u610F" aria-hidden="true">#</a></h2><ol><li>\u8BC1\u4E66\u4F1A\u8FC7\u671F\uFF0C\u5927\u6982\u5468\u671F\u662F\u4E00\u5E74\uFF0C\u5C4A\u65F6 Charles \u5C06\u4E0D\u80FD\u6B63\u5E38\u4F7F\u7528\uFF0C\u9700\u8981\u8003\u8651\u5230\u8BC1\u4E66\u7684\u66F4\u65B0</li><li>\u514D\u8D39\u7248\u7684\u8FDB\u5165\u4F1A\u670910s\u7B49\u5F85\uFF0C\u4EE5\u53CA\u4E0D\u80FD\u8FDE\u7EED\u4F7F\u752830\u5206\u949F</li></ol>',11),i=[t];function c(d,s,h,n,_,p){return a(),l("div",null,i)}const f=e(o,[["render",c]]);export{u as __pageData,f as default};
