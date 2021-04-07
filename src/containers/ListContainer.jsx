import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import  {List} from '../components';
import { connect } from 'react-redux';
import { actions as listActions} from '../redux/modules/customerList.module';
import { getListFilterOptions, getFilteredList } from '../redux/selectors/uiListSelector';

export class ListContainer extends React.Component{

    static propTypes ={
        accountDetails: PropTypes.arrayOf(PropTypes.shape({
            accountName: PropTypes.string,
            currentBalance: PropTypes.number,
            accountType: PropTypes.string,
            isStaffUser: PropTypes.bool
        })).isRequired,
        filteredList:  PropTypes.arrayOf(PropTypes.shape({
            accountName: PropTypes.string,
            currentBalance: PropTypes.number,
            accountType: PropTypes.string,
            isStaffUser: PropTypes.bool
        })).isRequired,
        isStaffUser: PropTypes.bool.isRequired,
        createNewAccount: PropTypes.func.isRequired,
        selectedFilterVal: PropTypes.string.isRequired,
       setCustomerList: PropTypes.func.isRequired,
       getFilteredList: PropTypes.func.isRequired,

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
    setMockedList = () =>{
        const { accountDetails , setCustomerList, selectedFilterVal} = this.props;
        var list =  [
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
        ];

        if(!selectedFilterVal || accountDetails.length == 0)
          setCustomerList(list);


    }
    filterListWithSearchCriteria = () => {


    }

    componentDidMount() {
        console.log('component did mount called****');
        this.setMockedList();
    }

    render() {
        console.log(this.props);
        const { accountDetails, selectedFilterVal, filteredList }= this.props;
        var list = !selectedFilterVal || selectedFilterVal === "All" ? accountDetails : filteredList;
        return (
            <List accountDetails={list}/>
        );            
   }

 
}


const mapStateToProps = state => ({
    selectedFilterVal: getListFilterOptions(state),
    filteredList: getFilteredList(state),
});

const mapDispatchToProps ={
    setCustomerList: listActions.customer.setCustomerList,
};

const enhance = compose ( connect(mapStateToProps, mapDispatchToProps));

export default enhance(ListContainer);