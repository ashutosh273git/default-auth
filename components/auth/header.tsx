import { cn } from "@/lib/utils";

interface HeadeerProps {
  label: string;
}

export const Header = ({ label }: HeadeerProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold"
      )}>
        🔏Auth
      </h1>
      <p className="text-black text-sm font-bold">
        {label}
      </p>
    </div>
  );
};
