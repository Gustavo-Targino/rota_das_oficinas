import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
    return (
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',minHeight:'70vh'}} >

            <Paper sx={{ display:'flex', flexWrap:'wrap'}} elevation={8}>

                <Box  sx={{ display:'flex', flexDirection:'column', flexWrap:'wrap', p:5}}>
                    <Typography  variant="h2" component="h1" fontWeight="700">
                        Olá, mundo! 
                    </Typography>

                    <Typography component='h6' variant="subtitle1">
                    Meu nome é Gustavo Targino, sou Desenvolvedor Front-End. Esta aplicação envolve 3 desafios de programação: Conversor de números romanos, Jogo da vida e Divisor de conta de restaurante.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{mx:'auto'}}>
                <IconButton aria-label="delete" color="primary" size="large" href='https://www.linkedin.com/in/gustavo-targino-7a6a82243/' target='_blank'>
                    <Avatar  sx={{ bgcolor: '#2563eb' }}>
                        <LinkedInIcon />
                    </Avatar>
                </IconButton>

                  <IconButton size="large" href='https://github.com/Gustavo-Targino' target='_blank'>
                    <Avatar sx={{bgcolor:'#2563eb'}}>
                        <GitHubIcon />
                    </Avatar>
                  </IconButton>
            
                </Stack>

            </Paper>

        </Box>
    )
}