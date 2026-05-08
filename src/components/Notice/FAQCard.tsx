import { useRef, useState } from "react";
import * as S from "../../styles/NoticeComponent.style";

import chevronDown from "../../assets/Notice/ChevronDown.svg";
import chevronUp from "../../assets/Notice/ChevronUp.svg";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        window.setTimeout(() => {
          itemRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      }

      return next;
    });
  };

  return (
    <S.Item ref={itemRef}>
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
