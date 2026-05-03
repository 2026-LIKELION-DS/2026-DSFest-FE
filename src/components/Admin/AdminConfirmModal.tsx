import * as S from "../../styles/AdminConfirmModal.styles";

type ModalType = "create" | "edit" | "delete";

interface AdminConfirmModalProps {
  type: ModalType;
  onCancel: () => void;
  onConfirm: () => void;
}

const MODAL_TEXT = {
  create: {
    title: "공지를 등록하시겠어요?",
    confirmText: "등록",
  },
  edit: {
    title: "공지를 수정하시겠어요?",
    confirmText: "수정",
  },
  delete: {
    title: "공지를 삭제하시겠어요?",
    confirmText: "삭제",
  },
};

export default function AdminConfirmModal({
  type,
  onCancel,
  onConfirm,
}: AdminConfirmModalProps) {
  const { title, confirmText } = MODAL_TEXT[type];

  return (
    <S.Overlay>
      <S.ModalBox>
        <S.Title>{title}</S.Title>

        <S.ButtonArea>
          <S.CancelButton type="button" onClick={onCancel}>
            취소
          </S.CancelButton>

          {type === "delete" ? (
            <S.DeleteButton type="button" onClick={onConfirm}>
              {confirmText}
            </S.DeleteButton>
          ) : (
            <S.ConfirmButton type="button" onClick={onConfirm}>
              {confirmText}
            </S.ConfirmButton>
          )}
        </S.ButtonArea>
      </S.ModalBox>
    </S.Overlay>
  );
}
