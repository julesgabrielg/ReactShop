import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import React, { useContext } from "react";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./store";
import CartScreen from "./screens/cartscreen";
import SignInScreen from "./screens/signinscreen";
import NavDropDown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from "./screens/shippingaddressScreen";
import SignUpScreen from "./screens/signupscreen";
import Paymentmethodscreen from "./screens/paymentmethodscreen";
import Placeorderscreen from "./screens/placeorderscreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Tindahan</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropDown.Item>User Profile</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropDown.Item>Order History</NavDropDown.Item>
                    </LinkContainer>
                    <NavDropDown.Divider/>
                      <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                          Sign Out
                        </Link>
                  </NavDropDown>
                ):(
                  <Link className="nav-link" to="/signin">
                  Sign In
                  </Link>
                )};
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<Paymentmethodscreen/>} />
              <Route path="/placeorder" element={<Placeorderscreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center"> All Rights Reserved. </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
