/* Dashbaord.tsx */
import { Container, Grid, Typography, TextField, Button, Input, InputLabel, FormGroup, Select } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../../components/ProfileNavigation';
import { useSpotify } from '../../context/SpotifyContext';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
    questionNum: number | null;
    timeLimit: number | null; // time limit in seconds 
    type: string;
}

const Dashbaord: React.FC = () => {
    const navigate = useNavigate();

    const { handleSubmit, control  } = useForm({
        defaultValues: {
            questionNum: 10,
            timeLimit: 1,
            type: 'artist'
        }
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        navigate(`/quiz/${JSON.stringify(data)}`);
    }

    return (
        <div>
            <ProfileNavigation />
            <Container sx={{         
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Vertically center the content
                alignItems: 'center',    // Horizontally center the content
                height: '100vh', }}>
                <Typography mb={2} variant="h4"><strong>Are you ready?</strong></Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormGroup>
                                <InputLabel sx={{ color: 'white' }}>Questions</InputLabel>
                                <Controller 
                                    name='questionNum'
                                    control={control}
                                    render={({ field }) => (
                                        <Input 
                                            type='number' 
                                            inputProps={{
                                                min: 1,
                                                max: 50,
                                            }}
                                            {...field} 
                                        />
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <InputLabel sx={{ color: 'white' }}>Time Limit</InputLabel>
                                <Controller 
                                    name='timeLimit'
                                    control={control}
                                    render={({ field }) => (
                                        <Input 
                                            type='number'
                                            inputProps={{
                                                min: 1,
                                                max: 10
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} >
                            <FormGroup>
                                <InputLabel sx={{ color: 'white' }}>Question Type</InputLabel>
                                <Controller 
                                    name='type'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field}
                                            native // Set native to true to render native select elements
                                            inputProps={{
                                                name: 'type',
                                                id: 'type-select',
                                            }}
                                        >
                                            <option value="artist">Artist</option>
                                            <option value="song">Song</option>
                                        </Select>
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained'>Start Quiz</Button>
                        </Grid>

                    </Grid>
                </form>

            </Container>
        </div>
   );
};

export default Dashbaord;
