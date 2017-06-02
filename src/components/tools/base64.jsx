import React from 'react';
import { Input, Grid, Button, Icon } from 'qnui';
import * as base64 from 'UTILS/base64';

const { Row, Col } = Grid;

class Base64 extends React.Component {
  state = { inputValue: '', outputValue: '' };

  handleInputChange = (value, e) => this.setState({ inputValue: value });
  handleOutputChange = (value, e) => this.setState({ outputValue: value });
  handleEncode = e => {
    e.preventDefault();
    let outputValue = base64.encode(this.state.inputValue);
    this.setState({ outputValue: outputValue });
  }
  handleDecode = e => {
    e.preventDefault();
    let outputValue = base64.decode(this.state.inputValue);
    this.setState({ outputValue: outputValue });
  }
  handleClear = e => {
    e.preventDefault();
    this.setState({ inputValue: '', outputValue: '' });
  }
  render() {
    const { inputValue, outputValue } = this.state;
    return (
      <div className="inner-container">
        <div>
          <h2>BASE64编码</h2>
          <p>&emsp;&emsp;Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用‘=’，因此编码后输出的文本末尾可能会出现1或2个‘=’。</p>
          <p>&emsp;&emsp;为了保证所输出的编码位可读字符，Base64制定了一个编码表，以便进行统一转换。编码表的大小为2^6=64，这也是Base64名称的由来。</p>
        </div>
        <hr />
        <div className="inner-wrapper">
          <Row>
            <Col span="12">
              <Input multiple rows={10} style={{ width: '100%' }} placeholder="请输入..." value={inputValue} onChange={this.handleInputChange} />
            </Col>
            <Col span="12">
              <Input multiple rows={10} style={{ width: '100%' }} placeholder="转换结果" value={outputValue} onChange={this.handleOutputChange} />
            </Col>
          </Row>
        </div>
        <div className="inner-wrapper">
          <Row>
            &emsp;
            <Button type="primary" onClick={this.handleEncode}>BASE64编码</Button>
            &emsp;
            <Button type="primary" onClick={this.handleDecode}>BASE64解码</Button>
            &emsp;
            <Button shape="warning" onClick={this.handleClear}><Icon type="ashbin" />清空</Button>
          </Row>
        </div>
      </div>
    );
  }

}

export default Base64;
