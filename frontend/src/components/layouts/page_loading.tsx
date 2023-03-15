import { CircularProgress, styled } from '@mui/material';

const iconSize = '20px';

const StyledCircularProgress = styled(CircularProgress)({
  center: {
    position: 'absolute',
    left: `calc(50vw - ${iconSize})`,
    top: `calc(50vh - ${iconSize})`,
  },
});

export const PageLoading = (): JSX.Element => {
  return <StyledCircularProgress />;
};

export default PageLoading;
