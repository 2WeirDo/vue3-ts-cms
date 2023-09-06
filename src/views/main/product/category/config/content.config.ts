export const contentTableConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建类别'
  },
  propsList: [
    { prop: 'name', label: '类别名称', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'create' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'update' },
    { type: 'handler', label: '操作', width: '150px' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
