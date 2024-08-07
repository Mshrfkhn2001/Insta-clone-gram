
import {Box,Button,Flex,FormControl,FormLabel,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Tooltip,Select,
	useDisclosure,} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constant";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
  
  const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const [searchBy, setSearchBy] = useState('username');
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  
	const handleSearchUser = (e) => {
	  e.preventDefault();
	  getUserProfile(searchRef.current.value, searchBy);
	};
  
	return (
	  <>
		<Tooltip
		  hasArrow
		  label={"Search"}
		  placement='right'
		  ml={1}
		  openDelay={500}
		  display={{ base: "block", md: "none" }}
		>
		  <Flex
			alignItems={"center"}
			gap={4}
			_hover={{ bg: "whiteAlpha.400" }}
			borderRadius={6}
			p={2}
			w={{ base: 10, md: "full" }}
			justifyContent={{ base: "center", md: "flex-start" }}
			onClick={onOpen}
		  >
			<SearchLogo />
			<Box display={{ base: "none", md: "block" }}>Search</Box>
		  </Flex>
		</Tooltip>
  
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
		  <ModalOverlay />
		  <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
			<ModalHeader>Search user</ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
			  <form onSubmit={handleSearchUser}>
				<FormControl>
				  <FormLabel>Search By</FormLabel>
				  <Select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
					<option value='username'>Username</option>
					<option value='fullname'>Full Name</option>
				  </Select>
				</FormControl>
				<FormControl mt={4}>
				  <FormLabel>Search</FormLabel>
				  <Input placeholder={searchBy} ref={searchRef} />
				</FormControl>
				<Flex w={"full"} justifyContent={"flex-end"}>
				  <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
					Search
				  </Button>
				</Flex>
			  </form>
			  {user && <SuggestedUser user={user} setUser={setUser} />}
			</ModalBody>
		  </ModalContent>
		</Modal>
	  </>
	);
  };
  
  export default Search;
  