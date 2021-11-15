export default function () {
  return [{
    key: "selection",
    title: "员工工号",
    width: 60,
    fixed: "left",
    sortable: true
  }, {
    key: "id",
    title: "员工姓名",
    width: 100,
    fixed: "left",
    sort: true,
    tooltip: true
  }, {
    key: "name",
    title: "职位名称",
    width: 100,
    sort: true,
  }, {
    key: "employee_education",
    title: "教育/文化",
    width: 360,
  }, {
    key: "employee_education",
    title: "教育/文化",
    width: 360,
  }, {
    key: "employee_education",
    title: "教育/文化",
  }, {
    title: "操作",
    key: "action",
    action: true,
    width: 80,
    render: (h, params) => {
      let curData = params.row;
      return h("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, [
        h(
          "Button", {
          props: {
            type: "primary",
            size: "small"
          },
          style: {
            marginLeft: '10px'
          },
          on: {
            click: () => {
              this.toModifyPage(curData.id)
            }
          }
        },
          "查看"
        )
      ]);
    }
  }]
}
