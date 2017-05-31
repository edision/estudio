import React from 'react';
import { Button } from 'qnui';
class LongTextWrapper extends React.Component {
  state = {
    collapse: true
  }

  handleMore = () => {
    this.setState({ collapse: false });
  }

  handleCollapse = () => {
    this.setState({ collapse: true });
  }

  render() {
    const { collapse } = this.state;
    const { text, colLen } = this.props;
    if (text.length <= colLen) {
      return (
        <div>
          {text.split('\n').map((item, index) => <span key={index}>{item}<br /></span>)}
        </div>
      )
    }
    if (collapse) {
      return (
        <div>
          {text.substring(0, colLen).split('\n').map((item, index) => <span key={index}>{item}<br /></span>)}
          <Button type="primary" shape="text" onClick={this.handleMore}>展开&gt;&gt;</Button>
        </div>
      );
    }
    return (
      <div>
        {text.split('\n').map((item, index) => <span key={index}>{item}<br /></span>)}
        <Button type="primary" shape="text" onClick={this.handleCollapse}>折叠&lt;&lt;</Button>
      </div>
    );
  }
}

export default LongTextWrapper;
