
import React from 'react';
import { Box, Text, Flex, Avatar, AvatarGroup, VStack, Button, useDisclosure } from '@chakra-ui/react';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import useFollowUser from '../../hooks/useFollowUser';
import EditProfile from './EditProfile';
import FollowingListModal from './FollowingList';
import FollowerListModal from './FollowerList';

export default function ProfileHeader() {
    const { userProfile } = useUserProfileStore();
    const authUser = useAuthStore(state => state.user);
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();
    const { isOpen: isFollowingListOpen, onOpen: onFollowingListOpen, onClose: onFollowingListClose } = useDisclosure();
    const { isOpen: isFollowerListOpen, onOpen: onFollowerListOpen, onClose: onFollowerListClose } = useDisclosure();

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
                <Avatar src={userProfile.profilePicUrl} alt='Profile' />
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
                    {visitingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"white"} color={"black"} justifyContent={"center"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }} onClick={onEditProfileOpen}>Edit Profile</Button>
                        </Flex>
                    )}
                    {visitingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"blue.500"} color={"white"} justifyContent={"center"} _hover={{ bg: "blue.600" }} size={{ base: "xs", md: "sm" }} onClick={handleFollowUser} isLoading={isUpdating}>{isFollowing ? "Unfollow" : "Follow"}</Button>
                        </Flex>
                    )}
                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} cursor="pointer" onClick={onFollowerListOpen}>
                        <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} cursor="pointer" onClick={onFollowingListOpen}>
                        <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.fullName}</Text>
                </Flex>
                <Text fontSize={"sm"}>{userProfile.bio}</Text>
            </VStack>
            {isEditProfileOpen && <EditProfile isOpen={isEditProfileOpen} onClose={onEditProfileClose} />}
            <FollowingListModal isOpen={isFollowingListOpen} onClose={onFollowingListClose} />
            <FollowerListModal isOpen={isFollowerListOpen} onClose={onFollowerListClose} />
        </Flex>
    );
}
