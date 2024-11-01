import { Box, Modal, Typography, Button } from '@mui/material';
import React from 'react';

interface DeleteModalProps {
  open: boolean; // State to control the modal's visibility
  setOpen: (value: boolean) => void; // Function to set the modal open state
  action: () => Promise<void>; // Function to perform the delete action
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, setOpen, action }) => {
  const handleDelete = async () => {
    await action(); // Call the delete action
    setOpen(false); // Close the modal after the action
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} sx={{display:'flex',alignItems:'center'}} >
      <Box sx={{ 
          width: 600, 
          margin: 'auto', 
          paddingX: 4,
          paddingY : 2, 
          backgroundColor: 'white', 
          borderRadius: 2 
        }}>
        <Typography variant="h6">Confirm Deletion</Typography>
        <Typography sx={{ mt: 2 }}>Are you sure you want to deleteById</Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" type='primary' onClick={() => setOpen(false)} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
