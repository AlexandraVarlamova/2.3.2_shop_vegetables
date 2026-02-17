import React from 'react';
import { Burger } from '@mantine/core';
import { Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';


interface HeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  return (
    <div style={{ height: 70, padding: theme?.spacing?.md || '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        color={theme?.colors?.gray?.[6] || '#475569'}
      />
      <Text style={{ color: theme?.colors?.blue?.[6]  '#2563eb', fontSize: theme?.fontSizes?.lg  '18px', fontWeight: 700 }}>
        Vegetable Shop
      </Text>
    </div>
  );
};

export default Header;
