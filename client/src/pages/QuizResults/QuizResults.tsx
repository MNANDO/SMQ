/* QuizResults.tsx */
import { Button, Container, Typography, Box,Grid, Popper,PopperPlacementType,Fade,Icon} from '@mui/material';
import React, { MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import LinkIcon from '@mui/icons-material/Link';
import {
  buttonStyles,
  containerStyles,
  scoreStyle,
  shareButtonStyle,
  songTitle,
} from './QuizResultsStyles'; // Import the styles from TypeScript file
import { borderRadius } from '@mui/system';


const QuizResults: React.FC  = () => {  
	const { resultData } = useParams();
    const decodedResultData = decodeURIComponent(resultData as string);
	const { quizScore, user, correct, wrong } = JSON.parse(decodedResultData as string);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    
    const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

    const handleShare = (e:MouseEvent) => {
        e.preventDefault()
        const ahref = window.location.href
        const encodedAhref = encodeURIComponent(ahref)
        var link

        switch (e.currentTarget.id) {
            case 'facebook':
                link = `https://www.facebook.com/sharer/sharer.php?u=${ahref}`
                redirect(link)
                break
    
            case 'twitter':
                link = `https://twitter.com/intent/tweet?url=${encodedAhref}`
                redirect(link)
                break
    
            case 'reddit':
                link = `https://www.reddit.com/submit?url=${encodedAhref}`
                redirect(link)
                break
    
            case 'copy':
                navigator.clipboard.writeText(ahref)
                break
    
            default:
                break
        }
    }
    
    const redirect = (socialLink:string) => {
        window.open(socialLink, '_blank')
    }

    return (
        <Container sx={containerStyles}>
            <Box>
                <Typography mb={5} variant="h2"  component="h2"><strong>You Scored</strong></Typography>
                <Typography style={scoreStyle} mb={5} variant="h1">{quizScore}%</Typography>

                <Grid container spacing={4} justifyContent="center">    
                    <Grid item xs={4}>
                        <Typography mb={5} variant='h4'><strong>Wrong</strong></Typography>
                        <div style={{ whiteSpace: "nowrap"}}>
                        <Box mb={5} component={"div"} sx={{overflow: "auto", height:"25vh", flexDirection:"column",display:"flex"}}>
                        {wrong.map((WRONG : string)=>(
                            <Typography mb={1} style={songTitle}>{WRONG}</Typography>
                        ))}
                        </Box>
                        </div>
                    </Grid>  
                    <Grid item xs={4}>
                        <Typography mb={5} variant='h4'><strong>Right</strong></Typography>
                        <Box mb={5} component={"div"} sx={{overflow:"auto", height:"25vh", flexDirection:"column",display:"flex"}}>
                        {correct.map((RIGHT: string)=>(
                            <Typography mb={1} style={songTitle}>{RIGHT}</Typography>
                        ))}
                        </Box>
                    </Grid>              
                </Grid>
                
                <Link to={'/'}><Button variant="contained" size="large"><strong>Finish</strong></Button></Link>
                <Button style={buttonStyles} variant="contained" size="large" onClick={handleClick('top')}><strong>Share</strong></Button>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                        <Box sx={shareButtonStyle}>
                                <Typography> <Button sx={{borderRadius: 0}} id="facebook" onClick={handleShare}> <FacebookIcon></FacebookIcon>  Facebook</Button></Typography>
                                <Typography><Button sx={{borderRadius: 0}} id="twitter" onClick={handleShare}> <TwitterIcon></TwitterIcon>  Twitter</Button></Typography>
                                <Typography><Button sx={{borderRadius: 0}} id="reddit" onClick={handleShare}> <RedditIcon></RedditIcon>  Reddit</Button></Typography>
                                <Typography><Button sx={{borderRadius: 0}} id="copy" onClick={handleShare}> <LinkIcon></LinkIcon>  Copy Link</Button></Typography>

                        </Box>
                    </Fade>
                    )}
                </Popper>
            
            </Box>
        </Container>
        
    );
}

export default QuizResults;