
var webroot = "./www";


function route(handle, pathname) {

  //console.log("Processing route for " + pathname);

  if (typeof handle[pathname] == 'function') {
    var filename = handle[pathname]();
    return webroot + "/" + filename;
  } else {
    return webroot +  pathname;
  }
}   
    
exports.route = route;

