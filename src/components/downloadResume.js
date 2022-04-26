import Resume from "./resume";
import Button from "./Button";
import jspdf from "jspdf";
// import "../font/Proxima Nova Font.otf"
import { TokenContext } from "./context/context";
import { useContext } from "react";

const DownloadResume = () => {

  const {token} = useContext(TokenContext);
  console.log("token = ", token);
  const handleChange = () => {
    var doc = new jspdf("p", "pt", "a4");
    const myFont = require("../font/Proxima Nova Font.otf");
    doc.addFileToVFS("MyFont.otf", myFont);
    doc.addFont("MyFont.otf", "MyFont", "normal");
    doc.setFont("MyFont");
    doc.html(document.querySelector("#mainDiv"), {
      callback: function (pdf) {
        pdf.save("Resume.pdf");
      },
    });
  };
  return (
    <>
      <Button click={handleChange} />
      <Resume />
    </>
  );
};

export default DownloadResume;
