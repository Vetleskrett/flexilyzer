"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type CreateButtonProps = {
  pushRoute?: string;
  text: string;
  onClickFunction?: () => void;
};

const CreateButton = ({
  pushRoute,
  text,
  onClickFunction,
}: CreateButtonProps) => {
  const { push } = useRouter();

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    } else if (pushRoute) {
      push(pushRoute);
    }
  };

  return (
    <Button color="secondary" onClick={handleClick} variant="bordered">
      {text}
    </Button>
  );
};

export default CreateButton;
