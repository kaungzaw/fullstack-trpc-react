import { useRef, useState } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setLoading(true);
      await trpcProxyClient.auth.deleteAccount.mutate();
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userId");
      navigate(routeNames.SIGN_IN);
    } catch (error: any) {
      toast({
        title: "Delecte Account failed.",
        description: error.message,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <div>SettingsPage</div>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteAccount}
                ml={3}
                isLoading={loading}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default SettingsPage;
