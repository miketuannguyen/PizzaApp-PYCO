const debug = require('../src/utils/debug.utils')
const { productIds, categoryIds} = require('../mongoObjectIdSeeds')
const chance = require('chance').Chance()

module.exports = {
  async up(db, client) {
    try {
      await db.collection('products').insertMany([{
        _id: productIds[0],
        title: 'Pizza 4 Cheese',
        description: 'Pizza 4 Cheese is made of 4 layers of cheese: Mozzarella on the bottom, then parmesan, then Cheddar and dollops of Cream cheese with the Honey Mustard sauce',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/FD01.png'
      }, {
        _id: productIds[1],
        title: 'Cheesy Bites Trio Shrimp',
        description: 'Cheesy Bites Trio Shrimp Pizza topped with tremium shrimps combined with pineapple, olive and red capsicum on special Cheesy Mayo sauce',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/C19.png'
      }, {
        _id: productIds[2],
        title: 'Seafood Deluxe',
        description: 'Shrimps, squids, tomato cherry, zucchini topped with Mozzarella cheese on a bed of Pesto sauce',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/C18.png'
      }, {
        _id: productIds[3],
        title: 'Super Supreme',
        description: 'Pepperoni, ham, beef, chicken sausage, pineapple, mushrooms, onions, capsicums and black olives',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/C01.png'
      }, {
        _id: productIds[4],
        title: 'Seafood Pesto',
        description: 'Shrimps, squid rings and mushroom on a bed of Pesto sauce, topped with Mozzarella cheese and parsley.',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/C02.png'
      }, {
        _id: productIds[5],
        title: 'Ocean Delight',
        description: 'Squid, crab stick, pineapple, green pepper, onion, Cheesy mayo sauce and mozzarella',
        price: chance.integer({ min: 8, max: 15 }),
        category: categoryIds[0],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/C07.png'
      }, {
        _id: productIds[6],
        title: 'Spaghetti Bolognese',
        description: 'Beef served with Parmesan cheese on top in Bolognese sauce',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/FA17.png'
      }, {
        _id: productIds[7],
        title: 'Marinara Seafood Spaghetti',
        description: 'Shrimps, squid rings, capsicum, onions in Bolognese sauce',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/FA18.png'
      }, {
        _id: productIds[8],
        title: 'Seafood Black Pepper Spaghetti',
        description: 'Shrimps, crab sticks, squid rings, French bean, mushroom, capsicum in black pepper sauce',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/FA21.png'
      }, {
        _id: productIds[9],
        title: 'Spaghetti Bolognese With Meatballs',
        description: 'Beef, meatballs in Bolognese sauce',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://order.pizzahut.vn/menu/v000001/hk/en/images/FA22.png'
      }, {
        _id: productIds[10],
        title: 'Chicken Piccata',
        description: 'Two chicken breasts sautéed in a lemon white wine butter sauce with capers, served with fettuccine alfredo. Salad or veggies may be substituted for pasta.',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://prestopasta.com/wordpress/wp-content/uploads/2015/06/Chicken-Picatta.4-100x100.jpg'
      }, {
        _id: productIds[11],
        title: 'Cajun Chicken Penne',
        description: 'Diced blackened chicken breast, sautéed with bell peppers and red onions, tossed with a spicy cajun cream sauce and penne pasta.',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[1],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://prestopasta.com/wordpress/wp-content/uploads/2015/06/Cajun-Pasta1-100x100.jpg'
      }, {
        _id: productIds[12],
        title: 'Garden salad with Balsamic vinegar dressing',
        description: 'Garden salad with Balsamic vinegar dressing',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[2],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/173-home_default/garden-salad-with-balsamic-vinegar-dressing.jpg'
      }, {
        _id: productIds[13],
        title: 'Signature salad',
        description: 'Signature salad of our store',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[2],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/174-home_default/garden-salad-with-balsamic-vinegar-dressing.jpg'
      }, {
        _id: productIds[14],
        title: 'Caesar salad',
        description: 'Classis caesar salad with caesar dressing',
        price: chance.integer({ min: 2, max: 8 }),
        category: categoryIds[2],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/175-home_default/garden-salad-with-balsamic-vinegar-dressing.jpg'
      }, {
        _id: productIds[15],
        title: 'Chocolate Stripe Cloud Cream Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-12.jpg'
      }, {
        _id: productIds[16],
        title: 'Triple Delight Coffee Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-11.jpg'
      }, {
        _id: productIds[17],
        title: 'Blueberry Yogurt Cream Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-10.jpg'
      }, {
        _id: productIds[18],
        title: 'Green Tea Cloud Cream Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-10.jpg'
      }, {
        _id: productIds[19],
        title: 'Green Tea Chiffon Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-08.jpg'
      }, {
        _id: productIds[20],
        title: 'Chocolate Cloud Cream Cake',
        description: '',
        price: chance.integer({ min: 2, max: 4 }),
        category: categoryIds[3],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://www.tljus.com/wp-content/uploads/2019/12/fresh-cream-cake1-07.jpg'
      }, {
        _id: productIds[21],
        title: 'Pepsi',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/339-home_default/quesadillas.jpg'
      }, {
        _id: productIds[22],
        title: '7Up',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/341-home_default/7-up.jpg'
      }, {
        _id: productIds[23],
        title: 'Aquafina',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/273-home_default/quesadillas.jpg'
      }, {
        _id: productIds[24],
        title: '333 Beer',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/272-home_default/quesadillas.jpg'
      }, {
        _id: productIds[25],
        title: 'Strongbow Dark Fruit',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/314-home_default/strongbow-dark-fruit.jpg'
      }, {
        _id: productIds[26],
        title: 'Heineken',
        description: '',
        price: chance.integer({ min: 1, max: 2 }),
        category: categoryIds[4],
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: 'https://thepizzacompany.vn/271-home_default/heineken.jpg'
      }])
    }
    catch (err) {
      debug.error(err)
    }
  },

  async down(db, client) {
    try {
      await db.collection('products').drop()
    }
    catch (err) {
      debug.error(err)
    }
  }
};
