import { useState } from 'react';
import { Container, Grid, Card, Text, TextInput, Button, Space, Flex, Badge, Avatar, Menu } from '@mantine/core';

const ActualHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes] = useState([
    'Pasta Primavera',
    'Chicken Tikka Masala',
    'Sushi Rolls',
    'Tacos al Pastor',
    'Ramen Bowl',
    'Chocolate Lava Cake',
  ]);
  const [weeklyPlanner, setWeeklyPlanner] = useState<string[]>([]);

  const handleAddToPlanner = (recipe: string) => {
    if (!weeklyPlanner.includes(recipe)) {
      setWeeklyPlanner([...weeklyPlanner, recipe]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.toLowerCase().includes(searchQuery)
  );

  return (
    <Container size="lg" mt="xl">
      {/* Header Section */}
      <Flex justify="space-between" align="center">
        <Text size="xl" style={{ fontWeight: 700 }}>
          Welcome to Yummly!
        </Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar color="blue" radius="xl" size="lg" style={{ cursor: 'pointer' }}>
              😊
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <Space h="xl" />

      {/* Search Section */}
      <TextInput
        placeholder="Search cuisines or recipes..."
        value={searchQuery}
        onChange={handleSearch}
        size="md"
        radius="md"
      />
      <Space h="xl" />

      {/* Trending Recipes Section */}
      <Text size="lg" style={{ fontWeight: 700 }} mb="md">
        Trending Recipes
      </Text>
      <Grid gutter="md">
        {filteredRecipes.map((recipe, index) => (
          <Grid.Col key={index} span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text style={{ fontWeight: 700 }}>{recipe}</Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => handleAddToPlanner(recipe)}
              >
                Add to Weekly Planner
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Space h="xl" />

      {/* Weekly Planner Section */}
      {weeklyPlanner.length > 0 && (
        <>
          <Text size="lg" style={{ fontWeight: 700 }} mb="md">
            Weekly Planner
          </Text>
          <Grid gutter="md">
            {weeklyPlanner.map((recipe, index) => (
              <Grid.Col key={index} span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text style={{ fontWeight: 700 }}>{recipe}</Text>
                  <Badge color="green" variant="filled" mt="md">
                    Planned
                  </Badge>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ActualHome;
