import React from 'react'
import { Flex,Image,Text } from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../../firebase/firebase'
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { getDoc,setDoc,doc,Firestore } from 'firebase/firestore';
function GoogleAuth({prefix}) {
  const [signInwithGoogle,user,loading,error]=useSignInWithGoogle(auth);
  const showToast=useShowToast();
  const loginUser=useAuthStore(state=>state.login);
  const handleGoogleAuth=async()=>{
    try {
      const newUser=await signInwithGoogle();
      if(!newUser && error)
      {
        return showToast("Error",error.message,"error");
      }
      const userRef=doc(firestore,"users",newUser?.user.uid);
      const userSnap=await getDoc(userRef);
      if(userSnap.exists())
      {
        const userDoc=userSnap.data();
        localStorage.setItem("user-info",JSON.stringify(userDoc));
        loginUser(userDoc);
      }
      else
      {
        const userDoc={
          uid:newUser?.user.uid,
          email:newUser?.user.email,
          username:newUser.user.email.split("@")[0],
          fullname:newUser?.user.displayName,
          bio:"",
          profilePicUrl:newUser?.user.photoURL,
          followers:[],
          following:[],
          posts:[],
          createdAt:Date.now()
      }
      await setDoc(doc(firestore, "users", newUser?.user.uid), userDoc);
      localStorage.setItem("user-info",JSON.stringify(userDoc))
      loginUser(userDoc)
      }
    } catch (error) {
      return showToast("Error",error.message,"error");
    }
  }
  return (
    <>
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
            <Image src='/google.png' w={5} alt='google'></Image>
            <Text mx={2} color={"blue.500"} >{prefix} with Google</Text>
        </Flex>
    </>
  )
}

export default GoogleAuth