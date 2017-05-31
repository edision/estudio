import React from "react";
import { observer, inject } from "mobx-react";
// componets
import { Overlay, Loading } from "qnui";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <Overlay visible={this.props.isLoading}
        hasMask
        align="cc cc"
      >

        <span className="overlay-center">
          <Loading color="#e6e6e6" size="large" type="inline" />
          <div className="text">正在加载...</div>
        </span>
      </Overlay>
    );
  }
}

export default LoadingOverlay;
