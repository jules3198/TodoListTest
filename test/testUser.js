const chai = require("chai");
const expect = chai.expect;
const userValidator=require('../app/validator/validateUser')
const todoListValidator=require('../app/validator/validateTodoList')

describe("validator checkEmail()", () => {
	it("should return false ", ()=> {
		expect(userValidator.checkEmail('jules')).to.be.false
    })
    it("should return true",()=>{
        expect(userValidator.checkEmail('jules31@gmail.fr')).to.be.true
    })
    it("should return true",()=>{
        expect(userValidator.checkEmail('guillaune2@gmail.fr')).to.be.true
    })
    it("should return true",()=>{
        expect(userValidator.checkEmail('jules@gmail.fr')).to.be.true
    })
    it("should return false",()=>{
        expect(userValidator.checkEmail('jules@31@gmail.fr')).to.be.false
    })
    it("should return false",()=>{
        expect(userValidator.checkEmail('jules31@.com.gmail.fr')).to.be.false
    })


describe("Validator checkNames()",()=>{
    it("should return true ", ()=> {
		expect(userValidator.checkNames('al ain')).to.be.true
    })
    it("should return true ", ()=> {
		expect(userValidator.checkNames('toto')).to.be.true
    })
    it("should return true ", ()=> {
		expect(userValidator.checkNames('to-to')).to.be.true
    })
    it("should return true ", ()=> {
		expect(userValidator.checkNames('jules')).to.be.true
    })
    it("should return true ", ()=> {
		expect(userValidator.checkNames('jules')).to.be.true
    })
    
})

describe("Validator checkNames()",()=>{
  it("should return true ", ()=> {
  expect(userValidator.checkNames('jules')).to.be.true
  })
  it("should return true ", ()=> {
  expect(userValidator.checkNames('jules')).to.be.true
  })
  it("should return true ", ()=> {
  expect(userValidator.checkNames('jules')).to.be.true
  })
  it("should return true ", ()=> {
  expect(userValidator.checkNames('jules')).to.be.true
  })
  it("should return true ", ()=> {
  expect(userValidator.checkNames('jules')).to.be.true
  })
  
})
    
	
});