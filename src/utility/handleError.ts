import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

interface IHandleError {
    error: any;
    enqueueSnackbar: (err: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
}

const handleError = ({ error, enqueueSnackbar }: IHandleError) => {
  if (!error?.response) return;
  const errorResponse = error?.response?.data?.errors || error?.response?.data;
  if (errorResponse?.length && Array.isArray(errorResponse)) {
    errorResponse.forEach((err: any) => {
      enqueueSnackbar(err.defaultMessage ? err.defaultMessage : err.error, {
        variant: 'error',
      });
    });
  } else {
    enqueueSnackbar(
      error?.response?.data?.defaultMessage
          || error?.response?.error
          || error?.response?.data?.message
          || 'サーバー側でエラーが発生しました。',
      { variant: 'error' },
    );
  }
};

export default handleError;
