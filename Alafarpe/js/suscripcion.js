import { auth, db } from "./firebase.js";
import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Botones de suscripción
const btnMensual = document.getElementById("btnMensual");
const btnAnual = document.getElementById("btnAnual");
const btnCancelar = document.getElementById("btnCancelar");

// Función para actualizar la suscripción del usuario
async function actualizarSuscripcion(tipo) {
    const user = auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para suscribirte.");
        return;
    }

    const userRef = doc(db, "usuarios", user.uid);
    try {
        await updateDoc(userRef, { suscripcion: tipo });
        alert(Suscripción ${ tipo === "ninguna" ? "cancelada" : "activada"} con éxito.);
    mostrarEstadoSuscripcion();
} catch (error) {
    console.error("Error al actualizar suscripción:", error);
}
}

// Escuchar clics en los botones
btnMensual.addEventListener("click", () => actualizarSuscripcion("mensual"));
btnAnual.addEventListener("click", () => actualizarSuscripcion("anual"));
btnCancelar.addEventListener("click", () => actualizarSuscripcion("ninguna"));

// Mostrar estado actual de la suscripción
async function mostrarEstadoSuscripcion() {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const datos = userSnap.data();
        console.log(Tu suscripción actual es: ${ datos.suscripcion || "ninguna" });
    }
}

// Esperar autenticación para mostrar suscripción
auth.onAuthStateChanged(user => {
    if (user) {
        mostrarEstadoSuscripcion();
    }
});



async function verificarAccesoPremium() {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && (userSnap.data().suscripcion === "mensual" || userSnap.data().suscripcion === "anual")) {
        document.getElementById("contenidoPremium").style.display = "block";
    } else {
        document.getElementById("contenidoPremium").style.display = "none";
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        verificarAccesoPremium();
    }
});