import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import  {List} from '../components';
import { connect } from 'react-redux';
import { actions as listActions} from '../redux/modules/customerList.module';
import { getSearchFilterOptions, getFilteredList, getSortFilterOptions } from '../redux/selectors/uiListSelector';

export class ListContainer extends React.Component{

    static propTypes ={
        accountDetails: PropTypes.arrayOf(PropTypes.shape({
            accountName: PropTypes.string,
            currentBalance: PropTypes.number,
            accountType: PropTypes.string,
            isStaffUser: PropTypes.bool
        })).isRequired,
        filteredList:  PropTypes.arrayOf(PropTypes.shape()).isRequired,
        isStaffUser: PropTypes.bool,
        selectedFilterVal: PropTypes.string.isRequired,
        selectedSortFilter: PropTypes.string.isRequired,

       setCustomerList: PropTypes.func,
       getFilteredList: PropTypes.func,

    };

    static defaultProps ={
        accountDetails:[
           
            {
                accountName: 'CRA Account Name 2',
                currentBalance: 1000.23,
                accountType: 'CRA',
                accountNumber: '11223344',

            },
            {
                accountName: 'SAV Account Name 1',
                currentBalance: 100000.23,
                accountType: 'SAV',
                accountNumber: '11223355',

            },
         
            {
                accountName: 'CRA Account Name 1',
                currentBalance: 2000.23,
                accountType: 'CRA',
                accountNumber: '112233556677',

            },
            {
                accountName: 'Home Loan  Account Name 1',
                currentBalance: 600234.23,
                accountType: 'LIS',
                accountNumber: '11223',

            },
            {
                accountName: 'Home Loan Account Name 2',
                currentBalance: 600234.23,
                accountType: 'LIS',
                accountNumber: '11123',

            },
            {
                accountName: 'Saving Account Name 2',
                currentBalance: 200000.23,
                accountType: 'SAV',
                accountNumber: '222222',

            },
            {
                accountName: 'Car Loan Account Name 3',
                currentBalance: 600234.23,
                accountType: 'LIS',
                accountNumber: '122222',

            }
        ]
    };
    setMockedList = () =>{
        const { accountDetails , setCustomerList, selectedFilterVal} = this.props;
          if(!selectedFilterVal)
          setCustomerList(accountDetails);


    }
    filterListWithSearchCriteria = () => {


    }

    componentDidMount() {
        console.log('component did mount called****');
        this.setMockedList();
    }

    render() {
        console.log(this.props);
        const { accountDetails, selectedFilterVal, filteredList, selectedSortFilter } = this.props;
        var list =  (selectedFilterVal === "All" ||  !selectedFilterVal ) && !selectedSortFilter ? accountDetails : filteredList;
        return (
            <List accountDetails={list}/>
        );            
   }

 
}


const mapStateToProps = state => ({
    selectedFilterVal: getSearchFilterOptions(state),
    filteredList: getFilteredList(state),
    selectedSortFilter: getSortFilterOptions(state),
});

const mapDispatchToProps ={
    setCustomerList: listActions.customer.setCustomerList,
};

const enhance = compose ( connect(mapStateToProps, mapDispatchToProps));

export default enhance(ListContainer);