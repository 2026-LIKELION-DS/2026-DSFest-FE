import * as S from "../../styles/ArtistComponent.style";

type ArtistPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ArtistPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ArtistPaginationProps) {
  return (
    <S.ArtistPagination>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <S.PageButton
            key={page}
            type="button"
            $active={currentPage === page}
            onClick={() => onPageChange(page)}
            aria-label={`${page}번째 아티스트 보기`}
          />
        );
      })}
    </S.ArtistPagination>
  );
}

export default ArtistPagination;
