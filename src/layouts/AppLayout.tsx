import { useNavigate } from "react-router-dom";

import Header from "../components/Common/Header";
import NavBar from "../components/Common/NavBar";

import * as S from "./AppLayout.style";

type Tab = "home" | "schedule" | "livetalk" | "notice";

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNavBar?: boolean;
  activeTab?: Tab;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function AppLayout({
  title,
  subtitle,
  showBackButton = false,
  showNavBar = true,
  activeTab = "home",
  children,
}: AppLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <S.Container>
      <S.HeaderWrapper>
        <Header
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
          onBack={handleBack}
        />
      </S.HeaderWrapper>

      <S.Main $showNavBar={showNavBar}>{children}</S.Main>

      {showNavBar && (
        <S.NavWrapper>
          <NavBar activeTab={activeTab} />
        </S.NavWrapper>
      )}
    </S.Container>
  );
}
