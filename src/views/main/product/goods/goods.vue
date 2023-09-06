<template>
  <div class="goods">
    <h3>关于商品的各种操作由于后端未写接口, 所以不能测试</h3>
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :contentConfig="contentTableConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #imageSlot="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
  text-shadow: 1px 1px darkgray;
  text-align: center;
}
</style>
