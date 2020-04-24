var MOVIESLIST = [];

/* AJAX helps get the info from NYT's api. The info is then placed in the global array "MOVIESLIST" ^ */
function getMovieInfo()
{
    console.log("loading information");
    var request = new XMLHttpRequest();

    //prepare the request
    request.open("GET", "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=0msTd8GHGUbawClqcQ3cNUPp5esyTfCG");

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


                for (i in mResults){
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

// Displays Info from Array
function displayMovieTitles(fullArray)
{
    for (i in fullArray)
    {
        var displayList = document.getElementById("titles-section");
        // Adds onclick functionality
        displayList.innerHTML += "<a class='all-titles' href='#scroll-here' onclick='check("+i+ ");' id="+ i + ">" + fullArray[i].display_title + "</a> <br> <div class='divider-2'></div>";
        
        // Verify data is accurate
        console.log("Display Title: ");
        console.log(fullArray[i].display_title);
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
    showTitle.innerHTML += item.display_title;

    //display extra info
    var showByline = document.getElementById("show-byline");
    showByline.innerHTML = "";
    showByline.innerHTML += "Reviewed by ";
    showByline.innerHTML += item.byline;
    showByline.innerHTML += "&nbsp; | &nbsp;";
    showByline.innerHTML += "Published on ";
    showByline.innerHTML += item.publication_date;

    //show photo
    var showPhoto = document.getElementById("show-photo");
    showPhoto.innerHTML = "";
    showPhoto.innerHTML = "<img class='the-image' src=" + item.multimedia.src + " alt= Photo of "+item.display_title+"/>";

    var showSummary = document.getElementById("show-summary");
    showSummary.innerHTML = "";
    showSummary.innerHTML = item.summary_short + " Want to keep reading? Check out the full article below.";

    var showFull = document.getElementById("show-full");
    showFull.innerHTML = "";
    showFull.innerHTML = "<a href = "+ item.link.url + " class = 'button'>"+item.link.suggested_link_text+"</a>";
    
    //Verify data accuracy
    console.log("Displayed finish - ", item); 
}

