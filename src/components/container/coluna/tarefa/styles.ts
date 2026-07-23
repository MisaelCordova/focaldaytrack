import styled from "styled-components";

export const _CardTarefa = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0px 0px 2px 1px  #e2e8f0;
    max-height: fit-content;
    touch-action: none;

    &[data-dragging="true"] {
        opacity: 0.6;
    }
`
export const _Texto = styled.textarea`
    resize: none;
    min-height: 30px;
    height: auto;
    width: 100%;
    padding: 8px;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    &:focus {
        outline:none;
        
    }
`
