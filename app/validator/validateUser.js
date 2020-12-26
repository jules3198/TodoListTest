



   exports.checkEmail=function (email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regex.test(String(email).toLowerCase()))
    return regex.test(String(email).toLowerCase());
    }

   exports.checkNames= function (name){
       const regex=/^[A-Za-z]+([\s]{0,1}|['-]{0,1})^$/
       return /^[a-zA-Z ]+$/.test(name);
    }

   exports.checkPassword=function (password){
        const regex=/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z]).{8,40}$/;
        return regex.test(password);
    }

    exports.checkAge=function (birthdate){
         
        var now = new Date().getTime();
        var birth=new Date(birthdate).getTime()
        var Difference_In_Time = now - birth; 
        var Difference_In_Days=Difference_In_Time/ (1000 * 3600 * 24); 
        if(Difference_In_Days/365 > 13){
            return true
        } 
        else{
            return false;
        }
    }

    
