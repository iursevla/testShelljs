var shell = require("shelljs");

//shell.exec("echo shell.exec works");

var destFolder = '/testShelljs';
var sourceBundlejs = './from' + '/dist/gisplayv2.bundle.js';
var destinoBundejs = './to' + destFolder + '/dist/gisplayv2.bundle.js';

/**Copies bundle to online repository bundle */
shell.cp(sourceBundlejs, destinoBundejs);

/** Change to a destination folder */
shell.cd('./to/' + destFolder);

/** */
//shell.exec('dir'); //Probably should add test to see if it was successfull
shell.ls(['-A'], './dist').forEach((f) => {
    console.log(f)
});

/** 
 * List Current directory and test if there's a .git folder 
 * If there is one and it's a git repository then keep going
 * Otherwise, print error and exit.
*/
var listCurrFile = shell.ls('-A', ['./']);
if (listCurrFile.indexOf('.git') >= 0) {
    console.log('Encontrou o .git')
    shell.exec('git status', (code, stdout, stderror) => {
        if (code === 0 && !stdout.includes('fatal:'))
            proceed();
        else
            shellExit();
    });

}
else {
    shellExit();
}

function proceed() {
    console.log("Found .git repo keep going...");
    var timeNow = new Date(Date.now());
    var d = timeNow.getDate();
    var m = timeNow.getMonth() + 1;
    var y = timeNow.getFullYear();
    var h = timeNow.getHours();
    var min = timeNow.getMinutes();
    var sec = timeNow.getSeconds();

    var fullDate = h + "h:" + min + "m:" + sec + "s  " + d + "/" + m + "/" + y;
    /*console.log(fullDate)*/

    var commitMessage = "\"Last commit time: " + fullDate + "\"";
    /*console.log(commitMessage)*/

    //Fazer 3? commandos git 
    var gitAddAndCommit = "git add -A && git commit -m " + commitMessage;
    var gitPush = "git push -u origin master"
    var gitStatus = "git status";
    /*console.log(gitAddAndCommit);*/

    shell.exec(gitStatus, (code, stdout, stderr) => {
        if (stdout.includes('Changes not staged for commit:')) {
            shell.exec(gitAddAndCommit);
            shell.exec(gitPush);
        }
    });
}

function shellExit() {
    shell.echo('Sorry, no git folder found');
    shell.exit(0);
}