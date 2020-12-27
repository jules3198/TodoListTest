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
    it("should return false", ()=> {
      expect(userValidator.checkNames('jules31')).to.be.false
    })
    it("should return false ", ()=> {
      expect(userValidator.checkNames('-jules')).to.be.false
    })
    it("should return false ", ()=> {
      expect(userValidator.checkNames('guillaume@')).to.be.false
    })
    it("should return false ", ()=> {
      expect(userValidator.checkNames('/toto')).to.be.false
    }) 
       
})


describe("Validator checkPassword",()=>{

  it("it should return false", ()=>{
    expect(userValidator.checkPassword('1234@')).to.be.false
  })
  it("it should return false", ()=>{
    expect(userValidator.checkPassword('gk12@')).to.be.false
  })
  it("it should return false", ()=>{
    expect(userValidator.checkPassword('password')).to.be.false
  })
  it("it should return false", ()=>{
    expect(userValidator.checkPassword('123456789')).to.be.false
  })
  it("it should return true", ()=>{
    expect(userValidator.checkPassword('Abcd1234@')).to.be.true
  })
  it("it should return true", ()=>{
    expect(userValidator.checkPassword('1234@VVVVnnj')).to.be.true
  })
  it("it should return false", ()=>{
    expect(userValidator.checkPassword('abcd31/$')).to.be.false
  })
  
})

describe( "Validator age", () => {

    it("it should return false", ()=>{
        expect(userValidator.checkAge('11-27-2020')).to.be.false
    })

    it("it should return true", ()=>{
        expect(userValidator.checkAge('11-27-2000')).to.be.true
    })


    it("it should return true", ()=>{
        expect(userValidator.checkAge('11/27/2000')).to.be.true
    })

    it("it should return false", ()=>{
        expect(userValidator.checkAge('12/28/2020')).to.be.false
    })

})


describe("validator isValid()", () => {

    it("should return true ", ()=> {

	    let user = {

            "lastName": "toto ali",
            "firstName": "georges-li",
            "birthDate": "11-27-2000",
            "email": "gwelle@myges.fr",
            "password": "Test123@",
        }
		expect(userValidator.isValid(user)).to.be.true
    })

    it("should return an array that contain password not valid ", ()=> {

	    let user = {

            "lastName": "toto ali",
            "firstName": "georges-li",
            "birthDate": "11-27-2000",
            "email": "gwelle@myges.fr",
            "password": "Test1",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('password not valid');
    })

    it("should return an array that contain birthDate not valid ", ()=> {

	    let user = {

            "lastName": "toto ali",
            "firstName": "georges-li",
            "birthDate": "11-27-2010",
            "email": "gwelle@myges.fr",
            "password": "Test1@kkjh",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('birthDate not valid');
    })

    it("should return an array that contain email not valid ", ()=> {

	    let user = {

            "lastName": "toto ali",
            "firstName": "georges-li",
            "birthDate": "11-27-2000",
            "email": "gwellemyges.fr",
            "password": "Test1@kkjh",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('email not valid');
    })

    it("should return an array that contain firstName not valid ", ()=> {

	    let user = {

            "lastName": "toto ali",
            "firstName": "",
            "birthDate": "11-27-2000",
            "email": "gwelle@myges.fr",
            "password": "Test1@kkjh",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('firstName not valid');
    })

    it("should return an array that contain lastName not valid ", ()=> {

	    let user = {

            "lastName": "",
            "firstName": "toto",
            "birthDate": "11-27-2000",
            "email": "gwelle@myges.fr",
            "password": "Test1@kkjh",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('lastName not valid');
    })

    it("should return an array that includes ['email not valid','lastName not valid','firstName not valid','birthDate not valid','password not valid']  ", ()=> {

	    let user = {

            "lastName": "",
            "firstName": "tffs@sé5",
            "birthDate": "11-27-2010",
            "email": "gwellemyges.fr",
            "password": "test1@kkjh",
        }
		expect(userValidator.isValid(user)).to.be.an('array').that.includes('email not valid','lastName not valid','firstName not valid','birthDate not valid','password not valid');
    })
})



