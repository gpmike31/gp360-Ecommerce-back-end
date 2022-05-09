const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
    }
})
    .then(results => res.json(results))
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
    .then(results => res.json(results))
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(results => res.json(results))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((results) => { res.json(results)})
});

  router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
  });

module.exports = router;
