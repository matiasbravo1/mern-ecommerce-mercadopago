import React, { Component } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Navbar.css';

class Navbar extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
        	<Button color='google plus' href="/auth/google">
		      <Icon name='google' /> Ingresar con Google
		    </Button>
		);
      default:
        return (
			<Button color='google plus' href="/api/logout">
				<Icon name='google' /> Cerrar Sesión
			</Button>
        );
    }
  }

  render() {
    return (
      <Menu secondary color='blue' inverted size='large' className="navbar ui top fixed">

        <img src='images/emercari_logo.png' className='logo' alt='Emercari Logo'/>
        
        <Menu.Menu position='right'>
          	<Menu.Item
	          	name='whatsapp'
	          	onClick={() => window.open('https://ainsoft.net')}
	        >
	        	<Icon name='whatsapp' size='large' style={{ margin: '0'}}/>
	        </Menu.Item>
	        <Menu.Item
	          	name='mail'
	          	onClick={() => window.open('https://ainsoft.net')}
	        >
	        	<Icon name='mail outline' size='large' style={{ margin: '0'}}/>
	        </Menu.Item>
	        <Menu.Item
	          	name='facebook'
	          	onClick={() => window.open('https://ainsoft.net')}
	        >
	        	<Icon name='facebook' size='large' style={{ margin: '0'}}/>
	        </Menu.Item>
	        <Menu.Item
	          	name='instagram'
	          	onClick={() => window.open('https://ainsoft.net')}
	        >
	        	<Icon name='instagram' size='large' style={{ margin: '0'}}/>
	        </Menu.Item>
	        <div style={{ display: 'flex', alignItems: 'center' }}>
        		{ this.renderContent() }
			</div>
        </Menu.Menu>
      </Menu>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Navbar);
