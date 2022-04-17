import React, { useState, useEffect } from 'react'
import "../../styles/Form.css";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Form = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
  }

  return (
    <div className='FormContainer'>
      <div className='subCont1'>
        <div className='img'>
          <img src={preview} />
  <div className="middle">
  <input type="file" onChange={onSelectFile}  accept="image/png, image/gif, image/jpeg" className="custom-file-input" />
  </div>
        </div>
        <div className='input1'>
          <input type={"text"} placeholder={"Enter your full name"} />
          <input type={"text"} placeholder={"Enter your profile tagline"} />
          <br />
          <hr />
          <div className='social-media-links'>
            <table>
              <tr>
                <td>
                  <input id='contact-input' type={"number"} placeholder={"Contact Number"} />
                </td>
                <td>
                  <input id='portfolio-url-input' type={"url"} placeholder={"Portfolio Url"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input id='email-id-input' type={"email"} placeholder={"Email ID"} />
                </td>
                <td>
                  <input id='linkedin-url-input' type={"url"} placeholder={"Linkedin Url"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input id='address-input' type={"text"} placeholder={"Address"} />
                </td>
                <td>
                  <input id='github-url-input' type={"url"} placeholder={"Github Url"} />
                </td>
              </tr>

            </table>
          </div>
        </div>
        <div  className='input2'>
          <textarea placeholder={"Enter your about section (maximum 300 characters)"} maxLength={"300"} ></textarea>
        </div>
      </div>
      <hr />

      <div>
      <Button  variant="outlined" onClick={handleClickOpen}>
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Add your one of the best project based on latest technologies.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="project-title"
            label="Project Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
           margin="dense"
           id="name"
           label="Write a quick breif about project"
           type="text"
           fullWidth
           variant="standard"
         />
         <TextField
          margin="dense"
          id="name"
          label="Enter your project github repo link"
          type="url"
          fullWidth
          variant="standard"
        />
        <TextField
         margin="dense"
         id="name"
         label="Enter your project live link"
         type="url"
         fullWidth
         variant="standard"
       />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>


    </div>
  )
}

export default Form
