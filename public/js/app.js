$(document).ready(function(){
  // set reference to the article-container div for dynamic content
  // add event listener to generate saved article
  // add scrape new article button
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // load page
  initPage();
  
  function initPage(){
    // empty any articles currently on the page
    articleContainer.empty();
    // Grab the articles as a json
    $.get("/api/headlines?saved=false")
      .then(function(data){
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          renderEmpty();
        }
    });
  }
  function renderArticles(articles) {
    // append HTML to page 
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // once articles are in the array, append to container
    articleContainer.append(articlePanels);
  }
  function createPanel(article) {
    // take in single JSON object for an article and use jQuery to format HTML
    var panel =
    $(["<div class='panel panel-default'>",
      "<div class='panel-heading'>",
      "<h3>",
      article.headline,
      "<a class='btn btn-success save'>",
      "Save Article",
      "</a>",
      "</h3>",
      "</div>",
      "<div class='panel-body'>",
      article.summary,
      "</div>",
      "</div>",
    ].join(""));
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    // explain if there are no articles to view
    var emptyAlert = 
    $(["<div class='alert alert-warning text-center'>",
      "<h4>Uh oh, looks like we don't have any new articles!</h4>",
      "</div>",
      "<div class='panel panel-default'>",
      "<div class='panel-heading text-center'>",
      "<h3>What would you like to do?</h3>",
      "</div>",
      "<div class='panel-body text-center'>",
      "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
      "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
      "</div>",
      "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
  }
  
  function handleArticleSave(){
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;
    // Now make an ajax call for the Article
    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave
    })
    .then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }
  
  function handleArticleScrape() {
    $.get("/api/fetch")
      .then(function(data) {
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
      });
  }
});
   
  
