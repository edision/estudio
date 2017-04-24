import React from "react";
/* import { Route, withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react"
// components
if (DEBUG) var DevTools = require("mobx-react-devtools").default;
import Navigation, { Item, Group } from "qnui/lib/navigation";
import Icon from "qnui/lib/icon";
import Menu from "qnui/lib/menu";
//
import Loading from "COMPONENTS/Loading";
import MultiPrint from "COMPONENTS/MultiPrint";
import PrintSetting from "COMPONENTS/PrintSetting";
import SenderList from "COMPONENTS/setting/SenderList";
import ExpressTemplateList from "COMPONENTS/setting/ExpressTemplateList";
import InvoiceTemplate from "COMPONENTS/setting/InvoiceTemplate";

const NavItem = ({ url, icon, text }) => (<li className="next-navigation-item next-navigation-item-align-center">
  <div className="next-navigation-item-content">
    <Link className="next-navigation-item-content-inner" to={url}>
      <Icon className="next-navigation-item-icon next-navigation-item-custom-icon" type={icon} />
      <span className="next-navigation-item-text">{text}</span>
    </Link>
  </div>
</li>);

const routes = {
  "1-0": "/multiprint",
  "2-0-1": "/senderlist",
  "2-0-2": "/expresstemplates",
  "2-0-3": "/invoicetemplate"
}

@withRouter
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedKey: "1-0"};// Navigation控件与Menu结合使用不会切换selectedKey,需要外部控制
  }  

  handleNavItemClick = (id, item) => { 
    this.setState({selectedKey: id});
    if (routes[id]) { 
      this.props.history.push(routes[id])
    }
  }

  render() {
    return (
      <div>
        {DEBUG && <DevTools />}
        <Navigation type="filling" activeDirection="bottom" onClick={this.handleNavItemClick} selectedKey={this.state.selectedKey}>
          <li className="navigation-logo-zone">
            <img src="/images/logo.png" alt="logo" />
          </li>
          <Item key="1-0" icon="print" text="订单打印" />
          <Item key="2-0" text="打单配置" icon="set">
            <Menu onClick={this.handleNavItemClick}>
              <Menu.Item key="2-0-1">发件人设置</Menu.Item>
              <Menu.Item key="2-0-2">快递单模板</Menu.Item>
              <Menu.Item key="2-0-3">发货单模板</Menu.Item>
            </Menu>
          </Item>
        </Navigation>
        <div className="content-container">
          <Route exact path="/" component={MultiPrint} />
          <Route path="/multiprint" component={MultiPrint} />
          <Route path="/printsetting" component={PrintSetting} />
          <Route path="/senderlist" component={SenderList} />
          <Route path="/expresstemplates" component={ExpressTemplateList} />
          <Route path="/invoicetemplate" component={InvoiceTemplate} />
        </div>
      </div>
    );
  }
}

export default App;*/

class App extends React.Component{
  constructor(props){
    super(props);    
  }

  render(){
    return <h2>Hello React!!!!!</h2>
  }
}

export default App;
