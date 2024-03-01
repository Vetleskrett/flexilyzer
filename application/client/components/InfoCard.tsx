"use client";
import { Card } from "@nextui-org/react";

type InfoCardProps = {
  header: string;
  body: string | React.ReactNode;
};
export const InfoCard = ({ header, body }: InfoCardProps) => {
  return (
    <div className="mt-16 flex items-center justify-center ">
      <Card className="flex flex-col items-center justify-center bg-yellow-100 px-10 pb-5 pt-10 shadow-xl">
        <h3 className="h3 mb-4">{header}</h3>
        <div className="mb-6 text-center text-gray-500">{body}</div>
      </Card>
    </div>
  );
};
