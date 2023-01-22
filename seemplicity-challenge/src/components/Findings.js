import React, { Fragment } from 'react'
import findings from '../data/findings.json'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { MondaySmall } from '../icons/MondaySmall';
import { JiraSmall } from '../icons/JiraSmall';
import { ServiceNowSmall } from '../icons/ServiceNowSmall';
import styled from 'styled-components'

const Findings = () => {
    const rows = findings;


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
      

  return (
    <div style={{backgroundColor: '#F9F9FB', padding: '10px'}}>
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
          {rows.map((row, i) => (
              <TableRow
              key={row.i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.ticket ? ticketRender(row.ticket) : <Button sx={{textTransform: 'none'}}>Create ticket</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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