import React from 'react'
import { useState } from 'react'
import { Input,Button, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignUpwithEmailAndPassword from '../../hooks/useSignUpwithEmailAndPassword';
function Signup() {
    const [inputs,setInputs]=useState({
        fullName:'',
        username:'',
        email:'',
        password:'',
    })
    const [showPassword,setShowPassword]=useState(false);
    const {loading,error,signup}=useSignUpwithEmailAndPassword()
  return (
    <>
        <Input placeholder='Email' type='email' fontSize={14} value={inputs.email} size={"sm"} onChange={(e)=>setInputs({...inputs,email:e.target.value})}></Input>
        <Input placeholder='Username' type='text' fontSize={14} value={inputs.username} size={"sm"} onChange={(e)=>setInputs({...inputs,username:e.target.value})}></Input>
        <Input placeholder='Full Name' type='text' fontSize={14} value={inputs.fullName} size={"sm"} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}></Input>
        <InputGroup>
        <Input placeholder='Password' type={showPassword?"text":"password"} fontSize={14} size={"sm"} value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}></Input>
        <InputRightElement h={"full"}>
            <Button variant={"ghost"} size={"sm"} onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon></ViewIcon> : <ViewOffIcon></ViewOffIcon>}
            </Button>
        </InputRightElement>
        </InputGroup>
        {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12}></AlertIcon>
                {error.message}
            </Alert>
        )}
        <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} 
        isLoading={loading}
        onClick={()=>signup(inputs)} >
                Sign up
            </Button>
    </>
  )
}

export default Signup