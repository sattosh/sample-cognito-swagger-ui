import React from 'react';
import { PageFrame } from '../components/layouts';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

export const NotFoundPage = (): JSX.Element => {
  return (
    <PageFrame title={'404 NotFound'}>
      <Container maxWidth="sm">
        <Button to="/login" component={Link}>
          Topに戻る
        </Button>
      </Container>
    </PageFrame>
  );
};
