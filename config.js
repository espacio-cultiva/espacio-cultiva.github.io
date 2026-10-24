// Configuración de la app Espacio Cultiva.
// Mientras "firebase" sea null, la app funciona en MODO DEMOSTRACIÓN
// (datos de ejemplo guardados solo en el navegador).
// Para activarla de verdad, pega aquí la configuración que entrega Firebase
// (Configuración del proyecto > Tus apps > App web > firebaseConfig).

window.CULTIVA_CONFIG = {
  firebase: null,
  // Ejemplo de cómo debe quedar:
  // firebase: {
  //   apiKey: "AIza...",
  //   authDomain: "espacio-cultiva.firebaseapp.com",
  //   projectId: "espacio-cultiva",
  //   storageBucket: "espacio-cultiva.appspot.com",
  //   messagingSenderId: "1234567890",
  //   appId: "1:1234567890:web:abc123"
  // },

  psicologa: "Ps. María Valentina Olivier",
  nombrePila: "María Valentina",
  centro: "Espacio Cultiva",
  lema: "Bienestar e infancia",
  // Días que dura un código de invitación
  diasInvitacion: 30
};
