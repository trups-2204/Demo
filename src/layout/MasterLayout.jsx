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
        setListFilter: PropTypes.func.isRequired,
    };

    onFilterSelectAction = (event) =>{
        const filterValue = event.target.value;
        console.log('Filter is ****', filterValue);
        console.log(this.props);
        const { setListFilter } = this.props;
        setListFilter(filterValue);

    };

    render(){
        const { children }= this.props;
     
        return(
            <StyledPanel>
                <PageHeader onFilterSelect = {this.onFilterSelectAction} />
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
    setListFilter: listActions.header.setListFilter
};

const enhance = compose ( connect(mapStateToProps, mapDispatchToProps));

export default enhance(MasterLayout);

