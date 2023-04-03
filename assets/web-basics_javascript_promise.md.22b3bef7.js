import{_ as s,c as a,o as n,N as l}from"./chunks/framework.78c68b71.js";const C=JSON.parse('{"title":"promise","description":"","frontmatter":{},"headers":[],"relativePath":"web-basics/javascript/promise.md","lastUpdated":1675947121000}'),p={name:"web-basics/javascript/promise.md"},o=l(`<h1 id="promise" tabindex="-1">promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;promise&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>主要是为了解决回调地狱(多个串联的异步操作),在日常工作中主要是配合axios请求以及vuex中的一些操作</p><h2 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h2><ul><li>new promise内的语法是同步的,在.then()中的语句才是异步的,且是微队列</li><li>.then()返回状态之前new promise会返回一个promise实例,但是这个实例的状态会一直是padding</li><li>promise中如果不指定错误默认返回的都是reslove状态(直接throw error会退出执行)</li><li>promise.then .catch 这些返回的也是promise,如果不加状态也会默认为reslove状态</li><li>想要中断promise链式,返回空promise: new Promise(() =&gt; {})</li></ul><h2 id="静态方法" tabindex="-1">静态方法 <a class="header-anchor" href="#静态方法" aria-label="Permalink to &quot;静态方法&quot;">​</a></h2><ul><li>Promise.all([promiseA, promiseB]) 会等到这些promise全部有正确返回后才会触发回调,如果其中一个有错误会直接弹出错误信息,返回的是一个数组,记录的是各个promise的返回</li><li>Promise.allSettled([promiseA, promiseB]) 会等这些promise全部返回才会触发回调(不管其中是否有失败promise),返回的是一个数组,记录的是各个promise的状态以及返回</li><li>Promise.any([promiseA, promiseB]) 当其中的一个 promise 成功,就返回那个成功的promise的值,都不成功则返回undefined</li><li>Promise.race([promiseA, promiseB]) 当其中的一个 promise <code>成功或者失败</code>,就返回第一个先成功或者失败的promise状态以及值</li><li>Promise.reject 返回一个状态为失败的Promise对象</li><li>Promise.resolve 返回一个状态为成功的Promise对象</li></ul><h2 id="手写简易promise" tabindex="-1">手写简易promise <a class="header-anchor" href="#手写简易promise" aria-label="Permalink to &quot;手写简易promise&quot;">​</a></h2><p>参考 <a href="/blogs/writingcode/promise/core" rel="noreferrer">手写promise</a></p><h2 id="promise-任务调度" tabindex="-1">promise 任务调度 <a class="header-anchor" href="#promise-任务调度" aria-label="Permalink to &quot;promise 任务调度&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Scheduler</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">max</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">max</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">max</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">taskList</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 这里用到了 await 的闭包特性,使得每次执行的 fun 都是正确的</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">add</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fun</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">max</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">reslove</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">taskList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">reslove</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fun</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">--</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">taskList</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">taskList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">shift</span><span style="color:#F07178;">()()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 延迟函数</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> sleep </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">time</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;font-style:italic;">resolve</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(resolve</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> time))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 同时进行的任务最多2个</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scheduler </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Scheduler</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 添加异步任务 (模仿真实请求接口)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// time: 任务执行的时间</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// val: 参数</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> addTask </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">time</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">val</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">scheduler</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">sleep</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">val</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">addTask</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">addTask</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">500</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">addTask</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">300</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">addTask</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4</span></span>
<span class="line"></span></code></pre></div>`,11),e=[o];function t(r,c,y,F,i,D){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{C as __pageData,m as default};
