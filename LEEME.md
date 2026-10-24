# Espacio Cultiva · app para familias

App web instalable (PWA) para las familias de la Ps. María Valentina Olivier, con panel para ella.

- **Familias:** registran conductas (difíciles y cosas buenas, en formato antes / durante / después), hacen preguntas para la sesión, leen los reportes de cada sesión y completan la ficha de los adultos y de los niños.
- **María Valentina:** ve todas las familias en un panel, prepara la sesión con lo ocurrido desde la última, responde preguntas, escribe reportes y genera los códigos de invitación.
- **Sincronización:** Firebase (Google). Funciona sin señal: lo que se registra offline se envía solo cuando vuelve internet.
- **Seguridad:** cada familia ve solo lo suyo; nadie entra sin un código de invitación. Las reglas están en `firestore.rules`.

Mientras `config.js` tenga `firebase: null`, la app funciona en **modo demostración**, con datos de ejemplo guardados solo en el navegador. Sirve para mostrársela a María Valentina antes de configurar Firebase.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa (familias y panel) |
| `config.js` | Configuración de Firebase y nombres. **Es lo único que hay que editar para activarla** |
| `firestore.rules` | Reglas de seguridad para pegar en Firebase |
| `sw.js` | Guarda la app para usarla sin internet. **Subir `VERSION` en cada publicación** |
| `manifest.webmanifest`, `icons/` | Nombre, colores e íconos para instalarla |
| `vendor/firebase.js` | SDK de Firebase 13.1.0 empaquetado localmente |
| `vendor/fonts/` | Nunito y Patrick Hand (licencia OFL) |

## 1. Publicar en GitHub (modo demo)

1. En GitHub: **+ → New organization → Free**. Nombre sugerido: `espacio-cultiva`.
2. Dentro de la organización, crea un repositorio público llamado exactamente `espacio-cultiva.github.io`.
3. En el Mac:

```bash
cd ~/Downloads/espacio-cultiva
git remote add origin https://github.com/espacio-cultiva/espacio-cultiva.github.io.git
git push -u origin main
```

4. En el repositorio: **Settings → Pages → Branch: main / (root) → Save**. A los pocos minutos queda en https://espacio-cultiva.github.io/

El autor de los commits ya está configurado como "Espacio Cultiva" en esta carpeta.

## 2. Crear el proyecto en Firebase (plan gratis, sin tarjeta)

1. Entra a https://console.firebase.google.com con la cuenta de Google que quedará como dueña (ideal: una de Espacio Cultiva) → **Crear un proyecto** → nombre `espacio-cultiva` → puedes desactivar Google Analytics.
2. **Authentication → Comenzar → Correo electrónico/contraseña → Habilitar → Guardar.**
3. **Authentication → Configuración → Dominios autorizados → Agregar dominio:** `espacio-cultiva.github.io`
4. **Firestore Database → Crear base de datos.** Ubicación: `southamerica-west1 (Santiago)` si aparece; si no, `southamerica-east1 (São Paulo)`. **No se puede cambiar después.** Empieza en **modo producción**.
5. **Firestore → Reglas:** borra lo que hay, pega todo el contenido de `firestore.rules` y toca **Publicar**.
6. **Configuración del proyecto (engranaje) → Tus apps → ícono Web `</>`** → apodo `cultiva` → Registrar (sin Hosting). Copia el bloque `firebaseConfig` y pégalo en `config.js` en lugar de `firebase: null`.

La `apiKey` de Firebase no es secreta: va en el código de todas las apps web. Lo que protege los datos son las reglas del paso 5.

## 3. Crear la cuenta de María Valentina

1. **Authentication → Usuarios → Agregar usuario:** su correo y una contraseña.
2. Copia el **UID** que aparece en la lista.
3. **Firestore → Iniciar colección** → ID de colección: `admins` → ID del documento: pega el UID → campo `nombre` (string): `Ps. María Valentina Olivier` → Guardar.

Al entrar con ese correo, la app abre el panel en vez de la vista de familia. Lo mejor es que lo use en el computador, aunque también funciona en el celular.

## 4. Publicar la versión real

```bash
cd ~/Downloads/espacio-cultiva
# en sw.js: const VERSION = 'cultiva-v2';
git add . && git commit -m "Activar Firebase" && git push
```

## Cómo se unen las familias

1. María Valentina toca **Nueva** en el panel y escribe el nombre de la familia.
2. La app genera un código de 8 caracteres que vence en 30 días y arma el mensaje de WhatsApp con el link y las instrucciones.
3. Cada adulto abre el link, toca **Tengo un código**, crea su cuenta con su correo, acepta las condiciones y completa sus datos y los de los niños.
4. El mismo código sirve para mamá, papá o quien acompañe. Desde **Ficha** se puede desactivar o generar uno nuevo; las cuentas ya creadas siguen funcionando.

## Cerrar el acceso de una familia (alta)

En el panel: familia → **Ficha** → **Cerrar acceso (alta)**, con un motivo que ve solo ella.

- Todos los adultos de la familia pierden el acceso, aunque tengan la app instalada. Si la tienen abierta, les aparece en vivo "Tu acceso a la app terminó".
- Se borran los borradores y la copia sin internet guardada en sus teléfonos.
- El código de invitación se desactiva.
- María Valentina sigue viendo toda la información; la familia pasa a "Acceso cerrado" en su lista.
- **Reactivar** devuelve el acceso con las mismas cuentas.

El bloqueo lo hacen cumplir las reglas de Firestore en el servidor, no la app. **Si ya pegaste las reglas en Firebase, vuelve a pegarlas**, porque cambiaron.

Límite: si un teléfono no vuelve a conectarse nunca a internet, no recibe la orden de borrar su copia local. Apenas se conecta, se bloquea.

## Pendiente de revisar con María Valentina, antes de repartirla

- Texto del consentimiento (función `consentHTML` en `index.html`). Hoy es un texto de ejemplo.
- Listas de conductas difíciles y cosas buenas (`CAT_DIF`, `CAT_POS`), lugares y duración.
- Campos de la ficha del niño y del adulto.
- Secciones del reporte: "Lo que trabajamos", "Lo que observé", "Para la casa", "Próxima sesión".

## Problemas conocidos (no repetir)

- Igual que Registro ARCO: en iPhone hay que abrir el link en Safari y agregarlo a inicio; un `.html` abierto desde Archivos no funciona.
- Si cambia la dirección web, hay que agregar el dominio nuevo en Firebase (paso 2.3). Los datos no se pierden porque están en Firebase y no en el teléfono.
- Las escrituras de las familias no esperan a internet. Si no hay señal, quedan en cola y se envían solas.
