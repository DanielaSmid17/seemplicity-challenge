import React, { useEffect, useState } from 'react'
import findings from '../data/findings.json'
import styled from 'styled-components'

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { MondaySmall } from '../icons/MondaySmall';
import { JiraSmall } from '../icons/JiraSmall';
import { ServiceNowSmall } from '../icons/ServiceNowSmall';

import { useSelector, useDispatch } from 'react-redux';
import { openTicketModal, closeTicketModal } from './store/slices/ticketModalSlice';

import TicketModal from './TicketModal';
import MockAdapter from "axios-mock-adapter";
import axios from 'axios';


const Findings = () => {
    
    const [rows, setRows] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    
    // axios mock instant initiation
    const mock = new MockAdapter(axios);
    mock.onGet("/").reply(200, {findings: findings})
    
    // redux ticket selection and modal opener handler
    const { isTicketModalOpen } = useSelector((state) => state.ticketModal);
    const dispatch = useDispatch()
    
    const handleCloseModal = () => {
        dispatch(closeTicketModal());
    };
    
    const handleOpenModal = (row, i) => {
        dispatch(openTicketModal({row, i}));
    };
    
    // fetching findings with mock API call
    useEffect(() => {
        getFindings()
    }, [])
    
    const getFindings = async () => {
        const {data} = await axios.get("/")
        setRows(data.findings)  
    }

    // updating finding with mock API call
    
    const createTicket = async (updatedFinding, idx) => {
        mock.onPut(`/findings/${updatedFinding.id}`, updatedFinding).reply(200, updatedFinding);
        
        const response = await axios.put(`/findings/${updatedFinding.id}`, updatedFinding)

        if(response.status == 200 && response.data){
            const rowsCopy = [...rows]
            rowsCopy[idx] = response.data
            setRows(rowsCopy)
    
            setTimeout(() => {
                setOpenSnackbar(true)
                
            }, 1000); 
        }
        
    }
    

    // conditional renderer for ticket column on table
    const ticketRender = (ticket) => {
        switch(ticket.provider) {
            case 'monday':
              return <Container>
                  <MondaySmall />
                  <Typography align='left'>Monday - {ticket.id}</Typography>
                </Container>;
            case 'jira':
                return <Container>
                    <JiraSmall />
                    <Typography align='left'>Jira - {ticket.id}</Typography>
                </Container>
                ;
                case 'service_now':
                    return <Container>
                        <ServiceNowSmall />
                        <Typography align='left'>Service Now - {ticket.id}</Typography>
                    </Container>
            default:
                break;
        }
    }

    // success message handler

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };
    
      const action = (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
      );
      

  return (
    <div style={{padding: '10px'}}>
        <div style={{padding: '10px 15px'}}>
            <Typography align='left' sx={{fontSize: "30px", fontWeight: 600}}>Findings</Typography>
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
            <TableRow >
                <TableCell sx={{fontWeight: 600}}>Title</TableCell>
                <TableCell sx={{fontWeight: 600}}>Description</TableCell>
                <TableCell sx={{fontWeight: 600}}>Ticket</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows?.map((row, i) => (
                <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.ticket ? ticketRender(row.ticket) : <Button onClick={()=> handleOpenModal(row, i)} sx={{textTransform: 'none', padding: 0}}>Create ticket</Button>}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        {openSnackbar && <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleClose}
            action={action}
            >
            <Alert severity="success">Ticket updated successfully!</Alert>
        </Snackbar>}
        {isTicketModalOpen && <TicketModal open={isTicketModalOpen} handleClose={handleCloseModal} createTicket={createTicket} />}
    </div>
  )
}

const Container = styled.div`
flex-grow: 1;
display: grid;
grid-template-columns: 30px 2fr;
max-width: 220px;
`
export default Findings