<script lang="tsx" setup>
import { Table } from 'ant-design-vue'
import type { IData, IProps } from './type'
defineOptions({
  inheritAttrs: false
})
const props = withDefaults(defineProps<IProps>(), {
  isZebra: 'none',
  useCardWrapper: true
})
type TableSlotsType = InstanceType<typeof Table>['$slots']
defineSlots<{ toolbar(): any } & TableSlotsType>()
const attrs = useAttrs()
const propsData = computed(() => ({ ...attrs, ...props.tableProps }))
const slots = useSlots()
const slotNames = Object.keys(slots) as []
const initWrapper = () => (props.useCardWrapper ? 'a-card' : 'div')
const setRowClassName = (_record: any, index: number) => {
  const isEven = index % 2 === 0
  return (props.isZebra === 'even' && isEven) || (props.isZebra === 'odd' && !isEven) ? 'table-striped' : undefined
}
</script>
<template>
  <component :is="initWrapper()">
    <a-flex gap="small" vertical>
      <!-- 工具栏插槽 -->
      <div class="table-toolbar">
        <slot name="toolbar" />
      </div>
      <a-table class="ant-table-striped" v-bind="propsData" :row-class-name="setRowClassName">
        <template v-for="(slot, index) of slotNames" :key="index" #[slot]="data:IData">
          <slot :name="slot" v-bind="data" />
        </template>
      </a-table>
    </a-flex>
  </component>
</template>
<style scoped>
[data-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #f6f6f6;
}

[data-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29 29 29);
}
</style>
