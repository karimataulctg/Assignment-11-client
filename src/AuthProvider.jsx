import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import auth from './firebase.init';
import axios from 'axios';


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      // Refresh the user context to reflect the new profile info
      setUser({ ...auth.currentUser, displayName: name, photoURL: photoURL });
    } else {
      throw new Error('No user is currently logged in.');
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider) // Return the promise from here
      .then((result) => {
        setUser(result.user); // Update user context with the result
        setLoading(false);
        return result; // Return the result for the caller
      })
      .catch((error) => {
        setLoading(false); // Ensure loading state is updated
        throw error; // Propagate the error for the caller to handle
      });
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('State Captured', currentUser?.email);
      if (currentUser?.email){
        const user = {email: currentUser.email};
        axios.post('http://localhost:5000/jwt', user, {
          withCredentials: true,
        })
       
        .then(res => {console.log(res.data);
          setLoading(false); 
        })
      }
      else {
          axios.post('http://localhost:5000/logout', {}, {
            withCredentials: true,
          })
          .then(res => {console.log('logout', res.data);
            setLoading(false); 
          })
      }
      
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signInUser,
    signOutUser,
    signInWithGoogle,
    isAuthLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
