import { useEffect } from "react";
import * as S from "../../styles/ContestInformation.style";

interface ContestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images?: string[];
  content: string;
  onSubmit: () => void; // 제출 함수
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
}: ContestInfoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <S.CommonModalOverlay onClick={onClose}>
          <S.CommonModalContainer onClick={(e) => e.stopPropagation()}>
            <S.Overlay>
              <S.Container>
                <S.ContainerTitle>
                  <S.Title>학번과 이름을 입력해 주세요</S.Title>
                  <S.SubTite>중복 투표 방지를 위한 마지막 단계입니다</S.SubTite>
                </S.ContainerTitle>
                <S.ContentBox>
                  <S.Content>
                    <S.NumTitle>학번</S.NumTitle>
                    <S.NumBox>
                      <S.Num placeholder="20260000"></S.Num>
                    </S.NumBox>
                  </S.Content>
                  <S.Content>
                    <S.NumTitle>이름</S.NumTitle>
                    <S.NumBox>
                      <S.Name placeholder="이소라"></S.Name>
                    </S.NumBox>
                  </S.Content>
                  <S.NoticeContent>
                    <S.Notice>
                      학번 혹은 이름이 바르게 적혔는지 확인하고<br></br> 이상이
                      있는 경우
                      <a
                        href="https://pf.kakao.com/_gUyQn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        이곳
                      </a>
                      에 문의해주세요
                    </S.Notice>
                    <S.NoticeDupl>이미 제출된 학번 및 이름입니다</S.NoticeDupl>
                  </S.NoticeContent>
                </S.ContentBox>
                <S.Sub>
                  <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
                  <S.SubButton onClick={onSubmit}>투표완료</S.SubButton>
                </S.Sub>
              </S.Container>
            </S.Overlay>
          </S.CommonModalContainer>
        </S.CommonModalOverlay>
      )}
    </>
  );
}
