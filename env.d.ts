/// <reference types="vite/client" />
// 点进去你会发现声明了很多东西, 这也解释了为什么main.ts引入.vue或者.css文件不报错

// 注意TS的volar插件可以让其认识.vue文件, 但我们还是要声明, 万一没安装了
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent
//   export default component
// }
declare module '*.mjs'
declare module 'underscore'
