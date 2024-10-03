const CheckUser = () => {
  let user = localStorage.getItem("user");
  let isLogged = localStorage.getItem("isLogged");
  if (user && isLogged) {
    return true;
  } else {
    return false;
  }
};

export default CheckUser;
