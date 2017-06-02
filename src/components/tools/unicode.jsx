import React from 'react';
import { Input, Grid, Button, Icon } from 'qnui';
import * as unicode from 'UTILS/unicode';

const Row = Grid.Row;
const Col = Grid.Col;

class UnicodeChsConvert extends React.Component {
  state = { inputValue: '', outputValue: '' };

  handleSrcChange = (value, e) => this.setState({ inputValue: value });
  handleDistChange = (value, e) => this.setState({ outputValue: value });
  handleToChs = e => {
    e.preventDefault();
    let outputValue = unescape(this.state.inputValue.replace(/\\/g, '%'));
    this.setState({ outputValue: outputValue });
  }

  handleToUnicode = e => {
    e.preventDefault();
    let outputValue = escape(this.state.inputValue).replace(/%/g, '\\');
    this.setState({ outputValue: outputValue });
  }

  handleAsciiToUnicode = e => {
    e.preventDefault();
    let outputValue = unicode.AsciiToUnicode(this.state.inputValue);
    this.setState({ outputValue: outputValue });
  }

  handleUnicodeToAscii = e => {
    e.preventDefault();
    let outputValue = unicode.UnicodeToAscii(this.state.inputValue);
    this.setState({ outputValue: outputValue });
  }

  handleClear = e => {
    e.preventDefault();
    this.setState({inputValue: '', outputValue: ''});
  }

  render() {
    const { inputValue, outputValue } = this.state;
    return (
      <div className="inner-container">
        <div>
          <h2>Unicode中文互转</h2>
          <p>1. 提供一个中文汉字Unicode互转、 ASCII与Unicode互转的在线工具，方便帮助你解决中文的乱码问题。</p>
          <p>2. 也许你还需要：UrlEncode编码 / UrlDecode解码（gbk, big5, utf8）</p>
        </div>
        <hr />
        <div className="inner-wrapper">
          <Row>
            <Col span="12">
              <Input multiple rows={10} style={{ width: '100%' }} placeholder="请输入待转换的中文或unicode编码..." value={inputValue} onChange={this.handleSrcChange} />
            </Col>
            <Col span="12">
              <Input multiple rows={10} style={{ width: '100%' }} placeholder="转换后的文本，可直接用于html" value={outputValue} onChange={this.handleDistChange} />
            </Col>
          </Row>
        </div>
        <div className="inner-wrapper">
          <Row>
            &emsp;
            <Button type="primary" onClick={this.handleToUnicode}>中文转Unicode</Button>
            &emsp;
            <Button type="primary" onClick={this.handleToChs}>Unicode转中文</Button>
            &emsp;
            <Button type="primary" onClick={this.handleAsciiToUnicode}>ASCII 转 Unicode</Button>
            &emsp;
            <Button type="primary" onClick={this.handleUnicodeToAscii}>Unicode 转 ASCII</Button>
            &emsp;
            <Button shape="warning" onClick={this.handleClear}><Icon type="ashbin" />清空</Button>
          </Row>
        </div>
      </div>
    );
  }
}

export default UnicodeChsConvert;
