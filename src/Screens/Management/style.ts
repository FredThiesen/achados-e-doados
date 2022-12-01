import styled from "styled-components";
import colors from "../../Constants/colors";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
`
export const Title= styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
`
export const Column = styled.td`
    padding: 0.5rem;
    font-size: 1.5em;
    
`

export const ColumnHeader = styled.th`
    padding: 0.5rem;
    font-size:2em;
    font-weight: 'bold'; 
    text-align: left;
    border-bottom: 1px solid white;
    
`
export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: ${colors.background};
    width: 45%;
    height:400px;
    border-radius: 10px;
    margin: 0px 20px;
`
export const List= styled.ul`
    list-style: none;
    padding: 0;
    margin: 10px 0px;

`
export const ListItem = styled.li`
    color: ${colors.black};
    display: flex;
    align-items:center;
    width: 100%;
`