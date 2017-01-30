//found out that I can't use an array to require smth like this "require(`../assets/${imageName}.png`)"
//So, the easiest way as I think is this one
//very inconvenient not to use DRY principle :D
//if you have better ideas, please, make a PR :D
const androidImage = require('./drawable/android.png');
const angularImage = require('./drawable/angular.png');
const appleImage = require('./drawable/apple.png');
const cppImage = require('./drawable/cpp.png');
const pureJSImage = require('./drawable/purejs.png');
const reactJSImage = require('./drawable/reactjs.png');
const swiftImage = require('./drawable/swift.png');
const arrayOfForumImages = [
  {title:'React JS',fetchTitle:'reactjs',image:reactJSImage}, 
  {title:'Android',fetchTitle:'android',image:androidImage}, 
  {title:'Angular',fetchTitle:'angular',image:angularImage}, 
  {title:'IOS',fetchTitle:'ios',image:appleImage}, 
  {title:'C++',fetchTitle:'cpp',image:cppImage}, 
  {title:'pure JS',fetchTitle:'purejs',image:pureJSImage}, 
  {title:'Swift',fetchTitle:'swift',image:swiftImage}
];
module.exports = arrayOfForumImages;