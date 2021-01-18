// import React from 'react'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
// import Button from '@material-ui/core/Button'
// import auth from './../auth/auth-helper'
// import {Link, withRouter} from 'react-router-dom'
// import CartIcon from '@material-ui/icons/ShoppingCart'
// import Badge from '@material-ui/core/Badge'
// import cart from './../cart/cart-helper'

// const isActive = (history, path) => {
//   if (history.location.pathname == path)
//     return {color: '#bef67a'}
//   else
//     return {color: '#ffffff'}
// }
// const isPartActive = (history, path) => {
//   if (history.location.pathname.includes(path))
//     return {color: '#bef67a'}
//   else
//     return {color: '#ffffff'}
// }
// const Menu = withRouter(({history}) => (
//   <AppBar position="static">
//     <Toolbar>
//       <Typography variant="h6" color="inherit">
//         Stitched-Inn
//       </Typography>
//       <div>
//         <Link to="/">
//           <IconButton aria-label="Home" style={isActive(history, "/")}>
//             <HomeIcon/>
//           </IconButton>
//         </Link>
//         <Link to="/shops/all">
//           <Button style={isActive(history, "/shops/all")}>Tailors</Button>
//         </Link>
//         {/* <Link to="/auctions/all">
//           <Button style={isActive(history, "/auctions/all")}>All Auctions</Button>
//         </Link> */}
//         <Link to="/cart">
//           <Button style={isActive(history, "/cart")}>
//             Cart
//             <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
//               <CartIcon />
//             </Badge>
//           </Button>
//         </Link>   
//         <Link to="/dashboard">
//           <Button style={isActive(history, "/dashboard")}>Dashboard</Button>
//         </Link>   
//       </div>
//       <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
//       {
//         !auth.isAuthenticated() && (<span>
//           <Link to="/signupclient">
//             <Button style={isActive(history, "/signupclient")}>Sign up As Client
//             </Button>
//           </Link>
//           <Link to="/signup">
//             <Button style={isActive(history, "/signup")}>Sign up As Tailor
//             </Button>
//           </Link>
//           <Link to="/signin">
//             <Button style={isActive(history, "/signin")}>Sign In
//             </Button>
//           </Link>
//         </span>)
//       }
//       {
//         auth.isAuthenticated() && (<span>
//           {auth.isAuthenticated().user.seller && (<>
//             <Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>
//             {/* <Link to="/myauctions"><Button style={isPartActive(history, "/myauctions")}>My Auctions</Button></Link> */}
//             </>
//           )}
//           <Link to={"/user/" + auth.isAuthenticated().user._id}>
//             <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
//           </Link>
//           <Button color="inherit" onClick={() => {
//               auth.clearJWT(() => history.push('/'))
//             }}>Sign out</Button>
//         </span>)
//       }
//       </span></div>
//     </Toolbar>
//   </AppBar>
// ))

// export default Menu

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import cart from "./../cart/cart-helper";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const Menu = withRouter(({ history }) => (
  <AppBar position="static" >
    <Toolbar>
      {/* <Typography variant="h6" color="inherit">
        Stitched-Inn
      </Typography> */}
      { (!auth.isAuthenticated() || (auth.isAuthenticated()&&auth.isAuthenticated().user.email.split("@")[1] !==
                "admin.com")) && (
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            Stitched-Inn
          </IconButton>
        </Link>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>Tailors</Button>
        </Link>
        {/* <Link to="/auctions/all">
          <Button style={isActive(history, "/auctions/all")}>All Auctions</Button>
        </Link> */}
        <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            Orders
            <Badge
              invisible={false}
              color="secondary"
              badgeContent={cart.itemTotal()}
              style={{ marginLeft: "7px" }}
            >
              <CartIcon />
            </Badge>
          </Button>
        </Link>
      </div>
      )}

{  (auth.isAuthenticated()&&auth.isAuthenticated().user.email.split("@")[1] ===
                "admin.com") && (
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            Stitched-Inn
          </IconButton>
        </Link>
        <Link to="/allTailors">
          <Button style={isActive(history, "/allTailors")}>All Tailors</Button>
        </Link>
        {/* <Link to="/auctions/all">
          <Button style={isActive(history, "/auctions/all")}>All Auctions</Button>
        </Link> */}
        <Link to="/allCustomers">
          <Button style={isActive(history, "/allCustomers")}>  All Customers</Button>
        </Link>
      </div>
      )}



      <div style={{ position: "absolute", right: "10px" }}>
        <span style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signupclient">
                <Button style={isActive(history, "/signupclient")}>
                  Sign up As Client
                </Button>
              </Link>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>
                  Sign up As Tailor
                </Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              {auth.isAuthenticated().user.email.split("@")[1] ===
                "admin.com" && (
                <>
                  <Link to="/dashboard">
                    <Button style={isActive(history, "/dashboard")}>
                      Dashboard
                    </Button>
                  </Link>
                  {/* <Link to="/myauctions"><Button style={isPartActive(history, "/myauctions")}>My Auctions</Button></Link> */}
                </>
              )}
              {auth.isAuthenticated().user.seller &&
                auth.isAuthenticated().user.email.split("@")[1] !=
                  "admin.com" && (
                  <>
                    <Link to="/seller/shops">
                      <Button style={isPartActive(history, "/seller/")}>
                        My Shops
                      </Button>
                    </Link>
                    {/* <Link to="/myauctions"><Button style={isPartActive(history, "/myauctions")}>My Auctions</Button></Link> */}
                  </>
                )}

      
                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                  <Button
                    style={isActive(
                      history,
                      "/user/" + auth.isAuthenticated().user._id
                    )}
                  >
                    My Profile
                  </Button>
                </Link>
              
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </span>
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;
