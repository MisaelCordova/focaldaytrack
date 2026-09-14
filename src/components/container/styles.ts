import styled from "styled-components";

export const _Container = styled.main`
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.surface};
    padding: 20px;
    gap: 10px;
    width: 100%;
    min-width: 0;
    min-height: 0;
    overflow-x: auto;
    overflow-y: auto;
`
