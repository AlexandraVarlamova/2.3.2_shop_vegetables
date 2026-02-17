import React, { useState } from 'react';
import {
  AppShell,
  Title,
  Group,
  Burger,
  Text,
  Badge,
  AppShellHeader,
  AppShellNavbar,
  AppShellSection,
  AppShellMain,
  AppShellFooter
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


import { Catalog } from './components/Catalog/Catalog';
import type { Product } from './components/Catalog/Catalog';
import { CartPopup } from './components/CartPopup/CartPopup';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [cartItems, setCartItems] = useState<Product[]>([]);


  const addToCart = (item: Product, quantity: number) => {
    const newItems = Array(quantity).fill(item);
    setCartItems((prevItems) => [...prevItems, ...newItems]);
  };

  
  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === itemId);
      
      if (index !== -1) {
        const newArr = [...prevItems];
        newArr.splice(index, 1);
        return newArr;
      }
      return prevItems;
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShellHeader zIndex={1001} bg="white">
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <Title order={3} fw={700}>Vegetable</Title>
              <Badge color="green" variant="filled" size="lg">SHOP</Badge>
            </Group>
          </Group>

          <Group gap="xs">
            {totalPrice > 0 && (
              <Text fw={700} size="sm" mr={10} visibleFrom="xs">
                Total: {totalPrice} ₽
              </Text>
            )}
            
            <CartPopup 
              cartItems={cartItems} 
              onAdd={addToCart} 
              onRemove={removeFromCart} 
            />
          </Group>
        </Group>
      </AppShellHeader>

      <AppShellNavbar p="md">
         <AppShellSection grow>
          <Text fw={500} mb="sm">Меню</Text>
          <Text>Овощи и фрукты</Text>
          <Text>Корзина</Text>
        </AppShellSection>
      </AppShellNavbar>

      <AppShellMain>
        <Title order={2}>Добро пожаловать!</Title>
        <Text mb="lg">Магазин овощей и фруктов</Text>
        
        <Catalog onAddToCart={addToCart} />
      </AppShellMain>

      <AppShellFooter p="md">
        <Text size="sm" c="dimmed">Vegetable shop footer</Text>
      </AppShellFooter>
    </AppShell>
  );
}

export default App;
