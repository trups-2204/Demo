import { createSelector } from 'reselect';
import { get, filter } from 'lodash';

export const getUiSelector = state => get(state, 'ui',null);

export const getCustomer = createSelector([getUiSelector], uiSelector =>
  get(uiSelector, 'customer',null),
);

export const getListFilterOptions = createSelector([getCustomer], customer => 
   get(customer, 'filter',null),
);

export const getList = createSelector([getCustomer], customer=> {
    var originalList = get(customer,'list',null );
    console.log('original list is ****** ', originalList);
    return originalList;
 },
);
export const getFilteredList = createSelector([getListFilterOptions, getList],(filterVal, list)  => {
    console.log('original list is ', list);
    const filteredList = filter( list, {accountType: filterVal });
    return filteredList;
 },
);