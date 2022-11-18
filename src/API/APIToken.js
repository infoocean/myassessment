import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2NjgxNzkyMDR9.qXyw3HRg8K9hsz9StLX1KFiTUc8ducZV-ng-Cbzn0os";

export default auth_token;

//online server
// const api = "https://mytaskbackendserver.herokuapp.com/";
// export { api };
//local server
const api = "http://localhost:5000/";
export { api };

const woocemmerceapi = new WooCommerceRestApi({
  url: "https://furniture.mangoitsol.com",
  consumerKey: "ck_09e070e7214fbbaac8d98e6d96478704d59457f7",
  consumerSecret: "cs_d271fb01e3893cb7513d762a4f1cb409d9bb1944",
  version: "wc/v3",
});
export { woocemmerceapi };
