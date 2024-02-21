"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CourseDetails({ id }: { id: number }) {
  const router = useRouter();

  const cards = [
    {
      header: "New assignment",
      buttonText: "Create assignment",
      onClick: () => {},
    },
    {
      header: "Existing assignments",
      buttonText: "Show assignments",
      onClick: () => {
        router.push(`/courses/${id}/assignments`);
      },
    },
    {
      header: "Manage Students",
      buttonText: "Show students",
      onClick: () => {
        router.push(`/courses/${id}/assignments`);
      },
    },
  ];

  return (
    <>
      <div className="flex flex-wrap">
        {cards.map((card, index) => (
          <Card key={index} className="m-5 w-64">
            <CardBody className="flex flex-col items-center justify-center">
              <div>
                <Button onClick={card.onClick}>{card.buttonText}</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
