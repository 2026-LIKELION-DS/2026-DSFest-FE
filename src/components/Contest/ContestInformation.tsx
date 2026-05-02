import { useEffect } from "react";
import * as S from "../../styles/ContestInformation.style";
import axios from "axios";

interface ContestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  // images?: string[];
  onSubmit: () => void;
  photoEntryIds: number[];
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  photoEntryIds,
}: ContestInfoModalProps) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

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

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/api/photo-contest/vote`, {
        studentId,
        studentName,
        photoEntryIds,
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setIsDuplicate(false);
          onSubmit();
        }
      })
      .catch((err) => {
        console.error("투표 에러:", err);
        setIsDuplicate(true);
      });
  };

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
                      <S.Num
                        placeholder="20260000"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                      ></S.Num>
                    </S.NumBox>
                  </S.Content>
                  <S.Content>
                    <S.NumTitle>이름</S.NumTitle>
                    <S.NumBox>
                      <S.Name
                        placeholder="김덕우"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                      ></S.Name>
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
