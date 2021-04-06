import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledList = styled.section`
border: 1px solid black;

`;
export const StyledRow = styled.a`
    width: 100%;
    display: flex;
    justify-content: space-between;


`;

export const StyledLeftColumn = styled.div`
width: 60%;
padding: 5px;

`;
export const StyledRightColumn = styled.div`
width: 20%;padding: 5px;


`;
export const StyledUnOrderedList = styled.ul`
list-style-type: none;
`;

export const List =({
    accountDetails,
    createNewAccountFn,

})=>(
    
    <StyledList>
        <StyledUnOrderedList>
            { accountDetails && accountDetails.map(account => ( <li>
        <StyledRow>

            <StyledLeftColumn>
                <h2>{account.accountName}</h2>
            </StyledLeftColumn>

            <StyledRightColumn>
                            {account.currentBalance}
            </StyledRightColumn>

            

        </StyledRow>
    </li>))}
   
</StyledUnOrderedList>   
      
    </StyledList>
);

List.propTypes ={
    accountDetails: PropTypes.arrayOf(PropTypes.shape({
        accountName: PropTypes.string,
        currentBalance: PropTypes.number,
        accountType: PropTypes.string,
        isStaffUser: PropTypes.bool
    })).isRequired,
    createNewAccountFn: PropTypes.func.isRequired,
};

export default List;