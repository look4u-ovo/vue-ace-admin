const globalConfig: any = {
  // 默认语言. zhCN: 简体中文  enUS: 英文
  defaultLanguage: 'zhCN',
  appTitle: 'Ace Admin',
  // 组件方向 具体支持方向切换的组件请参考antd
  direction: 'ltr',
  // 布局
  layout: 'default',
  // 水印相关
  watermark: {
    isShow: true,
    font: {
      fontSize: 16,
      // color: 'rgba(0,0,0,.15)',
      fontWeight: 'bold'
    },
    content: ['Ace Admin', 'By AceLin'],
    zIndex: 11,
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: []
  }
}
export default globalConfig
