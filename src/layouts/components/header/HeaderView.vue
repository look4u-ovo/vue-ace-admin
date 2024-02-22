<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-10-14 21:29:57
 * @Description:
-->
<script lang="ts" setup>
import BreadcrumbView from '@/layouts/components/header/components/Breadcrumb/BreadCrumb.vue'
import FullScreen from '@/layouts/components/header/components/FullScreen/FullScreen.vue'
import LangSelect from '@/layouts/components/header/components/LangSelect/LangSelect.vue'
import PersonTool from '@/layouts/components/header/components/PersonTool/PersonTool.vue'
import ThemeSwitch from '@/layouts/components/header/components/ThemeSwitch/ThemeSwitch.vue'
import { useAppStore } from '@/stores/modules/app'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import useConfig from '@/layouts/composables/useConfig'

const app = useAppStore()
const { headerConfig } = useConfig()
const config = computed(() => headerConfig.value)
</script>

<template>
  <a-layout-header class="custom-layout layout-header">
    <div class="header-view">
      <div class="header-view-left">
        <div v-if="config.mode === 'inline'" class="header-view-item">
          <menu-unfold-outlined v-if="app.collapsed" class="trigger" @click="app.toggleCollapsed" />
          <menu-fold-outlined v-else class="trigger" @click="app.toggleCollapsed" />
        </div>
        <div v-if="config.showBreadcrumb" class="header-view-item breadcrumb">
          <BreadcrumbView />
        </div>
        <template v-if="config.showLogo">
          <slot name="logo"></slot>
        </template>
        <slot></slot>
      </div>
      <div class="header-view-right">
        <!-- 全屏 -->
        <div class="header-view-item">
          <FullScreen />
        </div>
        <div class="header-view-item">
          <LangSelect />
        </div>
        <div class="header-view-item">
          <ThemeSwitch />
        </div>
        <div class="header-view-item">
          <PersonTool />
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  padding: 0;
}

.header-view {
  display: flex;
  justify-content: space-between;

  &-left {
    gap: 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }

  &-right {
    padding-right: 10px;
    gap: 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }

  &-item {
    display: flex;
    align-items: center;

    :deep(.anticon) {
      font-size: 16px;
    }

    cursor: pointer;
  }

  .breadcrumb {
    font-size: 14px;
  }

  .trigger {
    font-size: 1.3em;
    line-height: 1.3em;
  }
}
</style>