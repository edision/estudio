import React from 'react';
import { Navigation } from "qnui";
class LeftNavigation extends React.Component {
  render() {
    return (
      <Navigation style={this.props.style} type="tree" activeDirection="right">
        {this.props.items}
      </Navigation>
    );
  }
}

export default LeftNavigation;
