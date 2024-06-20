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
const extraerIpUser = (req, res, next)=>{
    let ip_user = req.socket.localAddress;

    // Si la IP es una dirección IPv6 de loopback (::1), obtenemos la IPv4 de loopback
    if (ip_user === "::1" || ip_user === "127.0.0.1") {
      ip_user = "127.0.0.1";
    }

    // En caso de múltiples IPs (cuando se usa un proxy), tomar la primera
    if (ip_user.includes(",")) {
      ip_user = ip_user.split(",")[0];
    }
    ip_user = ip_user.trim();
    return ip_user;
}
module.exports = {
extraerUser
}