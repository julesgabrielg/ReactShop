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
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/adminroute";
import ProductListScreen from "./screens/ProductListSreen";
import ProductEditScreen from './screens/ProductEditScreen';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href='/signin';
  };
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Tindahan</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link">
                <i className="fa-solid fa-cart-shopping"></i>
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

                {userInfo && userInfo.isAdmin && (
                  <NavDropDown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropDown.Item>Dashboard</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropDown.Item>Products</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropDown.Item>Orders</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropDown.Item>Users</NavDropDown.Item>
                    </LinkContainer>
                  </NavDropDown>
                )}
              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>

            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/profile" element={
              <ProtectedRoute>
              <ProfileScreen />
              </ProtectedRoute>} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<Paymentmethodscreen/>} />
              <Route path="/placeorder" element={<Placeorderscreen/>} />
              <Route path="/orderhistory" element={
              <ProtectedRoute>
              <OrderHistoryScreen/>
              </ProtectedRoute>} />
              <Route path="/order/:id" element={
              <ProtectedRoute>
              <OrderScreen/>
              </ProtectedRoute>} />

              {/*Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen/></AdminRoute>} />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>

        </main>
        <footer>
          <div className="text-center"> All Rights Reserved. </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
