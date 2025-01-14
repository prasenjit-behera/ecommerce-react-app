import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

// Define the type for product props

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product?.images[0]}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" className="p_title" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ₹{product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
