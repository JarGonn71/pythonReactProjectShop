import React, {useEffect} from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Prodfile from './components/pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import {getDataCustomerAndCartThunk} from './redux/authUser';
import ModalWindows from './components/modalWindow/ModalWindows'

function App() {
  const dispatch = useDispatch()
  const {user, isIsAuthenticated, finalPriceCart} = useSelector(({authUserReducer}) => authUserReducer)

  useEffect(()=>{
    dispatch(getDataCustomerAndCartThunk())
  },[])

  return (
    <div className="App">
      <ModalWindows/> 
      <div className="container">
        <div className="wrapper-navbar">
          <Navbar dispatch={dispatch} />
        </div>
        <div className="wrapper-content">
          <Switch>
            <Route path='/' exact component={Home}/>
            {isIsAuthenticated?
              <Route path='/profile' component={Prodfile}/>
              : <Redirect to='/'/>
            }
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
