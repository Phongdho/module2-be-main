const faker = require('faker');
const User = require("./models/User")
const bcrypt = require('bcrypt');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
const fs = require('fs');
const { uploader } = require("./helpers/cloudinaryConfig");

let images = fs.readdirSync('./images');
// console.log(images)

const numberOfUser = 50;
const createUser = async (req, res, next) => {
    // try {
        await User.collection.drop();
        console.log("Creating some users");
        // let imagePath = images[Math.floor(Math.random() * images.length + 1)]
        // console.log("single image", imagePath)
        // let cloudinaryResponse = await uploader.upload(imagePath)
        for (let i = 0; i < numberOfUser; i++) {
            const singleUser = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                password: "123",
                currentBalance: faker.datatype.number({ min: 1000, max: 10000 }),
                avatar: faker.random.arrayElement(images),
                // avatar: faker.image.people()
            };
            const salt = await bcrypt.genSalt(SALT_ROUND);
            singleUser.password = await bcrypt.hash(singleUser.password, salt);
            const foundUser = await User.findOne({ name: singleUser.name, email: singleUser.email });
            if (!foundUser) {
                const createdUser = await User.create(singleUser);
                console.log(`Created ${createdUser.name}, email: ${createdUser.email}`);
            } else {
                console.log("Found same user", found.name, found.email);
            }
        }  
    // } catch (error) {
    //     return next(error)
    // }
    // console.log("image url", cloudinaryResponse.secure_url)
    console.log("Successfully create users")
};

module.exports = createUser;