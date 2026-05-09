import Onboarding from "../components/Home/OnBoarding";
import { useNavigate } from "react-router-dom";

export default function OnBoardingPage() {
  const navigate = useNavigate();

  return (
    <Onboarding
      onClose={() => navigate("/")}
    />
  );
}