import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../tiptap-ui-primitive/popover";
import { MoreHorizontal } from "lucide-react";
import { PropsWithChildren } from "react";

export function BubblePopover({ children }: PropsWithChildren) {
  return (
    <>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 shadow-lg border bg-background hover:bg-accent rounded-full"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start" side="bottom">
        <div className="flex-column items-center gap-1 p-2">{children}</div>
      </PopoverContent>
    </>
  );
}
