import { createSelector } from 'reselect';
import { get, filter , sortBy} from 'lodash';

export const getUiSelector = state => get(state, 'ui',null);

export const getCustomer = createSelector([getUiSelector], uiSelector =>
  get(uiSelector, 'customer',null),
);

export const getSearchFilterOptions = createSelector([getCustomer], customer => 
   get(customer, 'searchfilter',null),
);
export const getSortFilterOptions = createSelector([getCustomer], customer => 
   get(customer, 'sortFilter',null),
);
export const getList = createSelector([getCustomer], customer=> {
    var originalList = get(customer,'list',null );
    console.log('original list is ****** ', originalList);
    return originalList;
 },
);
export const getFilteredList = createSelector([getSearchFilterOptions, getSortFilterOptions, getList],(searchFilter, sortFilter, list)  => {
    console.log('original list is ', list);
    const filteredList = searchFilter? filter( list,  {accountType: searchFilter }): list;
    console.log('sort filter is', sortFilter)
    const sortedList = sortBy(filteredList,[sortFilter ==="T" || !sortFilter? 'accountType':'accountName']);
    return sortedList;
 },
);