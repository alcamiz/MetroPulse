import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import memberData from './aboutData.json'

function About() {
  const [commitNum, setCommitCount] = useState({});
  const [totalCommits, totalCommitCount] = useState(0);
  const [totalIssue, totalIssueCount] = useState(0);
  const [issueNum, setIssueCount] = useState({});
  useEffect(() => {
    const url = 'https://gitlab.com/api/v4/projects/50434557/repository/commits?per_page=100';
    const members = ['Alex Cabrera', 'Kamil Kalowski', 'Ky5t0nbr', 'tjmoody18'];
    const urlIssues = `https://gitlab.com/api/v4/projects/50434557/issues?per_page=100`;
    const fetchCommits = async () => {
      const commits = {};
      for (const user of members) {
        const res = await fetch(url);
        const data = await res.json();
        totalCommitCount(data.length);
        const memberCommits = data.filter((commit) => commit.author_name.toLowerCase() === user.toLowerCase());
        commits[user] = memberCommits.length;
      }

      setCommitCount(commits);
    };

    const fetchIssues = async () => {
      const issues = {};
      for (const user of members) {
          const res = await fetch(urlIssues); 
          const data = await res.json();
          const memberIssues = data.filter(
            (issue) => issue.author && issue.author.name.toLowerCase() === user.toLowerCase()
          );
          issues[user] = memberIssues.length;
      }

      setIssueCount(issues);
    };
    fetchCommits();
    fetchIssues();
  }, []);
  return (
    <div>
      <div className="App">
        <div className="App-header">
          About Metropulse
        </div>
      </div>
      <div>
        <div class="textblock" >
          <h1 >Our Mission</h1>
          <p>Metropulse is an online resource aimed at providing information to African American citezens facing Hypertension.
            We wish to equip you with the data on testing centers to gauge your risk, medical centers to get treatment, in
            locations near to yourself, or the centers themselves!
          </p>
        </div>
      </div>
      <div>
        <div class="textblock">
          <h1>Where does our data come from?!</h1>
          <p>We get our data from the home webpages of medical centers as well as information of testing centers
            from an expansive database aimed at easing your acces to them. We strive to give you the easiest
            methods of accesing these centers try to give you the most releveant data to do so.
          </p>
        </div>
      </div>
      <div className="OurTeam">
        <Card.Body>Our Team</Card.Body>
      </div>
      <div class="Team">
        <div class="teamGrid">
          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nE0iyc9xZ8qG0UcUaIOYEw.jpeg" height="300px" width="300px" objectFit="cover" />
            <h3>Alex Cabrera</h3>
            <div class="card-footer">
              <small class="text-muted">
                <p>UserName: {memberData.Alex.Name}</p>
                <p>Email: {memberData.Alex.Email}</p>
                <p>Role: {memberData.Alex.Role}</p>
                <p>Bio: {memberData.Alex.Bio}</p>
                <p>Commits : {commitNum['Alex Cabrera']}</p>
                <p>Issues : {issueNum['Alex Cabrera']}</p>
              </small>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GpoQb0-rD_44PFESJv9DA.jpeg" height="300px" width="300px" objectFit="cover" />
            <h3>Thomas Moody</h3>
            <div class="card-footer">
              <small class="text-muted">
                <p>UserName: {memberData.Thomas.Name}</p>
                <p>Email: {memberData.Thomas.Email}</p>
                <p>Role: {memberData.Thomas.Role}</p>
                <p>Bio: {memberData.Thomas.Bio}</p>
                <p>Commits : {commitNum['tjmoody18']}</p>
                <p>Issues : {issueNum['tjmoody18']}</p>
              </small>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sTL0hCT368MDNizqRcaNbA.jpeg" height="300px" width="300px" objectFit="cover" />
            <h3>Kamil Kalowski</h3>
            <div class="card-footer">
              <small class="text-muted">
                <p>UserName: {memberData.Kamil.Name}</p>
                <p>Email: {memberData.Kamil.Email}</p>
                <p>Role: {memberData.Kamil.Role}</p>
                <p>Bio: {memberData.Kamil.Bio}</p>
                <p>Commits : {commitNum['Kamil Kalowski']}</p>
                <p>Issues : {issueNum['Kamil Kalowski']}</p>
              </small>
            </div>
          </div>

          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_t8OKhT-uWc2Dlr1ajGzeA.jpeg" height="300px" width="300px" objectFit="cover" />
            <h3>Kyston Brown</h3>
            <div class="card-footer">
              <small class="text-muted">
                <p>UserName: {memberData.Kyston.Name}</p>
                <p>Email: {memberData.Kyston.Email}</p>
                <p>Role: {memberData.Kyston.Role}</p>
                <p>Bio: {memberData.Kyston.Bio}</p>
                <p>Commits : {commitNum['Ky5t0nbr']}</p>
                <p>Issues : {issueNum['Ky5t0nbr']}</p>
              </small>
            </div>
          </div>

        </div>
      </div>
      <div class="Resources">
        <div class="card">
        <div class="footblock" ><h1>Resources</h1></div>
          <div class="Team">
            <div class="teamGrid">
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>React</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://www.svgrepo.com/show/354202/postman-icon.svg" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Postman</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bootstrap-5-logo-icon.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>BootStrap</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/Z/zoom-fondo-blanco-vertical-logo-F819E1C283-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Zoom</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/V/visual-studio-code-logo-449D71944F-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>VS Code</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://lth.engineering.asu.edu/wp-content/uploads/sites/18/2021/06/Ed.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Ed Discussion</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/G/gitlab-logo-757620E430-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>GitLab</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://cdn.icon-icons.com/icons2/2407/PNG/512/namecheap_icon_146138.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Name Cheap</Card.Title>
              </div>
            </div>
          </div>
          <div class="footblock" ><h1>Git Overall</h1></div>
          <div class="footblock" ><h3>Total Commits: {totalCommits}</h3></div>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default About;
