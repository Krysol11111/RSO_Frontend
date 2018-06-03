export default {
  services: {
    orders: "192.168.8.108:8084/webservice-rest",
    products: "http://localhost:8082/product-webservice-rest",
    keycloak: "http://192.168.8.108:8080/auth/realms/rso/protocol/openid-connect/token",
    users: "http://localhost:8083/user-webservice-rest",
  },
  ordersQuery:{

  },
  productsQuery:{
    products: "/api/products",
    categories: "/api/products/getCategoryNames",
  },
  usersQuery:{
    login: "/api/token/getToken",
    logout: "/api/token/logout",
    refreshToken: "/api/token/refreshToken",
  },
}

/* user token body
 grant_type:password
 client_id:rso-client
 client_secret:3d3ec54d-29fc-4f40-b265-36bcb200b794
 username:ws-admin
 password:ws-admin
 */


/* service auth:
header Authorization: "Bearer" + " " + access_token

 */
