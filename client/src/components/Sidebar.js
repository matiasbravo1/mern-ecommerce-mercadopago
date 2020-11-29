import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCart } from '../actions';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
  state = {}

  componentDidMount(){
    this.props.fetchCart();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const sidebarHeight = window.innerHeight - 46;

    return (
    	<div className='sidebar-wrapper' style={{ height: sidebarHeight }}>
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
      <Link to='/cart' className="left brand-logo">
        <Menu.Item
          name='mi_carrito'
          active={activeItem === 'mi_carrito'}
          onClick={this.handleItemClick}
        >
          Mi Carrito
          <Label
           circular
           color='green'
           style={{ float: 'none' }}
          >
          	{ Object.keys(this.props.cart).length }
          </Label>
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
          	<Link to='/products/1' className="left brand-logo">
	            <Menu.Item
	              name='todos_alimentos'
	              active={activeItem === 'todos_alimentos'}
	              onClick={this.handleItemClick}
	            >
	              Todos
	            </Menu.Item>
            </Link>
            <Link to='/products/2' className="left brand-logo">
	            <Menu.Item
	              name='aderezos'
	              active={activeItem === 'aderezos'}
	              onClick={this.handleItemClick}
	            >
	              Aderezos - Condimentos
	            </Menu.Item>
            </Link>
            <Link to='/products/3' className="left brand-logo">
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

const mapStateToProps = ({ cart, auth }) => {
	return { cart, auth };
}

export default connect(mapStateToProps, { fetchCart })(Sidebar);