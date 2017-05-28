import React from 'react';
import Navigation from "qnui/lib/navigation";
import Icon from "qnui/lib/icon";

class TopNavigation extends React.Component {
  render() {
    return (
      <Navigation type="filling" activeDirection="bottom" onClick={this.props.onitemclicked} selectedKey={this.props.selectedKey}>
        <li className="navigation-logo-zone">
          <Icon type="all" />
          <span>{this.props.title}</span>
        </li>
        {this.props.items}
        <li className="navigation-toolbar">
          <ul>
            <li>
              <Icon type="atm" />
              <span>帮助</span>
            </li>
            <li>
              <Icon type="set" />
              <span>设置</span>
            </li>
          </ul>
        </li>
      </Navigation>
    );
  }
}

export default TopNavigation;