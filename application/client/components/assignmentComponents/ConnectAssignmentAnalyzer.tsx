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

const ConnectAssignmentAnalyzer = ({
  assignment_id,
  connected_analyzers,
}: {
  assignment_id: number;
  connected_analyzers: AnalyzerSimplifiedResponse[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const fetchAnalyzers = async () => {
    const resp = await api.getAllAnalyzers({ cache: "no-cache" });
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

  const [notConnectedAnalyzers, setNotConnectedAnalyzers] = useState<
    AnalyzerSimplifiedResponse[]
  >([]);

  useEffect(() => {
    const newNotConnectedAnalyzers = analyzers.filter(
      (analyzer) =>
        !connected_analyzers.find(
          (connected_analyzer) => connected_analyzer.id == analyzer.id
        )
    );
    setNotConnectedAnalyzers(newNotConnectedAnalyzers);
  }, [analyzers, connected_analyzers]);

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
        assignment_id,
        selectedAnalyzer.id
      );
      if (res.ok) {
        openSnackbar({ message: "Anlyzer connected", severity: "success" });
        router.refresh();
      } else {
        openSnackbar({ message: "Something went wrong", severity: "error" });
        console.log(res.error);
      }
    }
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
          onOpenChange();
          setSelecedAnalyzer(undefined);
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

export default ConnectAssignmentAnalyzer;
