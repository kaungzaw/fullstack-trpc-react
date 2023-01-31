import { Suspense } from "react";
import {
  Box,
  Flex,
  Center,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Text,
  Spinner,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

interface SignInData {
  expiresAt: string;
  userId: string;
}

const links = [
  { label: "Home", url: routeNames.HOME },
  { label: "Users", url: routeNames.USERS },
  { label: "Settings", url: routeNames.SETTINGS },
];

const LinkComponent = ({ label, url }: { label: string; url: string }) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <NavLink to={url}>
      {({ isActive }) => (
        <Text
          px={2}
          py={1}
          rounded={"md"}
          _hover={
            !isActive
              ? {
                  bg: bgColor,
                }
              : {}
          }
          bg={isActive ? "green.200" : "inherit"}
        >
          {label}
        </Text>
      )}
    </NavLink>
  );
};

const RootLayout = () => {
  const { expiresAt, userId } = useLoaderData() as SignInData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const signOut = async () => {
    const signedInUserId = localStorage.getItem("userId");
    const userId = await trpcProxyClient.auth.signOut.mutate();
    if (signedInUserId === userId) {
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userId");
      navigate(routeNames.SIGN_IN);
    } else {
      console.log("invalid userId");
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={2}
              display={{ base: "none", md: "flex" }}
            >
              {links.map(({ label, url }) => (
                <LinkComponent key={url} label={label} url={url} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <Box
                  display={{
                    "2xl": "inherit",
                    xl: "inherit",
                    lg: "inherit",
                    md: "inherit",
                    sm: "none",
                    base: "none",
                  }}
                >
                  <Center my={2}>
                    <Avatar size={"xl"} />
                  </Center>
                  <Center>User</Center>
                  <MenuDivider />
                </Box>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={2}>
              {links.map(({ label, url }) => (
                <LinkComponent key={url} label={label} url={url} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Suspense
        fallback={
          <Center mt={10}>
            <Spinner />
          </Center>
        }
      >
        <Box p={2}>
          <Outlet />
        </Box>
      </Suspense>
    </>
  );
};

export default RootLayout;
