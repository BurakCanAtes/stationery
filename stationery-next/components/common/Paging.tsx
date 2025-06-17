import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import { buildParams } from "@/lib/utils/helperFunctions";

interface IPagingProps {
  page: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

const Paging = ({ page, totalPages, searchParams }: IPagingProps) => {
  const pageNumbers: (number | "...")[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page > 2) pageNumbers.push(1);
    if (page > 3) pageNumbers.push("...");

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 2) pageNumbers.push("...");
    if (page < totalPages - 1) pageNumbers.push(totalPages);
  }

  const getPageHref = (page: number) => {
    const params = `/products?${buildParams({ ...searchParams, page })}`;
    return params;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? getPageHref(page - 1) : getPageHref(1)}
            className={cn({ "pointer-events-none opacity-50": page === 1 })}
          />
        </PaginationItem>

        {pageNumbers.map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={getPageHref(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={
              page < totalPages
                ? getPageHref(page + 1)
                : getPageHref(totalPages)
            }
            className={cn({
              "pointer-events-none opacity-50": page === totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paging;