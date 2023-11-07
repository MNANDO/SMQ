/* Dashbaord.tsx */
import { Checkbox, MenuItem, Container, Grid, Typography, TextField, Button, Input, InputLabel, FormGroup, Select, Autocomplete } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../../components/ProfileNavigation';
import { useSpotify } from '../../context/SpotifyContext';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Playlist, useSpotifyUserPlaylists } from '../../hooks/useSpotifyUserPlaylists';

interface IFormInputs {
    totalQuestions: number | null;
    timeLimit: number | null; // time limit in seconds 
    type: string;
    playlist: string; 
}

const Dashbaord: React.FC = () => {
    const navigate = useNavigate();
    const userPlaylists = useSpotifyUserPlaylists();
    const { accessToken } = useSpotify();

    const [ hasSource, setHasSource ] = useState<boolean>(false);
    const [ totalTracks, setTotalTracks ] = useState<number>(0);

    useEffect(() => {
        try {
            userPlaylists.execute(accessToken as string);
        } catch(e) {}
    }, [userPlaylists.execute]);

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            totalQuestions: totalTracks,
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

    useEffect(() => {
        if (totalTracks > 0 && hasSource) {
            setValue('totalQuestions', Math.floor(totalTracks/4));
        }
    }, [totalTracks, hasSource, setValue]);

    return (
        <div>
            <ProfileNavigation />
            <Container sx={{         
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',    
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
                                                    getOptionDisabled={(option) => {
                                                        return option.totalTracks < 4;
                                                    }}
                                                    onChange={(_: any, newValue) => {
                                                        if (newValue?.totalTracks && newValue?.totalTracks >= 4) { // must have at least 4 tracks 
                                                            setTotalTracks(newValue.totalTracks);
                                                            setHasSource(true);
                                                        } else {
                                                            setHasSource(false);
                                                        }
                                                        onChange(newValue?.id);
                                                    }}
                                                    options={userPlaylists.data ?? []}
                                                    renderOption={(props, option) => (
                                                      <li {...props} key={option.id}  style={{ color: 'black' }}>
                                                        {option.name} {option.totalTracks < 4 ? '(Not enough tracks)' : (`(${option.totalTracks} tracks)`)}
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
                                            greaterThanZero: () => totalTracks > 0 || 'Input must be greater than 0',
                                            lessThanMax: () => totalTracks <= totalTracks || `Input must be less or equal to ${totalTracks}`
                                        }
                                    }}
                                    render={({ field, fieldState: {error} }) => (
                                        <>
                                            <TextField 
                                                type='number' 
                                                variant='outlined'
                                                error={!!error}
                                                disabled={!hasSource}
                                                inputProps={{
                                                    min: 1,
                                                    max: totalTracks,
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
                                                disabled={!hasSource}
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
                                                disabled={!hasSource}
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
