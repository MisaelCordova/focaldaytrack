import styled from "styled-components";

export const _Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: rgba(17, 24, 39, 0.45);
`;

export const _Modal = styled.div`
    display: flex;
    width: min(100%, 420px);
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
`;

export const _Title = styled.h2`
    color: #111827;
    font-size: 20px;
    font-weight: 700;
`;

export const _Description = styled.p`
    color: #475569;
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
    border: 1px solid #cbd5e1;
    color: #334155;
    background-color: #ffffff;
    font-weight: 600;
`;

export const _ConfirmButton = styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #dc2626;
    font-weight: 600;
`;
