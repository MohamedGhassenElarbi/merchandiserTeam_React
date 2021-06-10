import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DetailIcon from '@material-ui/icons/Visibility';
import api from 'api';
import BeforeAfterEventAccordion from 'components/BeforeAfterEventAccordion'
import NewProductEventAccordion from 'components/NewProductEventAccordion'
import ProductsVsCompetitorEventAccordion from 'components/ProductsVsCompetitorEventAccordion'
import PriceChangeEventAccordion from 'components/PriceChangeEventAccordion'
import ActionEventAccordion from 'components/ActionEventAccordion'
import PromotionEventAccordion from 'components/PromotionEventAccordion'
import RuptureEventAccordion from 'components/RuptureEventAccordion'
import CompetitorEventEventAccordion from 'components/CompetitorEventEventAccordion'


export default function DeleteArticleDialog({id}) {

  const [open, setOpen] = React.useState(false);
  const [singleReport, setSingleReport] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/report/${id}`)
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
            Réaliser par le merchandiseur {singleReport?.merchandiser?.name}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {singleReport.id} */}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {singleReport?.gms?.name}//optional chaining */}
          </DialogContentText>
          {singleReport?.events?.map(val => {
            if(val.type=="BeforeAfter"){
            return <BeforeAfterEventAccordion key={val.id} before={val.imageBefore} after={val.imageAfter} product={val.product.designation}/>;}
            if(val.type=="NewProduct"){
            return <NewProductEventAccordion key={val.id} image={val.imageProduct} product={val.product}/>; 
            }
            if(val.type=="ProductVsCompetitor"){
            return <ProductsVsCompetitorEventAccordion key={val.id} imageProduct={val.imageProduct} imageCompetitor={val.imageCompetitor} product={val.product.designation}competitor={val.competitor.name}/>; 
            }
            if(val.type=="Promotion"){
               return <PromotionEventAccordion key={val.id} product={val.product.designation} listOfPictures={val.images} startDate={val.startDate} endDate={val.endDate} oldPrice={val.oldPrice} newPrice={val.newPrice}/>; 
            }
            if(val.type=="PriceChange"){
              return <PriceChangeEventAccordion key={val.id} oldPrice={val.oldPrice} newPrice={val.newPrice} product={val.product.designation}/>; 
            }
            if(val.type=="Action"){
              return <ActionEventAccordion key={val.id} title={val.title} listOfPictures={val.images}product={val.product}/>; 
            }
            if(val.type=="Rupture"){
              return <RuptureEventAccordion key={val.id} image={val.image} products={val.products}/>; 
            }
            if(val.type=="CompetitorEvent"){
              return <CompetitorEventEventAccordion key={val.id} listOfPictures={val.images} competitor={val.competitor}/>; 
            }
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