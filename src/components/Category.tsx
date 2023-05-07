import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  imageURL: any;
  rating: {
    rate: number;
    count: number;
  };
}

export const Category = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);

  async function fetchCategoryProducts() {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const products = await Promise.all(
        response.data?.map(async (data: IProduct) => {
          const image = await fetch(data.image);
          const blob = await image.blob();
          const imageUrl = URL.createObjectURL(blob);
          return { ...data, imageURL: imageUrl };
        })
      );
      setProducts(products);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h1" align="center">
          {category}
        </Typography>
      </Grid>

      {products?.map((product: IProduct) => {
        return (
          <Grid item xs={12} sm={12} md={12} lg={12} key={product.id}>
            <Card
              onClick={() =>
                navigate(`product/${product.id}`, { state: product })
              }
            >
              <img src={product?.image} />
              {/* <CardMedia
                // src={product.image}
                image={product.image}
                style={{ height: 1000 }}
                title={product.title}
              /> */}
              <CardContent>
                <Typography variant="h5">{product?.title}</Typography>
                <Typography variant="h6">{`Price: $${product?.price}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
