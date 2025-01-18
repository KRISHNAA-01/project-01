import React from "react";
import "./PromotionalSection.css"; // Add custom styling

const PromotionalSection = () => {
  return (
    <section className="promotional-section">
      <div className="promo-content">
        <h2>Seasonal Sale: Up to 50% Off!</h2>
        <p>
          Discover our exclusive collection of furniture at unbeatable prices.
        </p>
        <button className="shop-now">Shop Now</button>
      </div>
    </section>
  );
};

export default PromotionalSection;
