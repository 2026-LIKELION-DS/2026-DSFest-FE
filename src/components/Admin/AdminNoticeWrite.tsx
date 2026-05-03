import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/AdminNoticeWrite.styles";
import AdminConfirmModal from "./AdminConfirmModal";
import { getAdminToken } from "../../utils/Admin";

type NoticeTag = "안내" | "공연" | "이벤트" | "기타";
type NoticeCategory = "NOTICE" | "PERFORMANCE" | "EVENT" | "ETC";

const TAGS: NoticeTag[] = ["안내", "공연", "이벤트", "기타"];

const CATEGORY_MAP: Record<NoticeTag, NoticeCategory> = {
  안내: "NOTICE",
  공연: "PERFORMANCE",
  이벤트: "EVENT",
  기타: "ETC",
};

export default function AdminNoticeWrite() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [selectedTag, setSelectedTag] = useState<NoticeTag>("안내");
  const [isEmergency, setIsEmergency] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleClickImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    setImages(Array.from(files));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const token = getAdminToken();

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/AdminLogin");
        return;
      }

      const formData = new FormData();

      const data = {
        title: title.trim(),
        category: CATEGORY_MAP[selectedTag],
        urgent: isEmergency,
        content: content.trim(),
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(`${API_URL}/api/admin/notices`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.isSuccess) {
        alert(responseData.message || "공지 등록에 실패했습니다.");
        return;
      }

      alert("공지사항이 등록되었습니다.");
      setShowModal(false);
      navigate("/AdminNotice");
    } catch (error) {
      console.error(error);
      alert("공지 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <S.Page>
        <S.FormArea>
          <S.Field>
            <S.Label>제목</S.Label>
            <S.TitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
            <S.ImageAddBox type="button" onClick={handleClickImageAdd}>
              사진
              <br />
              추가하기
            </S.ImageAddBox>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleChangeImages}
            />

            {images.map((img, index) => (
              <S.ImageBox key={`${img.name}-${index}`}>
                <img src={URL.createObjectURL(img)} alt={`preview-${index}`} />
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
