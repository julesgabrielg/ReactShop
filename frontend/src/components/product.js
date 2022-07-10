import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Rating from './rating';
import axios from 'axios';
import {useContext} from 'react';
import { Store } from '../store';


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
  }
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

      <div className="container bootdey">
        <div className="row">
          <div className="product-grid col-xs-12 col-sm-auto col-md-auto">
            <div className="product-item">
              <div className="image">
                <a href={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </a>
              </div>
              <div className="caption">
                <div className="name text-center">
                  <a href={`/product/${product.slug}`}>{product.name}</a>
                </div>
                <div className="price">
                  <span>${product.price}</span>
                </div>
                <div className="cart">
                  <button type="button" className="btn btn-primary">
                    Add to Cart
                  </button>
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
      </div>
    );
}
export default Product;