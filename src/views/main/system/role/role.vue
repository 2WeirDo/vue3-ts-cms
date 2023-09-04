<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <!-- 这里是一个插槽, 是一个菜单树 -->
      <!-- 每个具体属性可以去官网看, @check也是官网的事件, 每当点击复选框触发 -->
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          highlight-current
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/stores/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系
// 这就是之前封装的hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 将editCallback传递给usePageModal
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})

// @check会传递两个参数, 第一个参数是一个完整对象
// 第二个参数包含4个东西checkedKeys和halfCheckedKeys分别是
// 当前点击的id和父级的id, 所以我们就可以拿到这两个id了
// 这样我们可以层层递进, 直至拿到更多选择的id
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(data2.checkedKeys)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

// 拿到itemData.menulist将其设为tree的默认值就行了,
// 这样你编辑角色的时候就可以回显你之前选择的权限了
function editCallback(itemData: any) {
  // nextTick的作用是等待弹窗显示出来才能将数据放上去
  // 也就是等待 DOM 更新完成
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    // setCheckedKeys也是官网的方法: 设置目前选中的节点
    // 要加node-key="id"这个属性(官方要求)
    // 将menuList所有id放到setCheckedKeys里
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
