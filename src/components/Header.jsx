import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './Header.css'; 

const Header = ({ isAuthenticated, handleLogout, cartItems, userId }) => {
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const history = useHistory();

  const handleLogoutClick = () => {
    handleLogout();
    history.push('/');
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          {isAuthenticated ? (
            <><li>
              <Link to="/cart">Cart ({totalCartItems})</Link>
            </li>
              <li>
                <Link to={`/profile/${userId}`}>Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
