const mongoose = require("mongoose");
const User = require("../src/dao/classes/user.dao.js");
const Assert = require("assert");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const assert = Assert.strict;

describe(`Testing Users Dao`, () => {
  before(function () {
    this.usersDao = new User();
  });
  it(`El Dao debe poder obtener los usuario en formato de arreglo`, async function () {
    console.log(this.usersDao);
    const result = await this.usersDao.getUsers();
    assert.strictEqual(Array.isArray(result), true);
  });
  beforeEach(function () {
    this.timeout(10000);
  });
});
