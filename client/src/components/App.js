import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { fetchUser, fetchCart } from "../actions";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inicio from "./Inicio";
import Como_comprar from "./Como_comprar";
import Products from "./Products";
import Message from "./Message";
import Cart from "./Cart";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser2 = async () => {
      await dispatch(fetchUser());  
    }
    
    fetchUser2();
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Route exact path="/" component={Inicio} />
        <Route exact path="/como_comprar" component={Como_comprar} />
        <Route exact path="/products/:category" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Message />
      </BrowserRouter>
    </div>
  );
};

export default App;

// import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
// import 'semantic-ui-css/semantic.min.css';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Inicio from './Inicio';
// import Como_comprar from './Como_comprar';
// import Products from './Products';
// import Message from './Message';

// class App extends Component {

//   componentDidMount() {
//     this.props.fetchUser();
//   }

//   render(){
//     return (
//       <div>
//         <BrowserRouter>
//           <Navbar />
//           <Sidebar />
//           <Route exact path="/" component={Inicio} />
//           <Route exact path="/como_comprar" component={Como_comprar} />
//           <Route exact path="/products/:category" component={Products} />
//           <Message />
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default connect(null, actions)(App);
