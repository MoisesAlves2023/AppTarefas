import styled from 'styled-components/native';

const TouchableOpacity = styled.TouchableOpacity`
   align-items: center;
   justify-content: center;
   margin-bottom: 5px;
   margin-top: 5px;
`;
const TouchableOpacityPrimary = styled.TouchableOpacity`
   width: 40%;
   height: 50px;
   background-color: #98FB98;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   margin-bottom: 5px;
   margin-top: 5px;
`;
const TouchableOpacitySecondary = styled.TouchableOpacity`
   padding: 10px;
   width: 40%;
   height: 50px;
   background-color: #FF6347;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   margin-bottom: 5px;
   margin-top: 5px;
`;

export { TouchableOpacity, TouchableOpacitySecondary, TouchableOpacityPrimary }