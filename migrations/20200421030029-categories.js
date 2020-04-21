const debug = require('../src/utils/debug.utils')
const { categoryIds } = require('../mongoObjectIdSeeds')

module.exports = {
  async up(db, client) {
    try {
      await db.collection('categories').insertMany([{
        _id: categoryIds[0],
        title: 'Pizza',
        imageUrl: 'https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-the-pizza-company-royal-city-1-normal-1320212618915.jpg'
      }, {
        _id: categoryIds[1],
        title: 'Pasta',
        imageUrl: 'https://chefjob.vn/images/tin-tuc/nha-hang-khach-san/nhieu-loai-pasta-khac-nhau.jpg'
      }, {
        _id: categoryIds[2],
        title: 'Salad',
        imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/157/15778/157787-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'
      }, {
        _id: categoryIds[3],
        title: 'Dessert',
        imageUrl: 'https://cdn3.tmbi.com/toh/GoogleImages/exps19201_RDS011700016SC03_13_2b_WEB.jpg'
      }, {
        _id: categoryIds[4],
        title: 'Beverage',
        imageUrl: 'https://cdn.tgdd.vn/Files/2017/10/25/1035746/soda-la-gi-soda-co-phai-la-nuoc-khoang-co-gas-khong-201908101718039386.jpg'
      }])
    }
    catch (err) {
      debug.error(err)
    }
  },

  async down(db, client) {
    try {
      await db.collection('categories').drop()
    }
    catch (err) {
      debug.error(err)
    }
  }
};
