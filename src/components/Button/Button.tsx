import type { JSX, ReactNode } from "react";
import * as S from "./styles";
import type { CSSProperties } from "styled-components";

interface IButtonsProps {
  text?: string;
  icone?: JSX.Element | ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}
export const Button = (props: IButtonsProps) => {
  return (
    <S._Button type="button" onClick={props.onClick} style={props.style}>
      {props.icone && props.icone}
      {props.text}
    </S._Button>
  );
};
