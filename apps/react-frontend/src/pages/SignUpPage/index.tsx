import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SubmitHandler } from "react-hook-form";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid Email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Weak Password"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    email,
    password,
  }) => {
    try {
      await trpcProxyClient.auth.signUp.mutate({
        name,
        email,
        password,
      });
      navigate(routeNames.SIGN_IN);
    } catch (error: any) {
      toast({
        title: "Sign Up failed.",
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign Up
          </Heading>
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
                isInvalid={errors.name ? true : false}
                isDisabled={isSubmitting}
                isRequired
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="name"
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.email ? true : false}
                isDisabled={isSubmitting}
                isRequired
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.password ? true : false}
                isDisabled={isSubmitting}
                isRequired
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.confirmPassword ? true : false}
                isDisabled={isSubmitting}
                isRequired
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Confirm Password is required",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
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
                  Sign up
                </Button>
                <Text color={"blue.400"} textAlign={"right"}>
                  <Link as={RouterLink} to={routeNames.SIGN_IN}>
                    Sign In
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

export default SignUpPage;
