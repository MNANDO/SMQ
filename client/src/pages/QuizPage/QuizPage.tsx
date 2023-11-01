import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpotify } from '../../context/SpotifyContext';
import PlaybackButton from '../../components/PlaybackButton';
import { Grid, Button } from '@mui/material';

type Track = {
    uri: string,
    name: string,
    durationMs: number,
}

function getRandomIndices(max: number, count: number) {
  const allIndices = Array.from({ length: max }, (_, index) => index);

  for (let i = allIndices.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1));
    [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
  }

  const randomIndices = allIndices.slice(0, count);

  return randomIndices;
}

const getRandomNames = (data: Track[], excludedName: string) => {
  const filteredNames = data
    .filter((track) => track.name !== excludedName)
    .map((track) => track.name);

  const randomIndices = getRandomIndices(filteredNames.length, 3);
  const options = randomIndices.map((index) => filteredNames[index]);

  return options;
};

const QuizPage = () => {
    const { quizData } = useParams();
    const data = JSON.parse(quizData as string);

    const { accessToken } = useSpotify();
    const [options, setOptions] = useState<string[]>([]);

    const [ position, setPosition ] = useState<number>(0); // position in the track
    const [ trackData, setTrackData ] = useState<Track[]>([]);

    const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
    const [ answer, setAnswer ] = useState<string>('');

    useEffect(() => {
        const getTopTracks = async (limit: number): Promise<void> => {
            const url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const trackData = data.items.map((item: any) => {
                return {
                    uri: item.uri,
                    name: item.name,
                    durationMs: item.durationMs,
                };
            });
            setTrackData(trackData);
            if (trackData.length > 0) {
                const names = getRandomNames(trackData, trackData[currentQuestion].name);
                names.push(trackData[currentQuestion].name)
                setAnswer(trackData[currentQuestion].name);
                const scrambledIndices = getRandomIndices(names.length, names.length);
                const scrambledArray = scrambledIndices.map((index) => names[index])
                setOptions(scrambledArray);
                console.log(options);
                console.log(answer);
            }
        }
        getTopTracks(data.questionNum + 5);

    }, []);

    const nextQuestion = () => {
        if (currentQuestion < data.questionNum) {
            setCurrentQuestion(currentQuestion + 1)
            const getTopTracks = async (limit: number): Promise<void> => {
                const url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const trackData = data.items.map((item: any) => {
                    return {
                        uri: item.uri,
                        name: item.name,
                        durationMs: item.durationMs,
                    };
                });
                setTrackData(trackData);
            }
            getTopTracks(data.questionNum + 5);

            if (trackData.length > 0) {
                const names = getRandomNames(trackData, trackData[currentQuestion].name);
                names.push(trackData[currentQuestion].name);
                setAnswer(trackData[currentQuestion].name);
                const scrambledIndices = getRandomIndices(names.length, names.length);
                const scrambledArray = scrambledIndices.map((index) => names[index])
                setOptions(scrambledArray);
                console.log(options);
                console.log(answer);
                }
        } else {
            console.log("End of quiz")

        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          {trackData.length > 0 ? (
            <PlaybackButton trackUri={trackData[currentQuestion].uri} position={position} />
          ) : (
            <p>Loading...</p>
          )}

          <Grid container spacing={2} sx={{maxWidth: '800px'}}>
            {options.map((option) => (
              <Grid item xs={6} key={option}>
                <Button variant='contained' sx={{ width: '100%', minHeight: '300px' }}>
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>

          <button onClick={nextQuestion}>Next Question</button>
        </div>
    );
}

export default QuizPage;
