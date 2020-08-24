import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
const logo = "https://scontent.flhe9-1.fna.fbcdn.net/v/t1.0-9/68657554_2456209977830798_1139913470301437952_n.png?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=KL0N4x8LY44AX_IaKyl&_nc_ht=scontent.flhe9-1.fna&oh=3528d8106cc0c4faa3b0c4626a5567b7&oe=5F676A9D";
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">
          {/* <img src={logo} style={{ width: "50px", height: "50px" }} /> */}
          LOGO
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar