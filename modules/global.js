/* =============================
constants
============================== */
export const FETCHSTATE = 'global/FETCHSTATE';


/* =============================
Action creators
============================== */
export const isFetching = (isFetching) => ({
    action: FETCHSTATE,
    isFetching,
});


/* =============================
Reducer
============================== */
const initialState = {
    isFetching: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    
    case FETCHSTATE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
        });

    default: return state;
    }
};

export default reducer;
