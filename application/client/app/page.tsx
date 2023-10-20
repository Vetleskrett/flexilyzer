import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Api } from "@/extensions/Api";

export default async function Home() {

  return (
    <div className="mt-10">
      <h2>Master thesis NTNU GitSpect</h2>
      Made by Jacob Theisen and Petter Lauvrak <br />
      Supervisor: Trond Aalberg
    </div>
  );
}
