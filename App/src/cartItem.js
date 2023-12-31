import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 100,
    width: '10%',
  }
}));

export default function CartItem(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.item.description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {(props.item.cost/100).toFixed(2)}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.item.imageUrl}
        title="product image"
      />
    </Card>
  );
}
