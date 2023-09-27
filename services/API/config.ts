const LOCAL_IP = "172.30.1.8";
// const LOCAL_IP = '192.168.0.12';
const DEV_PORT = "5050";
const VERSION = "v1";

const BASE_URI =
  process.env.NODE_ENV === "production"
    ? `https://v2-api.designershop.kr/${VERSION}/`
    : `http://${LOCAL_IP}:${DEV_PORT}` + `/${VERSION}`;

export { LOCAL_IP, DEV_PORT, VERSION, BASE_URI };
