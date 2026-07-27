"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/invitation/AGUS0017");
  }, [router]);

  return <main aria-label="Opening your FEVER invitation" />;
}
