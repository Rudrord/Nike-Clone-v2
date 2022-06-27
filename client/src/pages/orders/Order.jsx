import { Box, Center, Divider, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import {  useSelector } from 'react-redux';


import { OrderAddress } from "../../components/orders/OrderAddress";

import { useState } from "react";
import axios from "axios";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/loading/Error";


export const Order = () => {

    // if (orderData.length === 0) {
    //     return <EmptyList />;
    // }

    const token = useSelector((state) => state.authReducer.token);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    console.log('data:', data)



    const handleOrdersGetRequest = async (token) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/order', { headers: { 'Authorization': `Bearer ${token}` } });
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
        }
    }


    useEffect(() => {
        handleOrdersGetRequest(token);
    }, [token]);


    return isLoading ? (
        <Loading />
    ) : isError ? (
        <Error />
    ) : (
        <>
            <Box px={'20px'}>
                <Flex justify={'space-between'} maxW={1200} m={'90px auto 20px'}>
                    <Center color={'#0863be'}>
                        <Heading fontSize={['25px', '35px']}>Orders &nbsp;</Heading>
                        <Text fontSize={['18px', '24px']}> ({data.length})</Text>
                    </Center>
                </Flex>

                <Box maxW={1200} m={'40px auto'}>
                    {data.map((item) => (
                        <Box key={item._id}>
                            <Grid templateColumns={['100%', '48% 48%', '48% 48%', '31% 30% 31%']} gap={['30px', '4%', '4%', '4%']} >

                                {/* <Box className="shadow">
                                    <Text mt={'15px'} fontWeight={600} fontSize={'25px'} mb={'10px'} textAlign={'center'}>ORDERED ITEMS</Text>
                                    <Divider />
                                    {item.product.map((e) => (
                                        <OrderBox key={e._id} product={e} />
                                    ))}
                                </Box> */}

                                {/* <Summary createdAt={item.createdAt} amount={item.amount} /> */}

                                <OrderAddress {...item.shippingDetails} />

                            </Grid>

                            <Divider my={'30px'} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};