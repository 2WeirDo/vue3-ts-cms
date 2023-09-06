export const contentTableConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '50' },
    { prop: 'newPrice', label: '新价格', minWidth: '50' },
    { prop: 'desc', label: '商品描述', minWidth: '100' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'imageSlot' },
    { prop: 'inventoryCount', label: '库存', minWidth: '60' },
    { prop: 'saleCount', label: '销量', minWidth: '60' },
    { prop: 'favorCount', label: '收藏', minWidth: '50' },
    { prop: 'address', label: '地址', minWidth: '50' },
    { type: 'timer', prop: 'createAt', label: '创建时间', minWidth: '130', slotName: 'create' },
    { type: 'timer', prop: 'updateAt', label: '更新时间', minWidth: '130', slotName: 'update' },
    { type: 'handler', label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
