import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Divider, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface SidebarProps {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  pages: Array<{ number: number, title: string }>;
  setPageNumber: (pageNumber: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, handleDrawerClose, pages, setPageNumber }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          height: '100%',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 8px', ...theme.mixins.toolbar }}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem button key={page.number} onClick={() => setPageNumber(page.number)}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
