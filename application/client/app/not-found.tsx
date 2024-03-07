import { Button } from "@nextui-org/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <h2 className="h2">Not found</h2>
      The page you were trying to access could not be found.
      <Link href={"/"}>
        <Button>Back to Home Page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
