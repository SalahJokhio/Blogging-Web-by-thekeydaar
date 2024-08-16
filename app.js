import {
    auth,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    db,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
} from '../../utils/utils.js';

const signup_btn = document.getElementById("signup_form");
const submit_btn = document.getElementById("signup_user_btn");

signup_btn.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent the form from submitting

    const uname = e.target[0].value;
    const userEmail = e.target[1].value;
    const userPasword = e.target[2].value;
    const img = e.target[3].files[0];
    
    const userInfo = {
        uname,
        userEmail,
        userPasword,
        img,
    };

    submit_btn.disabled = true;
    submit_btn.innerText = 'Loading...';

    createUserWithEmailAndPassword(auth, userEmail, userPasword)
        .then((user) => {
            console.log('User UID:', user.user.uid);

            // Upload image
            const userRef = ref(storage, `user/${user.user.uid}`);

            return uploadBytes(userRef, img)
                .then(() => getDownloadURL(userRef))
                .then((url) => {
                    console.log('Image URL:', url);

                    // Update userInfo with the image URL
                    userInfo.img = url;

                    // Create a user document reference
                    const userDbRef = doc(db, 'users', user.user.uid);

                    // Set this document in the database
                    return setDoc(userDbRef, userInfo);
                })
                .then(() => {
                    console.log('User info saved to DB.');
                    window.location.href = "/";
                });
        })
        .catch((err) => {
            console.error('Error:', err);
            alert(err.message);
        })
        .finally(() => {
            submit_btn.disabled = false;
            submit_btn.innerText = 'Sign Up';
        });

    console.log('User Info:', userInfo);
});
