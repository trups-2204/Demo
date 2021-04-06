import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import  {List} from '../components';
import { connect } from 'react-redux';

export class ListContainer extends React.Component{

    static propTypes ={
        accountDetails: PropTypes.arrayOf(PropTypes.shape({
            accountName: PropTypes.string,
            currentBalance: PropTypes.number,
            accountType: PropTypes.string,
            isStaffUser: PropTypes.bool
        })).isRequired,
        isStaffUser: PropTypes.bool.isRequired,
        createNewAccount: PropTypes.func.isRequired
    };

    static defaultProps ={
        accountDetails:[
            {
                accountName: 'CRA Account Name 1',
                currentBalance: 2000.23,
                accountType: 'CRA',
            },
            {
                accountName: 'CRA Account Name 2',
                currentBalance: 1000.23,
                accountType: 'CRA',
            },
            {
                accountName: 'SAV Account Name 1',
                currentBalance: 100000.23,
                accountType: 'SAV',
            },
            {
                accountName: 'Saving Account Name 2',
                currentBalance: 200000.23,
                accountType: 'SAV',
            },
            {
                accountName: 'Home Loan  Account Name 1',
                currentBalance: 600234.23,
                accountType: 'LIS',
            },
            {
                accountName: 'Home Loan Account Name 2',
                currentBalance: 600234.23,
                accountType: 'LIS',
            },
            {
                accountName: 'Car Loan Account Name 3',
                currentBalance: 600234.23,
                accountType: 'LIS',
            }
        ]
    };

    render(){
        const { accountDetails}= this.props;
        console.log(accountDetails);
        return (
            <List accountDetails={accountDetails}/>
        );
    }

 
}

const mapStateToProps = state =>({


});

const mapDispatchToProps ={

};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(ListContainer);