
import { 
  Popover, 
  Button, 
  Text, 
  Group, 
  Avatar, 
  ActionIcon, 
  ScrollArea, 
  Divider, 
  Box 
} from '@mantine/core';
import { IconShoppingCart, IconPlus, IconMinus } from '@tabler/icons-react';
import type { Product } from '../Catalog/Catalog';

interface CartPopupProps {
  cartItems: Product[];
  onAdd: (item: Product, quantity: number) => void;
  onRemove: (itemId: number) => void;
}

export function CartPopup({ cartItems, onAdd, onRemove }: CartPopupProps) {

  const groupedItems = cartItems.reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as (Product & { quantity: number })[]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalCount = cartItems.length;

  return (
    <Popover width={350} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button 
          color={totalCount > 0 ? "green" : "gray"} 
          radius="md"
          rightSection={<IconShoppingCart size={20} />}
        >
          {totalCount > 0 ? `${totalCount} Items` : 'Empty Cart'}
        </Button>
      </Popover.Target>

      <Popover.Dropdown style={{ padding: 0 }}>
        {totalCount === 0 ? (
          <Box p="md">
            <Text c="dimmed" ta="center">Корзина пуста</Text>
          </Box>
        ) : (
          <>
            <ScrollArea.Autosize mah={300} type="scroll">
              <Box p="xs">
                {groupedItems.map((item) => (
                  <Group key={item.id} wrap="nowrap" mb="sm" align="center" justify="space-between">
                
                    <Group wrap="nowrap" gap="sm">
                      <Avatar src={item.image} size="md" radius="md" bg="gray.1" />
                      <div>
                        <Text size="sm" fw={500} lineClamp={1}>{item.title}</Text>
                        <Text size="xs" c="dimmed">{item.weight}</Text>
                        <Text size="sm" fw={700}>$ {item.price}</Text>
                      </div>
                    </Group>

              
                    <Group gap={5} bg="gray.1" style={{ borderRadius: 8, padding: 4 }}>
                      <ActionIcon 
                        size="sm" 
                        variant="transparent" 
                        color="dark"
                        onClick={() => onRemove(item.id)}
                      >
                        <IconMinus size={12} />
                      </ActionIcon>
                      
                      <Text size="sm" fw={500} style={{ minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Text>
                      
                      <ActionIcon 
                        size="sm" 
                        variant="transparent" 
                        color="dark"
                        onClick={() => onAdd(item, 1)}
                      >
                        <IconPlus size={12} />
                      </ActionIcon>
                    </Group>
                  </Group>
                ))}
              </Box>
            </ScrollArea.Autosize>

            <Divider />

            <Group justify="space-between" p="md" bg="gray.0">
              <Text fw={700}>Total</Text>
              <Text fw={700} size="lg">$ {totalPrice}</Text>
            </Group>
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}
