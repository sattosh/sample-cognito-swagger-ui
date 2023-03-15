import React from 'react';
import { UseFormReturn, FormProvider as HookFormProvider, FieldValues } from 'react-hook-form';

export type FormProviderProps<T extends FieldValues> = {
  children: React.ReactNode;
  form: UseFormReturn<T>;
};

export const FormProvider = <T extends {}>(props: FormProviderProps<T>): JSX.Element => {
  const { form, children } = props;
  // eslint-disable-next-line
  return <HookFormProvider {...form}>{children}</HookFormProvider>;
};

export type FormProps<T extends FieldValues> = {
  children: React.ReactNode;
  form: UseFormReturn<T>;
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const Form = <T extends {}>(props: FormProps<T>): JSX.Element => {
  const { form, children, ...rest } = props;
  return (
    <FormProvider form={form}>
      {/* eslint-disable-next-line */}
      <form {...rest}>{children}</form>
    </FormProvider>
  );
};
