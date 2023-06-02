import {  useEffect, useRef } from "react"
import styles from './JogoDaVida.module.css'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const GRID_WIDTH = 350;             //largura do campo
const GRID_HEIGHT = 350;           //altura do campo
const RES = 5;                    //tamanho dos lados dos quadrados
const COL = GRID_WIDTH / RES;    //quantidade de colunas
const ROW = GRID_HEIGHT / RES;  //quantidade de linhas

export default function JogoDaVida() {

    const canvasRef = useRef()

   
    function createGrid(cols, rows) {
        return new Array(cols)
          .fill(null)
          .map(() =>
            new Array(rows).fill(null).map(() => Math.round(Math.random()))
          );
      }

    function drawGrid(grid, cols, rows, reslution, ctx) {
        ctx.clearRect(0, 0, cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const cell = grid[i][j];
            ctx.fillStyle = cell ? "#FFA400" : "#d1d5db";
            ctx.fillRect(i * reslution, j * reslution, reslution, reslution);
          }
        }
      }

      function nextGen(grid) {
        const nextGen = grid.map((arr) => [...arr]); //make a copy of grid with spread operator
    
        for (let col = 0; col < grid.length; col++) {
          for (let row = 0; row < grid[col].length; row++) {
            const currentCell = grid[col][row];
            let sumNeighbors = 0; //to verify the total of neighbors
    
            //Verifying the 8 neigbours of current cell
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) {
                  continue; // because this is the current cell's position
                }
    
                const x = col + i;
                const y = row + j;
    
                if (x >= 0 && y >= 0 && x < COL && y < ROW) {
                  const currentNeighbor = grid[col + i][row + j];
                  sumNeighbors += currentNeighbor;
                }
              }
            }
    
            //Aplying rules
            if (currentCell === 0 && sumNeighbors === 3) {
              nextGen[col][row] = 1;
            } else if (
              currentCell === 1 &&
              (sumNeighbors < 2 || sumNeighbors > 3)
            ) {
              nextGen[col][row] = 0;
            }
          }
        }
        return nextGen;
      }



    useEffect(()=> {

        const canvas = canvasRef.current
        
        const context = canvas.getContext('2d')

        canvas.width = GRID_WIDTH
        canvas.height = GRID_HEIGHT

        
        let grid = createGrid(COL, ROW)

        requestAnimationFrame(update);
        function update() {
          grid = nextGen(grid);
          drawGrid(grid, COL, ROW, RES, context);
          requestAnimationFrame(update);
        } 
       
    }, [])

    function generateAnother() {
        const canvas = canvasRef.current
        
        const context = canvas.getContext('2d')

        canvas.width = GRID_WIDTH
        canvas.height = GRID_HEIGHT

        
        let grid = createGrid(COL, ROW)

        requestAnimationFrame(update);
        function update() {
          grid = nextGen(grid);
          drawGrid(grid, COL, ROW, RES, context);
          requestAnimationFrame(update);
        } 
       
    }

    return (
        
        <Box sx={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center', marginTop:'9rem'}}>

            <canvas ref={canvasRef} className={styles.canva}></canvas>
       

                <Button variant='outlined' onClick={generateAnother} sx={{mt:2, border:'1px solid #FFA400', color:'#FFA400', "&:hover": {
                backgroundColor: "transparent",
                border:'1px solid #FFA400',
                color: "#FFA400",
              }}}>Gerar outro</Button>

        </Box>
        
       
       
    )
}