import styled from "styled-components";

export const _Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.pageBackground};
  transition: background-color 0.2s ease, color 0.2s ease;
`;
