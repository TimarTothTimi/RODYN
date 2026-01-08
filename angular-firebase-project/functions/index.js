const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const logger = require("firebase-functions/logger");

// Firebase Admin SDK inicializálása
admin.initializeApp();
const db = admin.firestore();

// Globális beállítások (pl. maxInstances)
setGlobalOptions({ maxInstances: 10 });

// Titkos kulcs az admin write API-hoz
const ADMIN_KEY = "IDE_ÍRD_A_TITKOS_API_KULCSOD";

/**
 * Publikus read API – Angular oldalnak
 */
exports.getPosts = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("posts").get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(data);
    } catch (error) {
      logger.error("Firestore read error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/**
 * Admin-only write API
 */
exports.createPost = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader !== `Bearer ${ADMIN_KEY}`) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: "Missing title or content" });
      }

      const docRef = await db.collection("posts").add({
        title,
        content,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.json({ success: true, id: docRef.id });
    } catch (error) {
      logger.error("Firestore write error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});
