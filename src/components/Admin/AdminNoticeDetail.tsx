import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../../styles/AdminNoticeDetail.styles";
import AdminConfirmModal from "./AdminConfirmModal";
import { getAdminToken } from "../../utils/Admin";

type ModalType = "edit" | "delete" | null;

interface NoticeDetail {
  id: number;
  title: string;
  category: "NOTICE" | "PERFORMANCE" | "EVENT" | "ETC";
  urgent: boolean;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export default function AdminNoticeDetail() {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
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
          alert(data.message || "공지 상세 정보를 불러오지 못했습니다.");
          navigate("/AdminNotice");
          return;
        }

        setNotice(data.result);
      } catch (error) {
        console.error(error);
        alert("공지 상세 조회 중 오류가 발생했습니다.");
        navigate("/AdminNotice");
      }
    };

    fetchNoticeDetail();
  }, [API_URL, navigate, noticeId]);

  const handleDeleteNotice = async () => {
    try {
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

      const response = await fetch(`${API_URL}/api/admin/notices/${noticeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        alert(data.message || "공지 삭제에 실패했습니다.");
        return;
      }

      alert("공지사항이 삭제되었습니다.");
      setModalType(null);
      navigate("/AdminNotice");
    } catch (error) {
      console.error(error);
      alert("공지 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleConfirm = () => {
    if (modalType === "edit") {
      navigate(`/AdminNoticeEdit/${noticeId}`);
      setModalType(null);
      return;
    }

    if (modalType === "delete") {
      handleDeleteNotice();
      return;
    }
  };

  if (!notice) {
    return null;
  }
  // 이미지 여러장 추가 기능 수정함

  return (
    <>
      <S.Page>
        <S.Content>
          <S.FixedTopArea>
            <S.Title>{notice.title}</S.Title>

            <S.ImageScrollArea>
              {(notice.imageUrls ?? []).length > 0 ? (
                (notice.imageUrls ?? []).map((imageUrl, index) => (
                  <S.ImageBox key={`${imageUrl}-${index}`}>
                    <img src={imageUrl} alt={`공지 이미지 ${index + 1}`} />
                  </S.ImageBox>
                ))
              ) : (
                <S.ImageBox />
              )}
            </S.ImageScrollArea>
          </S.FixedTopArea>

          <S.BodyText>{notice.content}</S.BodyText>
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
