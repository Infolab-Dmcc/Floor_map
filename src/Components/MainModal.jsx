import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function MainModal({
  title,
  isOpen,
  children,
  onOpenChange,
  resolveAction,
  rejectName = "Close",
  resolveName = "Add",
}) {

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {rejectName}
                </Button>
                <Button color="primary" onPress={()=> {
                  resolveAction()
                  onClose()
                }}>
                  {resolveName}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
