import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword ,
   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
  import { getFireStore,
    doc,
    setDoc 
   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
  import { getStorage,
    ref ,
    uploadBytes,
    getDownloadURL,
   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";






  const firebaseConfig = {
    apiKey: "AIzaSyC16ZKkxK7W3O1mRfiHMCOJc0c7uMZj8K8",
    authDomain: "thekeydaar-7db56.firebaseapp.com",
    projectId: "thekeydaar-7db56",
    storageBucket: "thekeydaar-7db56.appspot.com",
    messagingSenderId: "860250720289",
    appId: "1:860250720289:web:9b13d846c6f0f9c7647b60",
    measurementId: "G-NXFW2WCSZP"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFireStore(app);
  const storage = getStorage (app)
  const analytics = getAnalytics(app);
  console.log(auth);


  export { auth, db, storage, onAuthStateChanged,
     createUserWithEmailAndPassword,
     doc,
     setDoc, 
     ref ,
     uploadBytes,
     getDownloadURL, };





document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Firebase Authentication for Login
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(userCredential => {
    //         console.log('User logged in:', userCredential.user);
    //     })
    //     .catch(error => {
    //         console.error('Error logging in:', error);
    //     });
});

// Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;



To add an option to upload an image as an avatar in your signup form, you can include a file input in your form. Here's the updated code:

Updated Signup Page with Avatar Upload (signup.html)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - MyBlog</title>
    <link rel="stylesheet" href="/utils/styles.css">
</head>
<body>
    <div class="auth-container">
        <h2>Create a New Account</h2>
        <form id="signupForm" enctype="multipart/form-data">
            <input type="text" id="signupName" placeholder="Name" required>
            <input type="email" id="signupEmail" placeholder="Email" required>
            <input type="password" id="signupPassword" placeholder="Password" required>
            <label for="signupAvatar" class="file-label">Upload Avatar</label>
            <input type="file" id="signupAvatar" accept="image/*" required>
            <button type="submit" class="btn">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/auth/login.html">Login here</a></p>
    </div>
    
    <footer>
        <p>&copy; 2024 MyBlog. All Rights Reserved. | Developed by <strong>thekeydaar</strong></p>
        <div class="social-links">
            <a href="https://facebook.com" target="_blank">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook">
            </a>
            <a href="https://youtube.com" target="_blank">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube">
            </a>
            <a href="https://instagram.com" target="_blank">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram">
            </a>
        </div>
    </footer>
    
    <script src="/app.js" type="module"></script>
</body>
</html>
Explanation:
Avatar Upload:

The <label> for the avatar upload input is styled with class="file-label" for custom styling.
The <input> of type file is included with accept="image/*" to restrict the file types to images only.
The required attribute is added to ensure that users upload an avatar before submitting the form.
Enctype: The enctype="multipart/form-data" attribute is added to the form element to allow file uploads.

CSS for File Input (styles.css)
To style the file input and label, you can add the following CSS:

css
Copy code
.auth-container .file-label {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: left;
    cursor: pointer;
    color: #333;
}

.auth-container input[type="file"] {
    display: none; 
JavaScript (app.js)
To handle the file upload along with the other form data:

javascript
Copy code
// Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const avatar = document.getElementById('signupAvatar').files[0];
    // Firebase Authentication for Signup
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(userCredential => {
    //         console.log('User signed up:', userCredential.user);
    //         userCredential.user.updateProfile({ displayName: name });
    //     })
    //     .catch(error => {
    //         console.error('Error signing up:', error);
    //     });
});
