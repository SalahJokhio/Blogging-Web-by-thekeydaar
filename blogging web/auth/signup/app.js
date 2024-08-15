import{
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
} from'../../utils/utils.js'

const signup_btn = document.getElementById("signup_user_btn")