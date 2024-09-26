// const mailString = (
//   nombre_completo_cli,
//   n_contrato,
//   n_socio,
//   n_sesiones,
//   fec_inicio,
//   fec_termino,
//   horario,
//   tipo_comprobante,
//   n_comprobante,
//   monto,
//   dias_cong,
//   citas_nut,
//   nombre_asesor
// ) => {
//   return `
//     <!DOCTYPE html>
//   <html lang="es">
  
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>CONTRATO</title>
//   </head>
  
//   <body>
//       <table class="x_content-border" cellspacing="0" cellpadding="0" border="0" align="center"
//           min-scale="0.3564516129032258" style="transform: scale(1, 1); transform-origin: left top;">
//           <tbody>
//               <tr>
//                   <td style="height:20px" colspan="1" rowspan="1">&nbsp;</td>
//               </tr>
//               <tr>
//                   <td colspan="1" rowspan="1">
//                       <table class="x_content" cellspacing="0" cellpadding="0" border="0" align="center">
//                           <tbody>
//                               <tr>
//                                   <td colspan="1" rowspan="1" valign="top" align="center" height="50" width="300">
//                                       <img style="display: block; height: 180px; margin: 0px auto 10px;" alt="Interbank"
//                                           src="img/mailing change-01.png" originalsrc="cid:logo"
//                                           data-imagetype="AttachmentByCid" crossorigin="use-credentials"
//                                           fetchpriority="high" tabindex="0" class="Do8Zj">
//                                   </td>
//                               </tr>
//                               <tr>
//                                   <td colspan="1" rowspan="1" align="center" width="600">
//                                       <table
//                                           style="padding-left:5px; padding-right:5px; background-repeat:no-repeat; background-position:50% 50%"
//                                           cellpadding="0" cellspacing="0" width="410" background="cid:sello"
//                                           data-imagetype="External">
//                                           <tbody>
//                                               <tr>
//                                                   <td style="height:30px" colspan="1" rowspan="1">
                                                      
//                                                       <table
//                                                       style="border:none; border-collapse:collapse; border-spacing:0; width:100%"
//                                                       width="100%"
//                                                       cellspacing="0"
//                                                       cellpadding="0"
//                                                       border="0">
//                                                       <tbody>
//                                                           <tr>
//                                                               <td style="color:#000; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:16px; line-height:28px; padding-bottom:5px; padding-right:12px; padding-top:5px; direction:ltr; text-align:left"
//                                                                   align="left"
//                                                                   valign="middle"
//                                                                   class="x_Uber18_text_p1 x_mobileCard_b_pad">
//                                                                   <table
//                                                                       style="border:none; border-collapse:collapse; border-spacing:0; width:100%"
//                                                                       cellspacing="0"
//                                                                       cellpadding="0"
//                                                                       border="0"
//                                                                       width="100%">
//                                                                       <tbody>
//                                                                           <tr>
//                                                                               <td style="direction:ltr; text-align:left"
//                                                                                   align="left">
//                                                                                   <table
//                                                                                       style="border:none; border-collapse:collapse; border-spacing:0; width:initial"
//                                                                                       cellspacing="0"
//                                                                                       cellpadding="0"
//                                                                                       border="0"
//                                                                                       width="initial"
//                                                                                       align="left">
//                                                                                       <tbody>
//                                                                                           <tr>
//                                                                                               <td style="color:#000; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:16px; line-height:20px; padding-bottom:2px; padding-right:5px; padding-top:2px; direction:ltr; text-align:left;"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                                   B i e n v e n i d o ( a ):
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                           <tr>
//                                                                                               <td style="border-bottom: 2px solid;color:#000000; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:14px; line-height:20px; padding-bottom:2px; padding-right:5px;font-weight: bold; padding-top:0; direction:ltr; text-align:left"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                                   ${nombre_completo_cli}
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                           <tr>
//                                                                                               <td style="color:#757575; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:14px; line-height:20px; padding-bottom:2px; padding-right:5px; padding-top:0; direction:ltr; text-align:left"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                           <tr>
//                                                                                               <td style="height:20px" colspan="1" rowspan="1"></td>
//                                                                                           </tr>
//                                                                                       </tbody>
//                                                                                   </table>
                                                                                  
//                                                                                   <table
//                                                                                       style="border:none; border-collapse:collapse; border-spacing:0; width:initial"
//                                                                                       cellspacing="0"
//                                                                                       cellpadding="0"
//                                                                                       border="0"
//                                                                                       width="initial"
//                                                                                       align="left">
//                                                                                       <tbody>
//                                                                                           <tr>
//                                                                                               <td style="color:#000; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:16px; line-height:20px; padding-bottom:2px; padding-right:5px; padding-top:2px; direction:ltr; text-align:left; font-weight:bold"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                                   ¡Gracias por:
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                           <tr>
//                                                                                               <td style="font-weight: bolder;color:#000; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:14px; line-height:20px; padding-bottom:2px; padding-right:5px; padding-top:0; direction:ltr; text-align:left"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                                   unirte a <span style="color:#D31115;font-weight: bolder;">CHANGE!</span>
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                           <tr>
//                                                                                               <td style="color:#757575; font-family:uber18-text-regular,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif; font-size:14px; line-height:20px; padding-bottom:2px; padding-right:5px; padding-top:0; direction:ltr; text-align:left"
//                                                                                                   align="left"
//                                                                                                   class="x_Uber18_text_p1">
//                                                                                               </td>
//                                                                                           </tr>
//                                                                                       </tbody>
//                                                                                   </table>
//                                                                               </td>
                                                                              
//                                                                           </tr>
//                                                                       </tbody>
//                                                                   </table>
//                                                               </td>
//                                                               <td style="color:#000; font-family:uber18-text-medium,Helvetica,Arial,sans-serif; font-size:16px; line-height:20px; padding-bottom:10px; padding-top:10px; text-align:right; direction:ltr; vertical-align:top"
//                                                                   align="right"
//                                                                   valign="middle"
//                                                                   class="x_Uber18_text_p3">
//                                                                   <div style="font-weight: bold;font-family:uber18-text-bold,helveticaneue-light,&quot;helvetica neue light&quot;,Helvetica, Arial, sans-serif, serif, EmojiFont; font-size: 9px; line-height: 20px; text-transform: none;"
//                                                                       lang="x-btn" class="x_btn x_cta">
//                                                                       <a style="background-color:#D31115; border-color:#D31115; border-radius:0; border-style:solid; border-width:1px 2px; color:#fff; display:inline-block; letter-spacing:1px; max-width:300px; min-width:100px; text-align:center; text-decoration:none; font-family:uber18-text-bold,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif"
//                                                                           data-auth="NotApplicable" rel="noopener noreferrer"
//                                                                           data-linkindex="4"><span style="text-align:left">CONTRATO Nº</span></a>
//                                                                       <a style="font-size: 25px; background-color:#282828; border-color:#282828; border-radius:0; border-style:solid; border-width:8px 2px; color:#fff; display:inline-block; letter-spacing:1px; max-width:300px; min-width:100px; text-align:center; text-decoration:none; font-family:uber18-text-bold,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif"
//                                                                       data-auth="NotApplicable" rel="noopener noreferrer"
//                                                                       data-linkindex="4"><span style="text-align:left">${n_contrato}</span></a>
//                                                                   </div>
//                                                                   <div style="height: 8px;"></div>
//                                                                   <div style="font-weight: bold;font-family: uber18-text-bold, helveticaneue-light, &quot;helvetica neue light&quot;, Helvetica, Arial, sans-serif, serif, EmojiFont; font-size: 9px; line-height: 20px; text-transform: none;"
//                                                                       lang="x-btn" class="x_btn x_cta">
//                                                                       <a style="background-color:#D31115; border-color:#D31115; border-radius:0; border-style:solid; border-width:1px 2px; color:#fff; display:inline-block; letter-spacing:1px; max-width:300px; min-width:100px; text-align:center; text-decoration:none; font-family:uber18-text-bold,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif"
//                                                                           data-auth="NotApplicable" rel="noopener noreferrer"
//                                                                           data-linkindex="4"><span style="text-align:left">Nº DE SOCIO</span></a>
//                                                                       <a style="font-size: 25px; background-color:#282828; border-color:#282828; border-radius:0; border-style:solid; border-width:8px 2px; color:#fff; display:inline-block; letter-spacing:1px; max-width:300px; min-width:100px; text-align:center; text-decoration:none; font-family:uber18-text-bold,helveticaneue-light,helvetica neue light,Helvetica,Arial,sans-serif"
//                                                                       data-auth="NotApplicable" rel="noopener noreferrer"
//                                                                       data-linkindex="4"><span style="text-align:left">${n_socio}</span></a>
//                                                                   </div>
//                                                               </td>
//                                                           </tr>
//                                                       </tbody>
//                                                   </table>
//                                                   </td>
                                                  
//                                               </tr>
//                                           </tbody>
//                                       </table>
//                                   </td>
//                               </tr>
                              
//                               <tr>
//                                   <td style="height:35px" colspan="1" rowspan="1"></td>
//                               </tr>
//                               <tr>
//                                   <td colspan="1" rowspan="1" align="center" width="300">
//                                       <table
//                                           style="border:3px solid #D31115; border-radius: 12px; padding-left:15px; padding-right:15px; background-repeat:no-repeat; background-position:50% 50%"
//                                           cellpadding="0" cellspacing="0" width="298" background="cid:sello"
//                                           data-imagetype="External">
//                                           <tbody>
//                                               <tr>
//                                                   <td style="text-align:center" colspan="1" rowspan="1" valign="top"
//                                                       align="center" height="200" width="268">
//                                                       <table style="border-spacing:0; text-align:center" cellpadding="0"
//                                                           cellspacing="0" width="100%">
//                                                           <tbody>
//                                                               <!-- <tr>
//                                                                   <td style="height:20px" rowspan="1" colspan="2">&nbsp;
//                                                                   </td>
//                                                               </tr> -->
//                                                               <tr></tr>
//                                                               <tr style="vertical-align:top;">
//                                                                   <td style="display:inline-block;position: relative;transform: skew(-16deg);left: 0px; bottom: 15px; background-color: #D31115;width: 120px; height: 22px;"
//                                                                       rowspan="1" valign="top" align="center" colspan="1">
//                                                                   </td>
//                                                               </tr>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="text-align:center;font-family: Arial, Helvetica, sans-serif;font-weight: bold;font-size:13px;position: relative;bottom: 32px;color:#fff;" rowspan="1" valign="top"
//                                                       align="center" colspan="2">
//                                                       <span>R E S U M E N</span>
//                                                   </td>
//                                               </tr>
//                                           </tbody>
//                                       </table>
//                                       <table style="color:#4e4f53; font-size:14px;font-family: Arial, Helvetica, sans-serif; text-align:center; position: relative;bottom: 14px;" cellspacing="0"
//                                           cellpadding="0" align="center" border="0" width="100%">
//                                           <tbody>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Programa:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>Fs 45</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Sesiones:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${
//                                                             n_sesiones * 5
//                                                           }</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Fecha de inicio:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${fec_inicio}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Fecha de termino:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${fec_termino}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Horario:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${horario}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">${tipo_comprobante}:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${n_comprobante}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Monto:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>S/. ${monto}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Dias de congelamiento:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${dias_cong}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Citas Nutricionales:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${citas_nut}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                               <tr style="vertical-align:top">
//                                                   <td style="color:#000000;font-weight: bold; text-align:right; font-size:11px; width:126px"
//                                                       colspan="1" rowspan="1"><span id="x_font-parrafo-etiqueta">Asesor Fitness:</span> </td>
//                                                   <td style="text-align:left; padding-left:8px; width:114px;font-size: 11px;" colspan="1"
//                                                       rowspan="1">
//                                                       <span id="x_font-parrafo-valor">
//                                                           <span>${nombre_asesor}</span>
//                                                           <!-- <br/> -->
//                                                       </span> 
//                                                   </td>
//                                               </tr>
//                                               <tr>
//                                                   <td style="height:3px" colspan="1" rowspan="1"></td>
//                                               </tr>
//                                           </tbody>
//                                       </table>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table>
//                   </td>
//               </tr>
//               <tr>
//                   <td colspan="1" rowspan="1" valign="top" align="center" height="50" width="300">
//                       <img style="display: block; height: 180px; margin: 10px auto 0px;" alt="Interbank"
//                           src="img/mailing change-03.png" originalsrc="cid:logo" data-imagetype="AttachmentByCid"
//                           crossorigin="use-credentials" fetchpriority="high" tabindex="0" class="Do8Zj">
//                   </td>
//               </tr>
//               <tr>
//                   <td colspan="1" rowspan="1" valign="top" align="center" height="50" width="300">
//                       <img style="display: block; height: 92px;" alt="Interbank" src="img/mailing change-04.png"
//                           originalsrc="cid:logo" data-imagetype="AttachmentByCid" crossorigin="use-credentials"
//                           fetchpriority="high" tabindex="0" class="Do8Zj">
//                   </td>
//               </tr>
//           </tbody>
//       </table>
//       </td>
//       </tr>
//       </tbody>
//       </table>
//   </body>
  
//   </html>
//     `;
// };
// module.exports = {
//   mailString,
// };
