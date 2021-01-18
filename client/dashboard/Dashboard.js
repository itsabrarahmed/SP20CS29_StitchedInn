import React, {useState, useEffect}  from 'react'

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { darken, makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";

import PermIdentity from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import styles from "./../assets/jss/material-kit-react/views/dashboardStyle.js";
import GridItem from "./../components/Grid/GridItem.js";
import GridContainer from "./../components/Grid/GridContainer.js";
import Table from "./../components/Table/Table.js";
import Tasks from "./../components/Tasks/Tasks.js";
import CustomTabs from "./../components/CustomTabs/CustomTabs.js";
import Danger from "./../components/Typography/Danger.js";
import Card from "./../components/Card/Card.js";
import CardHeader from "./../components/Card/CardHeader.js";
import CardIcon from "./../components/Card/CardIcon.js";
import CardBody from "./../components/Card/CardBody.js";
import CardFooter from "./../components/Card/CardFooter.js";
//import { Interpolation, Svg } from "chartist";
import { bugs, website, server } from "./general.js";

//import {  dailySalesChart, emailsSubscriptionChart, completedTasksChart } from "./charts.js";
import {todayOrders} from "../order/api-order.js" 
import {listToday,list} from "../user/api-user.js"

const useStyles = makeStyles(styles);

export default function Dashboard() {
  
  let [ordersCountToday, setOrdersCountToday] = useState(0);
  let [salesToday, setSalesToday] = useState(0);
  let [tailorsToday, setTailorsToday] = useState(0);
  let [customersToday, setCustomersToday] = useState(0);
  let [tailorsTableData, setTailorsTableData] = useState([]);
  let [customersTableData, setCustomersTableData] = useState([]);
  //let [orders,setOrders]=useState(0);
  //var [date,setDate] = useState(new Date());

  const classes = useStyles();

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
durations = 500;
var delays2 = 80,
durations2 = 500;

// useEffect(()=>{
//   var timer=setInterval(()=>setDate(newDate()),1000)
// });
// return function cleanup()
// {
//   clearInterval(timer)
// }
useEffect(() => {
  const fetchData = async () => {
   await todayOrders().then(res=>res.map(element => {

      setOrdersCountToday(ordersCountToday += element.products.length);
      element.products.map(e=>{
        setSalesToday(salesToday+= e.product.price);
       })
    })
    ).catch(err=>  console.log(err)
     )

    await listToday()
     .then(res=>res.map(element=>{
       if(element.seller==true){
         setTailorsToday(++tailorsToday);
       }
       else if(element.seller==false){
         setCustomersToday(++customersToday);
       }
     }))
     .catch(err=>  console.log(err)
     )

     let tailorCount=0;
     let customerCount=0;
     await list()
     .then(res=>res.map((element)=>{
     
        let user=[element.name,element.address,element.city,element.state,element.country,element.contactno];


       if(element.seller==true && element.email.split("@")[1] !== "admin.com"&&tailorCount<5){
         
        
         setTailorsTableData(tailorsTableData=>[user,...tailorsTableData]);
        tailorCount++;
       }
       else if(element.seller==false && element.email.split("@")[1] !== "admin.com"&&customerCount<5){
        setCustomersTableData(customersTableData=>[user,...customersTableData]);
        customerCount++;
       }
     }))
     .catch(err=>  console.log(err)
     
     )

  };

  fetchData()

}, []);


//console.log( tailorsTableData)


// useEffect(() => {
//   todayOrders().then(res=>res.map(element => {

//     setOrdersCountToday(ordersCountToday += element.products.length);
//     element.products.map(e=>{
//       setSalesToday(salesToday+= e.product.price);
//      })
//   })
//   ).catch(err=>  console.log(err)
  
//   )

// }, [])

// useEffect(() => {
//   listToday()
//   .then(res=>res.map(element=>{
//     if(element.seller==true){
//       setTailorsToday(++tailorsToday);
//     }
//     else if(element.seller==false){
//       setCustomersToday(++customersToday);
//     }
//   }))
//   .catch(err=>  console.log(err)
  
//   )

// }, [])
 //console.log(tailorsToday+"   "+customersToday); 

/////////////////////////////////////////////////////
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Orders Today</p>
              <h3 className={classes.cardTitle}>
               {ordersCountToday} <small>ORDERS</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Today Sale</p>
              <h3 className={classes.cardTitle}>PKR {salesToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="error" stats icon>
              <CardIcon color="error">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Tailors</p>
              <h3 className={classes.cardTitle}>{tailorsToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Customers</p>
              <h3 className={classes.cardTitle}>{customersToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Customer Record</h4>
            <p className={classes.cardCategoryWhite}>
              {/* Here is a subtitle for this table*/}
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Address", "City","State","Country","Contact No"]}
                 tableData= {customersTableData}
              // tableHead={["Product Details", "Customer Name", "Customer Address", "Shop Details"]}
              // tableData={[
              //   ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              //   ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              //   ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              //   ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              //   ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              //   ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              // ]}
            />
          </CardBody>
        </Card>
      </GridItem>    
      <GridItem xs={12} sm={12} md={6}>
        <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Tailors Record</h4>
              <p  className={classes.cardCategoryWhite}>
                {/* Updated Since last 24 Hours */}
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Address", "City","State","Country","Contact No"]}
                 tableData= {tailorsTableData}
                // tableData={[
                //   ["1", "Dakota Rice", "$36,738", "Niger"],
                //   ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                //   ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                //   ["4", "Philip Chaney", "$38,735", "Korea, South"]
                // ]}
              />
            </CardBody>
          </Card>
        </GridItem>
       </GridContainer>
       {/* <GridContainer>
       <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
       
     <GridItem xs={12} sm={12} md={6}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Pending Orders Record
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", , "Niger", "Oud-Turnhout","$36,738"],
                ["2", "Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["3", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
       </GridContainer> */}

    </div>
  );

}
