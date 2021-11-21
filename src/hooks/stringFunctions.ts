
const compareStrings = (str1:string, str2:string) => {
  const pattern = str2;
  var regexObject = new RegExp(pattern, "i");
  return (str1.search(regexObject) < 0) ? false : true;
};

export { compareStrings };
