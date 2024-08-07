import { VStack,Flex,Box,Text } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'
function SuggesterUsers() {
  const { isLoading, suggestedUsers }=useGetSuggestedUsers();
  if(isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader></SuggestedHeader>
        {suggestedUsers.length!==0 && (
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            SuggestedUser
          </Text>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.400"} cursor={"pointer"}>
            See All
          </Text>
        </Flex>
        )}
        {suggestedUsers.map(user=>(
          <SuggestedUser user={user} key={user.id} />
        ))}
        <Box alignSelf={"start"} fontSize={12} color={"gray.500"} mt={5}>
          2024 Built By Musharraf Khan
        </Box>
    </VStack>
  )
}

export default SuggesterUsers