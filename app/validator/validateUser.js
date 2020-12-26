



   exports.checkEmail=function (email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regex.test(String(email).toLowerCase()))
    return regex.test(String(email).toLowerCase());
    }

   exports.checkNames= function (name){
       return /^[a-zA-Z ]+$/.test(name);
    }

   exports.checkPassword=function (password){
        const regex=/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z]).{8,40}$/;
        return regex.test(password);
    }

    exports.checkAge=function (birthdate){
        
    }

    
