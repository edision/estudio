import React from 'react';
import { Route } from 'react-router-dom';
//菜单
import HashParamList from "COMPONENTS/hashparam/List";
import ComplexParamList from "COMPONENTS/complexparam/List";
import ImageIndex from "COMPONENTS/image/Index";
import UnicodeChs from "COMPONENTS/tools/unicode";
import Base64 from "COMPONENTS/tools/base64";

export const routes = [
  { path: "/", key: "1-0", name: "参数管理", icon: "text", parent: false },
  { path: "/Params/Hash", key: "1-0-1", name: "哈希参数", parent: "1-0" },
  { path: "/Params/Complex", key: "1-0-2", name: "复合参数", parent: "1-0" },
  { path: "/Content/Image", key: "2-0", name: "内容管理", icon: "image-text", parent: false },
  { path: "/Content/Image", key: "2-0-1", name: "图片管理", parent: "2-0" },
  { path: "/tools/unicode", key: "3-0", name: "开发工具", icon: "box", parent: false },
  { path: "/tools/unicode", key: "3-0-1", name: "编码解码", parent: "3-0", isMenu: true },
  { path: "/tools/unicode", key: "3-0-1-1", name: "Unicode中文转换", parent: "3-0-1" },
  { path: "/tools/base64", key: "3-0-1-2", name: "BASE64", parent: "3-0-1" }
];



export const route = [
  <Route key="/" exact path="/" component={HashParamList} />,
  <Route key="/Params/Hash" path="/Params/Hash" component={HashParamList} />,
  <Route key="/Params/Complex" path="/Params/Complex" component={ComplexParamList} />,
  <Route key="/Content/Image" path="/Content/Image" component={ImageIndex} />,
  <Route key="/tools/unicode" path="/tools/unicode" component={UnicodeChs} />,
  <Route key="/tools/base64" path="/tools/base64" component={Base64} />
];
