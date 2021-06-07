import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DetailIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import BeforeAfterEventAccordion from 'components/BeforeAfterEventAccordion'

export default function DeleteArticleDialog({id}) {

  const [open, setOpen] = React.useState(false);
  const [singleReport, setSingleReport] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/report/${id}`)
        .then(res => {
            console.log(res.data);
            const reportData = res.data;
            setSingleReport(reportData);
            console.log(reportData.gms.name);
        })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={/*() => handleRemove(row.id)*/handleClickOpen}>
              <DetailIcon color="primary"/>
              </IconButton>
      <Dialog
        open={open}
        keepMounted
        maxWidth="md"
        
        fullWidth={true}
        
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`rapport du ${singleReport?.gms?.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Réaliser par le merchandiseur FOULEN
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {singleReport.id} */}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {singleReport?.gms?.name}//optional chaining */}
          </DialogContentText>
          {singleReport?.events?.map(val => {
            if(val.type=="BeforeAfter")
            return <BeforeAfterEventAccordion key={val.id} before={val.imageBefore} after={val.imageAfter} product={val.product.designation}/>;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}