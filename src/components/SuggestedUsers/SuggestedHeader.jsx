import { Flex,Avatar,Box,Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'

function SuggestedHeader() {
  const {handleLogout,isLoggingOut}=useLogout()
  const authUser=useAuthStore(state=>state.user);
  if(!authUser) return null
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
          <Link to={`${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilePicUrl}></Avatar>
          </Link>
          <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
            </Text>
            </Link>
        </Flex>
        <Button size={"xs"}background={"transparent"} _hover={{background:"transparent"}} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} onClick={handleLogout} isLoading={isLoggingOut}>
        Logout
        </Button>
    </Flex>
  )
}

export default SuggestedHeader