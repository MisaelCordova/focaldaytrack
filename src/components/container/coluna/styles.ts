import styled from "styled-components"

export const _HeaderColuna = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 5px
`

export const _MenuButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: grab;
    touch-action: none;

    &:active {
        cursor: grabbing;
    }
`

export const _Coluna = styled.div`
    display : flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    min-width: 280px;
    width: 280px;
    flex-shrink: 0;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    border: 2px dashed ${({ theme }) => theme.colors.borderAccent};
    align-self: flex-start;

    &[data-dragging="true"] {
        opacity: 0.65;
        z-index: 1;
    }
`
export const _Titulo = styled.textarea`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-transform: uppercase;
    width: 100%;
    min-height: 36px;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 10px;
    font-weight: 700;
    text-align: justify;
    line-height: 20px;
    resize: none;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    
    &:focus {
        outline:none;
        border: 1px solid ${({ theme }) => theme.colors.border};
    }
`
