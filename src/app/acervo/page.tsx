import { Suspense } from "react";
import { AcervoView } from "@/components/acervo/AcervoView";

export default function AcervoPage() {
  return (
    <Suspense fallback={null}>
      <AcervoView />
    </Suspense>
  );
}
