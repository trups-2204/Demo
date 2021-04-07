import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { actions as listActions} from '../redux/modules/customerList.module';
import PageHeader from '../components/common/Header';
import PageFooter from '../components/common/Footer';

export const StyledPanel = styled.article`
min-height: 100%;
display: flex;
flex-direction: column;
align-items: stretch;
`;

 class MasterLayout extends React.Component{

    static propTypes ={
        children: PropTypes.node.isRequired,
        setSearchFilter: PropTypes.func.isRequired,
        setSortFilter: PropTypes.func.isRequired,

    };

    onFilterSelectAction = (event) =>{
        const filterValue = event.target.value;
        console.log('Filter is ****', filterValue);
        console.log(this.props);
        const { setSearchFilter } = this.props;
        setSearchFilter(filterValue);

    };
    onSortSelectAction = (event) =>{
        const filterValue = event.target.value;
        console.log('Filter is ****', filterValue);
        console.log(this.props);
        const { setSortFilter } = this.props;
        setSortFilter(filterValue);

    };
    render(){
        const { children }= this.props;
     
        return(
            <StyledPanel>
                <PageHeader onFilterSelect = {this.onFilterSelectAction} onSortSelect = {this.onSortSelectAction} />
                <>
                  {children}
                </>
               <PageFooter/>
            </StyledPanel>
        );
    }

   


}

const mapStateToProps = state => ({
});

const mapDispatchToProps ={
    setSearchFilter: listActions.header.setSearchFilter,
    setSortFilter: listActions.header.setSortFilter
};

const enhance = compose ( connect(mapStateToProps, mapDispatchToProps));

export default enhance(MasterLayout);

