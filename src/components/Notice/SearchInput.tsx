import * as S from "../../styles/Notice.style";
import search from "../../assets/Notice/Search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <S.SearchSection>
      <S.SearchBox>
        <img src={search} alt="Search" />
        <S.SearchInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "검색어를 입력하세요"}
        />
      </S.SearchBox>
    </S.SearchSection>
  );
}
