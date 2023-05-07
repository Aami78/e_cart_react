// import { Card, CardContent, Grid, Typography } from "@material-ui/core";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export const Home = () => {
//   const [categories, setCategories] = useState<string[]>([]);

//   const navigate = useNavigate();

//   async function fetchCaategories() {
//     try {
//       const response = await axios.get(
//         "https://fakestoreapi.com/products/categories"
//       );
//       setCategories(response.data);
//     } catch (error) {
//       toast.error("Something Went Wrong");
//     }
//   }

//   useEffect(() => {
//     fetchCaategories();
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       <Grid xs={12}>
//         <Typography variant="h1" align="center">
//           Welcome
//         </Typography>
//       </Grid>

//       {categories?.map((category) => {
//         return (
//           <Grid item xs={4}>
//             <Card onClick={() => navigate(`category/${category}`)}>
//               <CardContent>
//                 <Typography variant="h5" align="center">
//                   {category}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IProduct } from "./Category";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  async function searchProducts() {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?search=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h1" align="center">
          Welcome
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <TextField
          label="Search Products"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={searchProducts}
        >
          Search
        </Button>
      </Grid>

      <Grid item xs={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setSearchResults([])}
        >
          Clear Search
        </Button>
      </Grid>

      {searchResults.length > 0
        ? searchResults.map((product) => {
            return (
              <Grid item xs={4} key={product.id}>
                <Card
                  onClick={() =>
                    navigate(
                      `category/${product?.category}/product/${product?.id}`,
                      { state: product }
                    )
                  }
                >
                  <CardContent>
                    <Typography variant="h5">{product.title}</Typography>
                    <Typography variant="h6">{`Price: $${product.price}`}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        : categories?.map((category) => {
            return (
              <Grid item xs={4} key={category}>
                <Card onClick={() => navigate(`category/${category}`)}>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
    </Grid>
  );
};
