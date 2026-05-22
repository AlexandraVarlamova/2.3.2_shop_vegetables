import {
  AppShell, Title, Group, Burger, Text, Badge, AppShellHeader,
  AppShellNavbar, AppShellSection, AppShellMain, AppShellFooter
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction } from './store/slices/cartSlice';

import { Catalog } from './components/Catalog/Catalog';
import type { Product } from './components/Catalog/Catalog';
import { CartPopup } from './components/CartPopup/CartPopup';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch();


  const cartItems = useSelector((state: RootState) => state.cart?.items || []); 
  
 
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const addToCart = (item: Product, quantity: number) => {
    dispatch(addToCartAction({ item, quantity })); 
  };

  const removeFromCart = (itemId: number) => {
    dispatch(removeFromCartAction(itemId)); 
  };

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

        <Catalog /> 
      </AppShellMain>

      <AppShellFooter p="md">
        <Text size="sm" c="dimmed">Vegetable shop footer</Text>
      </AppShellFooter>
    </AppShell>
  );
}

export default App;
