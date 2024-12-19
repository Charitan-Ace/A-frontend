import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly currentPageSize: number;
  readonly setPageSize: (value: number) => void;
  readonly handleNextPage: () => void;
  readonly handlePrevPage: () => void;
  readonly goToFirstPage: () => void;
  readonly goToLastPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  setPageSize,
  handleNextPage,
  handlePrevPage,
  goToFirstPage,
  goToLastPage,
  currentPageSize,
}: PaginationProps) => {
  return (
    <div
      className={`
        flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1
        sm:flex-row sm:justify-end sm:gap-8
      `}
    >
      <div
        className={`
          flex flex-col-reverse items-center gap-4
          sm:flex-row sm:gap-6
          lg:gap-8
        `}
      >
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>

          <Select
            value={`${currentPageSize}`}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder="10" />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center gap-x-1 text-sm font-medium">
          Page {currentPage } of <span>{totalPages}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={goToFirstPage}
            aria-label="Go to first page"
            variant="outline"
            className={`
              hidden size-8 p-0
              lg:flex
            `}
          >
            <ChevronsLeft size={16} aria-hidden="true" />
          </Button>

          <Button
            aria-label="Go to previous page"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            variant="outline"
            size="icon"
            className="size-8"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </Button>

          <Button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </Button>

          <Button
            disabled={currentPage === totalPages}
            onClick={goToLastPage}
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className={`
              hidden size-8
              lg:flex
            `}
          >
            <ChevronsRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export { Pagination };
