import { useState } from "react";
import * as S from "../../styles/NoticeComponent.style";

import chevronDown from "../../assets/Notice/ChevronDown.svg";
import chevronUp from "../../assets/Notice/ChevronUp.svg";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Item>
      <S.QuestionButton type="button" onClick={handleToggle}>
        <S.QuestionText>
          <S.QuestionPrefix>Q.</S.QuestionPrefix>
          <S.QuestionContent>{question}</S.QuestionContent>
        </S.QuestionText>
        <img src={isOpen ? chevronUp : chevronDown} alt="arrow" />
      </S.QuestionButton>

      {isOpen && (
        <S.AnswerBox>
          <S.AnswerText>A. {answer}</S.AnswerText>
        </S.AnswerBox>
      )}
    </S.Item>
  );
}
