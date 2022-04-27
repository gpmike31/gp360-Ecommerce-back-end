const router = require('express').Router();
const res = require('express/lib/response');
const { Tag, Product, ProductTag, Tag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include : [Tag, {
        model: Product,
        through: ProductTag
      }]
    })
    res.json(tags)
  }
  

  catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findOne({
      where:
      {id: req.params.id},
      include: [Tag,{
        model: Product,
        through: ProductTag
      }]
    })
    res.json(tags)
  } catch (error) {
      res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.json(newTag);
  } 
  catch (error) {
    res.status(500).json(error); 
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(updateTag)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deleteTag)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
