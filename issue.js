const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const request=require("request");
const issueObj=require("./fetchallissues");
const pdfkit=require("pdfkit");

function issue(url,ProjectPath,pn){
    
    request(url,cb);
    function cb(err,req,body){
     if(err){
         console.log("issue",err);
     }
     else{
         //console.log("accessed");
          UrlHandler(body);
     }
    }
    function UrlHandler(html){
        let selecTool=cheerio.load(html);
        let IsuueButton=selecTool('a[id="issues-tab"]');
        let IssueLink=IsuueButton.attr("href");
        //console.log(IssueLink);
        let fullLink="https://github.com"+IssueLink;
        issueObj.fetchallissues(fullLink,ProjectPath,pn);

    }

}
module.exports={
    issue:issue,
}