import { InfoCard } from "@/components/InfoCard";

export default async function Home() {
  return (
    <>
      <InfoCard
        header={"Master thesis @ NTNU"}
        body={
          <>
            <p>Made by Jacob Theisen and Petter Lauvrak</p>
            <p>Supervisor: Trond Aalberg</p>
          </>
        }
      />
      
    </>
  );
}
