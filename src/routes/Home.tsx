import { trackEvent } from "../utils/analytics";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "../styles/Home.style";

import Megaphone from "../assets/home/Home_Icon_Megaphone.svg";
import SideClick from "../assets/home/Home_Icon_ChevronRight.svg";
import InstaIcon from "../assets/home/Home_Icon_InstagramLogo.svg";
import ThumbIcon from "../assets/home/Home_Icon_ThumbsUp.svg";
import NetworkIcon from "../assets/home/Home_Icon_ShareNetwork.svg";
import DresscodeIcon from "../assets/home/Home_Icon_Dresscode.svg";
import GoodsIcon from "../assets/home/Home_Icon_Gift.svg";

import Artist from "../assets/home/Home_Artist.svg";
import Foodtruck from "../assets/home/Home_FoodTruck.svg";
import Booth from "../assets/home/Home_Booth.svg";

import Bg1 from "../assets/home/Home_Deco_Bg1.svg";
import Bg2 from "../assets/home/Home_Deco_Bg2.svg";
import Bg3 from "../assets/home/Home_Deco_Bg3.svg";
import Camera from "../assets/home/Home_Deco_Camera.svg";
// import FlowerBtn1 from "../assets/home/Home_Deco_FlowerBtn1.svg";
// import FlowerBtn2 from "../assets/home/Home_Deco_FlowerBtn2.svg";
import FlowerBtn1 from "../assets/home/Home_Deco_Flowerbtn1.svg";
import FlowerBtn2 from "../assets/home/Home_Deco_Flowerbtn2.svg";
import Icecream1 from "../assets/home/Home_Deco_Icecream1.svg";
import Icecream2 from "../assets/home/Home_Deco_Icecream2.svg";
import Churros from "../assets/home/Home_Deco_Churros.svg";
import Keyring from "../assets/home/Home_Deco_Keyring.svg";
import Bracelet from "../assets/home/Home_Deco_Bracelet.svg";

import Banner from "../components/Home/Banner";
import OnBoarding from "../components/Home/OnBoarding";

export default function Home() {
  // const urgentNotice = "(긴급) 하현상 무대 시간 지연 공지";
  // 개발용 테스트 코드 입니다.

  const [urgentNotice, setUrgentNotice] = useState<string | null>(null);
  const [urgentId, setUrgentId] = useState<number | null>(null);

  const [showOnBoarding, setShowOnBoarding] = useState<boolean>(() => {
    return localStorage.getItem("hasSeenOnboarding_v2") === null;
  });

  const handleCloseOnBoarding = () => {
    localStorage.setItem("hasSeenOnboarding_v2", "true");
    setShowOnBoarding(false);
  };

  const [toastOpen, setToastOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showToast = () => {
    setToastOpen(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setToastOpen(false);
    }, 2000); // 2초
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "2026 <청춘>",
          text: "지금 바로 접속해 청춘을 즐겨보세요!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast();
      }
    } catch {
      console.log("공유 취소 또는 실패");
    }
  };

  useEffect(() => {
    const fetchUrgentNotice = async () => {

      const BaseUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await fetch(
          `${BaseUrl}/api/notices/urgent`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.isSuccess && data.result) {
          setUrgentNotice(data.result.title);
          setUrgentId(data.result.id);
        } else {
          setUrgentNotice(null); // 긴급공지 없음
        }
      } catch (error) {
        console.error("긴급공지 조회 실패:", error);
      }
    };

    fetchUrgentNotice();
  }, []);

  useEffect(() => {
    const container = document.querySelector(
      "[data-app-container]"
    ) as HTMLElement;

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, []);

  const navigate = useNavigate();

  return (
    <S.Wrapper>
      {showOnBoarding && <OnBoarding onClose={handleCloseOnBoarding} />}
      <S.BackgroundBubble>
        <S.Background>
          <S.BannerBox>
            <Banner isPaused={showOnBoarding}></Banner>
          </S.BannerBox>
          {urgentNotice && urgentId && (
              <S.UrgentNoticeBox href={`/notice/${urgentId}`}>
                <S.UrgentNotice>
                  <S.UrgentNoticeIcon src={Megaphone} />
                  <S.UrgentNoticeContent>
                    {urgentNotice}
                  </S.UrgentNoticeContent>
                </S.UrgentNotice>
                <S.SideClick src={SideClick} />
              </S.UrgentNoticeBox>
            )}
          <S.ContentBigBox>
            <S.ContentBox>
              <S.ArtistNameTag
                href="/artist"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "artist" })
                }
              >
                <S.NameTagTitle>아티스트</S.NameTagTitle>
                <S.NameTagTitleEng>Artist</S.NameTagTitleEng>
              </S.ArtistNameTag>
              <S.ArtistBtn
                href="/artist"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "artist" })
                }
              >
                <S.PolaroidBtnImg src={Artist}></S.PolaroidBtnImg>
              </S.ArtistBtn>
              <S.BgImg1 src={Bg1} />
              <S.FoodtruckNameTag
                href="/foodtruck"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "foodtruck" })
                }
              >
                <S.NameTagTitle>푸드트럭</S.NameTagTitle>
                <S.NameTagTitleEng>Food Truck</S.NameTagTitleEng>
              </S.FoodtruckNameTag>
              <S.FoodtruckBtn
                href="/foodtruck"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "foodtruck" })
                }
              >
                <S.PolaroidBtnImg src={Foodtruck}></S.PolaroidBtnImg>
              </S.FoodtruckBtn>
              <S.BgImg2 src={Bg2} />
              <S.BoothNameTag
                href="/booth"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "booth" })
                }
              >
                <S.NameTagTitle>부스</S.NameTagTitle>
                <S.NameTagTitleEng>Booth</S.NameTagTitleEng>
              </S.BoothNameTag>
              <S.BoothBtn
                href="/booth"
                onClick={() =>
                  trackEvent("home_section_click", { section_name: "booth" })
                }
              >
                <S.PolaroidBtnImg src={Booth}></S.PolaroidBtnImg>
              </S.BoothBtn>
              <S.BgImg3 src={Bg3} />
              <S.Camera
                src={Camera}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "artist" });
                  navigate("/artist");
                }}
              />
              <S.FlowerBtn1
                src={FlowerBtn1}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "booth" });
                  navigate("/booth");
                }}
              />
              <S.FlowerBtn2
                src={FlowerBtn2}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "booth" });
                  navigate("/booth");
                }}
              />
              <S.Icecream1
                src={Icecream1}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "foodtruck" });
                  navigate("/foodtruck");
                }}
              />
              <S.Icecream2
                src={Icecream2}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "foodtruck" });
                  navigate("/foodtruck");
                }}
              />
              <S.Churros
                src={Churros}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "foodtruck" });
                  navigate("/foodtruck");
                }}
              />
              <S.Keyring
                src={Keyring}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "booth" });
                  navigate("/booth");
                }}
              />
              <S.Bracelet
                src={Bracelet}
                onClick={() => {
                  trackEvent("home_section_click", { section_name: "booth" });
                  navigate("/booth");
                }}
              />
            </S.ContentBox>
            <S.Contentguide>사진을 클릭하면 해당 페이지로 이동할 수 있어요</S.Contentguide>
          </S.ContentBigBox>
          <S.StudentCouncilBox>
            <S.StudentBtn href="/notice/1">
              <S.BtnIcon src={DresscodeIcon}></S.BtnIcon>
              <S.BtnTitle>드레스코드</S.BtnTitle>
            </S.StudentBtn>
            <S.StudentBtn href="/notice/2">
              <S.BtnIcon src={GoodsIcon}></S.BtnIcon>
              <S.BtnTitle>총학 굿즈</S.BtnTitle>
            </S.StudentBtn>
          </S.StudentCouncilBox>
        </S.Background>
      </S.BackgroundBubble>
      <S.Footer>
        <S.AllLinkBox>
          <S.LinkBox target="_blank" onClick={handleShare}>
            <S.LinkIcon src={NetworkIcon}></S.LinkIcon>
            <S.Link>웹사이트 공유하기</S.Link>
          </S.LinkBox>
          <S.LinkBox
            href="https://www.instagram.com/dswu_stdcouncil42?igsh=MW96dXJtaDhiMG16NQ=="
            target="_blank"
          >
            <S.LinkIcon src={InstaIcon}></S.LinkIcon>
            <S.Link>총학생회 인스타그램</S.Link>
          </S.LinkBox>
          <S.LinkBox
            href="https://www.instagram.com/likelion_ds?igsh=ZDBiYjBzZ2h3bW96"
            target="_blank"
          >
            <S.LinkIcon src={InstaIcon}></S.LinkIcon>
            <S.Link>덕성멋사 인스타그램</S.Link>
          </S.LinkBox>
          <S.LinkBox href="https://forms.gle/dtNFvpZDCngbTxA47" target="_blank">
            <S.LinkIcon src={ThumbIcon}></S.LinkIcon>
            <S.Link>웹사이트 의견 남기기</S.Link>
          </S.LinkBox>
        </S.AllLinkBox>
        <S.LikeLion>
          <S.LikeLionTitle>2026 근화제 &lt;청춘&gt; 멋쟁이사자처럼 X 여정</S.LikeLionTitle>
          <S.LikeLionMemberBox>
            <S.LikeLionMemberLine>
              <S.LikeLionPart>기획·디자인</S.LikeLionPart>
              <S.LikeLionMember>
                <S.LikeLionText>손지수</S.LikeLionText>
                <S.LikeLionText>이규빈</S.LikeLionText>
              </S.LikeLionMember>
            </S.LikeLionMemberLine>
            <S.LikeLionMemberLine>
              <S.LikeLionPart>프론트엔드</S.LikeLionPart>
              <S.LikeLionMember>
                <S.LikeLionText>김예나</S.LikeLionText>
                <S.LikeLionText>양서윤</S.LikeLionText>
                <S.LikeLionText>이소라</S.LikeLionText>
                <S.LikeLionText>최솔</S.LikeLionText>
                <S.LikeLionText>허윤아</S.LikeLionText>
              </S.LikeLionMember>
            </S.LikeLionMemberLine>
            <S.LikeLionMemberLine>
              <S.LikeLionPart>백엔드</S.LikeLionPart>
              <S.LikeLionMember>
                <S.LikeLionText>고유빈</S.LikeLionText>
                <S.LikeLionText>김나은</S.LikeLionText>
                <S.LikeLionText>유수빈</S.LikeLionText>
                <S.LikeLionText>이수진</S.LikeLionText>
                <S.LikeLionText>이유민</S.LikeLionText>
              </S.LikeLionMember>
            </S.LikeLionMemberLine>
            <S.LikeLionSpecialLine>
              <S.LikeLionText>Special Thanks To</S.LikeLionText>
              <S.LikeLionText>문화인류학전공 UX 학회 만유인력</S.LikeLionText>
            </S.LikeLionSpecialLine>
          </S.LikeLionMemberBox>
        </S.LikeLion>
      </S.Footer>
      {toastOpen && <S.Toast>링크가 복사되었습니다!</S.Toast>}
    </S.Wrapper>
  );
}
