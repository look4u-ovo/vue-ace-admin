<script lang="ts" setup>
defineOptions({
  name: 'DefaultLayout'
})
import globalConfig from '@/config/system/appConfig'
import FooterView from '@/layouts/components/footer/FooterView.vue'
import MainView from '@/layouts/components/main/index.vue'
import HeaderView from '@/layouts/components/header/HeaderView.vue'
import SettingVue from '@/layouts/components/setting/SettingView.vue'
import { useAppStore } from '@/stores/modules/app'
import SidebarView from '@/layouts/components/sidebar/SidebarView.vue'

const app = useAppStore()
</script>
<template>
  <a-watermark v-bind="{ ...globalConfig.watermark, content: app.getWaterMarkContent }">
    <a-layout style="height: 100vh; min-width: 375px">
      <SidebarView />
      <a-layout>
        <HeaderView />
        <a-layout-content class="layout-content">
          <MainView />
        </a-layout-content>
        <FooterView />
      </a-layout>
      <SettingVue />
    </a-layout>
  </a-watermark>
</template>
