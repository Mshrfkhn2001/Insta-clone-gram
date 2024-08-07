import React from 'react'
import { useState } from 'react';
import {Button, Input } from '@chakra-ui/react'
import useLogin from '../../hooks/useLogin';
import { Alert,AlertIcon } from '@chakra-ui/react';
function Login() {
    const [inputs,setInputs]=useState({
        email:'',
        password:'',
    })
    const {loading,error,login}=useLogin()
  return (
    <>
        <Input placeholder='Email' type='email' fontSize={14} value={inputs.email} size={"sm"} onChange={(e)=>setInputs({...inputs,email:e.target.value})}></Input>
        <Input placeholder='Password' type='password' fontSize={14} value={inputs.password} size={"sm"} onChange={(e)=>setInputs({...inputs,password:e.target.value})}></Input>
        {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12}></AlertIcon>
                {error.message}
            </Alert>
        )}
        <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14}
        isLoading={loading}
        onClick={()=>login(inputs)}>
                Log in
            </Button>
    </>
  )
}

export default Login