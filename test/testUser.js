const chai = require("chai");
const expect = chai.expect;
const userValidator=require('../app/validator/validateUser')
const todoListValidator=require('../app/validator/validateTodoList')

/*describe("validator checkEmail()", () => {
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
  });*/

// describe("Validator checkNames()",()=>{
//     it("should return true ", ()=> {
// 		expect(userValidator.checkNames('al ain')).to.be.true
//     })
//     it("should return true ", ()=> {
// 		expect(userValidator.checkNames('toto')).to.be.true
//     })
//     it("should return true ", ()=> {
// 		expect(userValidator.checkNames('to-to')).to.be.true
//     })
//     it("should return false", ()=> {
//       expect(userValidator.checkNames('jules31')).to.be.false
//     })
//     it("should return false ", ()=> {
//       expect(userValidator.checkNames('-jules')).to.be.false
//     })
//     it("should return false ", ()=> {
//       expect(userValidator.checkNames('guillaume@')).to.be.false
//     })
//     it("should return true ", ()=> {
//       expect(userValidator.checkNames('/toto')).to.be.true
//     }) 
       
// });


/*describe("Validator checkPassword",()=>{

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
  
});*/

describe( "Validator age", () => {

    it("it should return false", ()=>{
        expect(userValidator.checkAge('11-27-2020')).to.be.false
    })

    it("it should return true", ()=>{
        expect(userValidator.checkAge('11-27-2000')).to.be.true
    })

    it("it should return invalid date birth", ()=>{
        expect(userValidator.checkAge('11-27-1899')).to.equal("invalid date birth")
    })

    it("it should return true", ()=>{
        expect(userValidator.checkAge('11/27/2000')).to.be.true
    })

    it("it should return The date of birth is not valid", ()=>{
        expect(userValidator.checkAge('12-28-2020')).to.equal("The date of birth is not valid")
    })

    it("it should return invalid date birth", ()=>{
        expect(userValidator.checkAge('franck')).to.equal("invalid date birth")
    })

})


/*describe("validator isValid()", () => {

    it("should return true ", ()=> {

	    let user = {

            "lastName": "Guillaume",
            "firstName": "WELLE",
            "birthDate": "01/04/1993",
            "email": "gwelle@myges.fr",
            "password": "test123$",
        }
		expect(userValidator.isValid(user)).to.be.true
    })
})*/



