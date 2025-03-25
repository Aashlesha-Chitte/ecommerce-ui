import React, { useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import axiosInstance from './api';
import Header from './components/Header';
import ProductList from './modules/ProductList';
import Cart from './components/Cart';
import Signup from './modules/Signup';
import Login from './modules/Login';
import Profile from './modules/Profile';
import { Redirect } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );

  const [cartItems, setCartItems] = useState([]);
  const handleLogin = () => {
    setIsAuthenticated(true);

  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    axiosInstance.defaults.headers.common['Authorization'] = '';
    setIsAuthenticated(false);
    setCartItems([]);
  };
  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <HashRouter>
      <div>
        <Header userId={localStorage.getItem('userId')} isAuthenticated={isAuthenticated} handleLogout={handleLogout} cartItems={cartItems} />
        <Switch>
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login handleLogin={handleLogin} />}
          </Route>
          <Route exact path="/signup">
            {isAuthenticated ? <Redirect to="/" /> : <Signup handleSignupSuccess={handleSignupSuccess} />}
          </Route>
          <Route exact
            path="/"
            render={(props) => (
              <ProductList
                {...props}
                isAuthenticated={isAuthenticated}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            )}
          />
          <Route exact path="/cart">
            <Cart cartItems={cartItems} />
          </Route>
          <Route path="/profile/:id" >
            <Profile />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;

