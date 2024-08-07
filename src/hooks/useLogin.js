import React from 'react'
import useShowToast from './useShowToast'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { getDoc,doc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';

function useLogin() {
    const ShowToast=useShowToast();
    const [
        signInwithEmailAndPassword,
        user,
        loading,
        error
    ]=useSignInWithEmailAndPassword(auth)
    const loginUser=useAuthStore((state)=>state.login);
    const login=async(inputs)=>{
        if(!inputs.email || !inputs.password)
        {
            return ShowToast("Error","Please fill all the fields","error");
        }
        try{
            const userCred=await signInwithEmailAndPassword(inputs.email,inputs.password);
            if(userCred)
            {
                const docRef=doc(firestore,"users",userCred.user.uid);
                const docSnap=await getDoc(docRef);
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
            }
        }
        catch(error){
            ShowToast("Error",error.message,"error");
        }
    }
    return {loading,error,login}
}

export default useLogin