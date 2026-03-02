import mongoose from "mongoose";

const globalCache = globalThis;
if (!globalCache.__mongooseConnectionCache) {
  globalCache.__mongooseConnectionCache = {
    connection: null,
    promise: null,
  };
}

const cache = globalCache.__mongooseConnectionCache;

const connectDB = async () => {
  if (cache.connection) {
    return cache.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined.");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(process.env.MONGO_URI).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance.connection;
    });
  }

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
};

export default connectDB;
