import React from 'react';
import { styled } from '@mui/material/styles';
import { Controller, UseControllerProps, FieldErrors, useFormContext } from 'react-hook-form';
import { FormControl, TextField, TextFieldProps, InputProps } from '@mui/material';
import { FieldErrorMessage, FieldErrorsName } from './field_error_message';

const StyledFormControl = styled(FormControl, { shouldForwardProp: (props) => props !== 'noPadding' })<{ noPadding: boolean }>(
  ({ theme, noPadding }) => ({
    minWidth: 120,
    width: '100%',
    padding: noPadding ? undefined : theme.spacing(0.5),
  })
);

const StyledTextField = styled(TextField, { shouldForwardProp: (props) => props !== 'noPadding' })<
  TextFieldProps & { noPadding: boolean }
>(({ theme, noPadding }) => ({
  minWidth: 120,
  width: '100%',
  padding: noPadding ? undefined : theme.spacing(0.5),
}));

export type InputTextProps = {
  /** エラーメッセージ */
  message?: string;
  /** inputのprops */
  textProps: TextFieldProps;
  /** バリデーションルール */
  rules?: UseControllerProps['rules'];
  /** スタイル定義 */
  classNames?: {
    formControl?: string;
    textField?: string;
  };
  /** input項目のvariant指定 */
  id?: 'filled' | 'standard' | 'outlined';
  /** デフォルト値 */
  defaultValue?: string;
  /** エラーオブジェクト. */
  errors?: FieldErrors;
  /** inputのtype項目 */
  type?: string;
  /** デフォルトで適用されるパディングを無効にするかどうか */
  noPadding?: boolean;
  /** TextFieldのInputProps */
  inputProps?: InputProps;
};

export const InputText = (props: InputTextProps): JSX.Element => {
  const { message, rules, textProps, id, defaultValue, errors, type, noPadding, inputProps } = props;
  const { classNames = {} } = props;

  const { control } = useFormContext();

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <StyledFormControl variant="filled" className={classNames.formControl} noPadding={!!noPadding}>
      <Controller
        render={({ field }) => (
          <StyledTextField
            {...textProps}
            {...field}
            noPadding={!!noPadding}
            variant={id || 'filled'}
            className={classNames.textField}
            type={type || 'text'}
            InputProps={inputProps}
          />
        )}
        name={textProps.name || ''}
        control={control}
        rules={rules}
        defaultValue={defaultValue || ''}
      />
      <FieldErrorMessage message={message} />
      <FieldErrorsName errors={errors} name={textProps.name} />
    </StyledFormControl>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};
