import Cart from '../models/cart.model.js';
import Item from '../models/item.model.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (cart) {
            res.json(cart.items);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error });
    }
};

// Helper function to get or create a cart with user ID
const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
        await cart.save();
    }
    return cart;
};

// Function to add items to cart
export const addItemToCart = async (req, res) => {
  try {
      const userId = req.user.id;
      if (!userId) return res.status(401).json({ message: "User not authenticated." });

      const { items } = req.body;

      // Validate `items` is a non-empty array
      if (!Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ message: "Invalid items format. 'items' should be a non-empty array." });
      }

      // Get or create the user's cart
      let cart = await getOrCreateCart(userId);

      for (const item of items) {
          const { productId, quantity = 1 } = item;

          // Ensure product exists before adding to cart
          const product = await Item.findById(productId);
          if (!product) {
              return res.status(404).json({ message: "Product not found", productId });
          }

          // Find if the product already exists in the cart
          const itemIndex = cart.items.findIndex(cartItem => 
              cartItem.product && cartItem.product.toString() === productId
          );

          if (itemIndex > -1) {
              // Update quantity if product already in cart
              cart.items[itemIndex].quantity += quantity;
          } else {
              // Add new item with required fields: product and quantity
              cart.items.push({ product: productId, quantity });
          }
      }

      // Ensure cart has `user` field set
      cart.user = userId;

      await cart.save();
      res.status(200).json(cart);
  } catch (error) {
      console.error("Unexpected error updating cart:", error);
      res.status(500).json({ message: "Unexpected error updating cart", error });
  }
};


// export const increaseCartItem = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ user: req.user._id });
//         const itemId = req.params.id;

//         if (cart) {
//             const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);

//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += 1;
//             } else {
//                 const item = await Item.findById(itemId);
//                 cart.items.push({ product: item._id, quantity: 1 });
//             }

//             await cart.save();
//             res.json({ message: "Item quantity increased" });
//         } else {
//             res.status(404).json({ message: "Cart not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error increasing item quantity", error });
//     }
// };

// export const decreaseCartItem = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ user: req.user._id });
//         const itemId = req.params.id;

//         if (cart) {
//             const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);

//             if (itemIndex > -1 && cart.items[itemIndex].quantity > 1) {
//                 cart.items[itemIndex].quantity -= 1;
//             } else if (itemIndex > -1) {
//                 cart.items.splice(itemIndex, 1);
//             }

//             await cart.save();
//             res.json({ message: "Item quantity decreased" });
//         } else {
//             res.status(404).json({ message: "Cart not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error decreasing item quantity", error });
//     }
// };

// export const removeCartItem = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ user: req.user.id });
//         const itemId = req.params.id;

//         if (cart) {
//             cart.items = cart.items.filter(item => item.product.toString() !== itemId);
//             await cart.save();
//             res.json({ message: "Item removed from cart" });
//         } else {
//             res.status(404).json({ message: "Cart not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error removing item from cart", error });
//     }
// };




// Remove item from cart
export const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const itemId = req.params.id;

        if (cart) {
            // Ensure `product._id` and `itemId` are string-compatible for comparison
            cart.items = cart.items.filter(item => item._id.toString() !== itemId);
            await cart.save();

            // Optional: Reload cart from DB to verify changes
            const updatedCart = await Cart.findOne({ user: req.user.id });

            res.json({ message: "Item removed from cart", items: updatedCart.items });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
};

export const increaseCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const itemId = req.params.id;

        if (cart) {
            // Find the item and increase quantity
            const item = cart.items.find(item => item._id.toString() === itemId);

            if (item) {
                item.quantity += 1;
                await cart.save();

                // Optional: Reload cart to verify updates
                const updatedCart = await Cart.findOne({ user: req.user.id });
                res.json({ message: "Item quantity increased", items: updatedCart.items });
            } else {
                res.status(404).json({ message: "Item not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error increasing item quantity", error });
    }
};

export const decreaseCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const itemId = req.params.id;

        if (cart) {
            // Find the item and decrease quantity
            const item = cart.items.find(item => item._id.toString() === itemId);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // If quantity reaches 0, remove the item
                    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
                }

                await cart.save();

                // Optional: Reload cart to verify updates
                const updatedCart = await Cart.findOne({ user: req.user.id });
                res.json({ message: "Item quantity decreased", items: updatedCart.items });
            } else {
                res.status(404).json({ message: "Item not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error decreasing item quantity", error });
    }
};
