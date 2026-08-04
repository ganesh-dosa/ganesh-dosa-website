import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { business } from "@/lib/config";

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

// cmdk's built-in filter needs an exact ordered subsequence, which rejects
// common typos (e.g. "dandeong" for "Dandenong"). Score by edit distance
// instead so a misspelled suburb still surfaces the right suggestion.
function fuzzyScore(value: string, search: string): number {
  const v = value.toLowerCase();
  const s = search.toLowerCase();
  if (!s) return 1;
  if (v.includes(s)) return 1;
  const dist = levenshtein(v, s);
  const maxLen = Math.max(v.length, s.length);
  const similarity = 1 - dist / maxLen;
  return similarity > 0.55 ? similarity : 0;
}

export function SuburbPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (suburb: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const suburbs = business.serviceAreas;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className="mt-2 flex w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-3 text-left outline-none focus:border-primary"
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {value || "Search for your suburb…"}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command filter={fuzzyScore}>
          <CommandInput placeholder="Type your suburb…" />
          <CommandList>
            <CommandEmpty>No matching suburb. Try a different spelling.</CommandEmpty>
            <CommandGroup>
              {suburbs.map((s) => (
                <CommandItem
                  key={s}
                  value={s}
                  onSelect={(selected) => {
                    onChange(selected === value ? "" : selected);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("h-4 w-4", value === s ? "opacity-100" : "opacity-0")} />
                  {s}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
