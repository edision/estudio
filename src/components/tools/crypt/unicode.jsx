import React from 'react';
import { Input, Grid, Button } from 'qnui';
const Row = Grid.Row;
const Col = Grid.Col;

class UnicodeChsConvert extends React.Component {
  state = { inputValue: '', outputValue: '' };

  handleSrcChange = (value, e) => this.setState({ inputValue: value });
  handleDistChange = (value, e) => this.setState({ outputValue: value });
  handleToChs = e => {
    e.preventDefault();
    let outputValue = unescape(this.state.inputValue.replace(/\\/g, '%'));
    this.setState({outputValue: outputValue});
  }

  handleToUnicode = e => {
    e.preventDefault();   
    let outputValue = escape(this.state.inputValue).replace(/%/g, '\\');
    this.setState({outputValue: outputValue});
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
            <Button onClick={this.handleToUnicode}>中文转Unicode</Button>
            &emsp;
            <Button onClick={this.handleToChs}>Unicode转中文</Button>
          </Row>
        </div>
      </div>
    );
  }
}

export default UnicodeChsConvert;
