import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    marginLeft:'40%'
  },
  pos: {
    marginBottom: 12,
  },
  media:{
      height:400,
  }
});

export default function LargeImageCard({message,image}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <CardMedia
          className={classes.media}
          image={`http://localhost:8080/${image}`}
          title="Contemplative Reptile"
        />
      </CardContent>
      <CardActions>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          {message}
        </Typography>
      </CardActions>
    </Card>
  );
}