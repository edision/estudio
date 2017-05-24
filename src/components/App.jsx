import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react"
// components
if (DEBUG) var DevTools = require("mobx-react-devtools").default;
import Navigation, { Item, Group } from "qnui/lib/navigation";
import Icon from "qnui/lib/icon";
import Menu from "qnui/lib/menu";
//shared
import Loading from "COMPONENTS/shared/Loading";
import NavItem from "COMPONENTS/shared/NavItem";
//菜单
import HashParamList from "COMPONENTS/hashparam/List";
import ComplexParamList from "COMPONENTS/complexparam/List";

const routes = {
  "1-0": "/",
  "1-0-1": "/Params/Hash",
  "1-0-2": "/Params/Complex"
};

@withRouter
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedKey: "1-0-1" };// Navigation控件与Menu结合使用不会切换selectedKey,需要外部控制
  }

  handleNavItemClick = (id, item) => {
    this.setState({ selectedKey: id });
    if (routes[id]) {
      this.props.history.push(routes[id])
    }
  }

  render() {
    let rootKey = this.state.selectedKey.split('-').slice(0, 2).join('-');

    return (
      <div>
        {DEBUG && <DevTools />}
        <div className="top">
          <Navigation type="filling" activeDirection="bottom" onClick={this.handleNavItemClick} selectedKey={rootKey}>
            <li className="navigation-logo-zone">
              <Icon type="all" />
              <span>EStudio</span>
            </li>
            <Item key="1-0" icon="text" text="参数管理" />
          </Navigation>
        </div>
        <div className="middle">
          <div className="left-fixed-right-auto">
            <div className="left">
              <Navigation style={{ maxWidth: '200px' }} type="tree" activeDirection="right" onClick={this.handleNavItemClick} selectedKey={this.state.selectedKey}>
                {/*<li className="qn-navigation-vertical">
                <Icon type="text" />
                <span>参数管理</span>
              </li>*/}
                <Item key="1-0-1" text="哈希参数" />
                <Item key="1-0-2" text="复合参数" />
              </Navigation>
            </div>
            <div className="content-container">
             <div className="inner">
               <Route exact path="/" component={HashParamList} />
              <Route path="/Params/Hash" component={HashParamList} />
              <Route path="/Params/Complex" component={ComplexParamList} />
             </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          底部
          </div>

      </div>
    );
  }
}

export default App;
