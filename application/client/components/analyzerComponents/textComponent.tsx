import { textComponent } from "@/app/types/componentDefinitions";

export default function textComponent({ key, value }: textComponent) {
  return (
    <div>
      <h2>{key}</h2>
      {value}
    </div>
  );
}
