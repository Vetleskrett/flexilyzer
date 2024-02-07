"use client";

import { useEffect, useState } from "react";
import { CreateButton } from "../buttons";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

import api from "@/api_utils";
import { AnalyzerSimplifiedResponse } from "@/extensions/data-contracts";
import { useQuery } from "react-query";
import { useSnackbar } from "@/context/snackbarContext";
import { useRouter } from "next/navigation";

const ConnectAsssignmentAnalyzer = ({
  assigment_id,
  connected_analyzers,
}: {
  assigment_id: string;
  connected_analyzers: AnalyzerSimplifiedResponse[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const fetchAnalyzers = async () => {
    const resp = await api.getAllAnalyzers();
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  const {
    data: analyzers = [],
    error,
    isLoading: isAnlyzersLoading,
  } = useQuery<AnalyzerSimplifiedResponse[], Error>(
    ["analyzers"],
    fetchAnalyzers,
    {
      refetchOnWindowFocus: false,
    }
  );

  const notConnectedAnalyzers = analyzers.filter(
    (analyzer) =>
      !connected_analyzers.find(
        (connected_analyzer) => connected_analyzer.id == analyzer.id
      )
  );

  const [selectedAnalyzer, setSelecedAnalyzer] = useState<
    AnalyzerSimplifiedResponse | undefined
  >();

  const updateSelection = (e: any) => {
    const selectedAnalyzer = notConnectedAnalyzers.find(
      (analyzer) => analyzer.id === Number(e)
    );
    setSelecedAnalyzer(selectedAnalyzer);
  };

  const createConnection = async (onClose: () => void) => {
    if (selectedAnalyzer) {
      const res = await api.connectAssignmentAnalyzers(
        Number(assigment_id),
        selectedAnalyzer.id
      );
      if (res.ok) {
        openSnackbar({ message: "Anlyzer connected", severity: "success" });
      } else {
        openSnackbar({ message: "Something went wrong", severity: "error" });
        console.log(res.error);
      }
    }
    router.refresh();
    onClose();
  };

  if (error) return <>Error</>;

  if (isAnlyzersLoading) return <>Loading...</>;

  return (
    <>
      <CreateButton text='+' onClickFunction={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          setSelecedAnalyzer(undefined);
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader> Connect analyzer to assignment</ModalHeader>
              <ModalBody>
                {notConnectedAnalyzers.length > 0 ? (
                  <Select
                    label='Select analyzer'
                    className='max-w-xs'
                    onChange={(e) => {
                      updateSelection(e.target.value);
                    }}
                  >
                    {notConnectedAnalyzers.map((analyzer) => (
                      <SelectItem key={analyzer.id} value={analyzer.name}>
                        {analyzer.name}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <span>No available analyzers</span>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  isDisabled={!selectedAnalyzer}
                  color='primary'
                  onPress={() => createConnection(onClose)}
                >
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
