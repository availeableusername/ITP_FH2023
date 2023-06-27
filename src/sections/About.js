import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

function About() {
    return (
        <Box bgcolor="#f3c23a" height="100vh" display="flex" alignItems="center">
            <Grid container justifyContent="center">
                <Typography component="div" sx={{ width: '90%', maxWidth: '900px', color: '#000', textAlign: 'center' }}>
                    <Typography variant="h3" component="h3" sx={{ marginBottom: '1rem', fontSize: '2.5rem', marginTop: '0' }}>
                        About Us
                    </Typography>
                    <Typography component="p" sx={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
                        FH Chicken spot is a leading provider of delicious chicken dishes that are made with love and passion. We are dedicated to serving our customers with the highest quality ingredients and creating memorable dining experiences.

                        Our team of talented chefs and culinary experts work tirelessly to craft mouthwatering chicken recipes that satisfy even the most discerning palates. We believe that great food brings people together, and that's why we strive to deliver exceptional taste and impeccable service to our valued customers.

                        At FH Chicken spot, we take pride in using only the freshest ingredients sourced from trusted suppliers. Whether it's our signature crispy chicken legs or our savory grilled chicken, each dish is prepared with care and attention to detail. We believe that quality should never be compromised, and that's why we go the extra mile to ensure that every bite is a delight.

                        As a customer-centric establishment, we prioritize your satisfaction above all else. We strive to create a warm and welcoming atmosphere where you can relax and enjoy your meal. Our friendly staff is always ready to assist you and provide recommendations based on your preferences.

                        In addition to our dine-in services, we also offer convenient online ordering for those who prefer to enjoy our delectable dishes in the comfort of their own homes. With our 24/7 availability, you can satisfy your chicken cravings anytime, anywhere.

                        We believe in giving back to the community that has supported us throughout the years. That's why we actively participate in local charity events and initiatives to make a positive impact on the lives of others.

                        Thank you for choosing FH Chicken spot as your go-to destination for mouthwatering chicken delicacies. We look forward to serving you and creating memorable dining experiences that will keep you coming back for more.
                    </Typography>
                </Typography>
            </Grid>
        </Box>
    )
}

export default About
