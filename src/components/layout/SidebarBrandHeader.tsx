import Image from "next/image";
import { saciatta } from "@/brands/saciatta";
import { vinuta } from "@/brands/vinuta";

export function SidebarBrandHeader({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <div
        className="flex flex-col items-center gap-3 px-3 pt-7 pb-6"
        style={{
          background:
            "linear-gradient(160deg, rgba(150,6,54,0.28) 0%, rgba(11,14,20,0) 60%)",
        }}
      >
        <Image
          src={saciatta.symbol}
          alt={saciatta.name}
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        <Image
          src={vinuta.symbol}
          alt={vinuta.name}
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden px-6 pt-7 pb-6"
      style={{
        background:
          "linear-gradient(160deg, rgba(150,6,54,0.28) 0%, rgba(11,14,20,0) 60%)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1 flex justify-center">
          <Image
            src={saciatta.logo}
            alt={saciatta.name}
            width={140}
            height={56}
            className="h-9 w-auto object-contain"
            priority
          />
        </div>
        <div className="h-9 w-px bg-border-strong" />
        <div className="flex-1 flex justify-center">
          <Image
            src={vinuta.logo}
            alt={vinuta.name}
            width={110}
            height={80}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>
      </div>
      <p className="mt-5 text-center text-[11px] font-medium tracking-[0.18em] text-text-tertiary">
        GERADOR DE CONTEÚDO
      </p>
    </div>
  );
}
