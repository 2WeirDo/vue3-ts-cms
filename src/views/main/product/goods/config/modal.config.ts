const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'title',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '商品介绍',
      prop: 'content',
      placeholder: '请输入商品信息'
    }
  ]
}

export default modalConfig
