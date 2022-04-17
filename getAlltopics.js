const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const request=require("request");
const IssueObj=require("./issue");
function getAllTopic(url){
//console.log(url);
       let tn=path.basename(url);
        let TopicName=path.join(__dirname,"github_topic",tn);

        if(!fs.existsSync(TopicName)){
            fs.mkdirSync(TopicName);
        }
request(url,cb);
function cb(err,res,body){
    if(err){
        console.log("error",err);
    }
    else{
        //console.log("accessed");
        urlHandler(body);
    }
}
function urlHandler(html){
    let selecTool=cheerio.load(html);
    let ProjectsArr=selecTool('a[class="text-bold wb-break-word"]');
    //console.log(ProjectsArr.text());
    //console.log(ProjectsArr.length);
    for(let i=0;i<8;i++){
        let ProjectsLinkArr=selecTool(ProjectsArr[i]).attr("href");
        //console.log(ProjectsLinkArr);
        let fullLink="https://github.com"+ProjectsLinkArr;
        //console.log(fullLink);
        let pn=path.basename(fullLink);
        let dividedArr=pn.split('.');
        let Pname=dividedArr[0];
        //console.log(Pname);
        //let projectPath=path.join(TopicName,Pname+".pdf");
        // if(!fs.existsSync(projectPath)){
        //     fs.mkdirSync(projectPath);
        // }
        IssueObj.issue(fullLink,TopicName,Pname);
         
    }
}

}
module.exports={
    getAllTopic:getAllTopic,
}