"use client";
import { Card, Button } from "@nextui-org/react";

type InfoCardProps = {
  header: string;
  body: string | React.ReactNode;
};
export const InfoCard = ({ header, body }: InfoCardProps) => {
  return (
    <div className="flex justify-center items-center mt-16 ">
      <Card className="flex flex-col items-center justify-center pt-10 pb-5 px-10 shadow-xl bg-yellow-100">
        <h3 className="h3 mb-4">{header}</h3>
        <div className="text-center text-gray-500 mb-6">{body}</div>
      </Card>
    </div>
  );
};
