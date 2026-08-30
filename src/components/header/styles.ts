import styled from "styled-components";

export const _Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    width: 100%;
`
export const _TextoHeader = styled.div`

`
export const _TextoData = styled.h3`
    font-weight: 400;
    letter-spacing: 0.1cap;
    text-transform: uppercase;
` 

export const _TextoSaudacao = styled.h1`
     font-weight: 500;
` 

export const _HeaderActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
`

export const _ThemeControl = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const _ThemeLabel = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
`

export const _ThemeToggle = styled.button<{ $ativo: boolean }>`
    position: relative;
    width: 52px;
    height: 28px;
    padding: 3px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ $ativo, theme }) =>
        $ativo ? theme.colors.primary : theme.colors.surfaceMuted};
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover,
    &:focus-visible {
        border-color: ${({ theme }) => theme.colors.borderAccent};
    }
`

export const _ThemeToggleThumb = styled.span`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 1px 4px ${({ theme }) => theme.colors.shadow};
    transform: translateX(0);
    transition: transform 0.2s ease;

    ${_ThemeToggle}[aria-pressed="true"] & {
        transform: translateX(24px);
    }
`
