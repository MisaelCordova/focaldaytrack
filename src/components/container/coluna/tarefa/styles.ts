import styled from "styled-components";

export const _CardTarefa = styled.div`
    display: flex;
    flex-direction: column;
    
    gap: 5px;
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0px 0px 2px 1px ${({ theme }) => theme.colors.shadow};
    color: ${({ theme }) => theme.colors.textPrimary};
    max-height: fit-content;
    touch-action: none;

    &[data-dragging="true"] {
        opacity: 0.6;
    }

    &:hover button,
    &:focus-within button {
        opacity: 1;
        pointer-events: auto;
    }
`
export const _HeaderCard = styled.div`
    display: flex;
    align-items: center;
`;
export const _Texto = styled.textarea`
    resize: none;
    min-height: 30px;
    height: auto;
    width: 100%;
    padding: 8px;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: transparent;

    &:focus {
        outline:none;
        
    }
`

export const _DeleteButton = styled.button`
    display: flex;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.dangerText};
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, background-color 0.2s ease;

    &:hover,
    &:focus-visible {
        background-color: ${({ theme }) => theme.colors.surfaceMuted};
        opacity: 1;
        pointer-events: auto;
    }

    svg {
        width: 16px;
        height: 16px;
    }
`
