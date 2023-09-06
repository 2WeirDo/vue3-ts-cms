const modalConfig = {
  pageName: 'category',
  header: {
    newTitle: '新建类别',
    editTitle: '编辑类别'
  },
  formItems: [
    {
      type: 'input',
      label: '类别名称',
      prop: 'name',
      placeholder: '请输入类别名称'
    },
    {
      type: 'input',
      label: '类别介绍',
      prop: 'intro',
      placeholder: '请输入类别介绍'
    }
  ]
}

export default modalConfig
