const app = require("./app");
const logger = require("./utils/logger");
const { connectDB, closeDB, checkDBHealth } = require("./db/mongo");

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

// DB health check endpoint
app.get("/health/db", async (req, res) => {
  try {
    const dbHealth = await checkDBHealth();
    res.status(dbHealth.status === "healthy" ? 200 : 503).json(dbHealth);
  } catch (error) {
    res.status(503).json({ status: "unhealthy", error: error.message });
  }
});

async function startServer() {
  console.log("Starting server...");
  try {
    await connectDB();
    logger.info("Database connected successfully");

    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
      logger.error(err);
      gracefulShutdown(server, "uncaughtException");
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
      logger.error(err);
      gracefulShutdown(server, "unhandledRejection");
    });

    // Handle SIGTERM
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully");
      gracefulShutdown(server, "SIGTERM");
    });

    // Handle SIGINT
    process.on("SIGINT", () => {
      logger.info("SIGINT received. Shutting down gracefully");
      gracefulShutdown(server, "SIGINT");
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown function
async function gracefulShutdown(server, reason) {
  isShuttingDown = true;
  try {
    logger.info(`Graceful shutdown initiated due to: ${reason}`);
    await server.close();
    logger.info("Server closed");
    await closeDB();
    logger.info("Database connection closed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
}

startServer();
