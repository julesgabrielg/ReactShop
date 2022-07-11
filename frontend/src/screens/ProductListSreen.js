import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios, { Axios } from 'axios';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../store';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import { getError } from '../util';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
      case "UPLOAD_REQUEST":
        return { ...state, loadingUpload: true, errorUpload: "" };
      case "UPLOAD_SUCCESS":
        return {
          ...state,
          loadingUpload: false,
          errorUpload: "",
        }; 
      case "UPLOAD_FAIL":
        return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

function AddNewProductModal({handleSetName,
  handlesetSlug,
  handlesetPrice,
  handlesetImage,
  handlesetCategory,
  handlesetBrand,
  handlesetcountInStock,
  handlesetDescription,
  createHandlera,
  ...props}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            {/* <Form.Control required onChange={(e) => setName(e.target.value)}></Form.Control> */}
            <Form.Control required onChange={handleSetName}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control required onChange={handlesetSlug}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control required onChange={handlesetPrice}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control required onChange={handlesetImage}></Form.Control>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler}></Form.Control>
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control required onChange={handlesetCategory}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control required onChange={handlesetBrand}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control required onChange={handlesetcountInStock}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control required onChange={handlesetDescription}></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={createHandlera}>Add New Product</Button>
      </Modal.Footer>
    </Modal>
  )};

  


export default function ProductListScreen() {


    const [{ loading, error, products, pages, loadingCreate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, [page, userInfo]);



  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('product created successfully', {autoClose: 1000});
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error), {autoClose: 1000});
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  // const createHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const {data} = await Axios.post('/api/products', {
  //       name,
  //       slug,
  //       image,
  //       price,
  //       category,
  //       brand,
  //       countInStock,
  //       rating,
  //       numReviews,
  //       description,
  //     },
  //     {
  //       headers: {Authorization :`Bearer ${userInfo.token}`},
  //     }      
  //     );
  //     dispatch({type: 'CREATE_SUCCESS'});
  //     navigate(`/admin/product/${data.product._id}`);
  //   } catch(err) {
  //     toast.error(getError(error));
  //     dispatch({
  //       type: 'CREATE_FAIL',
  //     });
  //   }
  // };

  
    const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>

          </div>
        </Col>
      </Row>

    
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}