import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import axios from "axios";
import { useNavigate } from "react-router";
import "./Form.css"

var isGithubUrl = require('is-github-url');

const profileMaxSize = 4098; // IN kb
const profileMinSize = 100; // IN kb

const courseTitleMaxLength = 50;
const collegeTitleMaxLength = 50;

const projectTitleMaxLength = 25;
const projectIntroMaxLength = 100;
const projectRolesMaxLength = 150;
const projectFeaturesMaxLength = 150;



const courseTitleLabel = "Course/Degree Title  (maximum " + courseTitleMaxLength + " characters) *"
const collegeTitleLabel = "College/Institue/School name (maximum " + collegeTitleMaxLength + " characters) *"

const projectTitleLabel = "Project Title  (maximum " + projectTitleMaxLength + " characters) *"
const projectIntroLabel = "Write a quick breif about project (maximum " + projectIntroMaxLength + " characters) *"
const projectRolesLabel = "Project Roles, each in new line (maximum " + projectRolesMaxLength + " characters) *"
const projectFeaturesLabel = "Project Features, each in new line (maximum " + projectFeaturesMaxLength + " characters) *"


const techStacks = ["HTML", "CSS", "JS", "React", "Express", "NodeJS", "MongoDB", "MUI", "ChakraUI"]
const softSkills = ["Time management", "Communication", "Adaptability", "Problem-solving", "Teamwork", "Creativity", "Leadership", "Interpersonal skills"]


const Form = () => {
  const navigate = useNavigate();

  const [maxTechStacksRendering, setMaxTechStacksRendering] = useState(false); // maxTechStacksRendering for conditional


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


  const [studentName, setStudentName] = useState('');
  const [studentProfile, setStudentProfile] = useState('');
  const [tagline, setTagline] = useState('');
  const [address, setAddress] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contact, setContact] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [about, setAbout] = useState('');

  const [courseTitle, setCourseTitle] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [educationData, setEducationData] = useState([]);
  const [editEducationDataIndex, setEditEducationDataIndex] = useState(-1)


  const [courseTitleError, setCourseTitleError] = useState('');
  const [collegeNameError, setCollegeNameError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');

  const [displayEducationData, setDisplayEducationData] = useState(false);

  const [openEducationForm, setOpenEducationForm] = useState(false);


  const [displayProjectData, setDisplayProjectData] = useState(false);


  const handleOpenEducationForm = () => {
    if (educationData.length == 3) {
      alert("You already have added three educations, can't add more")
      return;
    }
    setEditEducationDataIndex(-1);
    setOpenEducationForm(true);
  };

  const handleCloseEducationForm = () => {
    setOpenEducationForm(false);
  };

  const addEducation = () => {
    if (courseTitle.length == 0) {
      setCourseTitleError("Course/Degree title can't be blank")
      return;
    }
    if (collegeName.length == 0) {
      setCollegeNameError("College/Institue/School name can't be blank")
      return;
    }
    if (startDate.length == 0) {
      setStartDateError("Start date can't be blank")
      return;
    }
    if (endDate.length == 0) {
      setEndDateError("End date can't be blank")
      return;
    }
    if (startDate > endDate) {
      setEndDateError("End date can not be earlier than start date");
      return;
    }
    setOpenEducationForm(false)
    displayEducationDetails();
  }

  const displayEducationDetails = () => {
    if (editEducationDataIndex == -1) {
      let temp = {
        "course": courseTitle,
        "college": collegeName,
        "startDate": startDate,
        "endDate": endDate
      }
      setEducationData([...educationData, temp]);
    }
    else {
      educationData[editEducationDataIndex].course = courseTitle;
      educationData[editEducationDataIndex].college = collegeName;
      educationData[editEducationDataIndex].startDate = startDate;
      educationData[editEducationDataIndex].endDate = endDate;
    }
    setDisplayEducationData(true);
  }


  const [openProjectForm, setOpenProjectForm] = React.useState(false);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectIntro, setProjectIntro] = useState('');
  const [projectRoles, setProjectRoles] = useState('');
  const [projectFeatures, setProjectFeatures] = useState('');
  const [projectGithubLink, setProjectGithubLink] = useState('');
  const [projectLiveLink, setProjectLiveLink] = useState('');
  const [projectTechStacks, setProjectTechStacks] = useState('');
  const [projectCollaborated, setProjectCollaborated] = useState(false);

  

  const [projectTitleError, setProjectTitleError] = useState('');
  const [projectIntroError, setProjectIntroError] = useState('');
  const [projectRolesError, setProjectRolesError] = useState('');
  const [projectFeaturesError, setProjectFeaturesError] = useState('');
  const [projectGithubLinkError, setProjectGithubLinkError] = useState('');
  const [projectLiveLinkError, setProjectLiveLinkError] = useState('');
  const [projectTechStacksError, setProjectTechStacksError] = useState('');


  const [editProjectDataIndex, setEditProjectDataIndex] = useState(-1)

  const [projectData, setProjectData] = useState([]);

  const handleOpenProjectForm = () => {
    if (projectData.length == 2) {
      alert("You have already added two projects, can't add more");
      return;
    }
    setOpenProjectForm(true);
  };

  const handleCloseProjectForm = () => {
    setOpenProjectForm(false);
  };

  const addProject = () => {
    if (projectTitle.length == 0) {
      setProjectTitleError("Title field can't be blank");
      return;
    }
    if (projectIntro.length == 0) {
      setProjectIntroError("Project about section can't be blank");
      return;
    }
    if (!isGithubUrl(projectGithubLink)) {
      setProjectGithubLinkError("Github repository link should be a valid url");
      return;
    }
    if (!validateUrl(projectLiveLink)) {
      setProjectLiveLinkError("Project live link should be a valid url");
      return;
    }
    if (projectFeatures.length == 0) {
      alert("Project features section can't be blank")
      return;
    }
    var prFeatures = projectFeatures.split("\n");
    if (prFeatures.length > 3) {
      alert("Maximum you can add 3 points in features of Project");
      return;
    }
    if (projectRoles.length == 0) {
      alert("Project roles section can't be blank")
      return;
    }
    var prRoles = projectRoles.split("\n");
    if (prRoles.length > 3) {
      alert("Maximum you can add 3 points in roles of Project");
      return;
    }
    if (projectTechStacks.length < 1) {
      alert("Select atleast one techstack");
      return;
    }

    displayProjectDetails()
    setOpenProjectForm(false)
  }


  const displayProjectDetails = () => {
    if (editProjectDataIndex == -1) {
      let temp = {
        "title": projectTitle,
        "introduction": projectIntro,
        "githubLink": projectGithubLink,
        "liveLink": projectLiveLink,
        "features": projectFeatures.split("\n"),
        "roles": projectRoles.split("\n"),
        "collaboration": projectCollaborated,
        "techStacks": projectTechStacks
      }

      setProjectData([...projectData, temp]);
    }
    else {
      projectData[editProjectDataIndex].title = projectTitle;
      projectData[editProjectDataIndex].introduction = projectIntro;
      projectData[editProjectDataIndex].githubLink = projectGithubLink;
      projectData[editProjectDataIndex].liveLink = projectLiveLink;
      projectData[editProjectDataIndex].features = projectFeatures.split("\n");
      projectData[editProjectDataIndex].roles = projectRoles.split("\n");
      projectData[editProjectDataIndex].collaboration = projectCollaborated;

      projectData[editProjectDataIndex].techStacks = projectTechStacks;
    }
    setProjectCollaborated(false);
    setProjectTechStacks([]);
    setDisplayProjectData(true);
  }


  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  function editFormButtonPress(index) {
    console.log(index)
    setCourseTitle(educationData[index].course);
    setCollegeName(educationData[index].college);
    setStartDate(educationData[index].startDate);
    setEndDate(educationData[index].endDate);
  }


  function editProjectButtonPress(index) {

    console.log(index)

    setProjectTitle(projectData[index].title);
    setProjectIntro(projectData[index].introduction);
    setGithubLink(projectData[index].githubLink);
    setProjectLiveLink(projectData[index].liveLink);
    setProjectFeatures(projectData[index].features.join("\n"));
    setProjectRoles(projectData[index].roles.join("\n"));
    setProjectCollaborated(projectData[index].collaboration);
    setProjectTechStacks(projectData[index].techStacks);
    // console.log(e)
  }


  async function submitForm() {
    if (!selectedFile) {
      alert("Please upload the profile image");
      return
    }
    var imgSize = Math.round(selectedFile.size / 1024); // In MB
    if (imgSize > profileMaxSize) {
      alert("File is too big, please select a file of size less than " + Math.round(profileMaxSize / 1024) + " MB");
      return
    }
    if (imgSize < profileMinSize) {
      alert("File is too small, please select a file of size greater than " + profileMinSize + " KB");
      return
    }
    // console.log(selectedFile);
    if (studentName == "") {
      alert("Name field can't be blank")
      return
    }
    if (tagline == "") {
      alert("tagline can't be blank")
      return
    }
    var phoneno = /^\d{10}$/;
    if (!contact.match(phoneno)) {
      alert("Enter a valid contact number")
      return
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID))) {
      alert("Enter a valid Email ID")
      return
    }
    if (address == "") {
      alert("Address can't be blank")
      return
    }
    if (!validateUrl(portfolioLink)) {
      alert("Enter a valid portfolio link")
      return
    }
    if (!validateUrl(linkedinLink)) {
      alert("Enter a valid linkedin profile link")
      return
    }
    if (!isGithubUrl(githubLink)) {
      alert("Enter a valid github profile link")
      return
    }

    if (about.length < 100) {
      alert("write atleast 100 characters in about section")
      return
    }
    if (educationData.length == 0) {
      alert("Add atleast one Education")
      return
    }
    if (projectData.length == 0) {
      alert("Add atleast one Project")
      return
    }
    if (studentTechStacks.length == 0) {
      alert("Add atleast one tech stack in your resume");
      return;
    }
    if (studentSoftSkills.length == 0) {
      alert("Add atleast one soft skill in your resume");
      return;
    }

    let accomplishmentsTemp = studentAccomplishment.split("\n");
    if (accomplishmentsTemp.length > 3) {
      alert("Maximum you can add 3 accomplishments in your resume");
      return;
    }
    let interestsTemp = studentInterests.split(",");
    if (interestsTemp.length > 5) {
      alert("Maximum you can add 5 interests in your resume");
      return;
    }


    const postDetails = async() =>
     {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "resume-automation");
        data.append("cloud_name", "resume-automation");
       return fetch("https://api.cloudinary.com/v1_1/resume-automation/image/upload", {
          method: "POST",
          body: data,
        })
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
          // .then((res) => res.json())
          // // .then((data) => {
          // //  return data.url.toString();
          // // })
          // .catch((err) => console.log(err))

          // console.log("processing");
    };
  

    const ProfileImg = await postDetails();
    // console.log("profileImg", ProfileImg)
    // setStudentProfile(ProfileImg.url.toString());
    // console.log("studentProfile", studentProfile);
    // console.log("studentProfile raw", ProfileImg.url.toString());
    // FORM is completely validated and good to go to the backend

    let educationArray = []
    educationData.forEach(el => {
      educationArray.push({
        "course": el.course,
        "institute": el.college,
        "start": el.startDate,
        "end": el.endDate
      })
    })

    // // console.log(educationArray);

    let projectArray = [];
    projectData.forEach(el => {
      projectArray.push({
        "name": el.title,
        "description": el.introduction,
        "gitLink": el.githubLink,
        "liveLink": el.liveLink,
        "features": el.features,
        "techStack": el.techStacks,
        "areasOfResp": el.roles,
        "solo": !el.collaboration,
        "team": 4 // Needs clarification on it
      })
    })

    // // console.log(projectArray);
    var userId = JSON.parse(localStorage.getItem("loggedinUser"))
    var sendingPacket = {
      "user": userId,
      "personal": {
        "profilePic": ProfileImg.url.toString(),
        "name": studentName,
        "tagLine": tagline,
        "email": emailID,
        "mob": contact,
        "linkedin": linkedinLink,
        "address": address,
        "github": githubLink
      },
      "summary": about,
      "projects": projectArray,
      "education": educationArray,
      "techSkills": studentTechStacks,
      "softSkills": studentSoftSkills,
      "accomplishments": accomplishmentsTemp,
      "interests": interestsTemp
    }

    console.log(sendingPacket)

    
    axios.post("http://localhost:4567/resume", sendingPacket)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    // fetch("http://localhost:4567/resume",{
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   data:JSON.stringify(sendingPacket)
    // })
    // .then((res)=>res.json()).then((res)=>console.log(res))
    // .catch((e)=>console.log(e.message));
    
    // alert("Data sent, check console once")
    navigate("/downloadresume");

  }


  const [studentTechStacks, setStudentTechStacks] = useState([]);
  const [studentSoftSkills, setStudentSoftSkills] = useState([]);
  const [studentAccomplishment, setStudentAccomplishment] = useState([]);
  const [studentInterests, setStudentInterests] = useState("");

  return (
    <div className='form-container'>
      <div className='header-section'>
        <div className='proflile-img'>
          <img src={preview} />
          <label for="upload">Upload Avatar
      <input type='file' id="upload" onChange={onSelectFile} /></label>
          {/* <div className="middle">
            <input type="file" onChange={onSelectFile} accept="image/png, image/jpeg" className="custom-file-input" />
          </div> */}
        </div>
        <div className='basic-input'>
          <div className='name-and-tagline'>
            <input value={studentName} onInput={e => setStudentName(e.target.value)} type={"text"} placeholder={"Enter your full name *"} />
            <input value={tagline} onInput={e => setTagline(e.target.value)} type={"text"} placeholder={"Enter your profile tagline *"} />
          </div>
          <hr />
          <div className='social-media-links'>
            <div>
              <input value={contact} onInput={e => setContact(e.target.value)} id='contact-input' type={"number"} placeholder={"Contact Number *"} />
            </div>
            <div>
              <input value={portfolioLink} onInput={e => setPortfolioLink(e.target.value)} id='portfolio-url-input' type={"url"} placeholder={"Portfolio Url *"} />
            </div>
            <div>
              <input value={emailID} onInput={e => setEmailID(e.target.value)} id='email-id-input' type={"email"} placeholder={"Email ID *"} />
            </div>
            <div>
              <input value={linkedinLink} onInput={e => setLinkedinLink(e.target.value)} id='linkedin-url-input' type={"url"} placeholder={"Linkedin Url *"} />
            </div>
            <div>
              <input value={address} onInput={e => setAddress(e.target.value)} id='address-input' type={"text"} placeholder={"Address *"} />
            </div>
            <div>
              <input value={githubLink} onInput={e => setGithubLink(e.target.value)} id='github-url-input' type={"url"} placeholder={"Github Url *"} />
            </div>
          </div>
        </div>
        <div className='input2'>
          <textarea value={about} onInput={e => setAbout(e.target.value)} placeholder={"Enter your about section (maximum 300 characters) *"} maxLength={"300"} ></textarea>
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
                value={courseTitle} onInput={e => { setCourseTitle(e.target.value); setCourseTitleError('') }}
                helperText={courseTitleError}
                error={courseTitleError}
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
                value={collegeName} onInput={e => { setCollegeName(e.target.value); setCollegeNameError('') }}
                inputProps={{ maxLength: collegeTitleMaxLength }}
                error={collegeNameError}
                helperText={collegeNameError}
                margin="dense"
                id="college-name"
                label={collegeTitleLabel}
                type="text"
                fullWidth
                variant="outlined"
              />
              <div className='start-end-date'>
                <TextField
                  value={startDate} onInput={e => { setStartDate(e.target.value); setStartDateError('') }}
                  margin="dense"
                  error={startDateError}
                  helperText={startDateError}
                  id="start-date"
                  label="Start Date*"
                  type="month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  value={endDate} onInput={e => { setEndDate(e.target.value); setEndDateError('') }}
                  margin="dense"
                  error={endDateError}
                  helperText={endDateError}
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
                    <Fab onClick={() => {
                      setEditEducationDataIndex(index);
                      editFormButtonPress(index);
                      // console.log(educationData, editEducationDataIndex )
                      setOpenEducationForm(true);
                    }} color="primary" size='small' aria-label="edit">
                      <EditIcon />
                    </Fab>
                    &nbsp;&nbsp;
                    <Fab onClick={() => {
                      var temp = [...educationData];
                      temp.splice(index, 1);
                      setEducationData(temp);
                    }} color="error" size='small' aria-label="delete">
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
                value={projectTitle} onInput={e => {
                  setProjectTitle(e.target.value);
                  setProjectTitleError('');
                }}
                helperText={projectTitleError}
                error={projectTitleError}
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
                value={projectIntro}  onInput={e => {
                  setProjectIntro(e.target.value);
                  setProjectIntroError('');
                }}
                helperText={projectIntroError}
                error={projectIntroError}
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
                value={projectGithubLink}  onInput={e => {
                  setProjectGithubLink(e.target.value);
                  setProjectGithubLinkError('');
                }}
                helperText={projectGithubLinkError}
                error={projectGithubLinkError}
                size="small"
                margin="dense"
                id="name"
                label="Enter your project github repo link"
                type="url"
                fullWidth
                variant="outlined"
              />
              <TextField
                value={projectLiveLink}  onInput={e => {
                  setProjectLiveLink(e.target.value);
                  setProjectLiveLinkError('');
                }}
                helperText={projectLiveLinkError}
                error={projectLiveLinkError}
                size="small"
                margin="dense"
                label="Enter your project live link"
                id="standard-basic" type="url" variant="outlined"
                fullWidth
              />
              <TextField
                size="small"
                value={projectFeatures} onInput={e => setProjectFeatures(e.target.value)}
                inputProps={{ maxLength: projectFeaturesMaxLength }}
                margin="dense"
                multiline
                rows={3}
                label={projectFeaturesLabel}
                id="standard-basic" type="url" variant="outlined"
                fullWidth
              />
              <TextField
                size="small"
                value={projectRoles} onInput={e => setProjectRoles(e.target.value)}
                multiline
                rows={3}
                inputProps={{ maxLength: projectRolesMaxLength }}
                margin="dense"
                label={projectRolesLabel}
                id="standard-basic" type="url" variant="outlined"
                fullWidth
              />
              <FormGroup>
                <FormControlLabel control={<Switch checked={projectCollaborated} onChange={(e) => { setProjectCollaborated(e.target.checked) }} />} label="Was it a Collaborative project?" />
              </FormGroup>

              <Autocomplete
                onChange={(option) => {
                  if (option.target.innerText) {
                    setProjectTechStacks([...projectTechStacks, option.target.innerText])
                    // tagsArr.push(option.target.innerText);
                    // if (studentTechStacks.length === 5) {
                    //   console.log(studentTechStacks.length);
                    //   setMaxTechStacksRendering(true);
                    // }
                    // console.log(projectTechStacks);
                  }

                }}
                readOnly={maxTechStacksRendering ? true : false}
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
                  <p className='features'><b>Features : </b>{el.features.join(". ")}</p>
                  <p className='roles'><b>Roles : </b>{el.roles.join(". ")}</p>
                  <p className='collaboration'><b>Collaboration : </b>{el.collaboration ? "Yes" : "No"}</p>
                  <p className='techStacks'><b>Techstacks : </b>{el.techStacks.join(", ")}</p>
                  <Link className='git-link' href={el.githubLink} target="_blank" >
                    <GitHubIcon />
                  </Link>  &nbsp;&nbsp; <Link className='live-link' href={el.liveLink} target="_blank" >
                    <LanguageIcon />
                  </Link>
                  <div className='edit-delete-buttons'>
                    <Fab onClick={() => {
                      setEditProjectDataIndex(index);
                      editProjectButtonPress(index);
                      setOpenProjectForm(true);
                    }} color="primary" size='small' aria-label="edit">
                      <EditIcon />
                    </Fab>
                    &nbsp;&nbsp;
                    <Fab onClick={() => {
                      var temp = [...projectData];
                      temp.splice(index, 1);
                      setProjectData(temp);
                    }} color="error" size='small' aria-label="delete">
                      <DeleteIcon />
                    </Fab>
                  </div>
                </div>
              ))}
            </div>
            : ""}
        </div>
        <div className='accomplishment-cont'>

          <Autocomplete
            onChange={(option) => {
              if (option.target.innerText) {
                setStudentTechStacks([...studentTechStacks, option.target.innerText])
                // tagsArr.push(option.target.innerText);
                // if (projectTechStacks.length === 5) {
                //   console.log(projectTechStacks.length);
                //   setMaxTechStacksRendering(true);
                // }
                // console.log(projectTechStacks);
              }

            }}
            // readOnly={maxTechStacksRendering ? true : false}
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
                label="Tech Stacks *"
              />
            )}
          />

          <Autocomplete
            onChange={(option) => {
              if (option.target.innerText) {
                setStudentSoftSkills([...studentSoftSkills, option.target.innerText])
              }

            }}
            size="small"
            style={{ marginTop: "16px" }}
            multiple
            id="tags-outlined"
            options={softSkills}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Soft Skills *"
              />
            )}
          />

          <TextField
            size="small"
            style={{ marginTop: "16px" }}
            value={studentAccomplishment} onInput={e => setStudentAccomplishment(e.target.value)}
            inputProps={{ maxLength: 150 }}
            margin="dense"
            multiline
            rows={3}
            label={"Accomplisments, each in new line (maximum 150 characters)"}
            id="standard-basic" type="url" variant="outlined"
            fullWidth
          />

          <TextField
            size="small"
            style={{ marginTop: "10px" }}
            value={studentInterests} onInput={e => setStudentInterests(e.target.value)}
            inputProps={{ maxLength: 100 }}
            margin="dense"
            multiline
            rows={2}
            label={"Interests, each separated by (,) (maximum 100 characters)"}
            id="standard-basic" type="url" variant="outlined"
            fullWidth
          />

        </div>
      </div>
      <div className='submit-btn-cont'>
        <Button onClick={submitForm} className='genrate-resume-btn' color="success" variant="contained" endIcon={<ChevronRightIcon />}>
          Genrate Resume
        </Button>
      </div>
    </div>
  )
}

export default Form
