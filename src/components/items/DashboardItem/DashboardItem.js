import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import style from './DashboardItem.module.css';
import cabinetImg from '../../../assets/cabinet.jpg';
import smartbagImg from '../../../assets/smartbag.jpg';

const DashboardItem = ({ link, header, content, img }) => {
  const typographyHeader = {
    color: '#4527A0',
    fontWeight: 'bold',
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: 460,
          margin: '0px 20px',
          position: 'relative',
        }}
      >
        <CardActionArea>
          <CardMedia
            component='img'
            height='280'
            image={img}
            alt='green iguana'
          />
          <CardContent>
            <Typography
              sx={typographyHeader}
              gutterBottom
              variant='h5'
              component='div'
            >
              {header}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ height: 100, position: 'absolute', bottom: '-20px' }}
        >
          <Link to={link} className={style.link}>
            <Button
              size='small'
              color='primary'
              sx={{ fontWeight: 'bold', fontSize: '16px' }}
            >
              CHI TIẾT
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default DashboardItem;
