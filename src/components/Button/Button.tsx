import type { JSX, ReactNode } from "react";
import * as S from "./styles";
import type { CSSProperties } from "styled-components";

interface IButtonsProps {
  text?: string;
  icone?: JSX.Element | ReactNode;
  style?: CSSProperties;
  title?: string;
  ariaLabel?: string;
  onClick?: () => void;
}
export const Button = (props: IButtonsProps) => {
  return (
    <S._Button
      type="button"
      aria-label={props.ariaLabel ?? props.title}
      title={props.title}
      onClick={props.onClick}
      style={props.style}
    >
      {props.icone && props.icone}
      {props.text}
    </S._Button>
  );
};
