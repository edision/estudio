import React from 'react';

class MainContainer extends React.Component {
  render() {
    return (
      <div className="main-container">
        {this.props.children}
      </div>
    );
  }
}

export default MainContainer;
