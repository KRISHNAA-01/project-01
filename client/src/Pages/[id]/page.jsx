import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../Components/Header/Header.jsx";
import { CartContext } from "../../Components/context/CartContext.jsx";
import { useSelector } from "react-redux";
import SignInPromptModal from "../../Components/SignInPromptModal.jsx";
import ProductReviews from "../../Components/ProductReviews/ProductReviews.jsx";
import "./page.css";

export default function Page() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { count, setCount, addItemToCart } = useContext(CartContext);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/item/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      setShowSignInModal(true);
    } else if (productDetails) {
      setCount(count + 1);
      addItemToCart(productDetails);
      setProductAdded(true);
    }
  };

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!productDetails) {
    return (
      <div className="loading-container">
        <span className="loading-text">Loading product details...</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="itemsDetailCard">
        <div className="text-content">
          <h1 className="product-name">{productDetails?.name}</h1>
          <p className="product-description">{productDetails?.description}</p>
          <div className="price-add-container">
            <span className="product-price">Rs. {productDetails?.price}</span>
            <button className="add-to-cart button-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          {productAdded && (
            <div className="success-message">
              Product added to cart! <Link to="/cart" className="link">Go to Cart</Link>
            </div>
          )}
          <div className="actions">
            <Link to="/#products" className="button-secondary">Add More Products</Link>
          </div>
        </div>
        <img
          src={productDetails?.imageUrl}
          width={400}
          height={400}
          className="product-image"
          alt={productDetails?.name}
        />
      </div>
      <ProductReviews productId={id} />
      {showSignInModal && (
        <SignInPromptModal onClose={() => setShowSignInModal(false)} />
      )}
    </>
  );
}


