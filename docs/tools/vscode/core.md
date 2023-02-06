# vscode
设置的代码配置
``` js
{
  "workbench.iconTheme": "material-icon-theme", // 文件图标
  // 编辑器配置
  "editor.codeActionsOnSave": { // 在保存时运行的代码操作类型
    "source.fixAll.eslint": true // eslint保存时修复
  },
  "editor.formatOnSave": false, // 保存时自动格式化
  "editor.colorDecorators": true, // 编辑器是否显示内联颜色修饰器和颜色选取器
  "editor.copyWithSyntaxHighlighting": true, // 在复制时是否同时复制语法高亮
  "editor.emptySelectionClipboard": true, // 在没有选择内容时进行复制,是否复制当前行
  "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.tabSize": 2, // 缩进为两格
  // 全局文件相关配置
  "files.associations": { // 根据后缀定义文件类型
    "*.vue": "vue",
    "*.wxss": "css",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  "files.autoSave": "off", // 文件自动保存
  // 不同类型文件的配置
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // javascript/typescript语言配置
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false, // 格式化函数括号前前加空格
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  // 终端配置
  // "terminal.explorerKind": "external",
  // "terminal.external.windowsExec": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", // html部分格式化工具
  // vetur插件配置
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "prettyhtml": {
      "printWidth": 120,
      "singleQuote": false,
      "wrapAttributes": false,
      "sortAttributes": false
    },
    "prettier": {
      "printWidth": 120,
    }
  },
  // settings-sync插件配置
  "sync.gist": "5d2759803837d24a95cef768c3d8e5d7",
  "sync.removeExtensions": true,
  "sync.syncExtensions": true,
  "sync.autoDownload": false,
  "sync.autoUpload": false,
  // wxml插件配置
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  // minapp插件配置
  "minapp-vscode.disableAutoConfig": true,
  "sync.forceUpload": false,
  "editor.fontSize": 16,
  "workbench.sideBar.location": "right",
  "workbench.startupEditor": "newUntitledFile",
  "workbench.colorTheme": "One Dark Pro",
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "workbench.editor.untitled.hint": "hidden",
  "security.workspace.trust.untrustedFiles": "open",
  "diffEditor.ignoreTrimWhitespace": false,
  "typescript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "leek-fund.fundSort": 2,
  "leek-fund.funds": [
    "159857"
  ],
  "leek-fund.stockRemindSwitch": 0,
  "leek-fund.statusBarStock": [],
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "vetur.validation.template": false,
  "vetur.ignoreProjectWarning": true,
  "workbench.editor.splitInGroupLayout": "vertical",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "liveServer.settings.donotShowInfoMsg": true,
  "vite.autoStart": false,
}
```