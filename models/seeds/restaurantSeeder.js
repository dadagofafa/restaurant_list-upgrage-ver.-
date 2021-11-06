const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurants.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder update done!')
    })
    .catch(error => console.log(error))
})






