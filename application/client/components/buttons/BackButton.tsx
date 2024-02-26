"use client";

import { Button } from "@nextui-org/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  targetURL: string;
  buttonText?: string;
};
const BackButton = ({ targetURL, buttonText }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      isIconOnly={!buttonText}
      variant="light"
      startContent={<ArrowBackIosIcon className="h-[20px]" />}
      onClick={() => {
        router.push(targetURL);
      }}
    >
      {buttonText}
    </Button>
  );
};

export default BackButton;
