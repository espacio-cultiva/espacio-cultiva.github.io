// Configuración de la app Espacio Cultiva.
// Con "firebase: null" la app funciona en MODO DEMOSTRACIÓN (datos de ejemplo solo en el navegador).
// Para activarla de verdad, pega aquí la configuración que entrega Firebase
// (Configuración del proyecto > Tus apps > App web > firebaseConfig).

window.CULTIVA_CONFIG = {
  firebase: {
    apiKey: "AIzaSyAnFzkSBAumn356YAwLFJDLyDkcBzYNlP4",
    authDomain: "espacio-cultiva.firebaseapp.com",
    projectId: "espacio-cultiva",
    storageBucket: "espacio-cultiva.firebasestorage.app",
    messagingSenderId: "772579449276",
    appId: "1:772579449276:web:6b5ba54eaf3bcf14f9f3b9"
  },
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
