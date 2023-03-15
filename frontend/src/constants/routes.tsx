import React from 'react';
import * as Containers from '../containers';

export type Route = {
  /** パス */
  path: string;
  /** コンテナ */
  container: React.FC<any>;
};

export const privateRoutes: Route[] = [{ path: '/', container: Containers.ViewerPage }];

export const publicRoutes: Route[] = [
  {
    path: '/login',
    container: Containers.LoginPage,
  },
  {
    path: '/*',
    container: Containers.NotFoundPage,
  },
];
