import React from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { setDoc,doc, collection, query, where, getDocs } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
function useSignUpwithEmailAndPassword() {
    const showToast=useShowToast()
    const loginUser=useAuthStore(state=>state.login)
    
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const signup=async(inputs)=>{
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName)
        {
            
            showToast("Error","please Enter all the fields","error");
            return;
        }
        const userRef=collection(firestore,"users");
        const q= query(userRef,where("username","==",inputs.username));
        const querySnapshot=await getDocs(q);
        if(!querySnapshot.empty){
            showToast("Error","username already exists","error");
            return;
        }
        try{
            const newUser=await createUserWithEmailAndPassword(inputs.email,inputs.password)
            if(!newUser && error)
            {
                showToast("Error",error.message,"error");
                return;
            }
            if(newUser)
            {
                const userDoc={
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullname:inputs.fullName,
                    bio:"",
                    profilePicUrl:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc)
            }
        }
        catch(error){
            
            showToast("Error",error.message,"error");
        }
      }
  return {loading,error,signup}
}

export default useSignUpwithEmailAndPassword