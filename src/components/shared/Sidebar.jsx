import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar
