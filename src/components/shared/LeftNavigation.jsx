import React from 'react';
import { Navigation, Icon } from "qnui";
class LeftNavigation extends React.Component {
  render() {
    return (
      <Navigation style={this.props.style} type="tree" activeDirection="right" leaf="arrow-up">
        {this.props.items}
      </Navigation>
    );
  }
}

export default LeftNavigation;
