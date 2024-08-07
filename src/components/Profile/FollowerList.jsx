
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, List, ListItem, Spinner, Text, Flex, Avatar, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchFollowersList from '../../hooks/useFetchFollowersList';

const FollowerList = ({ isOpen, onClose }) => {
    const { isLoading, followersList, error } = useFetchFollowersList();

    const modalSize = useBreakpointValue({ base: 'sm', md: 'md' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Followers</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Flex justifyContent="center" alignItems="center" height="200px">
                            <Spinner size="lg" />
                        </Flex>
                    ) : (
                        <List spacing={3}>
                            {followersList.length > 0 ? (
                                followersList.map(user => (
                                    <ListItem key={user.id}>
                                        <Flex alignItems="center" gap={2}>
                                        <Link to={`/${user.username}`}>
                                            <Avatar src={user.profilePicURL} />
                                            </Link>
                                            <Flex direction="column">
                                            <Link to={`/${user.username}`}>
                                                <Text fontWeight="bold">{user.username}</Text>
                                                </Link>
                                                <Text fontSize="sm">{user.followers ? `${user.followers.length} followers` : 'No followers'}</Text>
                                                <Text fontSize="sm">{user.following ? `${user.following.length} following` : 'No following'}</Text>
                                            </Flex>
                                        </Flex>
                                    </ListItem>
                                ))
                            ) : (
                                <Text>No following users found</Text>
                            )}
                        </List>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FollowerList;
