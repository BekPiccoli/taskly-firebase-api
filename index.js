import express, { json } from "express";
import { db } from "./firebase.config.js";

const port = 3001;
const app = express();
app.use(json());

const hashPassword =  (password) => {
  // return btoa(password);
  return password;
};

const solvedingPassword =  (password) => {
  // return atob(password);
    return password;
};

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const userRef = db.collection("users").doc();
    await userRef.set({
      email,
      password: hashedPassword,
    });
    res.status(201).send({ id: userRef.id, email });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.get("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const solvedPassword = solvedingPassword(password);
    const trimmedEmail = email.trim();
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", trimmedEmail).get();

    if (snapshot.empty) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

   let userData = null;
    snapshot.forEach(doc => {
      userData = {
        id: doc.id,
      ...doc.data(),
        };
});
console.log(userData.password === solvedPassword)
    if (userData.password === solvedPassword ) {
     return res.send({Authenticated: true, user: userData})
    } else{
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

  } catch(error) {
    console.error(error)
  }

})

app.get("/subjects", async (req, res) => {
  try {
    const snapshot = await db.collection("subjects").get();
    console.log("snapshot", snapshot);
    res.status(200).send(snapshot.docs);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send("Error fetching subjects");
  }
});

app.listen(port, () => {
  console.log(`Taskly API listening on port ${port}`);
});
