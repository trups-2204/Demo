import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledHeaderPanel = styled.div`
 display: flex;

`;
export const StyledHeaderTitle = styled.h1`
flex-grow: 1;

`;

export const StyledSortPanel = styled.div`
display: flex;

`;
export const StyledSortCollectionPanel = styled.div`
display: flex;
flex-direction: column;

`;

const StyledLink = styled.nav`
    display: flex;
    background-color: gray;
    flex-shrink: 0;

  
`;

export const PageHeader = ({
  onFilterSelect,
  onSortSelect,
}) =>
(    <StyledLink>

  <StyledHeaderTitle>Customer Account</StyledHeaderTitle>

  <StyledSortPanel>

    <StyledSortCollectionPanel>
      <label>Filter by:</label>
      <select onClick={onFilterSelect}>
        <option value="All">All Accounts</option>
        <option value="CRA">Credit Card Accounts</option>
        <option value="SAV">Saving Accounts</option>
        <option value="LIS">Loan Accounts</option>


      </select>
    </StyledSortCollectionPanel>

    <StyledSortCollectionPanel>
      <label>Sort by:</label>
      <select onClick={onSortSelect}>
        <option value="">-- Select -- </option>
        <option value="N"> Account Name</option>
        <option value="T"> Account Type</option>

      </select>
    </StyledSortCollectionPanel>

  </StyledSortPanel>

</StyledLink>

 );
PageHeader.propTypes ={
  onFilterSelect: PropTypes.func.isRequired,
  onSortSelect: PropTypes.func.isRequired,
}
export default PageHeader;