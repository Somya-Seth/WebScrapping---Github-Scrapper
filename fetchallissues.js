const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const request=require("request");
const PDFDocument=require("pdfkit");

function fetchallissues(url,ProjectPath,pn){
  request(url,cb);
  function cb(err,res,body){
      if(err){
          console.log("error",err);

      }
      else{
          //console.log("accessed");
          handlerUrl(body);
      }
  }
  function handlerUrl(html){
      const selecTool=cheerio.load(html);
      const IssueLink=selecTool('a[data-hovercard-type="issue"]');
      var issues_text = "";
      for(let i=0;i<5;i++){
          let getIssuesText=selecTool(IssueLink[i]).text();
          //console.log(getIssuesText);
          //break;
          issues_text+= (i+1)+" "+ getIssuesText+"\n";
      }
          const doc = new PDFDocument;
          doc.pipe(fs.createWriteStream(path.join(ProjectPath,pn+".pdf")));
          doc.text(issues_text,10,10);
          doc.end();
  }
}
module.exports={
    fetchallissues:fetchallissues,
}
//doc.pipe(fs.createWriteStream("abc.pdf")));