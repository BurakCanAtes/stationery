import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ITextWithPopoverProps {
  children: React.ReactNode;
  tooltip: string;
}

const TextWithPopover = ({ children, tooltip }: ITextWithPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        className="w-auto max-w-xs p-2 text-sm text-popover-foreground bg-popover border border-border shadow-md rounded-md"
      >
        {tooltip}
      </PopoverContent>
    </Popover>
  );
};

export default TextWithPopover;