import styled from "styled-components";

export const _Totalizador = styled.div`
    display: flex;
    gap:10px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    padding: 10px;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.textMuted};
    background-color: ${({ theme }) => theme.colors.boardBackground};

    span {
        font-weight: bold;
    }
`
