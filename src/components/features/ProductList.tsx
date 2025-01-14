import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import ProductCard from "../common/ProductCard";
import { useProductStore } from '../../store/useProductStore';
// Define the type for product data
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO format string
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string; // ISO format string
  updatedAt: string; // ISO format string
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}
export interface ProductListResponse {
  products: any[]; // Array of Product
  total: number;
  skip: number;
  limit: number;
}
const ProductList: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [ddd, setProductList] = useState<ProductListResponse | null>(null);

  const { fetchProductList, productList, isLoading, error } = useProductStore();

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    setSnackbarOpen(true);
  };
  useEffect(() => {
    fetchProductList();  // Call to fetch products
  }, [fetchProductList]);

  return (
    <Box sx={{ mt: 2, mb: 3,ml:2,mr:2 }}>
      <Typography variant="h5" gutterBottom>
        Top Products
      </Typography>
      <Grid container spacing={3} >
        {productList.products?.map((p) => (
          <Grid item xs={12} sm={6} md={2} key={p.id}>
            <ProductCard product={p} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;
