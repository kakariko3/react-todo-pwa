import { Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#3f51b5',
        position: 'fixed',
        bottom: 0,
      }}
    >
      copyright Demo
    </Box>
  );
};
