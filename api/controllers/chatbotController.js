// import Item from '../models/item.model.js';
// import Order from '../models/order.model.js';
// import Review from '../models/review.model.js';

// export const handleUserQuery = async (req, res) => {
//     const { message, isFirstMessage } = req.body;
//     const userId = req.user?.id;
//     let response = '';

//     if (isFirstMessage) {
//         response = userId
//             ? `Hello ${req.user.username}! How can I assist you today?`
//             : 'Hello! Please log in for more personalized assistance.';
//         return res.json({ response });
//     }

//     try {
//         if (!userId) {
//             return res.status(401).json({ response: 'Please log in to use this service.' });
//         }

//         const cleanedMessage = message.toLowerCase();

//         if (cleanedMessage.includes('availability')) {
//             const itemName = extractItemName(cleanedMessage);
//             if (itemName) {
//                 const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
//                 response = item
//                     ? `The item "${item.name}" is available with ${item.stock} units in stock.`
//                     : `Sorry, the item "${itemName}" is not available.`;
//             } else {
//                 response = 'Could you please specify the item name?';
//             }
//         } else if (cleanedMessage.includes('price')) {
//             const itemName = extractItemName(cleanedMessage);
//             if (itemName) {
//                 const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
//                 response = item
//                     ? `The price of "${item.name}" is ₹${item.price}.`
//                     : `Sorry, I couldn't find the item "${itemName}".`;
//             } else {
//                 response = 'Could you please specify the item name?';
//             }
//         } else if (cleanedMessage.includes('review')) {
//             const itemName = extractItemName(cleanedMessage);
//             if (itemName) {
//                 const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
//                 if (item) {
//                     const reviews = await Review.find({ product: item._id });
//                     const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
//                     response = `The average review for "${item.name}" is ${averageRating.toFixed(1)} stars.`;
//                 } else {
//                     response = `Sorry, no reviews found for "${itemName}".`;
//                 }
//             } else {
//                 response = 'Could you please specify the item name?';
//             }
//         } else if (cleanedMessage.includes('order status')) {
//             const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
//             response = order
//                 ? `Your latest order is "${order.status}". Expected delivery: ${order.expectedDeliveryDate || 'TBD'}.`
//                 : 'You have no orders.';
//         } else if (cleanedMessage.includes('contact')) {
//             response = 'For further assistance, contact us at +91-9876543210 or email support@ecommerce.com.';
//         } else {
//             response = "I'm sorry, I didn't understand your query. Please try again.";
//         }

//         res.json({ response });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// const extractItemName = (message) => {
//     const keywords = ['availability of', 'price of', 'review of', 'for'];
//     for (const keyword of keywords) {
//         if (message.includes(keyword)) {
//             return message.split(keyword)[1]?.trim();
//         }
//     }
//     return null;
// };
import Item from '../models/item.model.js';
import Order from '../models/order.model.js';
import Review from '../models/review.model.js';

export const handleUserQuery = async (req, res) => {
  const { message, isFirstMessage } = req.body;
  const userId = req.user?.id || null;
  let response = '';

  if (isFirstMessage) {
    response = userId
      ? `Hello! How can I assist you today?`
      : `Hello! You can ask about product prices, availability, or reviews. Please log in for personalized services.`;
    return res.json({ response });
  }

  try {
    const cleanedMessage = message.toLowerCase();

    if (cleanedMessage.includes('availability')) {
      const itemName = extractItemName(cleanedMessage);
      if (itemName) {
        const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
        response = item
          ? `The item "${item.name}" is available with ${item.stock} units in stock.`
          : `Sorry, the item "${itemName}" is not available.`;
      } else {
        response = 'Could you please specify the item name?';
      }
    } else if (cleanedMessage.includes('price')) {
      const itemName = extractItemName(cleanedMessage);
      if (itemName) {
        const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
        response = item
          ? `The price of "${item.name}" is ₹${item.price}.`
          : `Sorry, I couldn't find the item "${itemName}".`;
      } else {
        response = 'Could you please specify the item name?';
      }
    } else if (cleanedMessage.includes('review')) {
      const itemName = extractItemName(cleanedMessage);
      if (itemName) {
        const item = await Item.findOne({ name: new RegExp(itemName, 'i') });
        if (item) {
          const reviews = await Review.find({ product: item._id });
          const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
          response = `The average review for "${item.name}" is ${averageRating.toFixed(1)} stars.`;
        } else {
          response = `Sorry, no reviews found for "${itemName}".`;
        }
      } else {
        response = 'Could you please specify the item name?';
      }
    } else if (cleanedMessage.includes('order status')) {
      if (userId) {
        const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
        response = order
          ? `Your latest order is "${order.status}". Expected delivery: ${order.expectedDeliveryDate || 'TBD'}.`
          : 'You have no orders.';
      } else {
        response = 'Please log in to check your order status.';
      }
    } else {
      response = "I'm sorry, I didn't understand your query. Please try again.";
    }

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const extractItemName = (message) => {
  const keywords = ['availability of', 'price of', 'review of', 'for'];
  for (const keyword of keywords) {
    if (message.includes(keyword)) {
      return message.split(keyword)[1]?.trim();
    }
  }
  return null;
};
