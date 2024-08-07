import { Box,VStack,Image,Input,Button,Flex,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

function AuthForm() {
    const [islogin,setIslogin]=useState(true);
    
  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src='/logo.png' h={24} cursor={"pointer"} alt='Instagram'></Image>
            {islogin ? <Login></Login> : <Signup></Signup>}
            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
            </Flex>
            <GoogleAuth prefix={islogin?"Log in" : "Sign up"}></GoogleAuth>
        </VStack>
    </Box>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
                {islogin?"Don't have a account":"Already have an account"}
            </Box>
            <Box onClick={()=>setIslogin(!islogin)} color={"blue.500"} cursor={"pointer"}>
                {islogin?"Sign Up":"Login"}
            </Box>
        </Flex>
    </Box>
    </>
  )
}

export default AuthForm