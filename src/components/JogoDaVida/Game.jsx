import React, { useState, useCallback, useRef, forwardRef ,useEffect } from "react";
import { produce } from "immer";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const numRows = 15;
const numCols = 15;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const Game = () => {


  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {

    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              } 
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            } 
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

 

  return (
    <>
      <Typography component='h1' variant='h4' sx={{mb:3}}>Jogo da vida</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "#FFA400" : '#f3f4f6',
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
<div style={{marginTop:'2rem'}}>
   
      <Button
      sx={{color:'#fff', backgroundColor: '#FFA400', borderColor:'#FFA400', "&:hover": {
        backgroundColor: "transparent",
        borderColor:'#FFA400',
        color: "#FFA400"} }}
        variant='outlined'
        onClick={() => {
          if(grid.find(linha => linha.includes(1)) === undefined && !running) {
            setOpen(true)
            if(running) {
              setRunning(!running)
              return
            }
            return
          }
          setRunning(!running);
          if (!running) {
            setOpen(false)
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Parar" : "Iniciar"}
      </Button>
      <Button
      sx={{mx:3, color:'#fff', backgroundColor: '#FFA400', borderColor:'#FFA400', "&:hover": {
        backgroundColor: "transparent",
        borderColor:'#FFA400',
        color: "#FFA400"} }}
      variant='outlined'
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        Aleatório
      </Button>
      <Button
      sx={{color:'#fff', backgroundColor: '#FFA400' ,borderColor:'#FFA400', "&:hover": {
        backgroundColor: "transparent",
        borderColor:'#FFA400',
        color: "#FFA400"} }}
      variant='outlined'
        onClick={() => {
          setGrid(generateEmptyGrid());
          if(running) {
            setRunning(!running)
          }
        }}
      >
        Limpar
      </Button>



       <Snackbar open={open} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            O jogo não pode iniciar com as células vazias!
          </Alert>
        </Snackbar>
      </div>
     

    </>
  );
};

export default Game;