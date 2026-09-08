import { Suspense } from "react";
import { GeneratorView } from "@/components/generator/GeneratorView";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <GeneratorView />
    </Suspense>
  );
}
