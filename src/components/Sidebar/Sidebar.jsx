import { Box, Flex, Link,Avatar, Center,Tooltip, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { InstagramLogo, InstagramMobileLogo,CreatePostLogo,NotificationsLogo,SearchLogo } from '../../assets/constant';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import SidebarItems from './SidebarItems';
function Sidebar() {
    
    const {handleLogout,isLoggingOut,error}=useLogout();
  return (
    <Box height={"100vh"} borderRight={"1px solid"} borderColor={"whiteAlpha.300"} py={8} position={"sticky"} top={0} left={0} px={{base:2,md:4}}>
        <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
            <Link as={RouterLink} to={"/"} display={{base:"none",md:"block"}} pl={2} cursor="pointer">
                <InstagramLogo/>
            </Link>
            <Link as={RouterLink} to={"/"} p={2} display={{base:"block",md:"none"}} cursor="pointer" borderRadius={6} _hover={{
                bg:"whiteAlpha.200"
            }} w={10}>
                <InstagramMobileLogo/>
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems/>
            </Flex>
            
            <Tooltip 
                    hasArrow
                    label={"Logout"}
                    placement="right"
                    ml={1}
                    openDelay={500}
                    display={{base:'block',md:'none'}}
                    >
                        <Flex
                        onClick={handleLogout}
                        alignItems={"center"}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400"}}
                        borderRadius={6}
                        p={2}
                        w={{base:10,md:"full"}}
                        mt={"auto"}
                        justifyContent={{base:"center",md:"flex-start"}}
                        >
                            <BiLogOut size={25}/>
                            <Button display={{base:"none",md:"block"}} variant={"ghost"} _hover={{bg:"transparent"}} isLoading={isLoggingOut}>Logout</Button>
                        </Flex>
                    </Tooltip>
        </Flex>
    </Box>
  );
}

export default Sidebar;
