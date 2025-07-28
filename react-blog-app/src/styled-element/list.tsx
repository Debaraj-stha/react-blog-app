import styled, { css } from "styled-components";

type StyledNavProps = {
  padding?: string;
  hoverBg?: string;
  lineBg?: string;
  margin?: string;
  textColor?: string;
  setWidth?: boolean
}

export const StyledNavLi = styled.li.withConfig({ shouldForwardProp: (props) => !['hoverBg', 'lineBg', 'textColor'].includes(props) }) <StyledNavProps>`
padding:${({ padding }) => padding || "0px 10px"};
list-style:none;
transition:0.3s all;
border-radius:10px;
align-content:center;
position:relative;
max-height:50px;
margin:${({ margin }) => margin || "5px 0px"};
a {
  color: ${({ textColor }) => textColor || ""};
   display: inline-block;
}



&:hover{
    transform:translateX(5px);
    background-color:${({ hoverBg }) => hoverBg || "#ddd"};
}
&::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 0;
    background: ${({ lineBg }) => lineBg || "blue"};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }
&:hover:after {
  width: 100%;
}

@media screen and (max-width: 768px) {
    font-size:12px;
    padding:0;
    
 }
 ${({ setWidth }) => setWidth && css`
  @media screen and (max-width: 768px) {
    a {
      width: 100%;
      display: block;
    }
  }
`}



`