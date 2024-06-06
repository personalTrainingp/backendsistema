const { Actividad } = require("../models/Modelos");

const extraerUser = (req, res, next)=>{
    const saveUser = (req, res, next)=>{
        const {uid_user, observacion_activity} = req.body;
        const Activity = new Actividad({
            uid_user,
            observacion_activity
        })
        console.log(Activity);
    }
    saveUser(req, res, next)
}
module.exports = {
extraerUser
}