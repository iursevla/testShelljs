var shell = require("shelljs");

shell.exec("echo shell.exec works");
var destFolder = '/testShelljs';
/**Copies bundle to online repository bundle */
var sourceBundlejs = './from' + '/dist/gisplayv2.bundle.js';
var destinoBundejs = './to' + destFolder+  '/dist/gisplayv2.bundle.js';
shell.cp(sourceBundlejs, destinoBundejs);

/** Fazer cd para a destination folder */
shell.cd('./to/'+destFolder);

shell.exec('dir');

var timeNow = new Date(Date.now());
var d = timeNow.getDate();
var m = timeNow.getMonth() + 1;
var y = timeNow.getFullYear();
var h =  timeNow.getHours();
var min =  timeNow.getMinutes();
var sec =  timeNow.getSeconds();

var fullDate = h+ "h:" + min + "m:" + sec + "s  " + d + "/" + m + "/" + y ;
console.log(fullDate)

var commitMessage = "\"Last commit time: " + fullDate +"\"";
console.log(commitMessage)
/** Fazer 3? commandos git */

var gitAddAndCommit = "git add -A && git commit -m " + commitMessage;
var gitPush = "git push -u origin master" 
var gitStatus = "git status";
console.log(gitAddAndCommit);

shell.exec(gitStatus);
shell.exec(gitAddAndCommit);
shell.exec(gitPush);

/*scripts": {
    "build": "...",
    "git-commit": "git add -A . && git commit -a -m 'gh-pages update'",
    "git-push": "git push origin gh-pages --force && git checkout master",
    "deploy": "npm run build && npm run git-commit && npm run git-push"
  },*/