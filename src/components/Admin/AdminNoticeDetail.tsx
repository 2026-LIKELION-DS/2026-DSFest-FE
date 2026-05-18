import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../../styles/AdminNoticeDetail.styles";
import AdminConfirmModal from "./AdminConfirmModal";
import { getAdminToken } from "../../utils/Admin";
import adminNoticeDetails from "../../data/AdminJson/adminNoticeDetails.json";

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

  // 백 API 아카이빙으로 인해 사용하지 않음
  // const API_URL = import.meta.env.VITE_API_URL;

  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
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

    // 기존 백 API 연동 코드
    /*
    const fetchNoticeDetail = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/notices/${noticeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
    */

    const foundNotice = (adminNoticeDetails as NoticeDetail[]).find(
      (item) => item.id === Number(noticeId)
    );

    if (!foundNotice) {
      alert("공지 상세 정보를 찾을 수 없습니다.");
      navigate("/AdminNotice");
      return;
    }

    setNotice(foundNotice);
  }, [navigate, noticeId]);

  const handleDeleteNotice = () => {
    // 기존 백 API 연동 코드
    /*
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
    */

    alert("아카이빙 버전에서는 공지 삭제가 실제로 저장되지 않습니다.");
    setModalType(null);
    navigate("/AdminNotice");
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

  return (
    <>
      <S.Page>
        <S.Content>
          <S.FixedTopArea>
            <S.Title>{notice.title}</S.Title>

            <S.ImageScrollArea>
              {(notice.imageUrls ?? []).map((imageUrl, index) => (
                <S.ImageBox key={`${imageUrl}-${index}`}>
                  <img src={imageUrl} alt={`공지 이미지 ${index + 1}`} />
                </S.ImageBox>
              ))}
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
