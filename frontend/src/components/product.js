import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Rating from './rating';
import axios from 'axios';
import {useContext, useState} from 'react';
import { Store } from '../store';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';





function Product(props) {
    const {product}=props;
    
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
      const existItem = cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const {data} = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity){
          window.alert('Sorry. Product is out of stock.');
          return;
      }
      ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: {...item, quantity},
      });
      toast.success('Item Added to Cart!');
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
<Row>
            <Col md={6}>
                <img className="img-large"
                src={product.image}
                alt={product.name}
                ></img>
            </Col>
            <Col md={6}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating rating = {product.rating} numReviews={product.numReviews}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{product.description}</p>
                    </ListGroup.Item>
                </ListGroup>


                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                    {product.countInStock>0?
                                    <Badge bg="success">In Stock</Badge>
                                    :
                                    <Badge bg="danger">Out Of Stock</Badge>
                                    }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          {product.countInStock >0 && (
                      <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
                            )}
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalShow, setModalShow] = useState(false);



    return (
      // <Card className="product">
      //           <Link to={`/product/${product.slug}`}>
      //             <img
      //               src={product.image}
      //               alt={product.name}
      //               className="card-img-top"
      //             />
      //           </Link>
      //           <Card.Body>
      //             <Link to={`/product/${product.slug}`}>
      //                 <Card.Title>{product.name}</Card.Title>
      //               </Link>
      //               <Rating rating ={product.rating} numReviews={product.numReviews} />
      //               <Card.Text>${product.price}</Card.Text>
      //               {product.countInStock === 0?
      //                <Button variant='light' disabled>Out of Stock</Button>
      //               :
      //                <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
      //               }
      //           </Card.Body>
      //         </Card>


        <div className="row">
          <div className="product-grid col-xs-12 col-sm-auto col-md-auto">
            <div className="product-item">
              <div className="image">
              <button id="buttonLink" className="buttonLink" onClick={() => setModalShow(true)}>
                  <img className="img-fluid"
                    src={product.image}
                    alt={product.name}
                  />
              </button>
              </div>
              <div className="caption">
                <div className="name text-center">
                <button id="buttonLink" className="buttonLink" onClick={() => setModalShow(true)}>
                    <strong>{product.name}</strong>
                </button>
                  <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
                </div>
                <div className="price">
                  <span>${product.price}</span>
                </div>
                <div className="cart">
                {product.countInStock === 0?
                <button onClick={() => addToCartHandler(product)} type="button" className="btn btn-primary" disabled>
                Add to Cart
              </button>
                :
                <button onClick={() => addToCartHandler(product)} type="button" className="btn btn-primary">
                Add to Cart
              </button>
            
                }
                </div>
              </div>
              {/* <button
                type="button"
                className="btn btn-default wishlist"
                data-toggle="tooltip"
                data-placement="right"
                title="Wishlist"
              >
                <i className="fa fa-heart"></i>
              </button>
              <button
                type="button"
                className="btn btn-default compare"
                data-toggle="tooltip"
                data-placement="right"
                title="Compare"
              >
                <i className="fa fa-circle-o"></i>
              </button> */}
            </div>
          </div>
        </div>

    );
}



export default Product;

