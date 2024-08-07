import { Grid,GridItem, VStack,Skeleton,Box,Flex,Text } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import ProfilePost from './ProfilePost';
import React from 'react'
import useGetUserPosts from '../../hooks/useGetUserPosts';

function ProfilePosts() {
  const {isLoading,posts} =useGetUserPosts()
  const noPostFound=!isLoading && posts.length===0;
  if(noPostFound) return <NoPostFound/>
  return (
    <Grid templateColumns={{sm:"repeat(1,1fr)",md:"repeat(3,1fr)"}} gap={1} columnGap={1}>
      {isLoading && [0,1,2].map((_,idx)=>(
        <VStack key={idx} alignItems={"flex-start"} gap={4}>
          <Skeleton w={"full"}>
            <Box h="300px">Content wrapped</Box>
          </Skeleton>
        </VStack>
      ))}
      {!isLoading && (
        <>
        {posts.map(post=>(
          <ProfilePost post={post} key={post.id}/>
        ))}
        </>
      )}
    </Grid>
  )
}

export default ProfilePosts

const NoPostFound=()=>{
  return  (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
}