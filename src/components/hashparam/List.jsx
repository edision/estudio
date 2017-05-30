
import React from 'react';
import { observer, inject } from 'mobx-react';
// qnui
import Search from "qnui/lib/search";
import Button from "qnui/lib/button";
import Icon from "qnui/lib/icon";
import Table from "qnui/lib/table";
import Pagination from 'qnui/lib/pagination';
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';

// components
import Edit from "./Edit";

const ButtonGroup = Button.Group;
const Toast = Feedback.toast;

const showLoading = () => Toast.loading('加载数据...');
const hideLoading = () => Toast.hide();

@inject("hashparam")
@observer
class List extends React.Component {
  componentDidMount() {
    this.props.hashparam.fetchParams();
  }

  state = {
    showEdit: false
  }

  currentRecord = null;
  editTitle = '';
  selectedKeys = [];

  handleSearch = value => {
    this.props.hashparam.filter = value.key;
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
          this.props.hashparam.removeParam()
        }
      });
  }
  handleEditDialogClose = () => this.setState({ showEdit: false });
  handlePageSizeChange = size => {
    const store = this.props.hashparam;
    store.pageSize = size;
    store.fetchParams();
  }
  handlePageChange = (value, e) => {
    const store = this.props.hashparam;
    store.pageIndex = value;
    store.fetchParams();
  }
  handleEditSubmit = values => {
    this.setState({ showEdit: false });
    if (this.currentRecord) {
      // 编辑
    } else {
      this.props.hashparam.createParam(values);     
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
    const {params, total, pageIndex, pageSize, filter} = this.props.hashparam;    
    return (
      <div className="inner-container">
        <Dialog title={this.editTitle} footer={false} visible={showEdit} onClose={this.handleEditDialogClose.bind(this)}>
          <Edit record={this.currentRecord} onSubmit={this.handleEditSubmit} />
        </Dialog>
        <Search onSearch={this.handleSearch} value={filter} placeholder="输入名称、别名、值..." searchText="搜索" type="normal" size="large" inputWidth={500} />
        <div className="inner-wrapper">
          <Button type="primary" onClick={this.handleAddClicked.bind(this)}><Icon type="add" />&nbsp;&nbsp;新增参数</Button>
          &emsp;
          <Button type="primary" shape="warning" onClick={this.handleRemoveSelected}><Icon type="close" /> 删除选中</Button>
        </div>
        <div className="inner-wrapper">
          <Table dataSource={params.slice()} primaryKey="_id" isZebra rowSelection={this.rowSelection}>
            <Table.Column title="序号" cell={this.renderIndex} width={70} />
            <Table.Column title="键" dataIndex="key" width={160} />
            <Table.Column title="值" dataIndex="value" />
            <Table.Column title="描述" dataIndex="desc" />
            <Table.Column title="操作" cell={this.renderRowOpers} />
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
