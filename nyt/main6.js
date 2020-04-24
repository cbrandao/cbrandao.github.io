var MOVIESLIST = [];

/* AJAX helps get the info from NYT's api. The info is then placed in the global array "MOVIESLIST" ^ */
function getMovieInfo()
{
    console.log("loading information");
    var request = new XMLHttpRequest();

    //prepare the request
    request.open("GET", "https://api.nytimes.com/svc/topstories/v2/food.json?api-key=0msTd8GHGUbawClqcQ3cNUPp5esyTfCG");

    //set the callback
    request.onreadystatechange = function()
    {
        //when the request is finished, update the page
        if(this.readyState == 4)
        {
            console.log("Response: " + this.responseText);
            console.log("Status: " + this.status);
            
            // if request is good, update the page
            if(this.status == 200)
            {
                //parse the response
                var reviewsInfo = JSON.parse(this.responseText);
                console.log(reviewsInfo);
                var mResults = reviewsInfo.results;
                console.log(mResults);


                for (i = 0; i < 15; i++){
                    console.log("NUM: " + i);
                    console.log(mResults[i]);

                    var obj = mResults[i];

                    MOVIESLIST.push(obj);
                    console.log("Current array: ");
                    console.log(MOVIESLIST);

                }
                //update the page
                displayMovieTitles(MOVIESLIST);
            }       
        }
    }
    //make the request
    request.send();
}

function displayMovieTitles(fullArray)
{
    for (i in fullArray)
    {
        var displayList = document.getElementById("titles-section");
        // Adds onclick functionality thry innerHTML
        displayList.innerHTML += "<a class='all-titles' href='#scroll-here' onclick='check("+i+ ");' id="+ i + ">" + fullArray[i].title + "</a> <br> <div class='divider-2'></div>";
        
        console.log("Display Title: ");
        console.log(fullArray[i].title);
        console.log("Accurate id tag: ");
        console.log(document.getElementById(i));
    }    

}

function check(index){
    var item = MOVIESLIST[index];

    // Verify data accuracy
    console.log("You got clicked");
    console.log("Section found -", item);

    //display movie title
    var showTitle = document.getElementById("show-title");
    showTitle.innerHTML = "";
    showTitle.innerHTML += item.title;

    //display extra info
    var showByline = document.getElementById("show-byline");
    showByline.innerHTML = "";
    showByline.innerHTML += item.byline;
    
    //show photo
    var showPhoto = document.getElementById("show-photo");
    showPhoto.innerHTML = "";
    showPhoto.innerHTML = "<img class='the-image' src=" + item.multimedia[3].url + " alt= Photo of "+item.title+"/>";

    //show summary
    var showSummary = document.getElementById("show-summary");
    showSummary.innerHTML = "";
    showSummary.innerHTML = item.abstract + " Want to keep reading? Check out the full article below.";
    
    //show button to article
    var showFull = document.getElementById("show-full");
    showFull.innerHTML = "";
    showFull.innerHTML = "<a href = "+ item.url + " class = 'button'>Read the Full Article</a>";
    
    //Verify data accuracy
    console.log("Displayed finish - ", item);
}