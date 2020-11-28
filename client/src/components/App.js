import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../actions';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Inicio from './Inicio';
import Como_comprar from './Como_comprar';
import Products from './Products';
import Message from './Message';

const App = () => {
  const dispatch = useDispatch();
  const message = useSelector(store => store.message);
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchUser)
  }, [ dispatch ])

  useEffect(() => {
    if(message.message){
      setShouldDisplayMessage(true);
      setTimeout(() => setShouldDisplayMessage(false),3000)
    }else{
      setShouldDisplayMessage(false);
    }
  }, [ message ])

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Route exact path="/" component={Inicio} />
        <Route exact path="/como_comprar" component={Como_comprar} />
        <Route exact path="/products/:category" component={Products} />
        { shouldDisplayMessage && ( <Message /> ) }
      </BrowserRouter>
    </div>
  );

}

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