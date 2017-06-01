import React from 'react';
import {Input} from 'qnui';

class UnicodeChsConvert extends React.Component {
  render() {
    
    return (
      <div className="inner-container">
        <div>
          <h3>Unicode中文互转</h3>
          <p>&emsp;实现Unicode与中文之间的相互转换功能，用户可根据需要输入中文或Unicode编码，点击下方对应按钮实现转换对应Unicode编码与中文的功能。</p>
        </div>
        <div className="inner-wrapper">
<Input multiple rows={10} />
        </div>
      </div>
    );
  }
}

export default UnicodeChsConvert;
