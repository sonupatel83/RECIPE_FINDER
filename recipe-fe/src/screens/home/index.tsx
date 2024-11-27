import { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { Flex,Container, Grid, Card, Text, Button, TextInput, Title, Space} from '@mantine/core';
import '../../App.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [weeklyPlanner, setWeeklyPlanner] = useState<string[]>([]);

    // Fetch cuisines from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/cuisines')
            .then(response => setCuisines(response.data))
            .catch(error => console.error("Error fetching cuisines:", error));
    }, []);

    // Toggle cuisine selection
    const toggleCuisine = useCallback((cuisine: string) => {
        setSelectedCuisines(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(cuisine)) {
                newSelected.delete(cuisine);
            } else {
                newSelected.add(cuisine);
            }
            return newSelected;
        });
    }, []);

    // Filter cuisines based on search query
    const filteredCuisines = cuisines.filter(cuisine =>
        cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Submit selected cuisines to the backend
    const handleSubmit = () => {
        axios.post('/api/submit', { selectedCuisines: Array.from(selectedCuisines) })
            .then(response => console.log("Submitted successfully:", response.data))
            .catch(error => console.error("Error submitting selection:", error));
    };

    // Add selected cuisines to weekly planner
    const handleAddToPlanner = () => {
        setWeeklyPlanner(prevPlanner => [
            ...prevPlanner,
            ...Array.from(selectedCuisines)
        ]);
        setSelectedCuisines(new Set()); // Clear selected cuisines after adding
    };

    return (
        <>
            <Container>
                {/* Navbar */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Text size="xl" style={{ fontWeight: 700 }}>Yummly</Text>
                <div className="button-group">
                    <Button variant="subtle">Home</Button>
                    <Button variant="subtle">Weekly Planner</Button>
                    <Link to ="/auth">
                    <Button color="blue">Sign Up / Log In</Button>
                    </Link>
                </div>
                </header>

                {/* Main Content */}
                <div style={{ textAlign: 'center' }}>
                    <Title order={1}>What are your favorite cuisines?</Title>
                    <Text size="lg" color="dimmed">PERSONALIZE YOUR EXPERIENCE</Text>

                    {/* Search Bar */}
                    <Space h="lg" />
                    <TextInput
                        placeholder="Search for cuisines"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '300px', margin: 'auto' }}
                    />

                    {/* Cuisine List */}
                    <Space h="xl" />
                    <Grid grow>
                        {filteredCuisines.map((cuisine) => (
                            <Grid.Col key={cuisine} span={4}>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    style={{ cursor: 'pointer', backgroundColor: selectedCuisines.has(cuisine) ? '#e6f7ff' : 'white' }}
                                    onClick={() => toggleCuisine(cuisine)}
                                >
                                    <Card.Section>
                                        {/* Image Placeholder */}
                                        <div style={{ height: '100px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
                                    </Card.Section>
                                    <Flex justify="center" align="center">
                                        <Text size="md" mt="sm">{cuisine}</Text>
                                    </Flex>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>

                    {/* Action Buttons */}
                    <Space h="lg" />
                    <div className="button-group">
                        <Button color="teal" onClick={handleSubmit}>Next</Button>
                        <Button color="orange" onClick={handleAddToPlanner}>Add to Weekly Planner</Button>
                    </div>

                    {/* Skip Option */}
                    <Space h="sm" />
                    <Text size="sm" color="dimmed" style={{ cursor: 'pointer' }}>Don't Personalize My Recommendations</Text>
                </div>

                {/* Weekly Planner Display */}
                {weeklyPlanner.length > 0 && (
                    <div style={{ marginTop: '40px' }}>
                        <Title order={2}>Weekly Planner</Title>
                        <Card shadow="sm" padding="lg" radius="md" style={{ marginTop: '20px' }}>
                            <ul>
                                {weeklyPlanner.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                )}
            </Container>
        </>
    );
}
