import styled from "styled-components";

export const _Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.overlay};
`;

export const _Modal = styled.div`
    display: flex;
    width: min(100%, 420px);
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
`;

export const _Title = styled.h2`
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 20px;
    font-weight: 700;
`;

export const _Description = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    line-height: 1.5;
`;

export const _Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const _CancelButton = styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.surface};
    font-weight: 600;
`;

export const _ConfirmButton = styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    color: #ffffff;
    background-color: ${({ theme }) => theme.colors.danger};
    font-weight: 600;
`;
