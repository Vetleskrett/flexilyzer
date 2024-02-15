"use client";

import { Switch } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CompareModeSwitch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isCompareMode = searchParams.get("compare") === "true";

  function handleCompareSwitchChange(newValue: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("compare", newValue.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Switch
      isSelected={isCompareMode}
      onValueChange={(newValue) => handleCompareSwitchChange(newValue)}
      size="sm"
    >
      Show average
    </Switch>
  );
}
