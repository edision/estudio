import React from 'react';
import {Navigation,Icon} from "qnui";

class TopNavigation extends React.Component {
  render() {
    return (
      <Navigation type="filling" activeDirection="bottom" defaultSelectedKey={this.props.defaultSelectedKey}>
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
