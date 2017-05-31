
import React from 'react';
import { observer, inject } from 'mobx-react';
// qnui
import { Search, Button, Icon, Table, Pagination, Dialog, Menu, Dropdown } from "qnui";

// components
import Edit from "./Edit";
import LongTextWrapper from 'COMPONENTS/shared/LongTextWrapper';

import * as mobxHelper from 'UTILS/mobxhelper';

@inject("hashparam")
@observer
class List extends React.Component {
  store = this.props.hashparam;

  componentDidMount() {
    this.store.filter = '';
    this.store.fetchParams();
  }

  state = {
    showEdit: false
  }

  currentRecord = null;
  editTitle = '';
  selectedKeys = null;

  handleSearch = value => {
    this.store.filter = value.key;
    this.store.fetchParams();
  }
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
          if (this.store.removeParams(this.selectedKeys)) {
            this.selectedKeys = null;
          };
        }
      });
  }
  handleEditDialogClose = () => this.setState({ showEdit: false });
  handlePageSizeChange = size => {
    this.store.pageSize = size;
    this.store.pageIndex = 1;
    this.store.fetchParams();
  }
  handlePageChange = (value, e) => {
    this.store.pageIndex = value;
    this.store.fetchParams();
  }
  handleEditSubmit = values => {
    this.setState({ showEdit: false });
    if (this.currentRecord) {
      // 编辑
      this.store.updateParam(values);
    } else {
      this.store.createParam(values);
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
        this.store.removeParam(record._id);
      }
    });
  }

  onRowSelected = selectedKeys => this.selectedKeys = selectedKeys;

  rowSelection = {
    onChange: this.onRowSelected
  }
  renderIndex = (value, index, record) => {
    const { pageIndex, pageSize } = this.store;
    return (pageIndex - 1) * pageSize + index + 1;
  }

  renderCellValue = (value, index, record, context) => {
    return <LongTextWrapper text={record.value} colLen={50}/>  
  }

  renderCellDesc = (value, index, record, context) => {
    return <LongTextWrapper text={record.desc} colLen={50}/>    
  }

  renderRowOpers = (value, index, record) => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleEditCurrentRecord(record)}>编辑</Menu.Item>
        <Menu.Item key="2" onClick={this.handleRemoveCurrentRecord(record)}>删除</Menu.Item>
      </Menu>
    );
    const trigger = (
      <Button type="light">
        操作 <Icon type="arrow-down" />
      </Button>
    );
    return (
      <Dropdown trigger={trigger} triggerType="click">{menu}</Dropdown>
    );
  }

  render() {
    const { dlgTitle, showEdit } = this.state;
    const { isFetching, params, total, pageIndex, pageSize, filter } = this.store;
    // Table控件只能传入Array类型，加上Mobx的值不访问一次不会更新，因此在此手动map一次
    return (
      <div className="inner-container">
        <Dialog title={this.editTitle} footer={false} visible={showEdit} onClose={this.handleEditDialogClose.bind(this)}>
          <Edit record={this.currentRecord} onSubmit={this.handleEditSubmit} />
        </Dialog>
        <Search hasClear onSearch={this.handleSearch} value={filter} placeholder="输入名称、别名、值..." searchText="搜索" type="normal" size="large" inputWidth={500} />
        <div className="inner-wrapper">
          <Button type="normal" onClick={this.handleAddClicked.bind(this)}><Icon type="add" />&nbsp;&nbsp;新增参数</Button>
          &emsp;
          <Button type="normal" onClick={this.handleRemoveSelected}><Icon type="close" /> 删除选中</Button>
          <div className="pull-right">
            <Pagination type="mini" total={total} current={pageIndex} pageSize={pageSize} onChange={this.handlePageChange} />
          </div>
        </div>
        <div className="inner-wrapper">
          <Table isLoading={isFetching} dataSource={mobxHelper.toArray(params)} primaryKey="_id" isZebra rowSelection={this.rowSelection}>
            <Table.Column title="序号" cell={this.renderIndex} width={70} />
            <Table.Column title="键" dataIndex="key" width={160} />
            <Table.Column title="值" cell={this.renderCellValue} />
            <Table.Column title="描述" cell={this.renderCellDesc} />
            <Table.Column title="操作" cell={this.renderRowOpers} width={120}/>
          </Table>
        </div>
        <div className="inner-wrapper">
          <Pagination total={total} current={pageIndex} pageSize={pageSize} pageSizeSelector="dropdown" pageSizePosition="end" onChange={this.handlePageChange} onPageSizeChange={this.handlePageSizeChange} />
        </div>
      </div>
    );
  }
}

export default List;
