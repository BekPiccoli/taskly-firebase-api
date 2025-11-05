export const getSubjects = async (req, res) => {
  try {
    const snapshot = await db.collection("subjects").get();
    res.status(200).send(snapshot.docs);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send("Error fetching subjects");
  }
};
