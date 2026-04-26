import * as S from "../styles/Home.style"

import InstaIcon from "../assets/home/Home_Icon_InstagramLogo.svg"
import ThumbIcon from "../assets/home/Home_Icon_ThumbsUp.svg"
import NetworkIcon from "../assets/home/Home_Icon_ShareNetwork.svg"

import Banner from "../components/Home/Banner"


export default function Home() {
  return (
    <S.Wrapper>
        <S.BackgroundBubble>
            <S.Background>
                <S.BannerBox>
                    <Banner></Banner>
                </S.BannerBox>
                <S.UrgentNoticeBox></S.UrgentNoticeBox>
                <S.ContentBox></S.ContentBox>
                <S.StudentCouncilBox></S.StudentCouncilBox>
            </S.Background>
        </S.BackgroundBubble>
        <S.Footer>
            <S.AllLinkBox>
                <S.LinkBox href="@" target="_blank">
                    <S.LinkIcon src={NetworkIcon}></S.LinkIcon>
                    <S.Link>웹사이트 공유하기</S.Link>
                </S.LinkBox>
                <S.LinkBox href="https://www.instagram.com/dswu_stdcouncil42?igsh=MW96dXJtaDhiMG16NQ==" target="_blank">
                    <S.LinkIcon src={InstaIcon}></S.LinkIcon>
                    <S.Link>총학생회 인스타그램</S.Link>
                </S.LinkBox>
                <S.LinkBox href="https://www.instagram.com/likelion_ds?igsh=ZDBiYjBzZ2h3bW96" target="_blank">
                    <S.LinkIcon src={InstaIcon}></S.LinkIcon>
                    <S.Link>덕성멋사 인스타그램</S.Link>
                </S.LinkBox>
                <S.LinkBox href="@" target="_blank">
                    <S.LinkIcon src={ThumbIcon}></S.LinkIcon>
                    <S.Link>웹사이트 의견 남기기</S.Link>
                </S.LinkBox>
            </S.AllLinkBox>
            <S.LikeLion>
                <S.LikeLionTitle>2026 근화제 웹사이트 멋사 X 여정</S.LikeLionTitle>
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
    </S.Wrapper>
  )
}
