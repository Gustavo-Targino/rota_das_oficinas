import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const personRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/
const clientes = []
const produtos = []

export default function Divisor() {

    const[cliente, setCliente] = useState('')
    const[clienteError, setClienteError] = useState(false)

    const validateClienteAdd = (event) => {
        const validacao = event.target.value

        if(personRegex.test(validacao) && validacao.trim()!='' ) {
            setCliente(validacao)
        } else {
            setCliente(validacao.replace(/.$/,""))
        }
    }

    function addCliente() {
        if(personRegex.test(cliente)) {
            clientes.push(cliente)
            setCliente('')
            setClienteError(false)
        } else {
            setCliente('')
            setClienteError(true)
        }
    }


    const[produto, setProduto] = useState('')
    const[produtoError, setProdutoError] = useState(false)

    const[selecteds, setSelecteds] = useState([])


    const [emptyClientes, setEmptyClientesError] = useState([])

    function createProductIndex(produto, consumidores) {
        return {
            nome: produto,
            clientes: consumidores
        }
    }


    const handleChange = (event, index) => {
        console.log(produtos)
        const usuario = event.target.value
        const nomeProduto = event.target.name
        console.log(usuario)
        if(typeof usuario === 'string') {
            setSelecteds(usuario.split(','))
        } else {
            setSelecteds(usuario)
            produtos[index].clientes = usuario
        }


        // setSelecteds(
        //   // On autofill we get a stringified value.

        //   sl => {
        //    if(typeof usuario === 'string') {
        //     return{
        //         ...sl, nome: nomeProduto, comprador: usuario
        //     }
                
        //    } else {
        //         return usuario
        //    }
        //   }
        //   //typeof value === 'string' ? valor.split(',') : valor
        // );
       
        
        
      };

      useEffect(()=> {
        console.log('mudou = ' + selecteds)
        
      }, [selecteds])


    
    function addProduct() {
    
        if(produto.trim()!='' && produto.length > 2) {
            setProdutoError(false)
            produtos.push(createProductIndex(produto, []))
            setProduto('')

            
        } else {
            setProduto('')
            setProdutoError(true)
        }

       
        

    }

    function show() {

        setEmptyClientesError([])
        produtos.map((produto)=> {
            if(produto.clientes.length === 0) {
                console.log(`${produto.nome} não possui nenhum cliente. Um produto deve ser consumido por ao menos um cliente.`)
                 setEmptyClientesError(old => [...old, `${produto.nome}`])
                console.log(emptyClientes)
            } else {
                console.log(`${produto.clientes} consumiram ${produto.nome}`)
            }
        })
        
    }


    return(
        <Box sx={{display:'flex', flexDirection: 'column' ,justifyContent:'center', alignItems:'center', gap:'2rem'}}> 

            <Typography component='h1' variant='h4'>Divisor</Typography>

            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                
                <Typography>Cliente</Typography>
             <TextField
              name="cliente"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={validateClienteAdd}
              value={cliente}
              error={clienteError}
              helperText={clienteError ? 'Insira um nome válido.' : ''}
              onKeyDown={(e)=> e.key ==='Enter' && addCliente()}
            /> 
            </Box>
                <Button onClick={addCliente}>
                    Adicionar
                </Button>
            </Box>


            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                
                <Typography>Produto</Typography>
             <TextField
              name="produto"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(e)=> setProduto(e.target.value)}
              value={produto}
              error={produtoError}
              helperText={produtoError ? 'Insira um produto válido' : ''}
              onKeyDown={(e)=> e.key ==='Enter' && addProduct()}
            /> 
            </Box>
                <Button onClick={addProduct}>
                    Adicionar
                </Button>
            </Box>

             <Box sx={{display:'flex', flexDirection:'column' ,justifyContent:'flex-start', alignItems:'center'}}>

            {emptyClientes.map((item)=> (
                <div>
                    <Alert variant="outlined" severity="error" sx={{my: 2}}>
                        {item} não possui clientes. Um produto deve haver clientes.
                    </Alert>
                </div>
            ))}
             

            {produtos.map((produto, index)=> (
                <Box key={index}>
                    <Typography >Quem consumiu {produto.nome}?</Typography>
                    
                 <FormControl sx={{ my:1 ,width: 300 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name={produto.nome}
                    value={produto.clientes}
                    onChange={(e)=> handleChange(e,index)}
                    renderValue={(selected) =>  selected.join(', ')}
                    MenuProps={MenuProps}
                   
                    >
                    {clientes.map((item) => (
                        <MenuItem key={item} value={item}>
                        <Checkbox checked={produto.clientes.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            ))}
    
                

        <Button onClick={show}>
                    Ver
            </Button>
            {/* <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Produtos</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selecteds}
                    onChange={handleChange}
                    input={<OutlinedInput label="Produtos" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {clientes.map((item) => (
                        <MenuItem key={item} value={item}>
                        <Checkbox checked={selecteds.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl> */}
            </Box>
            {/* <TextField
              name="decimal"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              //onChange={validateNumInput}
              //value={entradaNum}
              //error={errorNumInput}
              //helperText={errorNumInput ? 'O número deve ser entre 1 e 3999.' : ''}
              //onKeyDown={(e)=> e.key ==='Enter' && arábicoParaRomano()}
            /> */}
        </Box>
    )
}