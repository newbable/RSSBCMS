import React, { Component } from 'react'
import {
  Table, Input, InputNumber, Popconfirm, Form,Card,Button
} from 'antd'
import XLSX from 'xlsx'

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    caseNumber: `浙执 ${i}号`,
    caseReason: ``,
    date: ``,
    register:`xxx`,
    undertake:`xx公司`,
  });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow)


class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default class Download extends Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: '案号',
        dataIndex: 'caseNumber',
        editable: true,
      },
      {
        title: '案由',
        dataIndex: 'caseReason',
        editable: true,
      },
      {
        title: '立案日期',
        dataIndex: 'date',
        editable: true,
      },
      {
        title: '立案人',
        dataIndex: 'register',
        editable: true,
      },
      {
        title: '承办部门',
        dataIndex: 'undertake',
        editable: true,
      },
      {
        title: '编辑',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确认取消?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleExports=()=>{
    const title=this.columns.map(item=>item.title)
    title.pop()
    const data=this.state.data.reduce((result,item)=>{
      const row=[item.caseNumber,item.caseReason,item.date,item.register,item.undertake]
      result.push(row)
      return result
    },[])
    data.unshift(title)
    const ws=XLSX.utils.aoa_to_sheet(data);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"SheetJS");
    XLSX.writeFile(wb,"案件信息.xlsx")
  }
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    })
    return (
      <div>
        <Card
      title="批量处理统计表"
      extra={<Button onClick={this.handleExports}>导出Excel</Button>}
      bordered={false}
    >
    </Card>
        <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          hideOnSinglePage:true,
          pageSize:10,
          pageSizeOptions:['10','20','25','30','50'],
          showTotal:(total)=>{
            return total
          },
          showSizeChanger:true
        }}
      />
      </div>
    )
  }
}
