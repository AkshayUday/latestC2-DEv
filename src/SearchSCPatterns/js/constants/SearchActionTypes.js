
const QUERY_OBJECT = { action: 'Search', data:{searchterms : 'type=AssessmentInstrument'}};
const SEARCH_TERM = '';

const genericSearch = '&text=value';

const sort_desc =  '&sort=http://schema.org/value,http://www.w3.org/ns/ldp%23Descending';

const sort_asc =  '&sort=http://schema.org/value,http://www.w3.org/ns/ldp%23Ascending';

const initial_paging_value = '&page=value';
const paging_max_count = '&max-member-count=value';


const filterType = {
    action: 'TaxonomicType',
    data : {}   
}

const actionTypes = {
	GET_GENERIC_SEARCH: genericSearch,
	GET_ALL: SEARCH_TERM,
	GET_SORT_ASC: sort_asc,
	GET_SORT_DESC: sort_desc,
	GET_FILTER_TYPE: filterType,
	GET_PAGE_INITAL : initial_paging_value,
	GET_PAGE_MAX : paging_max_count,
	QUERY_OBJECT : QUERY_OBJECT
}

module.exports = actionTypes;
