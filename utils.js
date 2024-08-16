import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC16ZKkxK7W3O1mRfiHMCOJc0c7uMZj8K8",
    authDomain: "thekeydaar-7db56.firebaseapp.com",
    projectId: "thekeydaar-7db56",
    storageBucket: "thekeydaar-7db56.appspot.com",
    messagingSenderId: "860250720289",
    appId: "1:860250720289:web:9b13d846c6f0f9c7647b60",
    measurementId: "G-NXFW2WCSZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

console.log(auth);

// Export required Firebase services
export { 
    auth, 
    db, 
    storage, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    doc, 
    setDoc, 
    ref, 
    uploadBytes, 
    getDownloadURL 
};

// The following code can be used for handling form submissions, e.g., login or signup forms

// Example: Handling Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Handle login with Firebase Auth
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User logged in:', userCredential.user);
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
});

// Example: Handling Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const avatar = document.getElementById('signupAvatar').files[0];

    // Handle signup with Firebase Auth and Firestore
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('User signed up:', user);

            // Save user info to Firestore
            return setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                avatarURL: null // Placeholder for now, will update after upload
            });
        })
        .then(() => {
            // Handle avatar upload if provided
            if (avatar) {
                const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
                return uploadBytes(avatarRef, avatar).then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                }).then(downloadURL => {
                    // Update Firestore with avatar URL
                    return setDoc(doc(db, "users", auth.currentUser.uid), {
                        avatarURL: downloadURL
                    }, { merge: true });
                });
            }
        })
        .then(() => {
            console.log('User profile updated with avatar.');
        })
        .catch(error => {
            console.error('Error during signup:', error);
        });
});
