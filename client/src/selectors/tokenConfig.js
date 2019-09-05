//  setup config/header and token
export default getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
