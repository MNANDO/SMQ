/* Dashbaord.tsx */
import { Checkbox, MenuItem, Container, Grid, Typography, TextField, Button, Input, InputLabel, FormGroup, Select, Autocomplete } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../../components/ProfileNavigation';
import { useSpotify } from '../../context/SpotifyContext';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSpotifyUserPlaylists } from '../../hooks/useSpotifyUserPlaylists';

interface IFormInputs {
    totalQuestions: number | null;
    timeLimit: number | null; // time limit in seconds 
    type: string;
    playlist: string; // in the form of playlist ID
}

const Dashbaord: React.FC = () => {
    const navigate = useNavigate();
    const userPlaylists = useSpotifyUserPlaylists();
    const { accessToken } = useSpotify();

    const [ maxQuestions, setMaxQuestions ] = useState<number>(0);

    useEffect(() => {
        try {
            userPlaylists.execute(accessToken as string);
        } catch(e) {}
    }, [userPlaylists.execute]);

    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            totalQuestions: 0,
            timeLimit: 1,
            type: 'artist',
            playlist: '',
        }
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        console.log(userPlaylists.data)
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
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel sx={{ color: 'white', marginBottom: '10px' }}>Source</InputLabel>
                                <Controller 
                                    name='playlist'
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field, fieldState: {error} }) => {
                                        const { onChange, value, ref } =field;
                                        return (
                                            <>
                                                <Autocomplete 
                                                    value={
                                                        value
                                                            ? userPlaylists.data?.find((option) => {
                                                                    return value === option.id;
                                                                }) ?? null
                                                            : null
                                                    }
                                                    getOptionLabel={(option) => {
                                                        return option.name;
                                                    }}
                                                    onChange={(_: any, newValue) => {
                                                        setMaxQuestions(newValue?.totalTracks || 0);
                                                        onChange(newValue ? newValue.id : null);
                                                    }}
                                                    options={userPlaylists.data ?? []}
                                                    renderOption={(props, option) => (
                                                      <li {...props} key={option.id}  style={{ color: 'black' }}>
                                                        {option.name}
                                                      </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField 
                                                            {...params}
                                                            variant='outlined'
                                                            label='Select a playlist'
                                                            error={!!error}
                                                            inputRef={ref}
                                                        />
                                                    )}
                                                />
                                                {error ? <span style={{color: 'red'}}>{error.message}</span> : null}
                                            </>
                                        )
                                    }}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <InputLabel sx={{ color: 'white', marginBottom: '10px'}}>Questions</InputLabel>
                                <Controller 
                                    name='totalQuestions'
                                    control={control}
                                    rules={{
                                        required: 'Required',
                                        validate: {
                                            greaterThanZero: () => maxQuestions > 0 || 'Input must be greater than 0',
                                            lessThanMax: () => maxQuestions <= maxQuestions || `Input must be less or equal to ${maxQuestions}`
                                        }
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <>
                                            <TextField 
                                                type='number' 
                                                variant='outlined'
                                                error={!!error}
                                                inputProps={{
                                                    min: 1,
                                                    max: maxQuestions,
                                                }}
                                                {...field} 
                                            />
                                            {error ? <span style={{color: 'red'}}>{error.message}</span> : null}
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <InputLabel sx={{ color: 'white', marginBottom: '10px'}}>Time Limit</InputLabel>
                                <Controller 
                                    name='timeLimit'
                                    control={control}
                                    rules={{
                                        required: 'Required'
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <>
                                            <TextField 
                                                type='number'
                                                variant='outlined'
                                                error={!!error}
                                                inputProps={{
                                                    min: 1,
                                                    max: 10
                                                }}
                                                {...field}
                                            />
                                            {error ? <span style={{color: 'red'}}>{error.message}</span> : null}
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} >
                            <FormGroup>
                                <InputLabel sx={{ color: 'white', marginBottom: '10px' }}>Answer Type</InputLabel>
                                <Controller 
                                    name='type'
                                    control={control}
                                    rules={{
                                        required: 'Required'
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <>
                                            <Select 
                                                {...field}
                                                error={!!error}
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'type-select',
                                                }}
                                            >
                                                <MenuItem style={{ color: 'black' }} value="artist">
                                                  Artist
                                                </MenuItem>
                                                <MenuItem style={{ color: 'black' }} value="title">
                                                  Song Title
                                                </MenuItem>
                                            </Select>
                                            {error ? <span style={{color: 'red'}}>{error.message}</span> : null}

                                        </>
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
