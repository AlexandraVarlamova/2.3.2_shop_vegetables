import React, { useState, useEffect } from 'react'; 
import { SimpleGrid, Title, Container, Loader, Center } from '@mantine/core'; 
import { ProductCard } from "../ProductCard/ProductCard";


import almondPng from '../../assets/almond.png';
import applePng from '../../assets/apple.png';
import bananaPng from '../../assets/banana.png';
import beansPng from '../../assets/beans.png';
import brinjalPng from '../../assets/brinjal.png'; 
import brocolliPng from '../../assets/brocolli.png';
import carrotPng from '../../assets/carrot.png';
import cashewPng from '../../assets/cashew.png';
import cauliflowerPng from '../../assets/cauliflower.png';
import cornPng from '../../assets/corn.png';
import cucumberPng from '../../assets/cucumber.png';
import grapePng from '../../assets/grape.png';
import grenadesPng from '../../assets/grenades.png';
import mangoPng from '../../assets/mango.png';
import melonPng from '../../assets/melon.png';
import mushroomPng from '../../assets/mushroom.png';
import nutsmixPng from '../../assets/nutsmix.png';
import onionPng from '../../assets/onion.png';
import orangePng from '../../assets/orange.png';
import pearPng from '../../assets/pear.png';
import pepperPng from '../../assets/pepper.png';
import pistachiosPng from '../../assets/pistachios.png';
import potatoPng from '../../assets/potato.png';
import pumpkinPng from '../../assets/pumpkin.png';
import radishPng from '../../assets/radish.png'; 
import raspberryPng from '../../assets/raspberry.png';
import strawberryPng from '../../assets/strawberry.png';
import tomatoPng from '../../assets/tomato.png';
import walnutsPng from '../../assets/walnuts.png';
import watermalonPng from '../../assets/watermalon.png';

export interface Product {
  id: number;
  title: string;
  weight: string;
  price: number;
  image: string;
}

interface CatalogProps {
  onAddToCart: (item: Product, quantity: number) => void;
}

const productsData: Product[] = [
  { id: 1, title: 'Broccoli', weight: '1 kg', price: 120, image: brocolliPng },
  { id: 2, title: 'Cauliflower', weight: '1 kg', price: 120, image: cauliflowerPng },
  { id: 3, title: 'Cucumber', weight: '1 kg', price: 120, image: cucumberPng },
  { id: 4, title: 'Radish', weight: '1 kg', price: 120, image: radishPng },
  { id: 5, title: 'Carrot', weight: '1 kg', price: 82, image: carrotPng },
  { id: 6, title: 'Tomato', weight: '1 kg', price: 82, image: tomatoPng },
  { id: 7, title: 'Beans', weight: '1 kg', price: 82, image: beansPng },
  { id: 8, title: 'Brinjal', weight: '1 kg', price: 82, image: brinjalPng },
  { id: 9, title: 'Pepper', weight: '1 kg', price: 82, image: pepperPng },
  { id: 10, title: 'Mushroom', weight: '1 kg', price: 82, image: mushroomPng },
  { id: 11, title: 'Potato', weight: '1 kg', price: 82, image: potatoPng },
  { id: 12, title: 'Pumpkin', weight: '1 kg', price: 82, image: pumpkinPng },
  { id: 13, title: 'Corn', weight: '1 kg', price: 82, image: cornPng },
  { id: 14, title: 'Onion', weight: '1 kg', price: 82, image: onionPng },
  { id: 15, title: 'Apple', weight: '1 kg', price: 82, image: applePng },
  { id: 16, title: 'Banana', weight: '1 kg', price: 82, image: bananaPng },
  { id: 17, title: 'Grape', weight: '1 kg', price: 82, image: grapePng },
  { id: 18, title: 'Mango', weight: '1 kg', price: 82, image: mangoPng },
  { id: 19, title: 'Orange', weight: '1 kg', price: 82, image: orangePng },
  { id: 20, title: 'Melon', weight: '1 kg', price: 82, image: melonPng },
  { id: 21, title: 'Pear', weight: '1 kg', price: 82, image: pearPng },
  { id: 22, title: 'Grenades', weight: '1 kg', price: 82, image: grenadesPng },
  { id: 23, title: 'Raspberry', weight: '1 kg', price: 82, image: raspberryPng },
  { id: 24, title: 'Strawberry', weight: '1 kg', price: 82, image: strawberryPng },
  { id: 25, title: 'Watermallon', weight: '1 kg', price: 82, image: watermalonPng },
  { id: 26, title: 'Almond', weight: '1 kg', price: 82, image: almondPng },
  { id: 27, title: 'Pistachios', weight: '1 kg', price: 82, image: pistachiosPng },
  { id: 28, title: 'Nutsmix', weight: '1 kg', price: 82, image: nutsmixPng },
  { id: 29, title: 'Cashew', weight: '1 kg', price: 82, image: cashewPng },
  { id: 30, title: 'Walnuts', weight: '1 kg', price: 82, image: walnutsPng },
];

export function Catalog({ onAddToCart }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData); 
      setIsLoading(false);      
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
              onAdd={(quantity) => onAddToCart(item, quantity)} 
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
