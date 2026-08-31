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

GOOGLE ANALYTICS:
G-JCR17PJG1D — no existía. Añadido en las 17 páginas HTML del sitio
(index, aviso-legal, política de privacidad y las 14 páginas de
/servicios/).

REVISIÓN ADICIONAL (esta pasada):
- Banner de cookies: ya existía y ya estaba corregido en un commit
  anterior en las 17 páginas; no se ha tocado.
- H1 de portada: el texto ya seguía el estilo correcto (afirmativo,
  sin interrogación, sin condicionales, corto): "Tienes una web
  bonita. Pero no te trae clientes." No se ha reescrito.
- Tamaño del H1: NO se ha aumentado, a diferencia del resto de la
  familia — aquí hay una decisión explícita anterior y documentada de
  reducirlo un 10% (ver arriba), así que se ha respetado tal cual.
- Sin .navcall: este sitio no muestra teléfono, solo WhatsApp y
  formulario (por diseño, según la topbar "Contacto por WhatsApp y
  formulario"); no aplica el fix de la píldora de teléfono.
- Dominio 001web.es: sin colisión con ningún otro dominio revisado en
  esta sesión.
- Sitio multipágina activo (13 páginas /servicios/ sin eliminaciones
  en el historial): NO se ha añadido middleware.mjs, no aplica.

REVISIÓN ADICIONAL (a petición del cliente):
- Quitado el párrafo .ow-lead bajo el H1 del hero ("Le pasa a más
  negocios de los que crees...").
- H1 en móvil (≤860px): aumentado de 23px a 34px, para que se vea más
  grande (antes quedaba más pequeño que el mínimo del clamp de
  escritorio). El tamaño en escritorio no se ha tocado, sigue
  respetando la reducción del 10% ya documentada.

REVISIÓN ADICIONAL (a petición del cliente):
- BUG REAL — "no debe aparecer el correo de soporte@kelatos.com
  visible en la web": el correo aparecía visible en varios sitios de
  las 17 páginas del sitio, contradiciendo la nota de la propia
  topbar ("Contacto por WhatsApp y formulario") y, en un caso, un
  párrafo que decía literalmente "No abre ningún gestor de correo.
  Solo atendemos por WhatsApp y formulario" justo encima de un enlace
  mailto: con el correo visible. Corregido en todos los sitios donde
  aparecía:
  - index.html: en la sección de contacto, el enlace "Correo:
    soporte@kelatos.com" se ha sustituido por "Formulario: Pide tu
    asesoramiento" (ancla al propio formulario, #contactForm), ya que
    el otro bloque de información de contacto de la misma página ya
    usaba correctamente esta redacción.
  - Las 17 páginas (footer "Información"): quitado el enlace
    mailto:soporte@kelatos.com, dejando solo dirección y horario.
  - Las 14 páginas de /servicios/: quitado el enlace mailto del
    recuadro "¿Tienes un proyecto en mente?" (quedan WhatsApp y el
    botón "Pide asesoramiento gratuito").
  - politica-privacidad.html: el párrafo "puedes escribir a
    soporte@kelatos.com" reescrito a "puedes escribirnos por WhatsApp
    o a través del formulario de contacto de la web".
  - aviso-legal.html: la línea "Contacto: soporte@kelatos.com" cambiada
    a "Contacto: WhatsApp o formulario de contacto de la web".
  - NO se ha tocado el campo "email" del schema.org (JSON-LD) en
    index.html: es dato estructurado no visible en la página
    renderizada, coherente con el resto de la familia (donde el
    correo tampoco aparece nunca en el HTML visible, solo se usa en
    /api/contacto y, cuando existe, en el schema).
  - Verificado con una búsqueda completa en las 17 páginas: no queda
    ninguna aparición visible de soporte@kelatos.com.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente):
- BUG REAL — no existía ninguna sección de Cal.com en todo el sitio
  (mismo hueco encontrado en LabsMkt, que parte de esta misma
  plantilla base). Añadida en index.html, entre "Nosotros" y
  "Contacto": "Reserva una cita de 30 minutos" con el iframe
  compartido de la familia
  (https://cal.com/kelatos/30min?embed=true&theme=light), 720px de
  alto en escritorio y 760px en móvil. Añadido enlace "Pedir cita" al
  menú en las 17 páginas (comparten la misma cabecera).
- La casilla de política de privacidad del formulario enlazaba a la
  página legal local (/politica-privacidad.html) en vez del enlace
  estándar de la familia. Corregido a
  https://kelatos.com/privacy-policy/, resaltado en azul.
- Añadido "y días festivos" al aviso de horario cerrado en fin de
  semana, en la caja de información de contacto de index.html.
- No se ha añadido franja de aviso de servicio técnico independiente:
  no aplica a este negocio (agencia de marketing digital, sin el
  enfoque de reparación de equipos del resto de la familia).
