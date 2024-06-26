/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-10-25 21:53:39
 * @Description:
 */
interface Props {
  title: string
  key: string
  closable?: boolean
  content?: string
}

type TypeProps = 'all' | 'other' | 'cur'
type Key = string | number
export const useTabsStore = defineStore('tabs', () => {
  // 所有的标签页
  const tabList = ref<Props[]>([])
  // 当前标签页
  const activeKey = ref('/dashboard')
  const getTabList = computed<Props[]>(() => tabList.value)
  const router = useRouter()
  // 存放组件name用于缓存
  const cacheTabs = ref<Array<string>>([])
  const getCacheTabs = computed(() => cacheTabs.value)

  // 刷新tab时先清除后添加
  async function refreshTab(name: string, cb: () => Promise<void>) {
    const index = cacheTabs.value.findIndex((i) => i === name)
    cacheTabs.value.splice(index, 1)
    await cb()
    cacheTabs.value.push(name)
  }

  // 初始化时设置需要缓存的Tabs
  function setCacheTabs() {
    cacheTabs.value = []
    router.getRoutes().forEach((i) => i.meta.isCache && cacheTabs.value.push(i.name as string))
  }

  function clickTab(key: Key) {
    router.push(key as string)
  }

  function addTab(tab: Props) {
    tabList.value.push(tab)
  }

  const gotoLastPage = async () => {
    activeKey.value = tabList.value?.at(-1)?.key as string
    await router.push(activeKey.value)
  }

  async function deleteTab(type: TypeProps, key: string) {
    switch (type) {
      case 'all':
        tabList.value = tabList.value.filter((i) => i.key === '/dashboard')
        await gotoLastPage()
        break
      case 'other':
        tabList.value = tabList.value.filter((i) => i.key === '/dashboard' || i.key === key)
        break
      default:
        tabList.value = tabList.value.filter((i) => i.key !== key)
        break
    }
    if (activeKey.value === key) {
      await gotoLastPage()
    }
  }

  function init() {
    tabList.value = []
  }

  return {
    refreshTab,
    cacheTabs,
    tabList,
    addTab,
    getTabList,
    deleteTab,
    init,
    activeKey,
    clickTab,
    getCacheTabs,
    setCacheTabs
  }
})
