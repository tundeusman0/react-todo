const initialState = {
  users: [],
  isLoading: false,
  adminError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_LOADING':
      return {
        ...state,
        isLoading: true,
        adminError: false
      };
    case 'ADMIN_LOADED':
      return {
        ...state,
        users: [...action.payload.users],
        isLoading: false,
        adminError: false
      };
    case 'ADMIN_ERROR':
      return {
        adminError: true
      };
    case 'ADMIN_DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.id),
        isLoading: false
      };
    default:
      return state;
  }
};
