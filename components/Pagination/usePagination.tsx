/**
 * UsePagination
 * @return {array} The JSX Code for the UsePagination
 */

type UsePaginationProps = {
  totalPage: number;
  currentPage: number;
};

const range = (start: any, end: any) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalPage, currentPage }: UsePaginationProps) => {
  const siblingCount = 1;
  const totalPageNumbers = siblingCount + 5;

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPage;

  if (totalPageNumbers >= totalPage) {
    return range(1, totalPage);
  }
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "DOTS", totalPage];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPage - rightItemCount + 1, totalPage);
    return [firstPageIndex, "DOTS", ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
  }

  return [];
};

export default usePagination;
