const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单 (不可新建)'
  },
  propsList: [
    // 以下都不能加类型  否则会将原本类型覆盖掉(反正如果要展开那就不要加)
    { label: '菜单名称', prop: 'name', width: '150px' },
    { label: '级别', prop: 'type', width: '80px' },
    { label: '菜单url', prop: 'url', width: '200px' },
    { label: '菜单icon', prop: 'icon', width: '200px' },
    { label: '排序', prop: 'sort', width: '80px' },
    // 针对于按钮单独设置的权限管理 (例如增删改查其一)
    { label: '权限', prop: 'permission', width: '200px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' }
    // { type: 'handler', label: '操作', width: '150px' }
  ],
  childrenTree: {
    // row-key最重要(这里不支持连接符)
    rowKey: 'id',
    treeProps: {
      // 将自己的字段匹配为children, 如果是children就无所谓
      children: 'children'
    }
  }
}

export default contentConfig
