import styled from "styled-components"

export const _HeaderColuna = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px
`
export const _Coluna = styled.div`
    display : flex;
    flex-direction: column;
    background-color: #f6fafd;
    min-width: 280px;
    width: 280px;
    flex-shrink: 0;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    border: 2px dashed #8da9f0;
    align-self: flex-start;
`
export const _Titulo = styled.input`
    background-color: transparent;
    text-transform: uppercase;
    width: 100%;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 10px;
    font-weight: 700;
    
    &:focus {
        outline:none;
        border: 1px solid #e2e8f0;
    }
`
