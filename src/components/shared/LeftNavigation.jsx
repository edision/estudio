import React from 'react';
import { Navigation } from "qnui";
class LeftNavigation extends React.Component {
  render() {
    return (
      <Navigation style={this.props.style} type="tree" activeDirection="right" onClick={this.props.onitemclicked} selectedKey={this.props.selectedKey}>
        {this.props.items}
      </Navigation>
    );
  }
}

export default LeftNavigation;
