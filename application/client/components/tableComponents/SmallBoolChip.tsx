type SmallBoolProps = {
  text: string;
  isGreen: boolean | undefined;
};

export const SmallBool = ({ text, isGreen }: SmallBoolProps) => {
  return (
    <div
      className={`px-2 py-1 w-[45px] text-center rounded-full text-white text-xs ${
        isGreen === undefined
          ? "bg-gray-100"
          : isGreen
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {text}
    </div>
  );
};
