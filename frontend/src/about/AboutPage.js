import React from 'react';
import './About.css';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import memberData from './aboutData.json'
import { Link } from 'react-router-dom'

function About() {
  const [commitNum, setCommitCount] = useState({});
  const [totalCommits, totalCommitCount] = useState(0);
  const [totalIssue, totalIssueCount] = useState(0);
  const [issueNum, setIssueCount] = useState({});
  useEffect(() => {

    const urlBase = 'https://gitlab.com/api/v4/projects/50434557/repository/commits?ref_name=fixed-main&per_page=100';
    const members = ['Alex Cabrera', 'Kamil Kalowski', 'Ky5t0nbr', 'Thomas Moody', 'tjmoody18'];
    const urlIssues = `https://gitlab.com/api/v4/projects/50434557/issues?per_page=200`;

    const fetchCommits = async () => {
      const commits = {};
      let commitTotal = 0
      const allData = await Promise.all([1, 2].map(async page => {
        const res = await fetch(`${urlBase}&page=${page}`);

        return res.json()
      }));
      const combinedData = allData.flat();

      for(let user of members) {
        const memberCommits = combinedData.filter((commit) => commit.author_name === user);
        commits[user] = memberCommits.length;
        commitTotal += commits[user]
      }
  
      setCommitCount(commits)
      totalCommitCount(commitTotal)
    };

    const fetchIssues = async () => {
      const issues = {};
      for (const user of members) {
        const res = await fetch(urlIssues);
        const data = await res.json();
        totalIssueCount(data.length);
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
          <p>Metropulse is an online resource aimed at providing information to African-American citizens facing Hypertension or to allow you to lower your risk.
            We wish to equip you with the data on testing centers to gauge your risk, medical centers to get treatment, in
            locations near to yourself, or the centers themselves.
          </p>
        </div>
      </div>
      <div>
        <div class="textblock">
          <h1>Where does our data come from?!</h1>
          <p>Our team obtains data from the webpages of medical centers as well as information of testing centers
            from an expansive database, aimed at easing your access to them. We strive to give you the easiest
            methods of accessing these centers and try to give you the most relevant data to do so.
          </p>
          <h1>Where Can You Get Our Data?</h1>
          <div class="linkColor">
          <h1><Link to="https://documenter.getpostman.com/view/29785582/2s9YJZ3jGy" style={{ color: 'black' }}>Our API</Link>
      </h1>
        </div>
        </div>
      </div>
      <div className="OurTeam">
        Our Team
      </div>
      <div class="teamGrid">
        <div class="gridCard card bg-dark text-white">
          <div class="cardCap"></div>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nE0iyc9xZ8qG0UcUaIOYEw.jpeg" height="300px" width="300px" objectFit="cover" />
          <h3>Alex Cabrera</h3>
          <div class="card-footer">
            <small>
              <p>Username: {memberData.Alex.Name}</p>
              <p>Email: {memberData.Alex.Email}</p>
              <p>Role: {memberData.Alex.Role}</p>
              <p>Bio: {memberData.Alex.Bio}</p>
              <p>Commits : {commitNum['Alex Cabrera']}</p>
              <p>Issues : {issueNum['Alex Cabrera']}</p>
              <p>UnitTests : 2</p>
            </small>
          </div>
        </div>
        <div class="gridCard card bg-dark text-white">
          <div class="cardCap"></div>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GpoQb0-rD_44PFESJv9DA.jpeg" height="300px" width="300px" objectFit="cover" />
          <h3>Thomas Moody</h3>
          <div class="card-footer">
            <small>
              <p>Username: {memberData.Thomas.Name}</p>
              <p>Email: {memberData.Thomas.Email}</p>
              <p>Role: {memberData.Thomas.Role}</p>
              <p>Bio: {memberData.Thomas.Bio}</p>
              <p>Commits : {commitNum['Thomas Moody'] + commitNum['tjmoody18']}</p>
              <p>Issues : {issueNum['Thomas Moody'] + issueNum['tjmoody18']}</p>
              <p>UnitTests : 12</p>
            </small>
          </div>
        </div>
        <div class="gridCard card bg-dark text-white">
          <div class="cardCap"></div>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sTL0hCT368MDNizqRcaNbA.jpeg" height="300px" width="300px" objectFit="cover" />
          <h3>Kamil Kalowski</h3>
          <div class="card-footer">
            <small>
              <p>Username: {memberData.Kamil.Name}</p>
              <p>Email: {memberData.Kamil.Email}</p>
              <p>Role: {memberData.Kamil.Role}</p>
              <p>Bio: {memberData.Kamil.Bio}</p>
              <p>Commits : {commitNum['Kamil Kalowski']}</p>
              <p>Issues : {issueNum['Kamil Kalowski']}</p>
              <p>UnitTests : 10</p>
            </small>
          </div>
        </div>
        <div class="gridCard bg-dark text-white">
          <div class="cardCap"></div>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_t8OKhT-uWc2Dlr1ajGzeA.jpeg" height="300px" width="300px" objectFit="cover" />
          <h3>Kyston Brown</h3>
          <div class="card-footer">
            <small>
              <p>Username: {memberData.Kyston.Name}</p>
              <p>Email: {memberData.Kyston.Email}</p>
              <p>Role: {memberData.Kyston.Role}</p>
              <p>Bio: {memberData.Kyston.Bio}</p>
              <p>Commits : {commitNum['Ky5t0nbr']}</p>
              <p>Issues : {issueNum['Ky5t0nbr']}</p>
              <p>UnitTests : 8</p>
            </small>
          </div>
        </div>
      </div>
      <div class="Resources">
        <div class="footblock" ><h1>Resources</h1></div>
        <div class="teamGrid">
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://legacy.reactjs.org/docs/getting-started.html" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://www.svgrepo.com/show/452092/react.svg"
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>React</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://docs.python.org/3/" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://www.svgrepo.com/show/374016/python.svg"
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>Python</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://www.postman.com/api-documentation-tool/" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://www.svgrepo.com/show/354202/postman-icon.svg"
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>Postman</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://getbootstrap.com/" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://www.svgrepo.com/show/353498/bootstrap.svg"
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>BootStrap</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://code.visualstudio.com/" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://www.svgrepo.com/show/374171/vscode.svg"
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>VS Code</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://edstem.org/us/help/using-ed-discussion" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://lth.engineering.asu.edu/wp-content/uploads/sites/18/2021/06/Ed.png" 
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>Ed</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://about.gitlab.com/free-trial/devsecops/?utm_medium=c
              pc&utm_source=google&utm_campaign=brand_rlsa__global_exact&utm_content=free-t
              rial&utm_term=git%20lab&_bt=656315922370&_bk=git%20lab&_bm=e&_bn=g&_bg=1484814412
              76&gclid=CjwKCAjwysipBhBXEiwApJOcu5oFETcfOR1EIS6iNzm5SgxD1TLVQI5esvpZNpEAzIm9o_JW5
              h9IPRoC6k4QAvD_BwE" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://seeklogo.com/images/G/gitlab-logo-757620E430-seeklogo.com.png" 
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>GitLab</Card.Title>
              </a>
            </div>
          </div>
          <div className="resCard">
            <div className= "cardCap">
              <a href="https://aws.amazon.com/console/" target ="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src="https://seeklogo.com/images/A/amazon-icon-logo-8F577E5C31-seeklogo.com.png" 
                  height="150px" 
                  width="150px" 
                  objectFit="cover" 
                />
                <Card.Title>AWS</Card.Title>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footblock" style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Git Overall</h1>
      </div>
      <div className="footblock" style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '18px', margin: '0' }}><i className="icon-commit"></i> Total Commits: {totalCommits}</h3>
      </div>
      <div className="footblock" style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '18px', margin: '0' }}><i className="icon-issue"></i> Total Issues: {totalIssue}</h3>
      </div>
      <div className="footblock" style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '18px', margin: '0' }}><i className="icon-tests"></i> Total Unit Tests: 31</h3>
      </div>
      <div class="textblock">
      </div>
      <h1></h1>
    </div>
  );
}

export default About;
