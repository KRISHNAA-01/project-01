import express from 'express';
import Item from '../models/item.model.js'; // Ensure this path is correct

const router = express.Router();

// Add a new item
router.post('/add', async (req, res) => {
  try {
    const { name, imageUrl, price, description } = req.body;

    // Log incoming request body for debugging
    console.log('Request Body:', req.body);

    const newItem = new Item({ name, imageUrl, price, description });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully!' });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item', error });
  }
});


// Fetch all items
router.get('/', async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Error fetching items', error });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error });
    }
  });

export default router;
