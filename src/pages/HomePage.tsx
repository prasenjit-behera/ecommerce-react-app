import Box from '@mui/material/Box';
import ImageSlider from '../components/features/ImageSlider';  // Import ImageSlider
import ProductList from '../components/features/ProductList';
const HomePage = () => {
    return (
        <>
            <ImageSlider />
            <Box>
                <ProductList />
            </Box>
        </>

    );
};

export default HomePage;
