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
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {text}
    </div>
  );
};
