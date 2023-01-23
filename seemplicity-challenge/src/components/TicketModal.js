import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { generateId } from '../utils/functions';

import { useSelector } from 'react-redux';
import { Jira } from '../icons/Jira';
import { Monday } from '../icons/Monday';
import { ServiceNow } from '../icons/ServiceNow';

const jiraProjects = ['Frontend', 'Backend', 'UX/UI']
const mondayProjects = ['Tuesday', 'Wednesday', 'Thursday']
const serviceNowProjects = ['IT', 'Customer', 'Employee']
const issueTypes = ['Bug', 'Story', 'Type']
const providers = ['monday', 'service_now', 'jira']

 const TicketModal = ({open, handleClose, createTicket}) => {
  const [provider, setProvider] = useState(providers[0])
  const [projectSelected, setProjectSelected] = useState(null)
  const [mondayProject, setMondayProject] = useState(null)
  const [jiraProject, setJiraProject] = useState(null)
  const [serviceNowProject, setServiceNowProject] = useState(null)
  const [issueSelected, setIssueSelected] = useState(null)
  
  const info = useSelector(state => state.ticketModal.info)
  const idx = useSelector(state => state.ticketModal.idx)
  const [title, setTitle]  = useState(info.title)
  const [description, setDescription]  = useState(info.description)

  const handleMondayChange = (event) => {
    setMondayProject(event.target.value);
    setProjectSelected(event.target.value)
  };
  const handleJiraChange = (event) => {
    setJiraProject(event.target.value);
    setProjectSelected(event.target.value)
  };
  const handleServiceNowChange = (event) => {
    setServiceNowProject(event.target.value);
    setProjectSelected(event.target.value)
  };

  const validating = () => {
    if (!title || typeof title != 'string'){
      console.log('entro title')
      return false
    } 
    else if (!description || typeof description != 'string'){
      console.log('entro des')
      return false  
    } 
    else if (!provider || !(providers.includes(provider))){
      console.log('entro prov')
      return false
      
    } 
    else if (!projectSelected ){
      console.log('entro proj', projectSelected, mondayProjects)
      return false
      
    } 
    else if (!issueSelected || !(issueTypes.includes(issueSelected))){
      console.log('entro issue')
      return false
    } 
    else return true
  }

  const generateTicket = () => {
    const validated = validating();
    if (validated) {
      const newTicket = {
        title,
        description,
        ticket: {id: generateId(), provider, project: projectSelected, issue: issueSelected}
      }
      createTicket(newTicket, idx);
      handleClose();
    }

  }



  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: {
          width: '600px',
          borderRadius: '20px',
          padding: '16px'
         }
      }}
      >
        <DialogTitle >
                <Grid item container>
                    <Grid item container justifyContent='flex-start' xs={7}>
                        <Typography align='left' sx={{color: '#482A81',  fontSize: '30px'}}>
                            Create Ticket
                        </Typography>
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='flex-end' xs={5}>
                        <IconButton 
                        sx={{color: '#3D405A'}}
                        onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                     </Grid>
                </Grid>
            </DialogTitle>
        <DialogContent>
          <Grid item container alignItems='center'>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={provider}
              onChange={e => {setProvider(e.target.value); setProjectSelected(null); setIssueSelected(null); } }
            >
              <FormControlLabel value="monday" control={<Radio />} label={<Monday />} />
              <FormControlLabel value="jira" control={<Radio />} label={<Jira /> } />
              <FormControlLabel value="service_now" control={<Radio />} label={<ServiceNow />} />
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item container>
            <Grid item container direction='column' sx={{width: "50%"}}>
                <Typography sx={{marginLeft: "10px"}}>Project</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  {provider === 'monday' && <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={mondayProject}
                    onChange={handleMondayChange}
                  > 
                  { mondayProjects.map(project => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  )) }
                    
                  </Select>}
                  {provider === 'jira' && <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={jiraProject}
                    onChange={handleJiraChange}
                  > 
                  { jiraProjects.map(project => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  )) }
                    
                  </Select>}
                  {provider === 'service_now' && <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={serviceNowProject}
                    onChange={handleServiceNowChange}
                  > 
                  { serviceNowProjects.map(project => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  )) }
                    
                  </Select>}
                  
                </FormControl>
            </Grid>
            {projectSelected && <Grid item container direction='column' sx={{width: "50%"}}>
                <Typography sx={{marginLeft: "10px"}}>Issue type</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    defaultValue={issueTypes[0]}
                    value={issueSelected}
                    onChange={e => setIssueSelected(e.target.value)}
                  >
                    { issueTypes.map(issue => (
                    <MenuItem value={issue}>{issue}</MenuItem>
                  )) }
                  </Select>
                </FormControl>
            </Grid>}
            {(projectSelected && issueSelected) && 
            <React.Fragment>

            <Grid item container direction='column' sx={{padding: '0 8px',  marginTop: '10px'}}>
                <Typography sx={{marginLeft: "5px"}}>Title</Typography>
                <TextField
                  id="outlined-size-small"
                  defaultValue={title}
                  size="small"
                  sx={{marginTop: "5px"}}
                  onChange={e => setTitle(e.target.value)}
                  />
            </Grid>
            <Grid item container direction='column' sx={{padding: '0 8px', marginTop: '15px'}}>
                <Typography sx={{marginLeft: "5px"}}>Description</Typography>
                <TextField
                  id="outlined-size-small"
                  defaultValue={description}
                  multiline
                  rows={4}
                  sx={{marginTop: "5px"}}
                  onChange={e => setDescription(e.target.value)}
                  />
            </Grid>
          </React.Fragment>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{width: '120px', borderRadius: '40px', border: '1px solid black', color: '#000000', textTransform: 'none'}}>Cancel</Button>
          <Button onClick={generateTicket} sx={{width: '120px', borderRadius: '40px', backgroundColor: '#B0BCFD', color: '#fff', textTransform: 'none', '&:hover': {backgroundColor: '#B0BCFD', opacity: .9}}}>
            Create Ticket
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default TicketModal;
