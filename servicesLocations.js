export default {
  services: {
    orders: "192.168.8.108:8084/webservice-rest",
    products: "http://localhost:8082/product-webservice-rest",
    users: null,
    keycloak: "192.168.8.108:8080/auth/realms/rso/protocol/openid-connect/token",
    userToken: "192.168.8.108:8080/auth/realms/rso/protocol/openid-connect/token",
  },
  ordersQuery:{

  },
  productsQuery:{
    products: "/api/products",
    categories: "/api/products/getCategoryNames",
  },
  usersQuery:{

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
