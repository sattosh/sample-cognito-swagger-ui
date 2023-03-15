import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import { PageLoading } from './page_loading';

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '27px',
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: '40px',
  letterSpacing: 'normal',
}));

const FlexColumn = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export type PageFrameProps = {
  /** ページタイトル */
  title: string | JSX.Element;
  /** flexのcolumn表示をするかどうか */
  column?: boolean;
  /** ルート要素に指定可能なスタイル */
  className?: string;
  /** ページ全体をローディング表示するかどうか */
  loading?: boolean;
  /**  */
  children: React.ReactNode;
};

/** ページタイトル */
export const PageTitle = (props: { title: PageFrameProps['title']; className?: string }): JSX.Element => {
  const { title, className } = props;
  return (
    <Title variant="h2" align="left" className={className}>
      {title}
    </Title>
  );
};

/** 管理画面のタイトルを表示できるページのレイアウト */
export const PageFrame: React.FC<PageFrameProps> = (props) => {
  const { title, children, className, column, loading } = props;
  const FrameBox = column ? FlexColumn : Box;

  if (loading) return <PageLoading />;

  return (
    <FrameBox className={className}>
      {typeof title === 'string' ? <PageTitle title={title} /> : title}
      {children}
    </FrameBox>
  );
};
