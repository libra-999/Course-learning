type AnyTypeModule = any

declare module "markdown-it" {
   const MarkdownIT: any
   export default MarkdownIT
}

declare module "element-plus/es/locales.mjs" {
   export const en: any
   export const zhCn: any
   export const km: any
}