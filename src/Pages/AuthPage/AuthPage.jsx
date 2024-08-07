import { Flex,Container } from '@chakra-ui/react'
import { Box,Image,VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from 'react'

function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                
            <Box display={{base:"none",md:"block"}}>
                <Image src="/auth.png" h={650} alt='Phone'></Image>
            </Box>
            
            <VStack spacing={4} align={"stretch"} >
                <AuthForm/>
                <Box textAlign={"center"}>Get the app</Box>
                <Flex gap={5} justifyContent={"center"}>
                    <Image src='/playstore.png' h={10} alt='playStore'></Image>
                    <Image src='/microsoft.png' h={10} alt='microsoft'></Image>
                </Flex>
            </VStack>
            </Flex>
            
            
        </Container>
    </Flex>
  )
}

export default AuthPage