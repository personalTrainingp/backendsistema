const moment = require("moment")

const isDate = (value, rest)=>{

    
    if (!value) return false;
    const fecha = moment(value)

    if (fecha.isValid()) {
        return true
    }else{
        return false
    }

}

module.exports= {isDate}