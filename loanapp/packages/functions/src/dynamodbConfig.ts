const localDdbConfig = {
  endpoint: "http://localhost:8000",
  region: "local",
  credentials: {
    accessKeyId: "xxx",
    secretAccessKey: "xxx",
  },
};

export const dockerComposeConfig = {
  ...localDdbConfig,
  endpoint: `http://localhost:8000`,
};
