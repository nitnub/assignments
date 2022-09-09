const addToCart = (e) => {

  let name = e.target.name;
  let item = items.filter((item) => item.name == name);
  console.log(`add to Cart ${JSON.stringify(item)}`);
  setCart([...cart, ...item]);


  const { name } = e.target;

  let newItem;
  console.log('items:', items);
  items.forEach((item) => {

    if (item.name === name) {

      newItem = item;
    }
  });
  // console.log('new item initialized', newItem.name);
  const cartCopy = [...cart];
  // console.log('cartcopy', cart);

  const alreadyInCart = cartCopy.some((item) => {
    return item.name === newItem.name;
  });
  // console.log(`item in cart: ${alreadyInCart}`);
  if (alreadyInCart) {
    cartCopy.forEach((item) => {
      if (alreadyInCart && item.name === newItem.name && item.instock > 0) {
        // console.log('item.name', item.name);
        if (decrementStock(item)) {
          item.inCart++;
          setCart([...cartCopy, newItem]);
          // setCart(cartCopy);
          // return;
        }
        // return;
      }
    });
  } else {
    // console.log('item.name no match', newItem.name);
    // console.log('decrement stock', decrementStock(newItem))
    if (decrementStock(newItem)) {
      newItem.inCart = 1;
      setCart([...cartCopy, newItem]);
      // console.log('cart', cart);
      // console.log('newItem', [...cart, newItem]);
    }

    // return;
  }
  // console.log('cartCopy', cartCopy);
  // console.log('cart', cart);
  // console.log(`add to Cart ${JSON.stringify(item)}`);
  // setCart([...cart, ...item]);
  // console.log(`Cart: ${JSON.stringify(cart)}`);
  // doFetch(query);
};








function decrementStock(item) {
  const productCopy = [...items];
  console.log('aaaaaaaaaaaaaaaaa');
  // productCopy.forEach((product) => {
  for (let product of productCopy) {
    console.log('bbbbbbbbbbbbbbbbb', product);
    if (product.name === item.name && product.instock > 0) {
      console.log('ccccccccccccccc');
      console.log(productCopy);
      product.instock -= 1;
      setItems((product) => productCopy);
      return true;
    }
  }
  return false;

  // );
}

function incrementStock(item, count) {
  const productCopy = [...items];
  console.log('aaaaaaaaaaaaaaaaa');
  // productCopy.forEach((product) => {
  for (let product of productCopy) {
    console.log('bbbbbbbbbbbbbbbbb', product.name);
    console.log('bbbbbbbbbbbbbbbbb', item.name);
    if (product.name === item.name) {
      console.log('ccccccccccccccc');
      console.log(productCopy);
      product.instock += count;
      setItems((product) => productCopy);
      return true;
    }
  }
  return false;
}