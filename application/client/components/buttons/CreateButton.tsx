"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type CreateButtonProps = {
  pushRoute?: string;
  text: string;
  onClickFunction?: () => void;
  size?: ButtonProps["size"];
};

const CreateButton = ({
  pushRoute,
  text,
  onClickFunction,
  size,
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
    <Button
      size={size}
      color="secondary"
      onClick={handleClick}
      variant="bordered"
      type="submit"
      className="mt-4"
    >
      {text}
    </Button>
  );
};

export default CreateButton;
