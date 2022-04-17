let url="https://github.com/topics";
const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const request=require("request");
const AlltopicObj=require("./getAlltopics");
let Gittopicspath=path.join(__dirname,"github_topic");

if(!fs.existsSync(Gittopicspath)){
    fs.mkdirSync(Gittopicspath);
}
request(url,cb);
function cb(err,res,body){
    if(err){
        console.log("error",err);
    }
    else{
        //console.log("accessed");
        urlHandler(body)
    }
}
function urlHandler(html){
    const selecTool=cheerio.load(html);
    let anchorTopicElemArr=selecTool('a[class="no-underline flex-1 d-flex flex-column"]');
    //console.log(anchorTopicElemArr.html());
    //console.log(anchorTopicElemArr.length);
    for(let i=0;i<3;i++){

        let topicRelativeLinkArr=selecTool(anchorTopicElemArr[i]).attr("href");
        //console.log(topicRelativeLinkArr);
        let fullLink="https://github.com"+topicRelativeLinkArr;
        //console.log(fullLink);
        
        AlltopicObj.getAllTopic(fullLink);
        
    }

    
}