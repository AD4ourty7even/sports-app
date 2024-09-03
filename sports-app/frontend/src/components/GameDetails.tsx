import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { participantType } from '../types';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  participants : participantType[]
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, participants } = props;

  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Participants Details</DialogTitle>
      <List sx={{ pt: 0, px: 2 }}>
        {participants.map((participant) => (
          <ListItem disableGutters key={participant.userId} className='flex justify-between gap-2 min-w-[200px]'>
              {/* <ListItemAvatar className="w-6">
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar> */}
              <ListItemText primary={participant.name} className="capitalize"/>
              <ListItemText primary={participant.phone} className="text-right"/>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function GameDetails({participants}: {
  participants: participantType[]
}) {
  const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br /> */}
      <Button variant="contained" onClick={handleClickOpen}>
        Get Game Details
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
        participants = {participants}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
