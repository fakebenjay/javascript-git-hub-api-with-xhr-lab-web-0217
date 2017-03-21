function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><a href="http://github.com/' + r.owner.login + '/' + r.name + '">' + r.html_url + '</a> - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${user}/${name}/branches`)
  req.send()
}
