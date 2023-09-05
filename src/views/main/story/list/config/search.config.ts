const searchConfig = {
  pageName: 'story',
  formItems: [
    {
      type: 'input',
      prop: 'title',
      label: '故事标题',
      placeholder: '请输入查询的故事标题',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'content',
      label: '故事内容',
      placeholder: '请输入查询的故事内容'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
