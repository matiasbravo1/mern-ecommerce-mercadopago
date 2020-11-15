import React, { Component } from 'react';
import { Input, Menu, Icon, Button } from 'semantic-ui-react';
import './Navbar.css';

export default class Navbar extends Component {
  
  render() {
    
    return (
      <Menu secondary color='blue' inverted size='large' className="navbar ui top fixed">

        <img src='images/emercari_logo.png' className='logo'/>

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
        		<Button color='google plus' href="/auth/google">
			      <Icon name='google' /> Ingresar con Google
			    </Button>
			</div>
        </Menu.Menu>
      </Menu>
    )
  }
}