import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {read, listRelated} from './api-product.js'
import {Link} from 'react-router-dom'
import Suggestions from './../product/Suggestions'
import AddToCart from './../cart/AddToCart'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },

}))

export default function Product ({match}) {
  const classes = useStyles()
  const [values, setValues] = useState({
    length: '',
    chest: '',
    shoulder: '',
    sleeve:'',
    waist:''
  })

  var productDetail = {product : {}, size : {}}
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    productDetail.size = values// = {product : product, size : values}
  }
  const [product, setProduct] = useState({shop:{}})
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({productId: match.params.productId}, signal).then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setProduct(data)
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.productId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

        listRelated({
          productId: match.params.productId}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setSuggestions(data)
          }
        })
  return function cleanup(){
    abortController.abort()
  }
}, [match.params.productId])

    const imageUrl = product._id
          ? `/api/product/image/${product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'

    productDetail = {product : product, size : values}
    console.log(productDetail)    
    return (
        <div className={classes.root}>
          <Grid container spacing={10}>
            <Grid item xs={7} sm={7}>
              <Card className={classes.card}>
                <CardHeader
                  title={product.name}
                  subheader={product.quantity > 0? 'In Stock': 'Out of Stock'}
                  action={
                    <span className={classes.action}>
                      <AddToCart cartStyle={classes.addCart} item={productDetail}/>
                    </span>
                  }
                />
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={product.name}
                  />
                  
                  <Typography component="p" variant="subtitle1" className={classes.subheading}>
                    {product.description}<br/>
                    <span className={classes.price}>PKR {product.price}</span>
                    <Link to={'/shops/'+product.shop._id} className={classes.link}>
                      <span>
                        <Icon className={classes.icon}>shopping_basket</Icon> {product.shop.name}
                      </span>
                    </Link>
                  </Typography>

                </div>
                <div className="classes.flex">
                <TextField id="length" label="Length" className={classes.textField} value={values.length} onChange={handleChange('length')} margin="normal"/><br/>
                  <TextField id="chest" label="Chest" className={classes.textField} value={values.chest} onChange={handleChange('chest')} margin="normal"/><br/>
                  <TextField id="shoulder" label="Shoulder" className={classes.textField} value={values.shoulder} onChange={handleChange('shoulder')} margin="normal"/><br/>
                  <TextField id="sleeve" label="Sleeve" className={classes.textField} value={values.sleeve} onChange={handleChange('sleeve')} margin="normal"/><br/>
                  <TextField id="waist" label="Waist" className={classes.textField} value={values.waist} onChange={handleChange('waist')} margin="normal"/><br/>
                </div>
              </Card>
            </Grid>
            {suggestions.length > 0 &&
              (<Grid item xs={5} sm={5}>
                <Suggestions  products={suggestions} title='Related Products'/>
              </Grid>)}
          </Grid>
        </div>)
}
