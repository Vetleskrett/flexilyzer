"use client";

import { useState, useMemo } from "react";
import { CreateButton } from "../buttons";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const ConnectAsssignmentAnalyzer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedKey, setSelectedKey] = useState<any>("test");

  return (
    <>
      <CreateButton text='+' onClickFunction={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader> Connect analyzer to assignment</ModalHeader>
              <ModalBody>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='capitalize'>
                      {selectedKey}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Single selection example'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeys={selectedKey}
                    onSelectionChange={(e) => setSelectedKey(e)}
                  >
                    <DropdownItem key='text'>Text</DropdownItem>
                    <DropdownItem key='number'>Number</DropdownItem>
                    <DropdownItem key='date'>Date</DropdownItem>
                    <DropdownItem key='single_date'>Single Date</DropdownItem>
                    <DropdownItem key='iteration'>Iteration</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Connect
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectAsssignmentAnalyzer;
