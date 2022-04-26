const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [Product]
    })
    // be sure to include its associated Products
    res.json(categories)
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categories = await Category.findOne({ 
      where: 
      {id: req.params.id},
      include: [Product]
  })

  res.json(categories)
  }
  catch (error) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categories = await Category.create(req.body);

    res.json(categories);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    
    res.json(categories)
   } catch(error) {
      res.status(500).json(error);
   }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(categories)
    } catch(error) {
      res.status(500).json(error)
    }
});

module.exports = router;
