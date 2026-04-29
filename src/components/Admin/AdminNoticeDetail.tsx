import { useState } from "react";
import * as S from "../../styles/AdminNoticeDetail.styles";
import AdminConfirmModal from "./AdminConfirmModal";

type ModalType = "edit" | "delete" | null;

const mockNotice = {
  title: "공지 제목 공지 제목공지 제목공지 제목공지 제목",
  images: [null, null, null],
  content: `공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게 공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게 공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게

공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게

공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게 긴 공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게`,
};

export default function AdminNoticeDetail() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleConfirm = () => {
    if (modalType === "edit") {
      console.log("공지 수정");
    }

    if (modalType === "delete") {
      console.log("공지 삭제");
    }

    setModalType(null);
  };

  return (
    <>
      <S.Page>
        <S.Content>
          <S.FixedTopArea>
            <S.Title>{mockNotice.title}</S.Title>

            <S.ImageScrollArea>
              <S.AddImageBox>
                사진
                <br />
                추가하기
              </S.AddImageBox>

              {mockNotice.images.map((_, index) => (
                <S.ImageBox key={index} />
              ))}
            </S.ImageScrollArea>
          </S.FixedTopArea>

          <S.BodyText>{mockNotice.content}</S.BodyText>
        </S.Content>

        <S.BottomButtonArea>
          <S.EditButton type="button" onClick={() => setModalType("edit")}>
            수정
          </S.EditButton>

          <S.DeleteButton type="button" onClick={() => setModalType("delete")}>
            삭제
          </S.DeleteButton>
        </S.BottomButtonArea>
      </S.Page>

      {modalType && (
        <AdminConfirmModal
          type={modalType}
          onCancel={() => setModalType(null)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
