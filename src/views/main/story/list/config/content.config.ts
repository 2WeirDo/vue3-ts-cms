export const contentTableConfig = {
  pageName: 'story',
  header: {
    title: '故事列表'
  },
  propsList: [
    { prop: 'title', label: '故事标题', minWidth: '120' },
    { prop: 'content', label: '我的故事', minWidth: '500' },
    { type: 'timer', prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'create' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
