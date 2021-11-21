const faker = require("faker");
const Product = require("./models/Product");
const numberOfProduct = 2;

const createProduct = async () => {
  console.log("Creating some products");
  for (let index = 0; index < numberOfProduct; index++) {
    const singleProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      category: faker.commerce.department(),
      stock: Math.ceil(Math.random() * 100),
      description: faker.commerce.productDescription(),
      photo: faker.image.food(),
    };

    const found = await Product.findOne({ name: singleProduct.name });
    if (!found) {
      const created = await Product.create(singleProduct);
      console.log(
        `Created ${created.name} price ${created.price} qty ${created.stock}`
      );
    } else {
      console.log("Found same product name", found.name);
    }
  }
  console.log("Create Product Successfully");
  console.log("===========================");
};


module.exports = createProduct;