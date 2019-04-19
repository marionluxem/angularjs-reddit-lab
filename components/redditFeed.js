function RedditFeed(RedditService, $q) {
  const ctrl = this;
    // list of reddit posts to display
  ctrl.feed = [];
  ctrl.fetchAwwSubreddit = () => {
    return $q(function(resolve, reject) {
      RedditService.fetchAwwSubreddit()
      .then ( (response) => {
        console.log(response);
        //get children from data
        let children = response.data.data.children;
        //organize in to objects for each one
        children.forEach( function(child, index) {
          let childObj = {
            title: child.data.title,
            img: child.data.thumbnail,
            permalink: child.data.permalink
          }
          // add to feed array
          ctrl.feed.push(childObj);
          if ( index === children.length -1) {
            resolve();
          } 
        })
      })
    })
  };

    ctrl.fetchAwwSubreddit()
    .then ( () => {
      alert('completed');
    })
}
  angular.module('RedditApp').component('redditFeed', {
    template: `
    <div ng-repeat="item in $ctrl.feed">
    <div id="box">
    <a href="https://www.reddit.com/{{item.permalink}">
    <img src="{{item.img}}"></img></a>
     <h4>{{item.title}}</h4>
     <a href="https://www.reddit.com/{{item.permalink}}">
     <div id="link-container">Link: {{item.permalink}}</div></a></div>
  </div>`, // or use templateUrl
    controller: RedditFeed,
});


