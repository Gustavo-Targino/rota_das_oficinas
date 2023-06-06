import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const PDF = React.forwardRef(({conta}, ref)=> {


function createData(nome, consumiu, total) {
  return { nome, consumiu, total };
}

const dono = `Conta de${conta.map((pessoa)=>' '+pessoa.nome)}` 

const rows = conta.map((cliente)=> {
    return createData(`${cliente.nome}`, `${cliente.consumiu.join(', ')}`, `${cliente.total_a_pagar}` )

}) 


let total = conta.reduce(getTotal, 0);
function getTotal(total, item) {
 return total + item.total_a_pagar;
}

  return (

    <Box ref={ref} sx={{m:0, p:0}}>
       
       <Typography textAlign={'center'} variant='h6' component='h1'>{dono}</Typography>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>Nome</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Consumiu</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Total a pagar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.consumiu}</TableCell>
              <TableCell align="right">R${row.total}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={1} />
            <TableCell colSpan={1}></TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Total mínimo da conta: R${total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

<Typography sx={{my:2}} variant="subtitle1">
    A conta é gerada da seguinte forma: Todos os itens que o cliente consumiu são somados, e este valor é dividido pelo total de pessoas que consumiram o mesmo que aquele cliente. Exemplo: João consumiu água, de valor R$3. Então, João deve pagar R$3. José, Mayara e Clara consumiram uma pizza, de valor R$51. Então, cada um deve pagar R$17. Assim, o total é para cada item que o cliente comprou. No exemplo de José, Mayara e Clara, caso eles comprassem duas pizzas, ao invés de uma, o valor deve ser R$34 para cada.
</Typography>

<Typography variant="overline" display="block" gutterBottom>
    © Gustavo Targino - Desenvolvedor Front-End - {new Date().getFullYear()}
</Typography>

    </Box>
  );
})
