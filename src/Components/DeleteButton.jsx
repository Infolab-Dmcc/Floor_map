/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export function DeleteButton({ deleteImage }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="w-2/12 self-start" color="danger" variant="light" ><p className="font-semibold" >Cancel Floor Map</p> </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cancel Floor Map</ModalHeader>
                            <ModalBody>
                                Are you sure you want to cancel?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => {
                                    deleteImage()
                                    onClose()
                                }}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
