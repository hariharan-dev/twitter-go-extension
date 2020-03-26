import axios from "axios";
import { base_url } from "./constants";
import { data } from "./input";

main();

function main() {
  getTweets()
    .then(tweets => {
      console.log(tweets);
      if (tweets.data.errors) {
        console.log("error");
        return;
      }
      appendTweets(tweets.data);
      var loader = document.getElementsByClassName("loader")[0];
      loader.parentNode.removeChild(loader);
      document
        .getElementById("scroll-left")
        .addEventListener("mouseup", scrollFn);

      document
        .getElementById("scroll-right")
        .addEventListener("mouseup", scrollFn);
    })
    .catch(err => console.log(err));
}

/**
 * TODO: Use a html template or custom element or something
 * and clean up this mess.
 * @param {*} tweets
 */
function appendTweets(tweets) {
  tweets.forEach(tweetData => {
    const tweetTemplate = tweetTemp.content.cloneNode(true);
    tweetTemplate.id = tweetData.id;
    const tweet = tweetTemplate.querySelector(".tweet");
    tweet.href = `https://twitter.com/${tweetData.user.screen_name}/status/${tweetData.id_str}`;

    // tweet-header section
    let headerImg = tweet.querySelector("img");
    headerImg.src = tweetData.user.profile_image_url_https;
    let userDetails = tweet.querySelector("h4");
    userDetails.innerHTML = `${tweetData.user.name} @${tweetData.user.screen_name}`;

    // tweet-content section
    let tweetContent = tweet.querySelector("p");
    tweetContent.innerHTML = tweetData.text;

    if (tweetData.entities["media"] && tweetData.entities["media"].length) {
      let img = document.createElement("img");
      img.src = tweetData.entities["media"][0].media_url_https;
      img.height = 250;
      const imagesSection = tweet.querySelector(".images");
      imagesSection.appendChild(img);
    }
    //appending the tweet finally
    document
      .getElementsByClassName("tweets-container")[0]
      .appendChild(tweetTemplate);
  });
}

function scrollFn(mouseEvent) {
  let tweetsContainer = document.getElementsByClassName("tweets-container")[0];
  for (let i = 0; i < 400; i++) {
    setTimeout(() => {
      if (mouseEvent.srcElement.id == "scroll-right") {
        tweetsContainer.scrollLeft += 1;
      } else {
        tweetsContainer.scrollLeft -= 1;
      }
    }, i * 3);
  }
}
function getTweets() {
  return axios.get(base_url + "tweets");
  // return Promise.resolve({ data });
}
