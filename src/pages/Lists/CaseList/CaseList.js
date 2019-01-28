import React, { Component } from 'react'
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import './CaseList.less'

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps}/>
    </Resizable>
  );
};
export default class CaseList extends Component {
  state = {
    columns: [{
      title: '案号',
      dataIndex: 'date'
      // width: 200,
    }, {
      title: '立案日期',
      dataIndex: 'amount'
    }, {
      title: '申请人',
      dataIndex: 'type'
    }, {
      title: '被执行人',
      dataIndex: 'note'
    }, {
      title:'承办人',
      dataIndex:''
    },{
      title:'法定执照',
      dataIndex:''
    },{
      title:'简易/普通',
      dataIndex:''
    },{
      title:'备注',
      dataIndex:''
    },{
      title: '操作',
      key: 'action',
      render: () => (
        <a href="j#">Delete</a>
      ),
    }],
  };
  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  data = [{
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  }, {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  }, {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  }];
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    
   
    return (
      <div>
        在办案件列表
        <Table
        bordered
        components={this.components}
        columns={columns}
        dataSource={this.data}
      />
      </div>
    )
  }
}
