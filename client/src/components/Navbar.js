import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Label, Dropdown } from "semantic-ui-react";
import { useSelector } from "react-redux";
import SidebarModal from "./SidebarModal";
import "./Main.css";

const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart);
  const [activeItem, handleItemClick] = useState("");
  const [visibility, setVisibility] = useState("none");

  const trigger = (
    <span>
      <Icon name="user" /> Hello, Bob
    </span>
  );

  const trigger2 = (
    <Menu.Item
      name="user"
      active={false}
      onClick={() => handleItemClick("user")}
      style={{ width: "100%" }}
    >
      <Icon name="user" />
      Bob
    </Menu.Item>
  );

  const trigger3 = (
    <Menu.Item
      name="menu"
      active={false}
      onClick={() => handleItemClick("menu")}
      style={{ width: "100%" }}
    >
      <Icon name="bars" />
      Menu
    </Menu.Item>
  );

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Menu
            color="red"
            inverted
            style={{ margin: "8px 16px" }}
            floated="right"
          >
            <Menu.Item href="/auth/google" fitted="vertically">
              <Icon name="google" /> Ingresar con Google
            </Menu.Item>
          </Menu>
        );
      default:
        return (
          <>
            <Menu color="grey" style={{ margin: "8px" }} floated="right">
              <Menu.Item
                as={Link}
                to="/cart"
                name="cart"
                active={activeItem === "cart"}
                onClick={() => handleItemClick("cart")}
                fitted="vertically"
              >
                <Icon name="cart" />
                Mi Carrito
                <Label circular color="green" style={{ float: "none" }}>
                  {Object.keys(cart).length}
                </Label>
              </Menu.Item>
            </Menu>

            <Menu color="grey" style={{ margin: "8px 16px" }}>
              <Dropdown item trigger={trigger}>
                <Dropdown.Menu>
                  <Dropdown.Item>Mi Perfil</Dropdown.Item>
                  <Dropdown.Item>Mis Compras</Dropdown.Item>
                  <Dropdown.Item href="/api/logout">
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </>
        );
    }
  };

  const renderContent2 = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Item href="/auth/google">
            <Icon name="sign in" color="green" />
            Ingresar
          </Menu.Item>
        );
      default:
        return (
          <Dropdown
            icon={false}
            trigger={trigger2}
            style={{ padding: "0", width: "100%" }}
          >
            <Dropdown.Menu>
              <Dropdown.Item>Mi Perfil</Dropdown.Item>
              <Dropdown.Item>Mis Compras</Dropdown.Item>
              <Dropdown.Item href="/api/logout">Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
    }
  };

  return (
    <>
      <SidebarModal visibility={visibility} setVisibility={setVisibility} />

      <div className="navbar-large">
        <Menu fixed="top" borderless style={{ height: "59px" }}>
          <Menu.Item header>
            <img
              src="images/emercari_logo.png"
              className="logo"
              alt="Emercari Logo"
            />
          </Menu.Item>

          <Menu color="grey" style={{ margin: "8px 16px" }}>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === "home"}
              onClick={() => handleItemClick("home")}
              fitted="vertically"
            >
              <Icon name="home" />
              Inicio
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/como_comprar"
              name="comoComprar"
              active={activeItem === "comoComprar"}
              onClick={() => handleItemClick("comoComprar")}
              fitted="vertically"
            >
              <Icon name="question circle outline" />
              Como Comprar
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/contact"
              name="contact"
              active={activeItem === "contact"}
              onClick={() => handleItemClick("contact")}
              fitted="vertically"
            >
              <Icon name="mail outline" />
              Contacto
            </Menu.Item>
          </Menu>

          {renderContent()}
        </Menu>
      </div>

      <div className="navbar-small">
        <img
          src="images/emercari_logo.png"
          className="logo"
          alt="Emercari Logo"
        />

        <Menu
          icon="labeled"
          size="mini"
          widths={4}
          style={{ marginTop: "8px" }}
        >
          <Dropdown
            icon={false}
            trigger={trigger3}
            style={{ padding: "0", width: "100%" }}
          >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/">
                Inicio
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/como_comprar">
                Como Comprar
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/contact">
                Contacto
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item
            name="products"
            active={activeItem === "products"}
            onClick={() => {
              setVisibility("block");
            }}
          >
            <Icon name="th large" />
            Productos
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/cart"
            name="cart"
            active={activeItem === "cart"}
            onClick={() => handleItemClick("cart")}
          >
            <Icon name="cart">
              <Label
                circular
                color="green"
                style={{ float: "none", position: "absolute", top: "5px" }}
              >
                {Object.keys(cart).length}
              </Label>
            </Icon>
            Mi Carrito
          </Menu.Item>

          {renderContent2()}
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
