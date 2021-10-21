function checkSpam(str) {
  let oneRegister = str.toLowerCase();

  return (
    oneRegister.includes('1xbet') || oneRegister.includes('xxx')
  );
}
