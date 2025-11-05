import { handleSignup } from "../controller/singup.js";
import { handleLogout } from "../controller/logout.js";
import { handleLogin } from "../controller/login.js";
import { getSubjects } from "../controller/getSubjects.js";

export const routes = (app) => {
  app.get("/login", handleLogin);
  app.get("/subjects", getSubjects);

  app.post("/signup", handleSignup);
  app.post("/logout", handleLogout);
};
