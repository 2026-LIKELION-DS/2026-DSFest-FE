import { useState } from "react";
import * as S from "../../styles/AdminNoticeWrite.styles";
import AdminConfirmModal from "./AdminConfirmModal";

import artistImg from "../../assets/home/Home_Artist.svg";

type NoticeTag = "안내" | "공연" | "이벤트" | "기타";

const TAGS: NoticeTag[] = ["안내", "공연", "이벤트", "기타"];

export default function AdminNoticeWrite() {
  const [selectedTag, setSelectedTag] = useState<NoticeTag>("안내");
  const [isEmergency, setIsEmergency] = useState(false);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const mockImages = [artistImg, artistImg, artistImg, artistImg, artistImg];

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    console.log({
      selectedTag,
      isEmergency,
      content,
    });

    // TODO: 백엔드 API 연결 후 공지 등록 처리
    setShowModal(false);
  };

  return (
    <>
      <S.Page>
        <S.FormArea>
          <S.Field>
            <S.Label>제목</S.Label>
            <S.TitleInput placeholder="제목을 입력하세요" />
          </S.Field>

          <S.Field>
            <S.Label>태그</S.Label>
            <S.TagButtonGroup>
              {TAGS.map((tag) => (
                <S.TagButton
                  key={tag}
                  type="button"
                  $isSelected={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </S.TagButton>
              ))}
            </S.TagButtonGroup>
          </S.Field>

          <S.EmergencyField $isSelected={isEmergency}>
            <S.EmergencyText>긴급 (선택)</S.EmergencyText>

            <S.RadioInput
              type="radio"
              checked={isEmergency}
              onClick={() => setIsEmergency((prev) => !prev)}
              readOnly
            />
          </S.EmergencyField>

          <S.Field>
            <S.Label>내용</S.Label>
            <S.ContentTextarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </S.Field>

          <S.ImageScrollArea>
            <S.ImageAddBox type="button">
              사진
              <br />
              추가하기
            </S.ImageAddBox>

            {mockImages.map((img, index) => (
              <S.ImageBox key={index}>
                <img src={img} alt={`preview-${index}`} />
              </S.ImageBox>
            ))}
          </S.ImageScrollArea>
        </S.FormArea>

        <S.BottomButtonArea>
          <S.SubmitButton type="button" onClick={handleSubmit}>
            등록하기
          </S.SubmitButton>
        </S.BottomButtonArea>
      </S.Page>

      {showModal && (
        <AdminConfirmModal
          type="create"
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
        />
      )}
    </>
  );
}
