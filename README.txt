001WEB — AGENCIA DE MARKETING DIGITAL (MADRID)

Dominio:
https://001web.es/
(coherente en canonical, og:url, robots.txt, sitemap.xml y JSON-LD)

REVISIÓN DE CÓDIGO:
- El sitio ya incluía menú móvil funcional (.ow-menu-toggle + .ow-nav.open),
  no había bug de menú ausente.
- El sitio no tenía ningún CSS propio reposicionando el chatbot de n8n, por
  lo que el widget usaba su posición interna por defecto — que coincide
  exactamente con la del botón flotante de WhatsApp (right:20px;bottom:20px
  ambos), quedando superpuestos. Corregido: añadidas reglas
  #n8n-chat .chat-window-toggle / .chat-window (con :not([class*="toggle"])
  para evitar la colisión conocida del selector [class*="chat-window"]) que
  colocan el chat por encima del botón de WhatsApp, tanto en escritorio
  como en la barra fija de WhatsApp que aparece en móvil (≤860px). Añadido
  también el borde blanco estándar al botón del chat.
- Datos schema.org: ya existían y son correctos — AdvertisingAgency (con
  dirección, geo, horario y sameAs) y FAQPage. No se ha tocado.
- Sección SEO: el sitio ya tiene contenido propio y 13 páginas de servicio
  dedicadas; no se ha añadido nada adicional.

CAMBIO IMPORTANTE — formulario de contacto:
api/contacto.js usaba la API de Gmail vía OAuth2 (fetch directo a
oauth2.googleapis.com y gmail.googleapis.com, variables GOOGLE_CLIENT_ID/
GOOGLE_CLIENT_SECRET/GOOGLE_REFRESH_TOKEN/GOOGLE_EMAIL), distinto al resto
de la familia. Sustituido por el mismo patrón SMTP + nodemailer que usan
todas las demás webs (el proyecto usa "type":"module", así que se ha usado
sintaxis ESM import/export, no CommonJS). Mismo endpoint /api/contacto y
mismos campos del formulario (nombre, modelo, email, telefono, mensaje,
honeypot "website").

Se ha actualizado también el texto que mencionaba explícitamente "Gmail
API" en la sección de contacto de index.html y en política de privacidad,
para que describan correctamente el envío por SMTP.

Variables SMTP a configurar en Vercel (sustituyen a las de Google):
SMTP_HOST=cp7124.webempresa.eu
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=soporte@kelatos.com
SMTP_PASS=[configurada únicamente en Vercel]
CONTACT_EMAIL=soporte@kelatos.com

Las variables antiguas (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
GOOGLE_REFRESH_TOKEN, GOOGLE_EMAIL) ya no se usan y pueden eliminarse de
Vercel. package.json actualizado: añadida la dependencia "nodemailer" y
node engine 22.x.

AJUSTES VISUALES:
- Quitado el degradado del "001Web" del H1 de portada (.ow-num), ahora en
  color sólido var(--purple). El logotipo/wordmark de la cabecera y del
  footer (con su propio degradado en el icono SVG y en "Web") no se ha
  tocado, ya que el pedido se refería específicamente al título.
- H1 de portada reducido un 10%: clamp(28-54px) → clamp(25-49px) en
  escritorio, 26px → 23px en móvil (≤860px).
