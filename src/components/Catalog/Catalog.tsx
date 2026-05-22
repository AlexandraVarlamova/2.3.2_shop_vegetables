import { useEffect } from 'react';
import { SimpleGrid, Title, Container, Loader, Center } from '@mantine/core'; 
import { ProductCard } from "../ProductCard/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';

export interface Product {
  id: number;
  title: string;
  weight: string;
  price: number;
  image: string;
}


export function Catalog() {
  const dispatch = useDispatch<AppDispatch>();
  
  
  const { items: products, isLoading } = useSelector((state: RootState) => state.products);

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
  const handleAddToCart = (item: Product, quantity: number) => {
    dispatch(addToCart({ item, quantity }));
  };

  return (
    <Container fluid>
      <Title order={2} mb="lg">Catalog</Title>
      
      {isLoading ? (
        <Center style={{ height: '200px' }}>
          <Loader size="xl" variant="bars" />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {products.map((item) => (
            <ProductCard 
              key={item.id}
              id={item.id}
              title={item.title}
              weight={item.weight}
              price={item.price}
              image={item.image}
              onAdd={(quantity) => handleAddToCart(item, quantity)} 
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
