import { credentialActions } from '../slices/CredentialsSlice';

export const getCredentials = () => {
  return async (dispatch) => {
    try {
      // const credentials = await getAuthCredentials();
      dispatch(
        credentialActions.getCredentials({
          credentials: {},
          hasError: false,
        })
      );
    } catch (error) {
      dispatch(
        credentialActions.getCredentials({
          hasError: true,
          credentials: {},
        })
      );
      console.log('Get Credentials Error', error);
    }
  };
};
