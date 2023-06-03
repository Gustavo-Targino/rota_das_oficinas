import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";

import Avatar from "@mui/material/Avatar";
import CalculateIcon from "@mui/icons-material/Calculate";
import ClearIcon from "@mui/icons-material/Clear";
import LooksOneIcon from '@mui/icons-material/LooksOne';

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

import { useState } from "react";

const romanos = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M"
]

const algarismos = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const arabicos = [
    1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000
]

const romanRegex = /^[IVXLCDMivxlcdm]+$/

const numberRegex = /^[0-9]*$/


export default function Conversor() {
  

  const[showResults, setShowResults] = useState('')
  
  const [entradaRom, setEntradaRom] = useState("");
  
  const [errorRomanoInput, setErrorRomanoInput] = useState(false);

  const validateRomInput = (event)=> {

        let validacao = event.target.value.toUpperCase()

        if(romanRegex.test(validacao)) {
            console.log(validacao)
            setEntradaRom(validacao)
        } else {
            setEntradaRom(validacao.replace(/.$/,""))
        }
        
  }


  const [entradaNum, setEntradaNum] = useState("");

  const [errorNumInput, setErrorNumInput] = useState(false);

  const validateNumInput = (event)=> {
    let validacao = event.target.value
    if(numberRegex.test(validacao)) {
      setEntradaNum(validacao)
    } else {
      setEntradaNum(validacao.replace(/.$/,""))
    }
  }

  function romanoParaArabico() {

    if(!romanRegex.test(entradaRom)) {
      setEntradaRom('')
      setErrorRomanoInput(true)
      setShowResults('')
      return
    }

    setErrorRomanoInput(false)
  
    let resultado = 0;
    let ln = null;
    let numero = entradaRom;
    numero = numero.toUpperCase();
    for (let i = numero.length - 1; i >= 0; i--) {
      let char = numero.charAt(i);
      for (let chave in algarismos) {
        if (char === chave) {
          let nc = parseInt(algarismos[chave]);
          if (ln !== null) {
            if (nc < ln) {
              nc = nc * -1;
            }
          }
          resultado = resultado + nc;
          ln = nc;
        }
      }
    }
    setShowResults(`${entradaRom} em arábico = ${resultado}`);
  }

  
  function arábicoParaRomano() {
    
    if(entradaNum<1 || entradaNum>3999 || !numberRegex.test(entradaNum)) {
      setEntradaNum('')
      setErrorNumInput(true)
      setShowResults('')
      return
    }

    setErrorNumInput(false)
    
    let result = []
    let number = entradaNum
    
    let i=12;
    while(number>0) {
      let div = Math.floor(number/arabicos[i]);
      number = number%arabicos[i];
    while(div--) {
        result.push(romanos[i])
    }

      i--;

    }

    setShowResults(`${entradaNum} em romano = ${result.join('')} `)
   
  }


  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: {md:'85vh', xs:'80vh'} 
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          backgroundColor: "#fff",
          p: 3,
          pb:4
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ p:1 ,m: 1, backgroundColor: "#FFA400" }}>
            <CalculateIcon fontSize='large'/>
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight="bold">
            Conversor Arábico / Romano
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Romano para arábico</Typography>

            <TextField
              name="romano"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={validateRomInput}
              value={entradaRom}
               error={errorRomanoInput}
               helperText={errorRomanoInput ? 'Algarismos aceitos: I, V, X, L, C, D,M ' : ''}
               onKeyDown={(e)=> e.key ==='Enter' && romanoParaArabico()}
            />
          </Box>

          <Button
            variant="contained"
            onClick={romanoParaArabico}
            sx={{
              backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              },
            }}
          >
            <LooksOneIcon size='small'/>
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>

            <Typography>Arábico para romano</Typography>

            <TextField
              name="decimal"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={validateNumInput}
              value={entradaNum}
              error={errorNumInput}
              helperText={errorNumInput ? 'O número deve ser entre 1 e 3999.' : ''}
              onKeyDown={(e)=> e.key ==='Enter' && arábicoParaRomano()}
            />
          </Box>

          <Button
            variant="contained"
            onClick={arábicoParaRomano}
            sx={{
              backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              },
            }}
          >
            <ClearIcon size="small" />
          </Button>
        </Box>


        <Typography>{showResults}</Typography>
        
      </Paper>

    </Box>
  );
}
