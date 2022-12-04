import{_ as t,c as d,o as e,d as a}from"./app.502a3a89.js";const f=JSON.parse('{"title":"axios\u4E8C\u6B21\u5C01\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4ECB\u7ECD","slug":"\u4ECB\u7ECD","link":"#\u4ECB\u7ECD","children":[]},{"level":2,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528","link":"#\u4F7F\u7528","children":[]},{"level":2,"title":"\u76EE\u5F55","slug":"\u76EE\u5F55","link":"#\u76EE\u5F55","children":[]},{"level":2,"title":"\u529F\u80FD","slug":"\u529F\u80FD","link":"#\u529F\u80FD","children":[]}],"relativePath":"tools/axios/index.md","lastUpdated":null}'),i={name:"tools/axios/index.md"},l=a('<h1 id="axios\u4E8C\u6B21\u5C01\u88C5" tabindex="-1">axios\u4E8C\u6B21\u5C01\u88C5 <a class="header-anchor" href="#axios\u4E8C\u6B21\u5C01\u88C5" aria-hidden="true">#</a></h1><p><a href="https://github.com/M-cheng-web/axios-packaging" target="_blank" rel="noreferrer">\u9879\u76EE\u5730\u5740 https://github.com/M-cheng-web/axios-packaging</a></p><h2 id="\u4ECB\u7ECD" tabindex="-1">\u4ECB\u7ECD <a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a></h2><p>\u57FA\u4E8Eaxios\u7684\u4E8C\u6B21\u5C01\u88C5,\u80FD\u9002\u5E94\u5927\u90E8\u5206\u9879\u76EE\u7684\u8BF7\u6C42\u9700\u8981(\u6700\u8D77\u7801\u6211\u662F\u8FD9\u6837\u60F3\u7684,\u554A\u54C8\u54C8)<br> \u672C\u4EBA\u4F1A\u57FA\u4E8E\u9879\u76EE\u7684\u5B9E\u9645\u9700\u8981\u6765\u518D\u6B21\u66F4\u65B0\u6B64\u5C01\u88C5,\u6216\u662F\u56E0\u4E3A\u5728\u4F7F\u7528\u4E2D\u53D1\u73B0\u5C01\u88C5\u65B9\u5F0F\u5F71\u54CD\u5230\u6548\u7387\u548C\u6269\u5C55\u4E5F\u4F1A\u518D\u6B21\u66F4\u65B0\u5C01\u88C5</p><h2 id="\u4F7F\u7528" tabindex="-1">\u4F7F\u7528 <a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a></h2><p>\u6B64\u5C01\u88C5\u53EA\u7528\u5230\u4E86axios,\u4E0D\u9700\u8981\u5176\u4ED6\u63D2\u4EF6 \u76F4\u63A5\u5C06\u6B64\u9879\u76EEclone\u81F3\u672C\u5730,\u6839\u636E\u9700\u8981\u53EF\u4EE5\u5C06\u9879\u76EE\u5185http\u6587\u4EF6\u5939\u79FB\u5165\u4F60\u7684\u9879\u76EE \u4F7F\u7528\u65B9\u5F0F:</p><ol><li>\u901A\u8FC7Vue\u5B9E\u4F8B\u65B9\u5F0F\u5168\u5C40\u4F7F\u7528</li><li>\u76F4\u63A5\u5728\u9875\u9762\u5F15\u5165<code>http_interceptor.js</code>\u5185\u7684\u76EE\u6807axios\u5B9E\u4F8B\u4EE5\u53CA<code>api.js</code>\u4F7F\u7528</li><li>\u5982\u679C\u4E0D\u5F15\u5165\u9879\u76EE\u53EA\u662F\u60F3\u770B\u4E00\u4E0B\u529F\u80FD,\u53EF\u4EE5\u76F4\u63A5<code>npm i</code>+<code>webpack</code>\u547D\u4EE4,\u7136\u540E\u6253\u5F00<code>build/index.html</code>\u5C31\u80FD\u770B\u5230\u6548\u679C</li></ol><p><strong>\u6CE8\u610F</strong></p><ol><li>\u901A\u8FC7Vue\u5B9E\u4F8B\u4F7F\u7528\u65F6\u53EF\u4EE5\u901A\u8FC7\u8C03\u7528\u65F6\u4F20\u5165\u7684config\u53C2\u6570\u6765\u8986\u76D6\u5176\u4ED6\u5DF2\u5B9A\u4E49\u7684\u529F\u80FD</li><li>\u901A\u8FC7Vue\u5B9E\u4F8B\u4F7F\u7528\u65F6 http -&gt; index.js\u6587\u4EF6\u5185\u662F\u53EA\u8003\u8651\u5230get\u548Cpost\u8BF7\u6C42</li><li>\u6B64\u5C01\u88C5\u9ED8\u8BA4\u63A5\u53E3\u8FD4\u56DE\u7684\u683C\u5F0F\u662F { data: { info: &#39;\u6211\u662F\u4FE1\u606F&#39;, errorInfo: &#39;\u6211\u662F\u9519\u8BEF\u4FE1\u606F&#39;, success: true }, message: &#39;\u6210\u529F&#39;, messageCode: 200 }</li><li>\u5728\u4F7F\u7528\u6B64\u5C01\u88C5\u4E4B\u524D\u8981\u5148\u548C\u540E\u7AEF\u786E\u5B9A\u597D\u63A5\u53E3\u8FD4\u56DE\u683C\u5F0F</li></ol><h2 id="\u76EE\u5F55" tabindex="-1">\u76EE\u5F55 <a class="header-anchor" href="#\u76EE\u5F55" aria-hidden="true">#</a></h2><ul><li>--&gt; http - \u6838\u5FC3\u5C01\u88C5\u6587\u4EF6\u5939,\u53EF\u4EE5\u76F4\u63A5\u628A\u8FD9\u4E2A\u6587\u4EF6\u5939\u632A\u81F3\u4F60\u7684\u672C\u5730\u9879\u76EE <ul><li>--&gt; http_axios.js - \u8D1F\u8D23\u521B\u5EFAaxios\u9ED8\u8BA4\u914D\u7F6E\u548Caxios\u5BF9\u8C61</li><li>--&gt; http_cacheRequest.js - \u8D1F\u8D23\u8BF7\u6C42\u6570\u636E\u7F13\u5B58,\u53EF\u6839\u636E\u81EA\u5DF1\u9700\u8981\u6539\u4E3A\u7F13\u5B58\u5728vuex\u5185(\u76EE\u524D\u7F13\u5B58\u5728localStorage)</li><li>--&gt; http_cancelRequest.js - \u8D1F\u8D23\u8BF7\u6C42\u53D6\u6D88</li><li>--&gt; http_interceptor.js - \u8D1F\u8D23\u8BF7\u6C42\u62E6\u622A,\u5C06\u5176\u4ED6\u529F\u80FD\u4E00\u5E76\u5F15\u5165\u6B64\u6587\u4EF6\u5E76\u653E\u5165\u62E6\u622A\u5668\u5185</li><li>--&gt; http_config.js - \u8D1F\u8D23\u914D\u7F6E\u5168\u5C40\u53C2\u6570</li><li>--&gt; http_utils.js - \u8D1F\u8D23\u521B\u5EFA\u5176\u4ED6\u6587\u4EF6\u9700\u8981\u7528\u5230\u7684\u5DE5\u5177\u51FD\u6570</li><li>--&gt; index.js - \u8D1F\u8D23\u521B\u5EFA\u5C01\u88C5\u597D\u7684axios\u51FD\u6570\u5E76\u653E\u5165Vue\u539F\u578B\u94FE\u4E2D</li></ul></li><li>--&gt; index.js - \u4F7F\u7528\u793A\u4F8B</li><li>--&gt; api.js - api\u793A\u4F8B</li></ul><h2 id="\u529F\u80FD" tabindex="-1">\u529F\u80FD <a class="header-anchor" href="#\u529F\u80FD" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u8BF4\u660E</th><th>\u7C7B\u578B</th><th>\u53EF\u9009\u503C</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>url</td><td>\u8BF7\u6C42\u5730\u5740</td><td>string</td><td>\u2014</td><td>\u2014</td></tr><tr><td>method</td><td>\u8BF7\u6C42\u65B9\u5F0F</td><td>string</td><td>GET / POST</td><td>GET</td></tr><tr><td>white</td><td>\u662F\u5426\u767D\u540D\u5355(\u8BBE\u7F6E\u767D\u540D\u5355\u7684\u63A5\u53E3\u5931\u8D25\u65F6\u4E0D\u505A\u4EFB\u4F55\u5904\u7406)</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>withOut</td><td>\u662F\u5426\u9700\u8981\u63A5\u53E3\u7684config\u6570\u636E</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>cancel</td><td>\u662F\u5426\u9700\u8981\u8BF7\u6C42\u91CD\u590D\u53D6\u6D88</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>cancelTime</td><td>\u8BBE\u5B9A\u4E00\u5B9A\u65F6\u95F4\u5185\u53D1\u751F\u76F8\u540C\u8BF7\u6C42\u4F1A\u88AB\u53D6\u6D88</td><td>number</td><td>\u2014</td><td>1000</td></tr><tr><td>loading</td><td>\u662F\u5426\u663E\u793Aloading</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>httpCache</td><td>get\u8BF7\u6C42\u662F\u5426\u9700\u8981\u6D4F\u89C8\u5668\u7F13\u5B58</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>cache</td><td>\u662F\u5426\u9700\u8981\u7F13\u5B58\u63A5\u53E3\u8FD4\u56DE\u7684\u6570\u636E</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>cacheExpire</td><td>\u6B64\u63A5\u53E3\u6570\u636E\u7684\u7F13\u5B58\u65F6\u95F4(\u8FC7\u671F\u540E\u4F1A\u91CD\u65B0\u8BF7\u6C42)</td><td>number</td><td>\u2014</td><td>10000</td></tr><tr><td>retry</td><td>\u63A5\u53E3\u9519\u8BEF\u65F6\u91CD\u8FDE\u6B21\u6570 - 0\u8868\u793A\u4E0D\u91CD\u8FDE</td><td>number</td><td>\u2014</td><td>0</td></tr><tr><td>paramsSerial</td><td>\u662F\u5426post\u8BF7\u6C42\u53C2\u6570\u5E8F\u5217\u5316</td><td>boolean</td><td>true / false</td><td>false</td></tr><tr><td>withCredentials</td><td>\u8DE8\u57DF\u8BF7\u6C42\u65F6\u662F\u5426\u5728\u8BF7\u6C42\u4E2D\u643A\u5E26cookie</td><td>boolean</td><td>true / false</td><td>false</td></tr></tbody></table><p><strong>\u6CE8\u610F</strong></p><ol><li>\u8BBE\u7F6E\u8BF7\u6C42\u7F13\u5B58\u65F6,\u5982\u679C\u662Fget\u8BF7\u6C42\u4E14\u8BBE\u7F6E\u4E86\u53C2\u6570\u81EA\u52A8\u6DFB\u52A0\u65F6\u95F4\u6233,\u4F1A\u5728\u5B58\u53D6\u8BF7\u6C42\u7F13\u5B58\u6570\u636E\u7684\u65F6\u5019\u5FFD\u7565\u65F6\u95F4\u6233\u53C2\u6570(\u56E0\u4E3A\u5B83\u4EEC\u7684\u65F6\u95F4\u6233\u662F\u4E0D\u4E00\u6837\u7684\u4F1A\u5BFC\u81F4\u62FF\u4E0D\u5230\u503C),\u8FD9\u4E00\u70B9\u5728\u4F60\u9700\u8981\u81EA\u5B9A\u4E49\u8BF7\u6C42\u7F13\u5B58\u662F\u9700\u8981\u4E86\u89E3\u7684,\u4E0D\u4F1A\u5BFC\u81F4\u65F6\u95F4\u6233\u53C2\u6570\u5931\u6548,\u5E73\u65F6\u4F7F\u7528\u662F\u65E0\u611F\u7684</li><li>\u4F7F\u7528\u524D\u5C3D\u91CF\u4E86\u89E3<code>http_config.js</code>\u6587\u4EF6\u5185\u7684\u53C2\u6570\u610F\u4E49,\u907F\u514D\u91CD\u590D\u5B9A\u4E49\u4EE5\u53CA\u672A\u77E5\u95EE\u9898(\u4F8B\u5982\u65F6\u95F4\u8BBE\u7F6E\u592A\u5C11\u53EF\u80FD\u4F1A\u5F15\u8D77\u51B2\u7A81)</li><li>loading\u529F\u80FD\u9700\u8981\u6839\u636E\u4F60\u9879\u76EE\u4F7F\u7528UI\u6765\u81EA\u5B9A\u4E49,\u6211\u8FD9\u91CC\u662F\u5047\u7684</li></ol>',15),r=[l];function o(s,n,h,c,p,u){return e(),d("div",null,r)}const _=t(i,[["render",o]]);export{f as __pageData,_ as default};
