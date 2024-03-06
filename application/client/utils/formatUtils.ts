export const formatter = new Intl.NumberFormat("no-NO", {
  style: "decimal",
  useGrouping: true,
});

type ExtendedValueObj = {
  value: string | number | boolean | Date;
  desc: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isExtendedValueObj = (value: any): value is ExtendedValueObj => {
  return (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "desc" in value &&
    typeof value.desc === "string"
  );
};
