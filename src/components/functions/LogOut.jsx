function LogOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("isLogged");
  return;
}

export default LogOut;
