import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Center,
} from "@chakra-ui/react";
import styles from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <>
      <Modal
        size="xs"
        isOpen={true}
        onClose={() => {}}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className={styles.loading}>Loading</div>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoadingOverlay;
