const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name_en: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()
  
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurantsData = restaurants.filter(
        data => 
          data.name.toLowerCase().includes(keyword) || 
          data.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurantsData, keyword })
  })
    .catch(error => console.log(error))
})

module.exports = router