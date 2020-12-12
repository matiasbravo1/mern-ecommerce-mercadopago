import React, { useState } from "react";
import { Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
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

        <Menu.Item>
          Alimentos
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to={"/products/all"}
              name="todos_alimentos"
              active={activeItem === "todos_alimentos"}
              onClick={() => handleItemClick("todos_alimentos")}
            >
              Todos
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/products/1"}
              name="aderezos"
              active={activeItem === "aderezos"}
              onClick={() => handleItemClick("aderezos")}
            >
              Aderezos - Condimentos
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/products/2"}
              name="bebidas"
              active={activeItem === "bebidas"}
              onClick={() => handleItemClick("bebidas")}
            >
              Bebidas - Jugos
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
