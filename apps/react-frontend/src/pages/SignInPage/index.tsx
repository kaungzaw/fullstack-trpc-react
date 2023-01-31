import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SubmitHandler } from "react-hook-form";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: "hello@world.hw",
      password: "HelloWorld@123",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      const { userId, expiresAt } = await trpcProxyClient.auth.signIn.mutate({
        email,
        password,
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("expiresAt", expiresAt);
      navigate(routeNames.HOME);
    } catch (error: any) {
      toast({
        title: "Sign In failed.",
        description: error.message,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign In</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <Stack spacing={4}>
              <FormControl
                isInvalid={errors.email ? true : false}
                isDisabled={isSubmitting}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" {...register("email")} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.password ? true : false}
                isDisabled={isSubmitting}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign In
                </Button>
                <Text color={"blue.400"} textAlign={"right"}>
                  <Link as={RouterLink} to={"/" + routeNames.SIGN_UP}>
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignInPage;
