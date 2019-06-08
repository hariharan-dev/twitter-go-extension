import axios from "axios";
import { base_url } from './constants';

axios.get( base_url + "tweets")
.then(
  (tweets ) => {
    var loader = document.getElementsByClassName('loader')[0];
    loader.parentNode.removeChild(loader);

    console.log(tweets);
    if (tweets.data.errors) {
      console.log("error");
      return;
    }
    const data = tweets.data;
    data.forEach(tweetData => {
      const tweet = document.createElement("div");
      tweet.className = "tweet";
      tweet.id = tweetData.id;

      // tweet-header section
      const header = "<div class='header'>" +
      "<img class='dp' src=" + tweetData.user.profile_image_url_https + ">" +
      "<h4>" + tweetData.user.name + " @" + tweetData.user.screen_name + "</h4>" +
      "</div>";

      // tweet-content section
      const tweetContent = "<div class='tweet-content'>" +
      "<p>" + tweetData.text + "</p>" +
      "</div>";

      //appending header and tweet content to tweet
      tweet.innerHTML = header + tweetContent;

      //tweet-media section
      const imgs = [];
      if (tweetData.entities["media"] != undefined && tweetData.entities["media"].length > 0) {
          tweetData.entities["media"].forEach(tweetImg => {
            let img = document.createElement("img");
            img.src = tweetImg.media_url_https;
            imgs.push(img);
          });
      }
      if (imgs.length > 0) {
        let tweetWidth = 250;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].width = tweetWidth / imgs.length;
          imgs[i].height = tweetWidth / imgs.length;
        }
        const imagesSection = document.createElement("div");
        imagesSection.className = "images";
        imgs.forEach(img => imagesSection.appendChild(img));
        tweet.appendChild(imagesSection);
      }

      // when on clicked the tweet will be opened in a blank tab
      tweet.addEventListener("click", event => {
        let url = "https://twitter.com/";
        url += tweetData.user.screen_name + "/status/" + tweetData.id_str;
        window.open(url, "_blank");
      });

      //appending the tweet finally
      document.getElementsByClassName("tweets-container")[0].appendChild(tweet);
    });

    document.getElementById('scroll-left').addEventListener("mouseup", scrollFn)

    document.getElementById('scroll-right').addEventListener("mouseup", scrollFn)
  }
)
.catch(
  (err) =>  console.log(err)
)

function scrollFn(mouseEvent){
  let tweetsContainer = document.getElementsByClassName("tweets-container")[0];
  for (let i = 0; i < 400; i++) {
    setTimeout(() => {
      if(mouseEvent.srcElement.id == "scroll-right") {
        tweetsContainer.scrollLeft += 1;
      } else {
        tweetsContainer.scrollLeft -= 1;
      }
    }, i * 3);
  }
}