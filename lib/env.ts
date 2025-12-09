const isProd = process.env.NODE_ENV === "production";

const env = {
  url:
    isProd
      ? process.env.PROD_DATABASE_URL!
      : process.env.DEV_DATABASE_URL!,
};

export default  env;