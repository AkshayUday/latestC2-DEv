/* ------------------- */
/*    Redux reducer    */
/* ------------------- */

const initialState = {
  isActive:false
};

const  SpinnerReducer = (state = initialState, action = {}) => {
  

  switch (action.type) {
      case 'ACTIVATE':
      return {
        ...state,
        isActive: true
      };
      case 'DEACTIVATE':
      return {
        ...state,
        isActive: false
      };

    default:
      return state;
  }
}

export default SpinnerReducer;
