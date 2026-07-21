import type { JSX, ReactNode } from "react";
import * as S from "./styles";
import IconeAdd from "../../assets/iconeAdd.svg?react";
import type { CSSProperties } from "styled-components";

interface IButtonsProps {
  text?: string;
  icone?: JSX.Element | ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}
export const Button = (props: IButtonsProps) => {
  return (
    <S._Button onClick={props.onClick} style={props.style}>
      <IconeAdd />
      {props.text}
    </S._Button>
  );
};
