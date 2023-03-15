import { Container, Paper, Grid, Button } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, InputText } from '../components/form';

type LoginProps = {
  username: string;
  password: string;
};

const defaultValues = {
  username: '',
  password: '',
};

export const LoginPage = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = (location.state as { from: Location }) || { from: { pathname: '/' } };

  const form = useForm<LoginProps>({ defaultValues });
  const { handleSubmit } = form;

  const onSubmit = async (value: LoginProps) => {
    const { password, username } = value;
    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.completeNewPassword(user, password, {});
      }
      navigate(from, { replace: true });
    } catch (e) {
      console.log('loginError', e);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Grid container>
          <Grid item md={12} style={{ padding: 50 }}>
            <Form form={form} onSubmit={handleSubmit(onSubmit)}>
              <InputText textProps={{ name: 'username' }} id="outlined" inputProps={{ placeholder: 'id' }} />
              <InputText textProps={{ name: 'password' }} id="outlined" inputProps={{ placeholder: 'password' }} />
              <Button type="submit">{'ログイン'}</Button>
            </Form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
