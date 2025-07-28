import styled from "styled-components";

export const H1=styled.h1.withConfig({shouldForwardProp:(props)=>!["align"].includes(props)})`

`