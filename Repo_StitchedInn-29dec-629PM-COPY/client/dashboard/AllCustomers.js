import React,{useState,useEffect} from 'react';
import Switch from '@material-ui/core/Switch';
import GridItem from "./../components/Grid/GridItem.js";
import Card from "./../components/Card/Card.js";
import CardHeader from "./../components/Card/CardHeader.js";
import CardBody from "./../components/Card/CardBody.js";
//import { Interpolation, Svg } from "chartist";
//import {  dailySalesChart, emailsSubscriptionChart, completedTasksChart } from "./charts.js";
import {list} from "../user/api-user.js"
import {update} from "../user/api-user.js"
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function AllCustomers() {

    let[customersTableData,setCustomersTableData]=useState([]);
    let [status, setStatus] = useState(true);

    const handleChange = (index,id) => {
        const jwt = auth.isAuthenticated()
    
          //tailorsTableData[index].status=!tailorsTableData[index].status;
        //setTailorsTableData(tailorsTableData);
        setStatus(!status);
    
          const user = {
            status:!customersTableData[index].status
          }
          update({
            userId: id
          }, {
            t: jwt.token
          }, user).then((data) => console.log(data)).catch(err=>console.log(err))

      };

      const classes = useStyles();

      useEffect(() => {
        setCustomersTableData([]);
      const fetchData = async () => {
         await list()
         .then(res=>res.map((element)=>{
            let user={id:element._id,name:element.name,address:element.address,city:element.city,state:element.state,country:element.country,contactno:element.contactno,status:element.status};
    
    
           if(element.seller==false && element.email.split("@")[1] !== "admin.com"){
             
            
            setCustomersTableData(customersTableData=>[user,...customersTableData]);
           }
         }))
         .catch(err=>  console.log(err)
         
         )
    
      };
    
      fetchData()
    
    }, [status]);

    return (
        <div>
            <GridItem >
        <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Customers Record</h4>
        
            </CardHeader>
            <CardBody>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {customersTableData.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.contactno}</TableCell>
              <TableCell align="right">
              <Switch
        checked={row.status}
        onChange={fun=>handleChange(index,row.id)}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
        </div>
    )
}
