import Box from "@mui/material/Box";
import Game from "./Game";

export default function JogoDaVida() {
    return (
        
     <Box sx={{display:'flex', flexWrap:'wrap' ,flexDirection:'column' ,justifyContent:'center', alignItems:'center', mt:'7rem'}}>
       <Game/>
     </Box>
       
       
    )
}