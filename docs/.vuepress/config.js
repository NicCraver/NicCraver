const { description } = require("../../package");

module.exports = {
  title: "Nic | Y",
  description: description,
  head: [
    ["link", { rel: "icon", href: "/yy.ico" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ]
  ],
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "分类",
        items: [
          {
            text: "前端",
            items: [
              { text: "Js", link: "/js/" },
              { text: "Vue", link: "/vue/" },
              { text: "Electron", link: "/electron/" },
              { text: "Axios", link: "/axios/" }
            ]
          },
          {
            text: "VsCode",
            items: [{ text: "VsCode", link: "/vscode/" }]
          },
          {
            text: "其他",
            items: [{ text: "Other", link: "/other/" }]
          }
        ]
      },
      {
        text: "关于",
        link: "/about/"
      },
      {
        text: "GitHub",
        link: "https://github.com/NicCraver"
      },
      {
        text: "VuePress",
        link: "https://v1.vuepress.vuejs.org"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: ["", "using-vue"]
        }
      ],
      "/vue/": [
        {
          title: "Vue Markdown 语法",
          collapsable: false,
          children: [""]
        },
        {
          title: "Vue",
          collapsable: false,
          children: ["vue1","vue3", "vue4", "vue5", "vue6"]
        }
      ]
    },
    sidebarDepth: 1,
    lastUpdated: "最后更新时间",
    serviceWorker: {
      updatePopup: true // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是:
      // updatePopup: {
      //    message: "New content is available.",
      //    buttonText: "Refresh"
      // }
    }
  },
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    "@vuepress/active-header-links",
    "@vuepress/last-updated"
  ]
};
