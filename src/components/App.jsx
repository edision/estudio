import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react"
// components
if (DEBUG) var DevTools = require("mobx-react-devtools").default;
import { Navigation, Menu, Icon } from "qnui";
//shared
import Loading from "COMPONENTS/shared/Loading";
import TopNavigation from "COMPONENTS/shared/TopNavigation";
import LeftNavigation from "COMPONENTS/shared/LeftNavigation";
//菜单
import HashParamList from "COMPONENTS/hashparam/List";
import ComplexParamList from "COMPONENTS/complexparam/List";
import ImageIndex from "COMPONENTS/image/Index";
import UnicodeChs from "COMPONENTS/tools/crypt/unicode";

const Item = Navigation.Item;

const routes = [
  { path: "/", key: "1-0", name: "参数管理", icon: "text", parent: false },
  { path: "/Params/Hash", key: "1-0-1", name: "哈希参数", parent: "1-0" },
  { path: "/Params/Complex", key: "1-0-2", name: "复合参数", parent: "1-0" },
  { path: "/Content/Image", key: "2-0", name: "内容管理", icon: "image-text", parent: false },
  { path: "/Content/Image", key: "2-0-1", name: "图片管理", parent: "2-0" },
  { path: "/tools", key: "3-0", name: "开发工具", icon: "box", parent: false },
  { path: "/tools/crypt", key: "3-0-1", name: "加密/解密", parent: "3-0", isMenu: true },
  { path: "/tools/crypt/unicode", key: "3-0-1-1", name: "Unicode中文转换", parent: "3-0-1" }
];

const styles = {
  leftNav: { maxWidth: "200px" }
};

@withRouter
@observer
class App extends React.Component {
  state = { selectedKey: "1-0-1", parentKey: '1-0', topSelectedKey: "1-0" };

  handleTopNavItemClick = (key, item) => {
    const selectedKey = `${key}-1`;
    let route = routes.find(r => r.key === selectedKey);
    if (route) {
      const parent = routes.find(r => r.key === route.parent);
      let topKey = key;
      if (parent && parent.isMenu) {
        topKey = parent.parent;
      }
      this.setState({ selectedKey: selectedKey, parentKey: key, topSelectedKey: topKey });
      this.props.history.push(route.path);
    }
  }

  handleLeftNavItemClick = (key, item) => {
    const route = routes.find(r => r.key === key);
    if (route) {
      const parent = routes.find(r => r.key === route.parent);
      let topKey = route.parent;
      if (parent && parent.isMenu) {
        topKey = parent.parent;
      }
      this.setState({
        selectedKey: key,
        parentKey: route.parent,
        topSelectedKey: topKey
      });

      this.props.history.push(route.path);
    }
  }

  renderTopNav = () => {
    const { selectedKey, parentKey } = this.state;
    return routes.filter(r => !r.parent).map(r => {
      const subMenu = routes.filter(sub => sub.isMenu && sub.parent === r.key);
      if (subMenu.length > 0) {
        return (
          <Item key={r.key} icon={r.icon} text={r.name}>
            <Menu>
              {subMenu.map(sub => <Menu.Item key={sub.key} onClick={this.handleTopNavItemClick}>{sub.name}</Menu.Item>)}
            </Menu>
          </Item>);
      }
      else return <Item selected={r.key === parentKey} key={r.key} icon={r.icon} text={r.name} onClick={this.handleTopNavItemClick} />;
    });
  }

  renderLeftNav = () => {
    const { parentKey, selectedKey } = this.state;
    const parent = routes.find(r => r.key === parentKey);
    if (parent.isMenu) {
      return (
        <Item key={parent.key} text={parent.name} opened>
          <Navigation>
            {routes.filter(r => r.parent === parentKey).map(r => <Item selected={r.key === selectedKey} key={r.key} text={r.name} onClick={this.handleLeftNavItemClick} />)}
          </Navigation>
        </Item>
      );
    }
    return routes.filter(r => r.parent === parentKey).map(r => <Item selected={r.key === selectedKey} key={r.key} text={r.name} onClick={this.handleLeftNavItemClick} />);
  };

  render() {
    let topItems = this.renderTopNav();
    let leftItems = this.renderLeftNav();

    return (
      <div className="main container">
        {DEBUG && <DevTools />}
        <header className="header">
          <TopNavigation title="EStudio" defaultSelectedKey={this.state.topSelectedKey} items={topItems} />
        </header>
        <div className="main-container">
          <aside className="sidebar-container">
            <LeftNavigation style={styles.leftNav} items={leftItems} />
          </aside>
          <section className="content-container">
            <Route exact path="/" component={HashParamList} />
            <Route path="/Params/Hash" component={HashParamList} />
            <Route path="/Params/Complex" component={ComplexParamList} />
            <Route path="/Content/Image" component={ImageIndex} />
            <Route path="/Tools/Crypt" component={UnicodeChs} />            
          </section>
        </div>
      </div>
    );
  }
}

export default App;
