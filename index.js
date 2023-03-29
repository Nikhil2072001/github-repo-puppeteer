var puppeteer = require("puppeteer");
async function find(){
    var browser = await puppeteer.launch({headless: false});
    var page = await browser.newPage();
    await page.goto("https://github.com/trending");
    await page.waitForSelector(".Box-row");
    var repos = await page.evaluate(function (){
    var reposElement = Array.from(document.querySelectorAll(".Box-row"));
    var repoArr = [];
    reposElement.forEach((repo) => {
      var titleData = repo.querySelector('h1').innerText;
      titleData.replace(" ","");

      var description_data="";
      if(repo.querySelector("p")){
       description_data= repo.querySelector("p").innerText;}

       var language_data="";
       if(repo.querySelector("span[itemprop ='programmingLanguage']")){
        language_data=repo.querySelector("span[itemprop='programmingLanguage']").innerText;
       }
          var url_data="";
          if(repo.querySelector("h1 > a")){
          url_data= repo.querySelector("h1 > a").href;
          }
          var star_data="";
          
      repoArr.push({title: titleData, 
        description: description_data,
         language: language_data,
        url: url_data
        });
    });
    
    return repoArr;
    });
    console.log(repos);
    
}
find();