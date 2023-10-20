import { Accordion, AccordionItem } from "@nextui-org/react";

interface AccordionProps {
    id: number;
    course: number
}
export default function ReposAccordion() {
  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        subtitle="Press to expand"
        title="Accordion 1"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
