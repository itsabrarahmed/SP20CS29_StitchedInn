const create = async (params, credentials, order, token) => {
  console.log('here in api-order')
  console.log(params.userId)
  console.log(credentials)
  try {
    let response = await fetch('/api/orders/'+params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({order: order, token:token})
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
}

const listByShop = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/orders/shop/'+params.shopId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}

const update = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/status/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}

const updateFabricStatus = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/fabricstatus/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}

const updateRating = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/updaterating/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}

const cancelProduct = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.shopId+'/cancel/'+params.productId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}

const processCharge = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.orderId+'/charge/'+params.userId+'/'+params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const getStatusValues = async (signal) => {
  try {
    let response = await fetch('/api/order/status_values', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}

const getFabricStatusValues = async (signal) => {
  try {
    let response = await fetch('/api/order/fabric_status_values', {
      method: 'GET',
      signal: signal
    })
    console.log(response)
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}

const getRating = async (signal) => {
  try {
    let response = await fetch('/api/order/rating', {
      method: 'GET',
      signal: signal
    })
    console.log(response)
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}

const listByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/orders/user/'+params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

const listBySeller = async (params, credentials, signal) => {
  try {
    // let response = await fetch('/api/orders/seller/'+params.userId, {
    //   method: 'GET',
    //   signal: signal,
    //   headers: {
    //     'Accept': 'application/json',
    //     'Authorization': 'Bearer ' + credentials.t
    //   }
    // })
    // return response.json()
  }catch(err) {
    console.log(err)
  }
}

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/order/' + params.orderId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const todayOrders = async (signal) => {
  try {
    let response = await fetch('/api/order/today', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}

export {
  create,
  listByShop,
  update,
  updateFabricStatus,
  updateRating,
  cancelProduct,
  processCharge,
  getStatusValues,
  getFabricStatusValues,
  getRating,
  listByUser,
  read,
  todayOrders
}
