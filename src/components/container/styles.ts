import styled from "styled-components";

export const _Container = styled.main`
    display: flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.surface};
    padding: 20px;
    gap: 10px;
    min-width: 100%;
    width: max-content;
    min-height: calc(100vh - 130px);
`

