import nodemailer from 'nodemailer';

const MAX={nombre:100,telefono:30,email:160,modelo:120,mensaje:3000};
const clean=(v,max)=>String(v??'').trim().slice(0,max);
const escapeHtml=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

let cachedTransporter=null;
function getTransporter(){
  if(cachedTransporter)return cachedTransporter;
  const port=Number(process.env.SMTP_PORT||465);
  cachedTransporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port,
    secure:String(process.env.SMTP_SECURE??(port===465?'true':'false'))==='true',
    auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},
    connectionTimeout:15000,
    greetingTimeout:15000,
    socketTimeout:20000
  });
  return cachedTransporter;
}

export default async function handler(req,res){
  if(req.method==='GET'){
    const keys=['SMTP_HOST','SMTP_PORT','SMTP_SECURE','SMTP_USER','SMTP_PASS','CONTACT_EMAIL'];
    return res.status(200).json({ok:true,service:'001Web contacto API',environment:Object.fromEntries(keys.map(k=>[k,Boolean(process.env[k])]))});
  }
  if(req.method!=='POST')return res.status(405).json({error:'Método no permitido'});
  try{
    const body=req.body||{};
    if(body.website)return res.status(200).json({ok:true});

    const required=['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS'];
    const missing=required.filter(k=>!process.env[k]);
    if(missing.length){console.error('Faltan variables de entorno SMTP',missing);return res.status(500).json({error:'El formulario no está configurado correctamente.'})}

    const nombre=clean(body.nombre,MAX.nombre),telefono=clean(body.telefono,MAX.telefono),email=clean(body.email,MAX.email),modelo=clean(body.modelo,MAX.modelo),mensaje=clean(body.mensaje,MAX.mensaje);
    if(!nombre||!telefono||!email||!mensaje)return res.status(400).json({error:'Completa todos los campos obligatorios.'});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'Introduce un email válido.'});

    const safe={nombre:escapeHtml(nombre),telefono:escapeHtml(telefono||'No indicado'),email:escapeHtml(email),modelo:escapeHtml(modelo||'No indicada'),mensaje:escapeHtml(mensaje).replace(/\n/g,'<br>')};
    const subject=`Nueva consulta 001Web - 001web.es | ${nombre}`;
    const html=`<div style="font-family:Arial,sans-serif;line-height:1.6;color:#20142E"><h2 style="color:#2E0B5C">Nueva consulta desde 001Web</h2><p><strong>Nombre:</strong> ${safe.nombre}</p><p><strong>Empresa:</strong> ${safe.modelo}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Teléfono:</strong> ${safe.telefono}</p><p><strong>Proyecto:</strong><br>${safe.mensaje}</p><hr><p style="font-size:12px;color:#5f5570">Enviado desde el formulario de 001web.es</p></div>`;

    const transporter=getTransporter();
    await transporter.verify();
    await transporter.sendMail({
      from:`"001Web" <${process.env.SMTP_USER}>`,
      to:process.env.CONTACT_EMAIL||process.env.SMTP_USER,
      replyTo:email,
      subject,
      text:`Nueva consulta desde 001Web\n\nNombre: ${nombre}\nEmpresa: ${modelo||'No indicada'}\nEmail: ${email}\nTeléfono: ${telefono}\n\nProyecto:\n${mensaje}`,
      html
    });

    return res.status(200).json({ok:true});
  }catch(err){
    console.error('Contact API error',err);
    return res.status(500).json({error:'Se produjo un error al enviar la consulta.'});
  }
}
