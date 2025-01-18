import React from "react";
import "./Testimonials.css"; // Add custom styling

const Testimonials = () => {
  const reviews = [
    { name: "Divya T.", review: "Amazing furniture, high quality!" },
    { name: "Kritika K.", review: "Fast delivery and excellent service!" },
    { name: "Ashi K.", review: "Loved the collection, will order again!" },
  ];

  return (
    <section className="testimonials-section">
      <h3>What Our Customers Say</h3>
      <div className="testimonials">
        {reviews.map((review, index) => (
          <div className="testimonial" key={index}>
            <p>"{review.review}"</p>
            <h4>- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
