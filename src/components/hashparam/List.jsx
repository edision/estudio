import React from 'react';
// qnui
import Search from "qnui/lib/search";
import Button from "qnui/lib/button";
import Icon from "qnui/lib/icon";
import Table from "qnui/lib/table";
import Pagination from 'qnui/lib/pagination';
import Dialog from 'qnui/lib/dialog';

// components
import Edit from "./Edit";

const ButtonGroup = Button.Group;

const data = [
  { id: 1, desc: "敏感词", key: "sensiveinfo", value: "习近平,文革,最好" },
  { id: 2, desc: "表User序号", key: "User.Id", value: "10" }
];

class List extends React.Component {
  state = {
    showEdit: false
  }

  currentRecord = null;
  editTitle = '';
  selectedKeys = [];

  handleSearch = value => console.log(value);
  handleAddClicked = () => {
    this.editTitle = '新增参数'
    this.currentRecord = null;
    this.setState({ showEdit: true })
  }
  handleRemoveSelected = () => {
    if (this.selectedKeys && this.selectedKeys.length > 0)
      Dialog.confirm({
        content: '确认删除选中项？',
        onOk: () => {
          // return new Promise(resolve => {
          //   console.log(this.selectedKeys);
          //   resolve();
          // })
          console.log(this.selectedKeys);
        }
      });
  }
  handleEditDialogClose = () => this.setState({ showEdit: false });
  handlePageSizeChange = size => console.log(size);
  handleEditSubmit = values => {
    console.log(values);
    this.setState({ showEdit: false });
    if (this.currentRecord) {
      // 编辑
    } else {
      values.id = Math.random();
      data.push(values);
    }
  }

  // 列表项操作按钮
  handleEditCurrentRecord = record => () => {
    this.currentRecord = record;
    this.editTitle = "编辑参数"
    this.setState({ showEdit: true });
  }
  handleRemoveCurrentRecord = record => () => {
    Dialog.confirm({
      content: `确定删除参数: ${record.key}?`,
      onOk: () => {
        console.log(record);
      }
    });
  }

  onRowSelected = selectedKeys => this.selectedKeys = selectedKeys;

  rowSelection = {
    onChange: this.onRowSelected
  }
  renderIndex = (value, index, record) => index + 1;
  renderRowOpers = (value, index, record) => {
    return (
      <ButtonGroup size="small">
        <Button type="primary" onClick={this.handleEditCurrentRecord(record)}>编辑</Button>
        <Button type="primary" shape="warning" onClick={this.handleRemoveCurrentRecord(record)}>删除</Button>
      </ButtonGroup>
    );
  }

  render() {
    const { dlgTitle, showEdit } = this.state;
    return (
      <div className="inner-container">
        <Dialog title={this.editTitle} footer={false} visible={showEdit} onClose={this.handleEditDialogClose.bind(this)}>
          <Edit record={this.currentRecord} onSubmit={this.handleEditSubmit} />
        </Dialog>
        <Search onSearch={this.handleSearch} placeholder="输入名称、别名、值..." searchText="搜索" type="normal" size="large" inputWidth={500} />
        <div className="inner-wrapper">
          <Button type="primary" onClick={this.handleAddClicked.bind(this)}><Icon type="add" />&nbsp;&nbsp;新增参数</Button>
          &emsp;
          <Button type="primary" shape="warning" onClick={this.handleRemoveSelected}><Icon type="close" /> 删除选中</Button>
        </div>
        <div className="inner-wrapper">
          <Table dataSource={data} primaryKey="id" isZebra rowSelection={this.rowSelection}>
            <Table.Column title="序号" cell={this.renderIndex} dataIndex="id" width={70} />
            <Table.Column title="键" dataIndex="key" width={160} />
            <Table.Column title="值" dataIndex="value" />
            <Table.Column title="描述" dataIndex="desc" />
            <Table.Column title="操作" cell={this.renderRowOpers} />
          </Table>
        </div>
        <div className="inner-wrapper">
          <Pagination total={data.length} pageSizeSelector="dropdown" pageSizePosition="end" onPageSizeChange={this.handlePageSizeChange} />
        </div>
      </div>
    );
  }
}

export default List;
