const CheckUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default CheckUser;
