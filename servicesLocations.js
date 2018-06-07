export default {
  services: {
    orders: "http://localhost:8084/webservice-rest",
    products: "http://localhost:8082/product-webservice-rest",
    users: "http://localhost:8083/user-webservice-rest",
  },
  ordersQuery:{
    createOrder: "/api/orders/addOrder",
    fetchOrders: "/api/orders/orders",
  },
  productsQuery:{
    products: "/api/products",
    categories: "/api/products/getCategoryNames",
  },
  usersQuery:{
    login: "/api/token/getToken",
    logout: "/api/token/logout",
    refreshToken: "/api/token/refreshToken",
    register: "/api/register",
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
