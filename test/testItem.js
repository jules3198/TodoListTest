const chai = require("chai");
const expect = chai.expect;
const itemValidator=require('../app/validator/validateItem')


describe("validator item creation", () => {
	it("should return false ", ()=> {
		expect(itemValidator.checkMinutes()).to.be.false
    })
    
  })