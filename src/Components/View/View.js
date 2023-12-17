import styled from "styled-components/native";

const View = styled.View`
flex: 1;
padding: 5px;
justify-content: center;

`;
const ViewContainer = styled.View`
padding: 5px;
//justify-content: center;
border-width: 1px;
border-radius: 5px;

`;
const ViewCenter = styled.View`
align-items: center;
justify-content: center;
padding: 5px;

`;
const ViewRow = styled.View`
padding: 5px;
flex-direction: row;

`;

export {View, ViewCenter, ViewContainer, ViewRow};