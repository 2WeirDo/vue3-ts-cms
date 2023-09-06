export const searchFormConfig = {
  pageName: 'goods',
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '商品名称',
      placeHolder: '请输入商品名称',
      rules: []
    },
    {
      prop: 'address',
      type: 'input',
      label: '商品地址',
      placeHolder: '请输入商品地址',
      rules: []
    },
    {
      prop: 'enable',
      type: 'select',
      label: '状态',
      placeHolder: '请选择状态',
      rules: [],
      options: [
        { label: '可用', value: 1 },
        { label: '下架', value: 0 }
      ]
    },
    {
      prop: 'createAt',
      type: 'date-picker',
      label: '创建时间',
      rules: [],
      otherOption: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 }
}
