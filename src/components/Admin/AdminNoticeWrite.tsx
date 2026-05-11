import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const TAG_MAP: Record<NoticeCategory, NoticeTag> = {
  NOTICE: "안내",
  PERFORMANCE: "공연",
  EVENT: "이벤트",
  ETC: "기타",
};

interface NoticeDetail {
  id: number;
  title: string;
  category: NoticeCategory;
  urgent: boolean;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export default function AdminNoticeWrite() {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const isEditMode = !!noticeId;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [selectedTag, setSelectedTag] = useState<NoticeTag>("안내");
  const [isEmergency, setIsEmergency] = useState(false);
  const [content, setContent] = useState("");

  const [keepImageUrls, setKeepImageUrls] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchNoticeDetail = async () => {
      try {
        const token = getAdminToken();

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/AdminLogin");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/admin/notices/${noticeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.isSuccess) {
          alert(data.message || "공지 정보를 불러오지 못했습니다.");
          navigate("/AdminNotice");
          return;
        }

        const notice: NoticeDetail = data.result;

        setTitle(notice.title);
        setSelectedTag(TAG_MAP[notice.category]);
        setIsEmergency(notice.urgent);
        setContent(notice.content);
        setKeepImageUrls(notice.imageUrls || []);
      } catch (error) {
        console.error(error);
        alert("공지 정보를 불러오는 중 오류가 발생했습니다.");
        navigate("/AdminNotice");
      }
    };

    fetchNoticeDetail();
  }, [API_URL, isEditMode, navigate, noticeId]);

  const handleClickImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (selectedFiles.length === 0) return;

    setNewImages((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };
  const handleRemoveKeepImage = (targetUrl: string) => {
    setKeepImageUrls((prev) => prev.filter((url) => url !== targetUrl));
  };

  const handleRemoveNewImage = (targetIndex: number) => {
    setNewImages((prev) => prev.filter((_, index) => index !== targetIndex));
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

  const handleCreateNotice = async () => {
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

    newImages.forEach((image) => {
      formData.append("images", image, image.name);
    });

    const response = await fetch(`${API_URL}/api/admin/notices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  };

  const handleEditNotice = async () => {
    const token = getAdminToken();

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/AdminLogin");
      return;
    }

    if (!noticeId) {
      alert("공지 ID가 없습니다.");
      navigate("/AdminNotice");
      return;
    }

    const formData = new FormData();

    const data = {
      title: title.trim(),
      category: CATEGORY_MAP[selectedTag],
      urgent: isEmergency,
      content: content.trim(),
      keepImageUrls,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );

    newImages.forEach((image) => {
      formData.append("newImages", image, image.name);
    });

    const response = await fetch(`${API_URL}/api/admin/notices/${noticeId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = isEditMode
        ? await handleEditNotice()
        : await handleCreateNotice();

      if (!response) return;

      const responseData = await response.json();

      if (!response.ok || !responseData.isSuccess) {
        alert(
          responseData.message ||
            (isEditMode
              ? "공지 수정에 실패했습니다."
              : "공지 등록에 실패했습니다.")
        );
        return;
      }

      alert(
        isEditMode ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다."
      );
      setShowModal(false);

      navigate("/AdminNotice");
    } catch (error) {
      console.error(error);
      alert(
        isEditMode
          ? "공지 수정 중 오류가 발생했습니다."
          : "공지 등록 중 오류가 발생했습니다."
      );
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

            {keepImageUrls.map((imageUrl) => (
              <S.ImageBox
                key={imageUrl}
                onClick={() => handleRemoveKeepImage(imageUrl)}
              >
                <img src={imageUrl} alt="기존 공지 이미지" />
              </S.ImageBox>
            ))}

            {newImages.map((img, index) => (
              <S.ImageBox
                key={`${img.name}-${index}`}
                onClick={() => handleRemoveNewImage(index)}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`새 이미지 ${index + 1}`}
                />
              </S.ImageBox>
            ))}
          </S.ImageScrollArea>
        </S.FormArea>

        <S.BottomButtonArea>
          <S.SubmitButton type="button" onClick={handleSubmit}>
            {isEditMode ? "수정하기" : "등록하기"}
          </S.SubmitButton>
        </S.BottomButtonArea>
      </S.Page>

      {showModal && (
        <AdminConfirmModal
          type={isEditMode ? "edit" : "create"}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
        />
      )}
    </>
  );
}
