import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

import "../styles/FormStyle.css";

var isGithubUrl = require('is-github-url');

const profileMaxSize = 4098; // IN kb
const profileMinSize = 100; // IN kb

const courseTitleMaxLength = 50;
const collegeTitleMaxLength = 50;

const projectTitleMaxLength = 25;
const projectIntroMaxLength = 100;
const projectRoleMaxLength = 100;



const courseTitleLabel = "Course/Degree Title  (maximum " + courseTitleMaxLength + " characters) *"
const collegeTitleLabel = "College/Institue/School name (maximum " + collegeTitleMaxLength + " characters) *"

const projectTitleLabel = "Project Title  (maximum " + projectTitleMaxLength + " characters) *"
const projectIntroLabel = "Write a quick breif about project (maximum " + projectIntroMaxLength + " characters) *"
const projectRoleLabel = "Project Roles, each separated by '.' (maximum " + projectRoleMaxLength + " characters) *"


const techStacks = ["HTML", "CSS", "JS", "React", "Express", "NodeJS", "MongoDB", "MUI", "ChakraUI"]


const Form = () => {


  const [state, setState] = useState(false); // State for conditional
   

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview("https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png")
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }


  const [studentName , setStudentName] = useState('');
  const [tagline , setTagline] = useState('');
  const [address , setAddress] = useState('');
  const [emailID , setEmailID] = useState('');
  const [contact , setContact] = useState('');
  const [portfolioLink , setPortfolioLink] = useState('');
  const [githubLink , setGithubLink] = useState('');
  const [linkedinLink , setLinkedinLink] = useState('');
  const [about , setAbout] = useState('');

  const [courseTitle, setCourseTitle] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [educationData, setEducationData] = useState([]);

  const [courseTitleError, setCourseTitleError] = useState(false);
  const [collegeNameError, setCollegeNameError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const [displayEducationData, setDisplayEducationData] = useState(false);

  const [openEducationForm, setOpenEducationForm] = React.useState(false);

  
  const [displayProjectData, setDisplayProjectData] = useState(false);


  const handleOpenEducationForm = () => {
    if(educationData.length == 3)
    {
      alert("You already have added three educations, can't add more")
      return;
    }
    setOpenEducationForm(true);
  };

  const handleCloseEducationForm = () => {
    setOpenEducationForm(false);
  };

  const addEducation = () => {
    if (courseTitle.length == 0) {
      alert("Course/Degree title can't be blank");
      return;
    }
    if (collegeName.length == 0) {
      alert("College/Institue/School name can't be blank");
      return;
    }
    if (startDate.length == 0 || endDate.length == 0) {
      alert("Start date and end date can't be blank");
      return;
    }
    if (startDate > endDate) {
      alert("End date can not be erilier than start date");
      return;
    }
    setOpenEducationForm(false)
    displayEducationDetails();
  }

  const displayEducationDetails = () => {
    let temp = {
      "course": courseTitle,
      "college": collegeName,
      "startDate": startDate,
      "endDate": endDate
    }
    setEducationData([...educationData, temp]);
    setDisplayEducationData(true);

    

  }

  const [openProjectForm, setOpenProjectForm] = React.useState(false);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectIntro, setProjectIntro] = useState('');
  const [projectRole, setProjectRole] = useState('');
  const [projectGithubLink, setProjectGithubLink] = useState('');
  const [projectLiveLink, setProjectLiveLink] = useState('');
  const [projectTechStacks, setProjectTechStacks] = useState('');
  const [projectCollaborated, setProjectCollaborated] = useState(false);

  const [projectData, setProjectData] = useState([]);

  const handleOpenProjectForm = () => {
    if(projectData.length == 2)
    {
      alert("You have already added two projects, can't add more")
      return;
    }
    setOpenProjectForm(true);
  };

  const handleCloseProjectForm = () => {
    setOpenProjectForm(false);
  };

  const addProject = () => {
    if (projectTitle.length == 0) {
      alert("Project title can't be blank");
      return;
    }
    if (projectIntro.length == 0) {
      alert("Project about section can't be blank");
      return;
    }
    if (!isGithubUrl(projectGithubLink)) {
      alert("Github repository link should be a valid url");
      return;
    }
    if (!validateUrl(projectLiveLink)) {
      alert("Project live link should be a valid url");
      return;
    }
    if(projectRole.length == 0)
    {
      alert("Project roles section can't be blank")
      return;
    }
    if(techStacks.length < 2)
    {
      alert("Select atleast one techstacks of project");
      return;
    }
    let roles = projectRole.split(".");
    let temp = {
      "title": projectTitle,
      "introduction": projectIntro,
      "githubLink": projectGithubLink,
      "liveLink": projectLiveLink,
      "roles": roles,
      "collaboration":projectCollaborated,
      "techStacks":projectTechStacks
    }
    setProjectData([...projectData, temp]);
    setDisplayProjectData(true);
    setProjectTechStacks([]);
    setOpenProjectForm(false)
  }

  

  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  function editFormButtonPress(e)
  {
    console.log(e.target.value)
  }

  function submitForm()
  {
    if(!selectedFile)
    {
      alert("Please upload the profile image");
      return
    }
    var imgSize = Math.round(selectedFile.size/1024); // In MB
    if(imgSize > profileMaxSize)
    {
      alert("File is too big, please select a file of size less than "+Math.round(profileMaxSize/1024)+" MB");
      return
    }
    if(imgSize < profileMinSize)
    {
      alert("File is too small, please select a file of size greater than "+profileMinSize+" KB");
      return
    }
    if(studentName == "")
    {
      alert("Name field can't be blank")
      return
    }
    if(tagline == "")
    {
      alert("tagline can't be blank")
      return
    }
    var phoneno = /^\d{10}$/;
    if(!contact.match(phoneno))
    {
      alert("Enter a valid contact number")
      return
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID)))
    {
      alert("Enter a valid Email ID")
      return
    }
    if(address == "")
    {
      alert("Address can't be blank")
      return
    }
    if(!validateUrl(portfolioLink))
    {
      alert("Enter a valid portfolio link")
      return
    }
    if(!validateUrl(linkedinLink))
    {
      alert("Enter a valid linkedin profile link")
      return
    }
    if(!isGithubUrl(githubLink))
    {
      alert("Enter a valid github profile link")
      return
    }
    
    if(about.length < 100)
    {
      alert("write atleast 100 characters in about section")
      return
    }
    if(educationData.length == 0)
    {
      alert("Add atleast one Education")
      return
    }
    if(projectData.length == 0)
    {
      alert("Add atleast one Project")
      return
    }
    alert("Form validated")
    
  }

  return (
    <div className='form-container'>
      <div className='header-section'>
        <div>
          <div className='proflile-img'>
            <img src={preview} />
            <div className="middle">
              <input type="file" onChange={onSelectFile} accept="image/png, image/jpeg" className="custom-file-input" />
            </div>
          </div>
        </div>
        <div className='basic-input'>
          <div className='name-and-tagline'>
            <input value={studentName} onInput={e => setStudentName(e.target.value)}  type={"text"} placeholder={"Enter your full name *"} />
            <input  value={tagline} onInput={e => setTagline(e.target.value)}  type={"text"} placeholder={"Enter your profile tagline *"} />
          </div>
          <hr />
          <div className='social-media-links'>
            <table>
              <tr>
                <td>
                  <input  value={contact} onInput={e => setContact(e.target.value)}  id='contact-input' type={"number"} placeholder={"Contact Number *"} />
                </td>
                <td>
                  <input  value={portfolioLink} onInput={e => setPortfolioLink(e.target.value)}  id='portfolio-url-input' type={"url"} placeholder={"Portfolio Url *"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input  value={emailID} onInput={e => setEmailID(e.target.value)}  id='email-id-input' type={"email"} placeholder={"Email ID *"} />
                </td>
                <td>
                  <input  value={linkedinLink} onInput={e => setLinkedinLink(e.target.value)}  id='linkedin-url-input' type={"url"} placeholder={"Linkedin Url *"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input  value={address} onInput={e => setAddress(e.target.value)}  id='address-input' type={"text"} placeholder={"Address *"} />
                </td>
                <td>
                  <input  value={githubLink} onInput={e => setGithubLink(e.target.value)}  id='github-url-input' type={"url"} placeholder={"Github Url *"} />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className='input2'>
          <textarea  value={about} onInput={e => setAbout(e.target.value)}  placeholder={"Enter your about section (maximum 300 characters) *"} maxLength={"300"} ></textarea>
        </div>
      </div>
      <hr />
      <div className='footer-section'>
        <div className='education-form'>
          <Button className='add-btn' variant="outlined" onClick={handleOpenEducationForm}>
            Add Education
          </Button>
          <Dialog open={openEducationForm} onClose={handleCloseEducationForm}>
            <DialogTitle
            // style={{"textAlign":"center"}}
            >Add Education</DialogTitle>
            <DialogContent>
              <TextField
                value={courseTitle} onInput={e => setCourseTitle(e.target.value)}
                inputProps={{ maxLength: courseTitleMaxLength }}
                autoFocus
                margin="dense"
                id="course-title"
                label={courseTitleLabel}
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                value={collegeName} onInput={e => setCollegeName(e.target.value)}
                inputProps={{ maxLength: collegeTitleMaxLength }}
                margin="dense"
                id="college-name"
                label={collegeTitleLabel}
                type="text"
                fullWidth
                variant="outlined"
              />
              <div className='start-end-date'>
                <TextField
                  value={startDate} onInput={e => setStartDate(e.target.value)}
                  margin="dense"
                  id="start-date"
                  label="Start Date*"
                  type="month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  value={endDate} onInput={e => setEndDate(e.target.value)}
                  margin="dense"
                  id="end-date"
                  label="End Date*"
                  type="month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEducationForm}>Cancel</Button>
              <Button onClick={addEducation}>Add</Button>
            </DialogActions>
          </Dialog>
          {displayEducationData ?
            <div className="display-education-cont">
              {educationData.map((el, index) => (  
         <div className='display-education-section'>
         <p>{el.course}</p>
         <p><span>from</span> {el.college}</p>
         <p>( {el.startDate} - {el.endDate} )</p>
         <div className='edit-delete-buttons'>
         <Fab onClick={()=>{
           openEducationForm(true);
         }} color="primary" size='small' aria-label="edit">
           <EditIcon />
         </Fab>
         &nbsp;&nbsp;
         <Fab onClick={() =>{
            var temp = [...educationData];
            temp.splice(index, 1);
            setEducationData(temp);
         }}  color="error" size='small' aria-label="delete">
           <DeleteIcon />
         </Fab>
       </div>
       </div>
        ))}   
            </div>
            : ""}
        </div>
        <div className='project-form'>
          <Button className='add-btn' variant="outlined" onClick={handleOpenProjectForm}>
            Add Project
          </Button>
          <Dialog open={openProjectForm} onClose={handleCloseProjectForm}>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
              <TextField
                value={projectTitle} onInput={e => setProjectTitle(e.target.value)}
                size="small"
                inputProps={{ maxLength: projectTitleMaxLength }}
                autoFocus
                margin="dense"
                id="project-title"
                label={projectTitleLabel}
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                value={projectIntro} onInput={e => setProjectIntro(e.target.value)}
                inputProps={{ maxLength: projectIntroMaxLength }}
                margin="dense"
                id="name"
                label={projectIntroLabel}
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
              <TextField
                value={projectGithubLink} onInput={e => setProjectGithubLink(e.target.value)}
                size="small"
                margin="dense"
                id="name"
                label="Enter your project github repo link"
                type="url"
                fullWidth
                variant="outlined"
              />
              <TextField
                value={projectLiveLink} onInput={e => setProjectLiveLink(e.target.value)}
                size="small"
                margin="dense"
                label="Enter your project live link"
                id="standard-basic" type="url" variant="outlined"
                fullWidth
              />
              <TextField
                size="small"
                value={projectRole} onInput={e => setProjectRole(e.target.value)}
                inputProps={{ maxLength: projectRoleMaxLength }}
                margin="dense"
                label={projectRoleLabel}
                id="standard-basic" type="url" variant="outlined"
                fullWidth
              />

              
<FormGroup>
<FormControlLabel control={<Switch onChange={(e)=>{setProjectCollaborated(e.target.checked)}} />} label="Was it a Collaborative project?" />
              </FormGroup>

              <Autocomplete
              onChange={(option) => {
                if (option.target.innerText) {
                  setProjectTechStacks([...projectTechStacks, option.target.innerText])
                  // tagsArr.push(option.target.innerText);
                  if (projectTechStacks.length === 5) {
                    console.log(projectTechStacks.length);
                    setState(true);
                  }
                  console.log(projectTechStacks);
                }
                
              }}
              readOnly={state ? true : false}
                size="small"
                style={{ marginTop: "8px" }}
                multiple
                id="tags-outlined"
                options={techStacks}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select the tech stacks of your project (choose maximum 5)"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProjectForm}>Cancel</Button>
              <Button onClick={addProject}>Add</Button>
            </DialogActions>
          </Dialog>
          {displayProjectData ?
            <div className="display-project-cont">
              {projectData.map((el, index) => (  
         <div className='display-project-section'>
         <p className='title'>{el.title}</p>
         <p className='intro'>{el.introduction}</p>
         <p className='roles'><b>Roles : </b>{el.roles.join(". ")}</p>
         <p className='collaboration'><b>Collaboration : </b>{el.collaboration ? "Yes" : "No"}</p>
         <p className='techStacks'><b>Techstacks : </b>{el.techStacks.join(", ")}</p>
         <Link className='git-link'  href={el.githubLink} target="_blank" >
    <GitHubIcon  />
</Link>  &nbsp;&nbsp; <Link className='live-link'  href={el.liveLink} target="_blank" >
    <LanguageIcon  />
</Link>
         <div className='edit-delete-buttons'>
         <Fab onClick={()=>{
           openProjectForm(true);
         }} color="primary" size='small' aria-label="edit">
           <EditIcon />
         </Fab>
         &nbsp;&nbsp;
         <Fab onClick={() =>{
            var temp = [...projectData];
            temp.splice(index, 1);
            setProjectData(temp);
         }}  color="error" size='small' aria-label="delete">
           <DeleteIcon />
         </Fab>
       </div>
       </div>
        ))}   
            </div>
            : ""}
        </div>
        <div>

        </div>
      </div>
      <Button onClick={submitForm} className='genrate-resume-btn' color="success" variant="contained" endIcon={<ChevronRightIcon />}>
        Genrate Resume
      </Button>
    </div>
  )
}

export default Form
