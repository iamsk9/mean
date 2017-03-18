# Portal For Proposals

## Tools Required :
  1. Install [Node.js](https://nodejs.org/)
  2. Install WAMP or XAMPP
  3. Install git
  >Open GIT BASH and run the next commands
  1. `npm install -g bower`
  2. `npm install -g migrate`

Steps to work on this project:
  1. First click the fork button on the top right of the original repo.
  2. You will be directed to your forked repo. Now create a folder in your PC and open `GIT BASH` in that   folder.
  3. Type `git clone <url-of-your-forked-repo>`.
  4. After completing the cloning. Type `cd mean-master`.
  5. Type `git remote add upstream https://github.com/iamsk9/mean.git`
  6. Open WAMP or XAMPP and start Apache server and phpmyadmin (sql).
  7. In GIT BASH type `node server.js`
  8. You can see the message `Local server running on port 3000` and `MYSQL is successfully connected`
  9. Now open a web browser and type `localhost:3000`
## Now the web runs and when you make changes refresh the page type ctrl+c in the GIT BASH and repeat step-6

## NOTE:
Whenever you start to work on the project try to update the local repo by following these steps:
  1. `git checkout master`
  2. `git fetch upstream`
  3. `git rebase upstream/master`
  4. Now create a branch. The name must be same as the name of the task that is assigned to you in trello board.
  5. Add features and changes to the project. After completing the task in your branch.
  6. `git add -A`
  7. `git commit -m "Task-Task_No Task_Name"`
  8. `git push origin your_branch_name`
  9. Now go to your forked repo and create a PR. Ping in the Slack that you have created a PR and move your task to review broad in the trello board.

## Follow Slack for continous updates and ping in Slack general channel when you create a PR.

## Follow Indentation and understandable variable names. Report to the general channel of Slack if you add any new libraries to the project.
