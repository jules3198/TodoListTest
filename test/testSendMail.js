const chai = require("chai");
const expect = chai.expect;
const emailService= require('../app/validator/emailService')

describe("valid sendEmail", () => {
	it("should return true ",async ()=> {
        let options={
            "email": "guillaume.sio@gmail.com",
            "subject": "test email",
            "text": "salut guillaume"
           }
		expect(await emailService.sendMail(options)).to.be.true
    });
  })
