type SmallBoolProps = {
  text: string;
  isGreen: boolean | undefined;
};

export const SmallBool = ({ text, isGreen }: SmallBoolProps) => {
  return (
    <div
      className={`w-[45px] rounded-full px-2 py-1 text-center text-xs text-white ${
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
