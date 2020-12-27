

   function checkEmail(email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email));
    }

    function checkNames(name){
       const regex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
       return regex.test(String(name));
    }

    function checkPassword(password){
        const regex=/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z])(?=.*?[a-z]).{8,40}$/;
        return regex.test(String(password));
    }

    function checkAge(birthdate){
        let response;
            var now = new Date().getTime();
            var birth=new Date(birthdate).getTime();
            var Difference_In_Time = now - birth;
            var Difference_In_Days=Difference_In_Time/ (1000 * 3600 * 24);

            if(Difference_In_Days/365 > 13){
                response=true;
            }
            else{
               response=false;
            }
     return response;
    }

    function isValid(user){
        var error_array=[];
        if(  checkEmail(user["email"])
            && checkNames(user["lastName"])
            && checkNames(user["firstName"])
            && checkAge(user["birthDate"])
            && checkPassword(user["password"])
        ){
            return true;
        }else{
            if(!checkEmail(user["email"])){
            error_array.push("email not valid");
            }
            if(!checkNames(user["lastName"])){
                error_array.push("lastName not valid");
            }
            if(!checkNames(user["firstName"])){
                error_array.push("firstName not valid");
            }
            if(!checkAge(user["birthDate"])){
                error_array.push("birthDate not valid");
            }
            if(!checkPassword(user["password"])){
                error_array.push("password not valid");
            }
            console.log(error_array)
            return error_array;
        }
    }

exports.checkEmail=checkEmail
exports.checkNames=checkNames
exports.checkAge=checkAge
exports.checkPassword=checkPassword
exports.isValid=isValid