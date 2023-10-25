import { addRoutes } from '@/router/routerHelp'
import { backendRoutesApi } from '@/views/user/login/api'
import type { RouteRecordRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMenuStoreWithOut = defineStore('counter', () => {
  const menuList = ref<any[]>([])
  const getMenuList = computed(() => menuList.value)
  async function setMenuList() {
    const res = await backendRoutesApi()
    addRoutes(res.data)
    menuList.value = res.data as RouteRecordRaw[]
  }
  function init() {
    menuList.value = []
  }

  return { menuList, setMenuList, getMenuList, init }
})
