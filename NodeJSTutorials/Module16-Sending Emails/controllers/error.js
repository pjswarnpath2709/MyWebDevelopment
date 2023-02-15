exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      docTitle: "Page not found",
      path: "/page-not-found",
      isAuthenticated: req.session.isLoggedIn,
    });
};
