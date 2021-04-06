import React from "react";
import styled from 'styled-components';

export const StyledFooter = styled.footer`
position: fixed;
left: 0;
bottom: 0;
width: 100%;
background-color: gray;
color: white;

`;

function PageFooter() {
  return (
    <StyledFooter>Test Footer</StyledFooter>

  );
}

export default PageFooter;
