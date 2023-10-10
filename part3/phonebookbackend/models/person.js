const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

const numberValidator = (num) => {
  const digitsRegex = /^\d+$/;
  // Is two parts
  const splitArr = num.split("-");
  if (splitArr.length === 2) {
    // First section is 2 or 3 long
    if (splitArr.length == 2 || splitArr.length == 3) {
      // Only contains digits
      const test1 = digitsRegex.test(splitArr[0]);
      const test2 = digitsRegex.test(splitArr[1]);
      return test1 && test2;
    }
  }
  return false;
};

mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb:", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 3,
    validate: {
      validator: (num) => {
        return numberValidator(num);
      },
      message: "Phone Number is not valid",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
