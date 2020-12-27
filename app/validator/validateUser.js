
   exports.checkEmail=function (email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
    }

   exports.checkNames= function (name){
       const regex=/^[a-zA-Z]$/
       return regex.test(name);
    }

   exports.checkPassword=function (password){
        const regex=/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z])(?=.*?[a-z]).{8,40}$/;
        return regex.test(password);
    }

    exports.checkAge=function (birthdate){

        const regex=/^(0[1-9]{1}|1[0-2]{1})-(0[1-9]{1}|1[0-9]{1}|2[0-9]{1}|3[0-1]{1})-19[0-9]{2}|20[0-9]{2}$/;
        if(regex.test(birthdate)){

            var now = new Date().getTime();
            var birth=new Date(birthdate).getTime()
            
            if(birth > now){

                return "The date of birth is not valid";
            }

            else{

                var Difference_In_Time = now - birth;
                var Difference_In_Days=Difference_In_Time/ (1000 * 3600 * 24);

                if(Difference_In_Days/365 > 13){
                    return true
                }

                else{
                    return false;
                }
            }

        }

        else {

            return "invalid date birth";
        }
    }

   exports.isValid=function (user){

     return( this.checkEmail(user["email"])
         && this.checkNames(user["lastName"])
         && this.checkNames(user["firstName"])
         && this.checkAge(user["birthDate"])
        && this.checkPassword(user["password"])
     ) ? true : false
   }


