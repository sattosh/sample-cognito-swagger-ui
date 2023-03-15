import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  paddingLeft: theme.spacing(2),
}));

export type FieldErrorMessageProps<T> = {
  /** 表示するエラーメッセージ */
  message?: T;
  /** スタイル指定 */
  style?: string;
};

/** 入力欄にエラーメッセージを表示するコンポーネント */
export const FieldErrorMessage = <T extends React.ReactNode>(props: FieldErrorMessageProps<T>): JSX.Element => {
  const { message, style } = props;
  if (!message) {
    return <></>;
  }

  return (
    <ErrorMessage variant="body2" className={style}>
      {message}
    </ErrorMessage>
  );
};

export type FieldErrorsNameProps = {
  /** inputのname */
  name?: string;
  /** react-hook-formのエラーオブジェクト */
  errors?: FieldErrors;
  /** スタイル指定 */
  style?: string;
};

/** react-hook-formのエラーオブジェクトからエラーメッセージを表示する */
export const FieldErrorsName = (props: FieldErrorsNameProps): JSX.Element => {
  const { name, errors, style } = props;

  if (!name || !errors) return <></>;

  return <FieldErrorMessage message={errors[name] as React.ReactNode} style={style} />;
};

export default FieldErrorMessage;
