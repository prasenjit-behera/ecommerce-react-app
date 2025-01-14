import { Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CartItem from '../../components/features/CartItem';

enum tabTitle {
    "Edit Profile" = "Edit Profile",
    "Cart Items" = "Cart Items",
    "Wishlist" = "Wishlist",
    "Live Orders" = "Live Orders",
    "Order History" = "Order History",
    "Bank Details" = "Bank Details",
    "Shipping Address" = "Shipping Address",
    "My Reviews" = "My Reviews",
    "FAQ" = "FAQ",
    "Help Center" = "Help Center"
  }
 
const ProfilePage = () => {
    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const tabs = Object.values(tabTitle);
    //const tabs = Object.values(tabTitle); // This gives us an array of the enum values
    const TabContent = ({ tabLabel }: { tabLabel: string }) => {
        switch (tabLabel) {
          case tabTitle["Edit Profile"]:
            return <Typography variant="body1">This is the Edit Profile content.</Typography>;
          case tabTitle["Cart Items"]:
            return  <CartItem/>;
          case tabTitle["Wishlist"]:
            return <Typography variant="body1">Check out your Wishlist here.</Typography>;
          case tabTitle["Live Orders"]:
            return <Typography variant="body1">Check out your Live Order here.</Typography>;
          case tabTitle["Order History"]:
            return <Typography variant="body1">Review your past Order History.</Typography>;
          case tabTitle["Bank Details"]:
            return <Typography variant="body1">Manage your Bank Details.</Typography>;
          case tabTitle["Shipping Address"]:
            return <Typography variant="body1">Edit your Shipping Address.</Typography>;
          case tabTitle["My Reviews"]:
            return <Typography variant="body1">View your Reviews here.</Typography>;
          case tabTitle["FAQ"]:
            return <Typography variant="body1">Find Frequently Asked Questions here.</Typography>;
          case tabTitle["Help Center"]:
            return <Typography variant="body1">Contact the Help Center.</Typography>;
          default:
            return <Typography variant="body1">Please select a tab.</Typography>;
        }
      };
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" sx={{marginTop: 2}}>My Account</Typography>
            <Paper elevation={3} sx={{
            marginTop: 2
          }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabs.map((label, index) => (
                        <Tab key={index} label={label} />
                    ))}
                </Tabs>
                {/* Tab Content Section */}
                <Box sx={{ padding: 3 }}>
                    <TabContent tabLabel={tabs[value]} />
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
