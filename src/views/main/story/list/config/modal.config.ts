const modalConfig = {
  pageName: 'story',
  header: {
    newTitle: '新建故事',
    editTitle: '编辑故事'
  },
  formItems: [
    {
      type: 'input',
      label: '故事标题',
      prop: 'title',
      placeholder: '请输入故事标题'
    },
    {
      type: 'input',
      label: '我的故事',
      prop: 'content',
      placeholder: '请输入你的故事'
    }
  ]
}

export default modalConfig
