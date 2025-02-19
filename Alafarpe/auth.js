document.addEventListener("DOMContentLoaded", () => {
    // Verificar que Firebase se haya cargado correctamente
    if (!window.firebaseAuth) {
        console.error("Firebase no se ha cargado correctamente.");
        return;
    }

    const auth = window.firebaseAuth.auth;
    const googleProvider = new window.firebaseAuth.GoogleAuthProvider();
    const facebookProvider = new window.firebaseAuth.FacebookAuthProvider();

    // Elementos de la interfaz
    const showLogin = document.getElementById("show-login");
    const showRegister = document.getElementById("show-register");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const closeLogin = document.getElementById("close-login");
    const closeRegister = document.getElementById("close-register");

    if (showLogin && showRegister && loginForm && registerForm && closeLogin && closeRegister) {
        // Mostrar formulario de Login
        showLogin.addEventListener("click", function () {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        });

        // Mostrar formulario de Registro
        showRegister.addEventListener("click", function () {
            registerForm.style.display = "block";
            loginForm.style.display = "none";
        });

        // Cerrar formularios
        closeLogin.addEventListener("click", function () {
            loginForm.style.display = "none";
        });

        closeRegister.addEventListener("click", function () {
            registerForm.style.display = "none";
        });
    }

    // Iniciar sesión con email y contraseña
    document.getElementById("login-button")?.addEventListener("click", async () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        try {
            await window.firebaseAuth.signInWithEmailAndPassword(auth, email, password);
            alert("Inicio de sesión exitoso");
            window.location.href = "home.html";
        } catch (error) {
            alert(error.message);
        }
    });

    // Registro de usuario con email y contraseña
    document.getElementById("register-button")?.addEventListener("click", async () => {
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        try {
            await window.firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
            alert("Registro exitoso");
        } catch (error) {
            alert(error.message);
        }
    });

    // Iniciar sesión con Google
    document.getElementById("google-login")?.addEventListener("click", async () => {
        try {
            await window.firebaseAuth.signInWithPopup(auth, googleProvider);
            alert("Inicio de sesión con Google exitoso");
            window.location.href = "home.html";
        } catch (error) {
            alert(error.message);
        }
    });

    // Iniciar sesión con Facebook
    document.getElementById("facebook-login")?.addEventListener("click", async () => {
        try {
            await window.firebaseAuth.signInWithPopup(auth, facebookProvider);
            alert("Inicio de sesión con Facebook exitoso");
            window.location.href = "home.html";
        } catch (error) {
            alert(error.message);
        }
    });

    // Cerrar sesión
    document.getElementById("logout-btn")?.addEventListener("click", async () => {
        try {
            await window.firebaseAuth.signOut(auth);
            alert("Cierre de sesión exitoso");
            window.location.href = "index.html";
        } catch (error) {
            alert(error.message);
        }
    });
});
