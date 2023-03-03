exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      docTitle: "Page not found",
      path: "/page-not-found",
      isAuthenticated: req.session.isLoggedIn,
    });
};

exports.get500 = (req , res , next)=>{
  res.status(500).render("500",{
    docTitle: "Error Occurred!!",
      path: "/500",
      isAuthenticated: req.session.isLoggedIn,
  })
}
