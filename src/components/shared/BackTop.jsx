import React from 'react';
import { Button, Icon } from 'qnui';

const styles = {
  backTop: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "64px",
    height: "64px",
    textAlign: "center",
    background: "#000",
    opacity: 0.7,
    borderRadius: 4,
    cursor: "hand"
  },
  p: {
    fontSize: "24px",
    marginTop: "8px"
  }
}

class BackTop extends React.PureComponent { // 使用PureComponent处理基本类型state，props比较
  state = { visible: false };

  componentDidMount() {
    window.onscroll = this.handleScroll;
  }

  handleScroll = e => {
    this.setState({ visible: window.pageYOffset > 100 });
  }

  handleBackTop = e => {
    e.preventDefault();
    window.scroll(0, 0);
  }

  render() {
    if (this.state.visible) {
      return (
        <div style={styles.backTop} onClick={this.handleBackTop}>
          <Icon type="arrow-up" size="large" />
          <p style={styles.p}>TOP</p>
        </div >
      );
    }
    return null;
  }
}

export default BackTop;
