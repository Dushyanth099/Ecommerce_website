import React, { useEffect, useState, useRef } from "react";
import Rating from "../../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  listProductDetails,
  createproductReview,
} from "../../actions/productActions";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { addToCart } from "../../actions/cartActions";
import { AiFillShop } from "react-icons/ai";
import { MdDoNotDisturb } from "react-icons/md";
import {
  Image,
  Select,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  toast,
  useToast,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import { useParams } from "react-router-dom";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/productConstants";
import "./product.css";
import { Link } from "react-router-dom";
import { Listproductbyfiters } from "../../actions/productActions";
import CardProduct from "../../components/CardProduct";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../../components/Trustdetails/FeatureItem";
import Trust from "../../components/Trustdetails/Trust";
import { listMyOrders } from "../../actions/orderActions";

const Productpage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const relatedProductsList = useSelector((state) => state.productList);
  const { products: relatedProducts, loading: relatedLoading } =
    relatedProductsList;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const orderListMy = useSelector((state) => state.orderMylist);
  const { orders } = orderListMy;
  const [qty, setQty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const toast = useToast();
  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [isPurchased, setIsPurchased] = useState(false);
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;
  const availableSizes = product?.productdetails?.sizes || [];
  const [selectedSize, setSelectedSize] = useState("");
  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    imgShowcase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setrating(0);
      setcomment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    if (userInfo) {
      dispatch(listMyOrders());
    }
    if (product.category) {
      dispatch(Listproductbyfiters({ category: product.category }));
    }
  }, [dispatch, id, successProductReview, userInfo, product.category]);

  useEffect(() => {
    if (orders) {
      const purchased = orders.some((order) =>
        order.orderItems.some((item) => item.product === id)
      );
      setIsPurchased(purchased);
    }
  }, [orders, id]);

  // product.reviews
  const submithanlder = () => {
    dispatch(
      createproductReview(id, {
        rating,
        comment,
      })
    );
  };
  //Handler of button add to cart
  const addToCartHandler = () => {
    if (!userInfo) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        status: "warning",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      navigate("/login");
      return;
    }
    dispatch(addToCart(product._id, qty));
    navigate("/cart");
    toast({
      title: "Product added to cart",
      description: "View your product in the cart page.",
      status: "success",
      duration: 5000,
      position: "bottom",
      isClosable: true,
    });
  };
  return (
    <>
      <Helmet>
        <title>{product?.brandname || "Product"}</title>
      </Helmet>
      <div className="productpage">
        {loading ? (
          <div className="loading-product">
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error} </h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-select">
                  {product.images.map((image, index) => (
                    <div className="img-item" key={index}>
                      <a href="#" data-id={index + 1}>
                        <Image
                          objectFit="cover"
                          width="100%"
                          height="100%"
                          src={image}
                          alt={`Thumbnail-${index}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.images.map((image, index) => (
                      <Image key={index} src={image} alt={`Product-${index}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.brandname} </h2>
                <div className="product-price">
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    MRP: ₹{product.price}
                  </p>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    (Inclusive of all taxes)
                  </p>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Color: {product.productdetails?.color || "Not Available"}
                  </p>
                </div>
                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.description}</p>
                  <div>
                    <Text fontSize="lg" fontWeight="bold">
                      Size: {selectedSize}
                    </Text>
                    <HStack spacing={2} mt={2}>
                      {availableSizes.map((size) => (
                        <Button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          border="2px solid"
                          borderColor={
                            selectedSize === size ? "black" : "gray.300"
                          }
                          bg={selectedSize === size ? "black" : "white"}
                          color={selectedSize === size ? "white" : "black"}
                          _hover={{
                            bg: selectedSize === size ? "black" : "gray.100",
                          }}
                          px={4}
                          py={2}
                        >
                          {size}
                        </Button>
                      ))}
                    </HStack>
                    {/* <Text fontSize="lg" fontWeight="bold" mt={3}>
                      Qty
                    </Text>
                    {product.countInStock > 0 ? (
                      <Select
                        as="select"
                        size="md"
                        maxW={20}
                        value={qty}
                        className="select-product"
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <span style={{ display: "flex" }}>
                        <MdDoNotDisturb size="26" /> OUT OF STOCK{" "}
                      </span>
                    )} */}
                    {product.countInStock === 0 && (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="red.500"
                        mt={3}
                        display="flex"
                        alignItems="center"
                      >
                        <MdDoNotDisturb
                          size="24"
                          style={{ marginRight: "5px" }}
                        />{" "}
                        OUT OF STOCK
                      </Text>
                    )}
                  </div>
                  <FeaturesSection />
                  <div className="product-info-table">
                    <div className="product-info-header">
                      <span>SPECIFICATION</span>
                    </div>
                    <div className="product-info-content">
                      <div className="product-info-column">
                        <div className="info-item">
                          <span>Category</span>
                          <strong>
                            {product?.productdetails?.category ||
                              "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Sub Category</span>
                          <strong>
                            {product?.productdetails?.subcategory ||
                              "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Age Range</span>
                          <strong>
                            {product?.productdetails?.ageRange ||
                              "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Gender</span>
                          <strong>
                            {product?.productdetails?.gender || "Not available"}
                          </strong>
                        </div>
                      </div>
                      <div className="product-info-column">
                        <div className="info-item">
                          <span>Product Type</span>
                          <strong>
                            {product?.productdetails?.type || "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Size</span>
                          <strong>
                            {product?.productdetails?.sizes || "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Fabric</span>
                          <strong>
                            {product?.productdetails?.fabric || "Not available"}
                          </strong>
                        </div>
                        <div className="info-item">
                          <span>Color</span>
                          <strong>
                            {product?.productdetails?.color || "Not available"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info-table">
                    <div className="product-info-header">
                      <span>Product Details</span>
                    </div>

                    <div className="product-info-content">
                      {/* SKU Code */}
                      <div className="product-info-column">
                        <div className="info-item">
                          <span>Product Code</span>
                          <strong>{product?.SKU || "Not available"}</strong>
                        </div>
                      </div>

                      {/* Origin Address */}
                      <div className="product-info-column">
                        <div className="info-item">
                          <span>Origin Address</span>
                          <strong>
                            {product?.shippingDetails?.originAddress?.street1
                              ? `${product.shippingDetails.originAddress.street1}, 
               ${product.shippingDetails.originAddress.city}, 
               ${product.shippingDetails.originAddress.state}, 
               ${product.shippingDetails.originAddress.zip}, 
               ${product.shippingDetails.originAddress.country}`
                              : "Not available"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="purchase-info">
                    <Button
                      onClick={addToCartHandler}
                      type="button"
                      className="btn-shop"
                      disabled={product.countInStock === 0}
                      style={{
                        fontSize: "18px",
                        padding: "12px 24px",
                        width: "100%",
                        borderRadius: "0",
                      }}
                    >
                      <AiFillShop size="24" /> Add to Cart
                    </Button>
                  </div>
                </div>{" "}
                <div className="social-links">
                  <p>Share On: </p>
                  <Link className="social" to="#">
                    <i>
                      {" "}
                      <IoLogoFacebook size="20" />
                    </i>
                  </Link>
                  <Link className="social" to="#">
                    <i>
                      <AiFillTwitterCircle to="20" />
                    </i>
                  </Link>
                  <Link className="social" to="#">
                    <i>
                      <AiFillInstagram size="20" />{" "}
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {isPurchased && (
          <div className="REVIEWS">
            <h1>Reviews :</h1>
            {product.reviews.length === 0 && <h2>NO REVIEWS</h2>}
            <div>
              {product.reviews &&
                product.reviews
                  .filter((review) => review.approved)
                  .map((review) => (
                    <div key={review._id} className="review">
                      <h4>{review.name}</h4>
                      <div className="Ratingreview">
                        <Rating value={review.rating} />
                      </div>
                      <p className="commentreview">{review.comment}</p>
                      <p className="datereview">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  ))}

              <div className="createreview">
                <h1>Create New Review :</h1>
                {errorProductReview && <h2>{errorProductReview}</h2>}
                {userInfo ? (
                  <FormControl>
                    <FormLabel>Rating :</FormLabel>
                    <Select onChange={(e) => setrating(e.target.value)}>
                      <option value="1">1 POOR</option>
                      <option value="2">2 FAIR</option>
                      <option value="3">3 GOOD</option>
                      <option value="4">4 VERY GOOD</option>
                      <option value="5">5 EXCELLENT</option>
                    </Select>
                    <FormLabel>Comment :</FormLabel>
                    <Textarea
                      onChange={(e) => setcomment(e.target.value)}
                      placeholder="Leave Comment here :"
                    />
                    <Button
                      className="
                    submitbutton"
                      colorScheme="blue"
                      onClick={submithanlder}
                    >
                      Submit
                    </Button>
                  </FormControl>
                ) : (
                  <>
                    Please <Link to="/login">Sign In</Link> To write a review.
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Related Products Section */}
        <div
          className="related-products-section"
          px={{ base: 4, md: 12 }}
          my={8}
        >
          <Heading as="h3" size="lg" mb={4}>
            Related Products
          </Heading>
          {relatedLoading ? (
            <HashLoader color={"#36D7B7"} />
          ) : (
            <div className="related-products-container">
              {relatedProducts
                .filter((p) => p._id !== product._id) // Exclude current product
                .slice(0, 6) // Show only 6 related products
                .map((relatedProduct) => (
                  <CardProduct
                    key={relatedProduct._id}
                    product={relatedProduct}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <Trust />
    </>
  );
};

export default Productpage;
