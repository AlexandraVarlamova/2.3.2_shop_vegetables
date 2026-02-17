import React, { useState } from 'react';
import { Card, Image, Text, Group, Button, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  title: string;
  weight: string;
  price: number;
  image: string;
  onAdd: (quantity: number) => void;
}

export function ProductCard({ title, weight, price, image, onAdd }: ProductCardProps) {
  const [count, setCount] = useState(1);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  const currentPrice = price * count;

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      className="product-card"
    >
      <Card.Section>
        <Image src={image} height={160} fit="contain" alt={title} style={{ padding: '20px' }} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <div>
          <Text fw={700} size="lg">{title}</Text>
          <Text size="sm" c="dimmed">{weight}</Text>
        </div>
        
        <Group gap={5}>
            
            <ActionIcon 
              size="sm" 
              variant="default" 
              onClick={decrement}
              data-testid="minus-btn" 
            >
              <IconMinus size={12} />
            </ActionIcon>
            
          
            <Text fw={500} size="sm" data-testid="count-value">
              {count}
            </Text>
            
            
            <ActionIcon 
              size="sm" 
              variant="default" 
              onClick={increment}
              data-testid="plus-btn"
            >
              <IconPlus size={12} />
            </ActionIcon>
        </Group>
      </Group>

      <Group justify="space-between" mt="md" align="center">
        <Text size="xl" fw={700}>
          $ {currentPrice}
        </Text>
        
        <Button 
            variant="light" 
            color="green" 
            radius="md"
            rightSection={<IconShoppingCart size={18} />}
            onClick={() => {
                onAdd(count);
                setCount(1); 
            }}
            
            data-testid="add-to-cart-btn"
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}
