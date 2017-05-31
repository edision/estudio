import React from 'react';
import { observer, inject } from 'mobx-react';
// qnui
import { Search, Button, Icon, Pagination,Table,Menu,Dropdown } from 'qnui';
//
import * as mh from 'UTILS/mobxhelper';

@inject('image')
@observer
class ImageIndex extends React.Component {
  componentDidMount() {
    this.store.fetchImages();
  }

  store = this.props.image;

  handleSearch = value => console.log(value);
  handleAddClicked = e => console.log(e);
  handleRemoveSelected = e => console.log(e);
  handlePageChange = (pageIndex, e) => console.log(pageIndex, e);
  // table
  handleRowSelected = selectedKeys => console.log(selectedKeys);
  rowSelection = {
    onChange: this.handleRowSelected
  };
  renderTableIndex = (value, index, record, context) => index + 1;
  renderCellImage = (value, index, record, context) => <img src={record.imgUrl} alt={record.fileName} />;
  renderRowOpers = (value, index, record, context) => {
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
  handleEditCurrentRecord = (record) => console.log(record);
  handleRemoveCurrentRecord = (record) => console.log(record);

  render() {
    const { isFetching, images, pageIndex, pageSize, total } = this.store;
    return (
      <div className="inner-container">
        <Search hasClear onSearch={this.handleSearch} placeholder="输入图片名称、文件名..." searchText="搜索" type="normal" size="large" inputWidth={500} />
        <div className="inner-wrapper">
          <Button type="normal" onClick={this.handleAddClicked}><Icon type="add" />&nbsp;&nbsp;新增图片</Button>
          &emsp;
          <Button type="normal" onClick={this.handleRemoveSelected}><Icon type="close" /> 删除选中</Button>
          <div className="pull-right">
            <Pagination type="mini" total={10} current={1} pageSize={5} onChange={this.handlePageChange} />
          </div>
        </div>
        <div className="inner-wrapper">
          <Table dataSource={mh.toArray(images)} primaryKey="_id" isZebra rowSelection={this.rowSelection}>
            <Table.Column title="序号" cell={this.renderTableIndex} width={70} />
            <Table.Column title="图片" cell={this.renderCellImage} />
            <Table.Column title="名称" dataIndex="fileName" />
            <Table.Column title="类型" dataIndex="fileType" />
            <Table.Column title="操作" cell={this.renderRowOpers} width={120} />
          </Table>
        </div>
        <div className="inner-wrapper">
          <Pagination total={total} current={pageIndex} pageSize={pageSize} pageSizeSelector="dropdown" pageSizePosition="end" onChange={this.handlePageChange} onPageSizeChange={this.handlePageSizeChange} />
        </div>
      </div>
    );
  }
}

export default ImageIndex;
