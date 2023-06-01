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

// const romanos = [
//     "I",
//     "IV",
//     "V",
//     "IX",
//     "X",
//     "XL",
//     "L",
//     "XC",
//     "C",
//     "CD",
//     "D",
//     "CM",
//     "M"
// ]

// const arabicos = [
//     1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000
// ]

const algarismos = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const romanRegex = /^[IVXLCDMivxlcdm]+$/

const numberRegex = /^[0-9]*$/

export default function Conversor() {
  


  const [entradaRom, setEntradaRom] = useState("");
  const [romano, setRomano] = useState("");
  const [errorRomanoInput, setErrorRomanoInput] = useState(false);

  const validateRomInput = (event)=> {

        let validacao = event.target.value

        if(romanRegex.test(validacao)) {
            console.log(validacao)
            setEntradaRom(validacao)
        } else {
            setEntradaRom(validacao.replace(/.$/,""))
        }
        
  }


  const [entradaNum, setEntradaNum] = useState("");
  const[decimal, setDecimal] = useState('');
  const [errorNumInput, setErrorNumInput] = useState(false);

  function romanoParaDecimal() {
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
    setDecimal(resultado);
  }

  function decimalParaRomano () {

    if(entradaNum>3999) {
        setEntradaNum('')
        setOpen(true)
        return
    }

    let resultado = '';
    let divisao = 0;
    let resto = entradaNum;
    let vetorNumeros = [1000,500,100,50,10];
    let vetorRomanos = ['M','D','C','L','X'];
    let vetorDezena = ['I','II','III','IV','V','VI','VII','VIII','IX'];

    for (let i = 0; i < vetorNumeros.length; i++) {
        divisao = parseInt(resto/vetorNumeros[i]);
        resto = entradaNum % vetorNumeros[i];
        if (divisao > 0) {
            for (let x = 0; x < divisao; x++) {
                resultado = resultado + vetorRomanos[i];
            }
        } else if (resto < 10) {
            if (vetorDezena[resto-1] !== undefined) {
                resultado = resultado + vetorDezena[resto-1];
            }
            break;
        }
    }
        
            setRomano(resultado)
       
  }


  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
          pb: 5,
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
          <Avatar sx={{ m: 1, backgroundColor: "#FFA400" }}>
            <CalculateIcon />
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
            <Typography>Romano para decimal</Typography>

            <TextField
              name="romano"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={validateRomInput}
               value={entradaRom}
              // error={emailInvalido}
              // helperText={emailInvalido ? 'Digite um e-mail válido' : ''}
            />
          </Box>

          <Button
            variant="contained"
            onClick={romanoParaDecimal}
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
            <Typography >Decimal para romano</Typography>

            <TextField
              name="decimal"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(e) => setEntradaNum(e.target.value)}
               value={entradaNum}
              error={open}
              helperText={open ? 'O número deve ser entre 1 e 3999.' : ''}
            />
          </Box>

          <Button
            variant="contained"
            onClick={decimalParaRomano}
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

        <Typography>Decimal: {decimal}</Typography>
        <Typography>Romano: {romano}</Typography>
      </Paper>

    </Box>
  );
}
