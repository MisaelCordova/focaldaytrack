import styled from "styled-components";

export const _Page = styled.div`
  min-width: 100vw;
  width: max-content;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.pageBackground};
  transition: background-color 0.2s ease, color 0.2s ease;
`;
