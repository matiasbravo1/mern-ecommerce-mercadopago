import React, { useState } from "react";
import { Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import "./Sidebar.css";
import "./Main.css";

const Sidebar = () => {
  const [activeItem, handleItemClick] = useState("");

  return (
    <div className="sidebar sidebar-wrapper">
      <Menu vertical className="sidebar-menu" fluid>
        <Menu.Item>
          <Input placeholder="Buscar Producto..." />
        </Menu.Item>
      </Menu>

      <Categories />
    </div>
  );
};

export default Sidebar;
