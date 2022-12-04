import{_ as o,c as l,a as e,t as c,b as a,d,o as s}from"./app.502a3a89.js";const G=JSON.parse('{"title":"MVVM\u603B\u7ED3","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7B80\u4ECB","slug":"\u7B80\u4ECB","link":"#\u7B80\u4ECB","children":[]},{"level":2,"title":"\u9879\u76EE\u8FD0\u884C","slug":"\u9879\u76EE\u8FD0\u884C","link":"#\u9879\u76EE\u8FD0\u884C","children":[]},{"level":2,"title":"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","slug":"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","link":"#\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","children":[]},{"level":2,"title":"\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58?","slug":"\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58","link":"#\u4EC0\u4E48\u662F\u8BA1\u7B97\u5C5E\u6027\u7F13\u5B58","children":[]},{"level":2,"title":"\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","slug":"\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","link":"#\u6838\u5FC3\u6982\u5FF5\u4E86\u89E3","children":[{"level":3,"title":"Object.defineProperty","slug":"object-defineproperty","link":"#object-defineproperty","children":[]},{"level":3,"title":"Watcher","slug":"watcher","link":"#watcher","children":[]},{"level":3,"title":"dep\u4F9D\u8D56\u6536\u96C6\u5668","slug":"dep\u4F9D\u8D56\u6536\u96C6\u5668","link":"#dep\u4F9D\u8D56\u6536\u96C6\u5668","children":[]},{"level":3,"title":"\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","slug":"\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","link":"#\u7BA1\u7406\u5168\u5C40\u552F\u4E00\u7684\u6536\u96C6\u6808","children":[]},{"level":3,"title":"targetStack","slug":"targetstack","link":"#targetstack","children":[]}]},{"level":2,"title":"\u5404\u4E2A\u6A21\u5757\u89E3\u6790","slug":"\u5404\u4E2A\u6A21\u5757\u89E3\u6790","link":"#\u5404\u4E2A\u6A21\u5757\u89E3\u6790","children":[{"level":3,"title":"index.js","slug":"index-js","link":"#index-js","children":[]},{"level":3,"title":"observer.js","slug":"observer-js","link":"#observer-js","children":[]},{"level":3,"title":"computed.js","slug":"computed-js","link":"#computed-js","children":[]},{"level":3,"title":"watcher.js","slug":"watcher-js","link":"#watcher-js","children":[]},{"level":3,"title":"watch.js","slug":"watch-js","link":"#watch-js","children":[]},{"level":3,"title":"compile.js","slug":"compile-js","link":"#compile-js","children":[]}]}],"relativePath":"web-basics/vue/mvvm.md","lastUpdated":1670155339000}'),r={name:"web-basics/vue/mvvm.md"},n=d("",4),p=e("li",null,"\u6A21\u62DF Vue,\u901A\u8FC7\u521B\u5EFA Vue\u5B9E\u4F8B\u5BF9\u8C61\u7684\u65B9\u5F0F\u5B8C\u6210\u6570\u636E\u7684\u6E32\u67D3\u4EE5\u53CA\u53CC\u5411\u7ED1\u5B9A\u7684\u914D\u7F6E",-1),i=e("li",null,"watch\u76D1\u542C(\u53EF\u4EE5\u62FF\u5230\u65B0\u503C\u65E7\u503C)",-1),h=e("li",null,"data\u503C\u6E32\u67D3\u9875\u9762",-1),u=e("li",null,"computed\u5C5E\u6027\u6E32\u67D3\u5230\u9875\u9762",-1),b=e("li",null,"computed\u5C5E\u6027\u7F13\u5B58",-1),_=e("li",null,"computed\u5C5E\u6027\u6CA1\u7528\u5230\u65F6\u4E0D\u4F1A\u8BA1\u7B97",-1),D=e("li",null,"computed\u5C5E\u6027\u4F9D\u8D56\u4E8E\u591A\u91CD\u5C5E\u6027(\u8BA1\u7B97\u5C5E\u6027A = \u8BA1\u7B97\u5C5E\u6027B + dataA, \u8BA1\u7B97\u5C5E\u6027B = dataB + dataC)",-1),v=e("li",null,"methods\u65B9\u6CD5",-1),m=e("h2",{id:"\u9879\u76EE\u8FD0\u884C",tabindex:"-1"},[a("\u9879\u76EE\u8FD0\u884C "),e("a",{class:"header-anchor",href:"#\u9879\u76EE\u8FD0\u884C","aria-hidden":"true"},"#")],-1),g=e("ol",null,[e("li",null,[a("vscode\u5185\u4E0B\u8F7D"),e("code",null,"Live Server"),a("\u63D2\u4EF6")]),e("li",null,[a("\u9879\u76EE\u62C9\u5230\u672C\u5730\u540E\u70B9\u5F00 www => index.html,\u53F3\u952E\u9009\u62E9"),e("code",null,"Open With Live Server")])],-1),w=e("h2",{id:"\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32",tabindex:"-1"},[a("\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32 "),e("a",{class:"header-anchor",href:"#\u5173\u4E8E\u6A21\u677F\u5B57\u7B26\u4E32","aria-hidden":"true"},"#")],-1),A=e("br",null,null,-1),y=e("br",null,null,-1),C=e("br",null,null,-1),j=e("a",{href:"https://github.com/M-cheng-web/vue-sound-mustache",target:"_blank",rel:"noreferrer"},"https://github.com/M-cheng-web/vue-sound-mustache",-1),k=d("",43),F=e("br",null,null,-1),f=e("code",null,"v-model",-1),B=e("code",null,"v-on:click",-1),x=e("code",null,"v-on:click",-1),T=e("br",null,null,-1),S=e("code",null,"v-model",-1),V=e("code",null,"watcher",-1),M=e("code",null,"watcher",-1),P=e("br",null,null,-1),O=d("",2);function E(t,I,N,q,$,R){return s(),l("div",null,[n,e("ul",null,[p,i,h,u,b,_,D,v,e("li",null,"v-model "+c(t.data)+" v-on \u529F\u80FD\u7684\u7B80\u5355\u5B8C\u6210",1)]),m,g,w,e("p",null,[a("\u5185\u90E8\u7684 v-model,\u4E8B\u4EF6\u4EE5\u53CA\u6A21\u677F\u5B57\u7B26\u4E32\u7684\u5B9E\u73B0\u53EF\u4EE5\u5148\u4E0D\u7528\u5728\u610F(\u8FD9\u91CC\u53EA\u662F\u7B80\u5355\u5E94\u7528,\u5E76\u4E0D\u662Fvue\u5B9E\u9645\u5B9E\u73B0\u65B9\u5F0F)"),A,a(" \u5EFA\u8BAE\u76F4\u63A5\u770B compole.js\u4E2DcompileText() \u4EE5\u53CA compileModel()\u65B9\u6CD5"),y,a(" \u8FD9\u4FE9\u4E2A\u65B9\u6CD5\u662F\u5C06 v-model='title' \u4EE5\u53CA "+c(t.title)+" \u4E2D\u7684title\u8F6C\u5316\u4E3A\u5B9E\u9645\u503C\u5E76\u4E14\u6E32\u67D3\u9875\u9762\u7684\u5173\u952E\u65B9\u6CD5",1),C,a(" \u5982\u679C\u5BF9\u6A21\u677F\u5B57\u7B26\u4E32\u611F\u5174\u8DA3\u7684\u8BDD\u53EF\u4EE5\u53C2\u8003\u6211\u5173\u4E8E\u8FD9\u4E00\u5757\u7684\u6E90\u7801\u5B9E\u73B0 "),j]),k,e("p",null,[a("html\u9875\u9762\u7684\u529F\u80FD\u5B9E\u73B0,\u4E3B\u8981\u5B9E\u73B0\u4E86v-model,v-on,"+c(t.title)+"\u6A21\u677F\u5B57\u7B26\u4E32\u529F\u80FD",1),F,a(" \u5BF9\u9875\u9762DOM\u505A\u4E86\u5904\u7406,\u4F7F\u5176\u53EF\u4EE5\u652F\u6301\u7C7B\u4F3C\u4E8Evue\u7684 "),f,a(),B,a(",\u540C\u6837\u4E5F\u5BF9\u8FD9\u4E9B\u65B9\u6CD5\u8FDB\u884C\u4E86\u4E8B\u4EF6\u7ED1\u5B9A \u6BD4\u5982\u4F7F\u7528\u4E86 "),x,a("\u4F1A\u76D1\u542C\u90A3\u4E2A\u5143\u7D20\u7684\u70B9\u51FB\u4E8B\u4EF6,\u89E6\u53D1\u540E\u4F1A\u6267\u884C\u76EE\u6807\u65B9\u6CD5"),T,a(" \u6BD4\u5982\u4F7F\u7528\u4E86 "),S,a("\u4F1A\u4E3A\u5176\u521B\u5EFA\u4E00\u4E2A "),V,a(" \u5B9E\u4F8B\u5E76\u6807\u660E\u6B64\u662F\u6E32\u67D3\u51FD\u6570,\u7136\u540E\u4F1A\u6267\u884C\u5185\u90E8\u7684 update\u65B9\u6CD5\u4F7F\u4F9D\u8D56\u5C5E\u6027\u7684dep\u4E2D\u5B58\u653E\u6B64 "),M,P]),e("p",null,[a("\u540C\u7406\u4E00\u822C\u7684\u8BA1\u7B97\u5C5E\u6027\u6216\u8005data\u503C\u653E\u5728\u9875\u9762\u4E2D\u901A\u8FC7 "),e("code",null,c(t.name),1),a(" \u7684\u65B9\u5F0F\u4E5F\u4F1A\u88AB\u68C0\u6D4B\u5230\u6B64DOM\u5143\u7D20\u9700\u8981\u5C06name\u8F6C\u5316\u4E3A\u771F\u5B9E\u503C,\u5728\u8F6C\u5316\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u5F97\u5230\u771F\u5B9Ename \u7684\u503C,\u540C\u65F6\u4E5F\u4F1A\u5C06\u4E0B\u9762\u7684\u66F4\u6539DOM\u5143\u7D20textContent\u65B9\u6CD5\u66B4\u9732\u51FA\u53BB,\u4EE5\u4FBF\u5728\u503C\u53D1\u751F\u53D8\u5316\u540E\u80FD\u6267\u884C\u6B64\u65B9\u6CD5\u6765\u6539\u53D8\u9875\u9762\u7684\u503C")]),O])}const L=o(r,[["render",E]]);export{G as __pageData,L as default};
