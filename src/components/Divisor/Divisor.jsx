import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import ContaPDF from "./ContaPDF";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    },
  },
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const personRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/
const clientes = []
const produtos = []

export default function Divisor() {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

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

    const[preco, setPreco] = useState('')
    const[precoError, setPrecoError] = useState(false)

    const[selecteds, setSelecteds] = useState([])


    const [emptyClientes, setEmptyClientesError] = useState([])


    const[soma, setSoma] = useState(0)

    function createProductIndex(produto, consumidores, valor) {
        return {
            nome: produto,
            clientes: consumidores,
            preco: valor
        }
    }


    const handleChange = (event, index) => {
       
        const usuario = event.target.value
        
      
        if(typeof usuario === 'string') {
            setSelecteds(usuario.split(','))
        } else {
            setSelecteds(usuario)
            produtos[index].clientes = usuario
        }
       
        
        
      };

     

    
    function addProduct() {
        
        if(preco.length===0 || preco < 1) {
            setPrecoError(true)
            return
        }

        if(produto.trim()!='' && produto.length > 2) {
            setProdutoError(false)
            setPrecoError(false)
            produtos.push(createProductIndex(produto, [], preco))
            setPreco('')
            setProduto('')
        } else {
            setProduto('')
            setProdutoError(true)
        }

       
        

    }

    const [result, setResult] = useState([])

    function show() {

        let soma = 0
        setEmptyClientesError([])
        setSoma(0)
        let exception = 0
        produtos.map((produto)=> {
            if(produto.clientes.length === 0) {
               
                 setEmptyClientesError(old => [...old, `${produto.nome}`])
               
                exception++
            } else {
               
                soma += parseFloat(produto.preco)
            }
        })

        if( clientes.length!=0 && produtos.length!=0 && exception===0 ) {
           setSoma(soma)
           handleOpen()

            
           let conta_pessoas = [...clientes]
           
           conta_pessoas.map((obj, index)=> {
                conta_pessoas[index] = {
                    nome: clientes[index],
                    consumiu: [],
                    total_a_pagar: 0,
                }
           })
           
         


           {produtos.map((item)=> {
            
            
            item.clientes.forEach(function(pessoa) {
               

                conta_pessoas.forEach(function(obj) {
                    if(pessoa === obj.nome) {
                      
                            obj.nome = pessoa
                            obj.consumiu.push(item.nome)
                            obj.total_a_pagar += Math.round(parseFloat(item.preco/item.clientes.length))
                    }
                })


            })
           })}

           

          
           setResult(conta_pessoas)


        } else if(clientes.length === 0 || produtos.length === 0) {
            window.alert('Insira ao menos um cliente e um produto.')
        } else {
            setSoma(0)
        }
    }


    return(
        <Box sx={{display:'flex', flexDirection: 'column' ,justifyContent:'center', alignItems:'center', gap:'2rem', pt:5}}> 

            <Typography component='h1' variant='h4'>Divisor</Typography>

            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:1}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                
                <Typography>Cliente</Typography>
             <TextField
              name="cliente"
              variant="outlined"
              fullWidth
              sx={{ mb: 1,  '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FFA400', // Defina a cor da borda quando o TextField está selecionado
                },
              }, }}
              onChange={validateClienteAdd}
              value={cliente}
              error={clienteError}
              helperText={clienteError ? 'Insira um nome válido.' : ''}
              onKeyDown={(e)=> e.key ==='Enter' && addCliente()}
            /> 
            </Box>
                <Button variant='contained' sx={{ backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              }}} onClick={addCliente}>
                    Adicionar
                </Button>
            </Box>


            <Box sx={{display:'flex', flexDirecion:'column' ,justifyContent:'center', alignItems:'center', gap:1}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                
                <Typography>Produto</Typography>
                <Box sx={{display:'flex', gap:1}}>
                     <TextField
                    name="produto"
                    variant="outlined"
                    sx={{ mb: 1,  '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#FFA400', // Defina a cor da borda quando o TextField está selecionado
                        },
                      }, }}
                    onChange={(e)=> setProduto(e.target.value)}
                    value={produto}
                    error={produtoError}
                    helperText={produtoError ? 'Insira um produto válido' : ''}
                    onKeyDown={(e)=> e.key ==='Enter' && addProduct()}
                    /> 

                <TextField
                error={precoError}
                id="standard-number"
                label="Preço"
                type="number"
                value={preco}
                sx={{width:'5rem'}}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                onChange={(e)=> setPreco(e.target.value)}
                helperText={precoError ? 'Insira um número positivo.' : ''}
                />
                </Box>
            
            </Box>
                <Button variant='contained' sx={{ backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              }}}  onClick={addProduct}>
                    Adicionar
                </Button>
            </Box>

             <Box sx={{display:'flex', flexDirection:'column' ,justifyContent:'flex-start', alignItems:'center'}}>

            {emptyClientes.length > 0 &&
                <div>
                    <Alert variant="outlined" severity="error" sx={{my: 2}}>
                        {emptyClientes.join(',')} não possui clientes. Um produto deve ser consumido por ao menos um cliente.
                    </Alert>
                </div>
           }
             

            {produtos.map((produto, index)=> (
                <Box key={index}>
                    <Typography >Quem consumiu {produto.nome}? R${produto.preco} </Typography>
                    
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
                        <Checkbox checked={produto.clientes.indexOf(item) > -1} sx={{'&.Mui-checked': {
                        color: '#FFA400'
                        },}} />
                        <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            ))}
    
                

        <Button  variant='contained' sx={{ backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              }}} onClick={show}>
                    Ver conta
            </Button>
           
            </Box>
          

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box  sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
                Conta
                </Typography>
                {result.map((pessoa, index)=> (
                    <div key={index}>
                <Typography  id="modal-modal-description" sx={{ mt: 2 }}>

                    {`${pessoa.nome} consumiu ${pessoa.consumiu.join(', ')}, total a pagar: R$${pessoa.total_a_pagar}`}

                </Typography>
                <Divider />
                
                    </div>
                ))}

                <Typography sx={{mt:3, mb:1}} fontWeight={'bold'}>Valor bruto mínimo da conta: R${soma}</Typography>

                <Box>
                    <Button variant='contained' sx={{ backgroundColor: "#FFA400",
              mt: 2,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#FFA400",
              }}} endIcon={<PictureAsPdfIcon/>} onClick={(e) => ContaPDF(result)}>Salvar PDF</Button>
                </Box>
               
            </Box>
            </Modal>



        </Box>
    )
}