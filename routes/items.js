const express = require("express");
const router = express.Router();
const items = require("../fakeDb");
const ExpressError = require("../expressError");



// Get items from fakeDb
router.get("/", (req, res) => {
  return res.json({ items: items });
});


// Add items to fakeDb
router.post("/", (req, res) => {
  const addedItem = { name: req.body.name, price: req.body.price };
  items.push(addedItem);
  console.log(items);
  return res.status(201).json({ added: addedItem });
});

// Get items by name from the fakeDb
router.get("/:name", function (req, res) {
  const item = items.find((item) => item.name === req.params.name);
  if (item !== undefined) {
    return res.json({ item: item });
  } else {
    throw new ExpressError("Item Not Found", 404);
  }
});

// Update items by name from the fakeDb
router.patch("/:name", function (req, res) {
  const item = items.find((item) => item.name === req.params.name);
  if (item !== undefined) {
    item.name = req.body.name;
    return res.json({ updated: item });
  } else {
    throw new ExpressError("Item Not Found", 404);
  }
});

// Delete items by name from the fakeDb
router.delete("/:name", function (req, res) {
  const item_index = items.findIndex((item) => item.name === req.params.name);
  if (item_index !== -1) {
    items.splice(item_index, 1);
    return res.json({ message: "Deleted" });
  } else {
    throw new ExpressError("Item Not Found", 404);
  }
});

module.exports = router;