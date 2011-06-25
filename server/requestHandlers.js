
function index() {
  console.log("index handler called");
  return "index.html";
}

function defHandler() {
  console.log("Default handler called");
}

exports.index = index;
exports.defHandler = defHandler;
