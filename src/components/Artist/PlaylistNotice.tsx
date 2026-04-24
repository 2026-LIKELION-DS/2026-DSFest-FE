import * as S from "../../styles/ArtistComponent.style";

import bubble1 from "../../assets/bubble01.svg";
import bubble2 from "../../assets/bubble02.svg";
import bubble3 from "../../assets/bubble03.svg";

function PlaylistNotice() {
  return (
    <S.PlaylistNotice>
      <img src={bubble1} className="bubble bubble1" />
      <img src={bubble2} className="bubble bubble2" />
      <img src={bubble3} className="bubble bubble3" />

      <S.NoticeTitle>
        플레이리스트에 <br />
        아티스트의 최애 영상을 넣어 추천해 보세요!
      </S.NoticeTitle>

      <S.NoticeList>
        <li>
          플레이리스트 추가하기 버튼을 눌러
          <br />
          유튜브 재생목록으로 이동합니다
        </li>
        <li>원하는 영상이나 노래를 등록합니다</li>
      </S.NoticeList>

      <S.NoticeCaption>
        *해당 아티스트와 무관한 영상은 무통보 삭제됩니다.
      </S.NoticeCaption>
    </S.PlaylistNotice>
  );
}

export default PlaylistNotice;
