import "../styles/Resume.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Resume = () => {
  const [details, addDetails] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:4567/resume/6252c636afaa2f28ae46bc54")
      .then((res) => {
        addDetails(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);
  console.log(details);
  return (
    <div id="outerDiv">
      <div id="mainDiv">
        <div>
          <img
            id="img1"
            alt=""
            src="images/image1.png"
            title="horizontal line"
          />
        </div>
        <a id="t.ad38166889113761e092799fa453e42f4838cb34"></a>
        <a id="t.0"></a>
        <table className="c33">
          <tbody>
            <tr className="c32">
              <td className="c43" colSpan={1} rowSpan={1}>
                <div style={{ display: "flex" }}>
                  <p className="c44  c46">
                    <span id="span2">
                      <img id="img2" alt="" src="images/image3.jpg" title="" />
                    </span>
                  </p>
                  <div>
                    <p className="c30 title" id="h.x8fm1uorkbaw">
                      <span className="c40">ABHISHEK KATKAR</span>
                    </p>
                    <p className="c7 subtitle" id="h.ymi089liagec">
                      <span className="c31">Full-Stack Web Developer</span>
                    </p>
                  </div>
                </div>
              </td>
              <td className="c23" colSpan={1} rowSpan={1}>
                <div id="userDet">
                  <p className="c2">
                    <span className="c10">{details?.personal?.email}</span>
                  </p>
                  <p className="c2">
                    <span className="c10">
                      {details?.personal?.mob}
                      <br />
                      LinkedIn-{" "}
                    </span>
                    <span className="c8 c19 c26">
                      <a className="c27" href="#">
                        {details?.personal?.linkedin}
                      </a>
                    </span>
                    <span className="c12 c10">&nbsp;</span>
                  </p>
                  <p className="c2">
                    <span className="c10">{details?.personal?.address}</span>
                  </p>
                  <p className="c2">
                    <span className="c10">Github</span>
                    <span className="c10">- </span>
                    <span className="c8 c19 c26">
                      <a className="c27" href="#">
                        {details?.personal?.github}
                      </a>
                    </span>
                    <span className="c10">&nbsp;</span>
                  </p>
                </div>
              </td>
            </tr>
            <tr className="c29">
              <td className="c41" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c17 c18">PROFESSIONAL </span>
                  <span className="c17 c18">SUMMARY</span>
                  <span className="c14">&nbsp;</span>
                </p>
                <p className="c5">
                  <span className="c1">
                    {details.summary}
                    <br />
                  </span>
                </p>
                <p className="c5">
                  <span className="c14">PROJECTS </span>
                </p>
                {details?.projects?.map((element) => {
                  return (
                    <>
                      <p className="c5">
                        <span className="c8 c3">{element.name}</span>
                        <span className="c3">&nbsp;</span>
                        <span className="c3">|</span>
                        <span className="c3">&nbsp;</span>
                        <span id="span3">
                          <img
                            id="img3"
                            alt=""
                            src="images/image2.png"
                            href="www.youtube.com"
                          />
                        </span>
                      </p>
                      <p className="c5">
                        <span>{element.description}</span>
                      </p>
                      <p className="c5">
                        <span className="c3">Features</span>
                        <span className="c1">:</span>
                      </p>
                      {element.features.map((elem) => {
                        return (
                          <>
                            <ul className="c21 lst-kix_xmzdhu5lret0-0 start">
                              <li className="c0 li-bullet-0">
                                <span className="c1">{elem}</span>
                              </li>
                            </ul>
                          </>
                        );
                      })}
                      <p className="c5">
                        <span className="c3">Tech Stack:</span>

                        <span className="c1">
                          &nbsp;
                          {element.techStack
                            .map((c) => c.toUpperCase())
                            .join(" | ")}
                        </span>
                      </p>
                      <p className="c5">
                        <span className="c3 c6">Areas of responsibility:</span>
                      </p>
                      <ul className="c21 lst-kix_es1hyzs1hy8g-0 start">
                        <li className="c0 li-bullet-0">
                          <span className="c1">
                            Built authentication and integrated it with the
                            frontend.
                          </span>
                        </li>
                        <li className="c0 li-bullet-0">
                          <span className="c1">Created the Home page. </span>
                        </li>
                        <li className="c0 li-bullet-0">
                          <span className="c1">
                            Developed a Sign In, Login page for users.
                          </span>
                        </li>
                      </ul>
                      <p className="c5">
                        <span className="c1">
                          A collaborative project built by a team of 5 executed
                          in 5 days.
                        </span>
                      </p>
                    </>
                  );
                })}
                <p className="c5 c15">
                  <span className="c1"></span>
                </p>
              </td>
              <td className="c45" colSpan={1} rowSpan={1}>
                <p className="c38">
                  <span className="c14">EDUCATION</span>
                </p>
                <p className="c20">
                  
                </p>
                <p className="c25">
                  <span className="c17">Full-Stack Development</span>
                  <span>
                    <br />
                    Masai School, Bangalore
                    <br />
                  </span>
                  <span className="c12 c35">AUG 2021 - Present</span>
                </p>
                <p className="c25">
                  <span>
                    <br />
                  </span>
                  <span className="c17">B.Tech</span>
                  <span>&nbsp;</span>
                  <span className="c19">(CGPA- 8.40/10 )</span>
                  <span className="c1">
                    <br />
                    Arvind Gavali College of
                  </span>
                </p>
                <p className="c25">
                  <span>
                    Engineering, Satara
                    <br />
                  </span>
                  <span className="c12 c35">July 2017- August 2021</span>
                </p>
                <p className="c22 c25">
                  <span className="c12 c35"></span>
                </p>
                <div className="c38" id="h.a9l5z4y9rnz4">
                  <span className="c14">SKILLS AND FRAMEWORKS</span>
                </div>
                <p className="c5">
                  <span className="c1">{details?.techSkills?.join(" | ")}</span>
                </p>
                <p className="c5 c22">
                  <span className="c1"></span>
                </p>
                <div className="c38" id="h.lmqf9yx68b7c">
                  <span className="c14">SOFT SKILLS</span>
                </div>
                <p className="c5">
                  <span className="c1">{details?.softSkills?.join(" | ")}</span>
                </p>
                <p className="c5 c22">
                  <span className="c1"></span>
                </p>
                <div className="c38" id="h.tuxh7mwdaxox">
                  <span className="c14">ACCOMPLISHMENTS </span>
                </div>
                <p className="c20">
                  <span className="c17">
                    Filed a Patent
                    <br />
                  </span>
                  <span>
                    Patent on Project - &nbsp;Retro fitment kit for Auto
                    Rickshaw to convert IC engine to Electric engine, June 2021
                  </span>
                </p>
                <p className="c20">
                  <span className="c17">Sports</span>
                  <span>
                    &nbsp;
                    <br />
                    Secured the First place in a Shot Put event in Inter College
                    Sports meet, Aurangabad, Oct 2018
                  </span>
                </p>
                <div className="c38" id="h59kk2i3ikr6k">
                  <span className="c14">INTERESTS</span>
                </div>
                <p className="c28">
                  <span>{details?.interests?.join(" | ")}</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resume;
