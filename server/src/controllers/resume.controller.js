const express = require("express");
const linkCheck = require("link-check");
const Resume = require("../models/resume.model");

const router = express.Router();

const linkCheckAsync = (param) => {
  return new Promise((res, rej) => {
    linkCheck(param, function (err, result) {
      if (err) rej(false);
      res(result.statusCode);
    });
  });
};

router.post("", async (req, res) => {
  try {
    let obj = {};
    let flag = true;
    obj.portfolio = [req.body.personal.portfolio, true];
    obj.github = [req.body.personal.github, true];
    obj.projects = [];
    req.body.projects.forEach((element) => {
      obj.projects.push({
        liveLink: [element.liveLink, true],
        gitLink: [element.gitLink, true],
      });
    });

    const res1 = await linkCheckAsync(obj["portfolio"][0]);
    if (res1 !== 200) {
      obj["portfolio"][1] = false;
      flag = false;
    }
    const res2 = await linkCheckAsync(obj["github"][0]);
    if (res2 !== 200) {
      obj["github"][1] = false;
      flag = false;
    }

    let i = 0;
    for (const elem of obj.projects) {
      let urlLive = elem.liveLink[0];
      let urlGit = elem.gitLink[0];

      let res = await linkCheckAsync(urlLive);
      if (res !== 200) obj.projects[i].liveLink[1] = false;

      let res2 = await linkCheckAsync(urlGit);
      if (res2 !== 200) obj.projects[i].gitLink[1] = false;
      i++;
    }

    if (!flag) {
      console.log(obj);
      return res.send({err:"Wrong Link",obj});
    } else {
      const resume = await Resume.create(req.body);
      console.log(resume);
      return res.send(resume);
    }

  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const resume = await Resume.find().lean().exec();
    res.send(resume);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.find({ user: req.params.id }).lean().exec();
    res.send(resume);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
