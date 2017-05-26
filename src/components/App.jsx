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
import TopNavigation from "COMPONENTS/shared/TopNavigation";
import LeftNavigation from "COMPONENTS/shared/LeftNavigation";
//菜单
import HashParamList from "COMPONENTS/hashparam/List";
import ComplexParamList from "COMPONENTS/complexparam/List";

const routes = [
  { path: "/", key: "1-0", name: "参数管理", icon: "text", parent: false },
  { path: "/Params/Hash", key: "1-0-1", name: "哈希参数", parent: "1-0" },
  { path: "/Params/Complex", key: "1-0-2", name: "复合参数", parent: "1-0" }
];

const styles = {
  leftNav: { maxWidth: "200px" }
};

@withRouter
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedKey: "1-0-1" };// Navigation控件与Menu结合使用不会切换selectedKey,需要外部控制
  }

  handleNavItemClick = (key, item) => {
    this.setState({ selectedKey: key });
    let route = routes.find(r => r.key === key);
    if (route) {
      this.props.history.push(route.path)
    }
  }

  render() {
    let rootKey = this.state.selectedKey.split('-').slice(0, 2).join('-');
    let topItems = routes.filter(r => !r.parent).map(r => <Item key={r.key} icon={r.icon} text={r.name} />);
    let leftItems = routes.filter(r => r.parent === rootKey).map(r => <Item key={r.key} text={r.name} />);

    return (
      <div>
        {DEBUG && <DevTools />}
        <div className="top">
          <TopNavigation items={topItems} title="EStudio" onitemclicked={this.handleNavItemClick} selectedKey={rootKey} />
        </div>
        <div className="middle">
          <div className="left-fixed-right-auto">
            <div className="left">
              <LeftNavigation style={styles.leftNav} items={leftItems} onitemclicked={this.handleNavItemClick} selectedKey={this.state.selectedKey} />
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
        {/*<div className="bottom">
          底部
        </div>*/}
      </div>
    );
  }
}

export default App;
