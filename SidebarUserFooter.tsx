export function SidebarUserFooter({
  name = "Luciano Sales",
  role = "Analista Comercial",
  collapsed = false,
}: {
  name?: string;
  role?: string;
  collapsed?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (collapsed) {
    return (
      <div className="mt-auto flex items-center justify-center border-t border-border-subtle px-3 py-4">
        <div
          title={`${name} · ${role}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-card-hover text-xs font-semibold text-text-secondary"
        >
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto flex items-center gap-3 border-t border-border-subtle px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-card-hover text-xs font-semibold text-text-secondary">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-text-primary">{name}</p>
        <p className="truncate text-xs text-text-tertiary">{role}</p>
      </div>
    </div>
  );
}
