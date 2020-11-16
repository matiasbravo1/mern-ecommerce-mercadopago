import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    	<div className='sidebar-wrapper'>
      <Menu vertical inverted>
      	<Link to='/' className="left brand-logo">
	        <Menu.Item
	          name='inicio'
	          active={activeItem === 'inicio'}
	          onClick={this.handleItemClick}
	        >
	          Inicio
	        </Menu.Item>
        </Link>
        <Link to='/como_comprar' className="left brand-logo">
	        <Menu.Item
	          name='como_comprar'
	          active={activeItem === 'como_comprar'}
	          onClick={this.handleItemClick}
	        >
	          Como Comprar
	        </Menu.Item>
	    </Link>
        <Menu.Item
          name='mis_compras'
          active={activeItem === 'mis_compras'}
          onClick={this.handleItemClick}
        >
          Mis Compras
        </Menu.Item>

        <Menu.Item>
          <Input placeholder='Buscar Producto...' />
        </Menu.Item>

        <Menu.Item>
          Alimentos
          <Menu.Menu>
          	<Link to='/productos' className="left brand-logo">
	            <Menu.Item
	              name='todos_alimentos'
	              active={activeItem === 'todos_alimentos'}
	              onClick={this.handleItemClick}
	            >
	              Todos
	            </Menu.Item>
            </Link>
            <Link to='/productos' className="left brand-logo">
	            <Menu.Item
	              name='aderezos'
	              active={activeItem === 'aderezos'}
	              onClick={this.handleItemClick}
	            >
	              Aderezos - Condimentos
	            </Menu.Item>
            </Link>
            <Link to='/productos' className="left brand-logo">
	            <Menu.Item
	              name='bebidas'
	              active={activeItem === 'bebidas'}
	              onClick={this.handleItemClick}
	            >
	              	Bebidas - Jugos
	            </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu.Item>

      </Menu>
      </div>
    )
  }
}

export default Sidebar;