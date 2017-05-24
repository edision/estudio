const NavItem = ({ url, icon, text }) => (<li className="next-navigation-item next-navigation-item-align-center">
  <div className="next-navigation-item-content">
    <Link className="next-navigation-item-content-inner" to={url}>
      <Icon className="next-navigation-item-icon next-navigation-item-custom-icon" type={icon} />
      <span className="next-navigation-item-text">{text}</span>
    </Link>
  </div>
</li>);

export default NavItem;
