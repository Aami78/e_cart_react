import { Grid, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { IProduct } from "./Category";

export const Product = () => {
  const location = useLocation();
  const product: IProduct = location.state;
  console.log(product);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <img src={product?.image} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">{product?.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{product?.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{`Price: $${product?.price}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{`Rate: ${product.rating.rate} Count: ${product.rating.count}`}</Typography>
      </Grid>
    </Grid>
  );
};
