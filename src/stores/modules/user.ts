/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-10-30 20:49:23
 * @Description:
 */
import { useRouteStore } from './route'
import { useTabsStore } from './tabs'
import router from '@/router'
import { loginApi } from '@/views/user/login/api'
import { addRoutes } from '@/router/routerHelp'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<ILoginData>({ token: '', menus: [] })
  const getToken = computed(() => token.value)
  // const { openDB, put, deleteData } = useIndexedDB()

  // 初始化
  function init() {
    token.value = ''
    userInfo.value = { menus: [], token: '' }
    useRouteStore().init()
    useTabsStore().init()
    // await openDB('my-database', 1, 'routes')
    // await deleteData('routes', 'backendRoutes')
  }

  // 登录
  async function login(form: ILoginForm) {
    const res = await loginApi<ILoginData, ILoginForm>(form)
    console.log('res', res)
    if (!res.data) return
    token.value = res.data.token
    userInfo.value = res.data || {}
    // 转换后端路由信息并添加到路由实例
    // await useRouteStore().setRoutes()
    useRouteStore().routes = userInfo.value.menus
    await addRoutes(useRouteStore().routes)
    // 打开数据库并保存路由信息到 IndexedDB
    // await openDB('my-database', 1, 'routes')
    // await put('routes', 'backendRoutes', useRouteStore().getRoutes)
    await router.push('/dashboard')
  }

  // 退出登录
  async function logout() {
    await router.push({ name: 'login', replace: true })
    init()
  }

  return { token, userInfo, getToken, login, logout }
})
