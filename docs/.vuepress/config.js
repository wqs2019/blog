module.exports = {
    title: '前端小时',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      nav:[ // 导航栏配置
        {text: '首页', link: '/' },
        {
            text: '算法题库',
            items: [
              { text: 'LeetCode 刷题记录', link: '/algorithm/' },
            ]
        } ,
        {text: '博客文章', link: '/blog/' },
      ],
      sidebar: 'auto', // 侧边栏配置
      sidebarDepth: 2, // 侧边栏显示2级
      lastUpdated: 'Last Updated', // string | boolean
      editLinkText: '帮助我们改善此页面！',
      smoothScroll: true
    },
    serviceWorker: false, // 是否开启 PWA
    plugins: [
      'vuepress-plugin-dehydrate',
      {
        // 禁用 SSR
        noSSR: '*',
      },
    ],
  };


