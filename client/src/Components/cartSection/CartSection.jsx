


"use client";
import styles from "./cartSection.module.scss";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function CartSection() {
    const { cartItem, increaseQuantity, decreaseQuantity, removeItemFromCart } = useContext(CartContext);

    const calculateTotalPrice = () => {
        return cartItem.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <>
            <div className={`w-[60%] mx-auto ${styles.CartSection}`}>
                <h2 className="text-center pt-[50px] text-[40px]">Cart</h2>

                {cartItem.length > 0 ? (
                    <div>
                        {cartItem.map((item) => (
                            <div key={item._id} className="flex gap-[40px] justify-center pt-[50px] pb-[20px]">
                                <div className="productimage">
                                    <img
                                        src={item.product.imageUrl || "/default-image.png"}
                                        height={100}
                                        width={100}
                                        alt={item.product.name || "Product Image"}
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <div className="flex gap-[40px] pb-[10px]">
                                        <h2 className="w-[150px]">Product Name:</h2>
                                        <h2>{item.product.name || "Unknown Product"}</h2>
                                    </div>
                                    <div className="flex gap-[40px] pb-[10px]">
                                        <h2 className="w-[150px]">Price</h2>
                                        <h2>{item.product.price ? `Rs. ${item.product.price}` : "Price not available"}</h2>
                                    </div>
                                    <div className="flex gap-[40px] pb-[10px]">
                                        <h2 className="w-[150px]">Quantity</h2>
                                        <div className="flex items-center">
                                            <button
                                                className="border border-[#e30217] text-[#e30217] px-[10px] rounded-[6px]"
                                                onClick={() => decreaseQuantity(item._id)}
                                            >
                                                -
                                            </button>
                                            <h2 className="mx-[10px]">{item.quantity || 0}</h2>
                                            
                                            
                                            <button
                                                className="border border-[#e30217] text-[#e30217] px-[10px] rounded-[6px]"
                                                onClick={() => increaseQuantity(item._id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <hr style={{ color: "black" }} />
                                    <div className="flex gap-[40px] pt-[10px]">
                                        <h2 className="w-[150px]">Total</h2>
                                        <h2>{item.quantity && item.product.price ? `Rs. ${item.quantity * item.product.price}` : "Total not available"}</h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItemFromCart(item._id)}
                                    className="text-white bg-[#e30217] px-[10px] py-[5px] rounded-[6px] mt-[10px]"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="text-center pt-[30px]">
                            <h2 className="text-[20px] font-[600]">Total Cart Price: Rs. {calculateTotalPrice()}</h2>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-600">
                        <p>Your cart is empty.</p>
                    </div>
                )}

                {cartItem.length > 0 ? (
                    <div className="pt-[40px] flex justify-center">
                        <Link to="/checkout" className="text-white bg-[#e30217] px-[30px] py-[10px] gap-[10px] mb-[30px] rounded-[6px]">
                            Proceed to checkout
                        </Link>
                    </div>
                ) : (
                    <div className="pt-[40px] flex justify-center">
                        <Link to="/" className="text-white bg-[#e30217] px-[30px] py-[10px] gap-[10px] rounded-[6px]">
                            Add Products
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
