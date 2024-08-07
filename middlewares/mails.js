const transporterU = require("../config/nodemailer");

const mailNutricion = (req, res, next) => {
  // console.log(req.body);
  if (!req.body.email_cli || req.body.email_cli.length <= 0) {
    next();
    return;
  }
  const {
    email_cli,
    tipo_serv,
    nombres_apellidos_cli,
    fec_servicio,
    hora_servicio,
  } = req.body;
  const EMAIL_INFO = {
    nombres_apellidos: nombres_apellidos_cli,
    email_cli: email_cli,
    tipo_serv: tipo_serv,
    empresa: "CHANGE THE SLIM STUDIO",
    fec_servicio: fec_servicio,
    hora_servicio: hora_servicio,
  };
  // Leer la imagen del sistema de archivos
  const LOGOFONDOAttachment = {
    filename: "logo-con-fondo.jpg",
    path: "./public/logo-con-fondo.png",
    cid: "logofondo@changestudio.com", // Identificador único para incrustar la imagen
  };
  const LOGOTRANSPARENTEAttachment = {
    filename: "logo-transparente.jpg",
    path: "./public/logo-transparente.png",
    cid: "logotransparente@changestudio.com", // Identificador único para incrustar la imagen
  };
  const mailOptions = {
    from: "notificaciones@personaltraining.com.pe",
    to: `${EMAIL_INFO.email_cli}`,
    subject: `Cita ${EMAIL_INFO.fec_servicio} | ${EMAIL_INFO.empresa}`,
    attachments: [LOGOFONDOAttachment, LOGOTRANSPARENTEAttachment],
    html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table align="center" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="590">
        <tr>
          <td width="168" align="center" bgcolor="#FFFFFF" style="color:#666666;font-family:Arial;font-size:11px;height:15px;text-align: left;">&nbsp;</td>
          <td width="422" align="center" bgcolor="#FFFFFF" style="color:#666666;font-family:Arial;font-size:9px;height:15px;text-align: right;">
         <!-- Link Browser -->
            <span style="font-family: Verdana,Arial,sans-serif; padding: 5px 0" >Si no puedes ver este correo, entra a este <a href="##Online_Mailing_HTML##" style="color: #323232">link</a>.
         <!-- Contact -->
            <br />Agrega <a href="mailto:sellercenter@info.sellercenter.linio.com.ve" style="color: #323232;text-decoration:none;">sellercenter@info.sellercenter.linio.com.ve</a> a tu lista de contactos.</span>
          </td>
        </tr>
      </table>
  
      <table align="center" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="590">
        <!-- Header MKP -->
        <tr>
          <td style="background-color: #323232;display: flex;justify-content: center;">
            <img alt="change the slim studio." height="60" src="cid:logotransparente@changestudio.com" style="display:block;border:0;padding: 15px;" width="250" border="0">
          </td>
        </tr>
      </table>
     <!-- Title -->
      <!-- ENCABEZADO -->
      <table style="width:590px; background-color:FFFFFF; height:auto;" align="center" border="0" cellpadding="0" cellspacing="0">
        <tr style="background-color:#ffffff;">
          <td>
              <p style="font-family: 'Source Sans Pro', Arial, sans-serif; font-size: 22px;  color: #4d4d4d; text-align:center; line-height: 40px; height:auto; text-transform: uppercase; letter-spacing: 2px;"><span style="border-bottom: #f60 solid;"><strong>CITA DE ${EMAIL_INFO.tipo_serv}  </strong></span></p>
          </td>
        </tr>
      </table>
      <!-- CUERPO -->
      <table align="center" width="590" border="0" cellpadding="0" cellspacing="0">
        <table style="width:590px; background-color:FFFFFF; height:auto;" align="center" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Subtitle -->
            <td style="font-family: 'Helvetica Neue Light',Helvetica,Arial,sans-serif; font-size: 15px; color:#787878; text-align: justify; line-height: 22px; height: 0px; background-color: rgb(255, 255, 255); letter-spacing: 0.5px; padding: 0px 60px 0px 30px; font-weight: lighter;">
                <p style="text-decoration: underline; text-transform: uppercase;"></p>
              <ul style="list-style-type: none">
                <p>
                    Hola <strong>${EMAIL_INFO.nombres_apellidos}</strong> tu reserva para la cita de <strong>${EMAIL_INFO.tipo_serv}</strong> en <strong>${EMAIL_INFO.empresa}</strong> el <strong>${EMAIL_INFO.fec_servicio}</strong> a las <strong>${EMAIL_INFO.hora_servicio}</strong> ha sido confirmada. 
                    ¡Nos vemos!
                </p>
              </ul>
            </td>
          </tr>
        </table>
      </table>
  
  
        
      
      
        
  
         
      <!-- End of Content -->
      <!-- Footer -->
      <table align="center" bgcolor="#FFFFFF" border="0" cellpadding="10" cellspacing="0" width="590">
        <tr>
          <td style="border-bottom: #f60 solid;display: flex; justify-content: center;">
            <img alt="change the slim studio." height="100" src="cid:logofondo@changestudio.com" style="border:0;margin-top: 100px;" width="370" border="0">
          </td>
        </tr>
      </table>
      <!-- End footer -->
</body>
</html>
        `,
  };
  // Enviar correo electrónico por SMTP
  transporterU.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Correo electrónico enviado: " + info.response);
    }

    // Cerrar la conexión SMTP
    transporterU.close();
  });
  next();
};
module.exports = {
  mailNutricion,
};
