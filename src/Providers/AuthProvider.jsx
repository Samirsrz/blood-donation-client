import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
   
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const updateUserProfile =(name, photo) => {
      return  updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })

        .then(() => {
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            setLoading(false);
        });
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password)
    }

   

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
    
            const userEmail = currentUser?.email || user.email;
            const loggedUser = {email : userEmail}

            setUser(currentUser);
          //  console.log('current user', currentUser);
            setLoading(false);

          if(currentUser) {
            axios.post('https://blood-donation-server-two-ochre.vercel.app/jwt', loggedUser,{withCredentials:true})
            .then(res => {
               // console.log(res.data)
            })
          }
          else{
            axios.post('https://blood-donation-server-two-ochre.vercel.app/logout', loggedUser, {withCredentials: true})
            .then(res => {
           //     console.log(res.data)
            })
        }
         });
         return () => {
            return unsubscribe();
         }
    
        },[user?.email])
    const authInfo = {

        user,
        
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
   
       }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;