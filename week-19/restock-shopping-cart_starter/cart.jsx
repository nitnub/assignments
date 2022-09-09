// simulate getting products from DataBase

const products = [
  { id: 1001, name: 'Apples', country: 'Italy', cost: 3, instock: 10 },
  { id: 1002, name: 'Oranges', country: 'Spain', cost: 4, instock: 3 },
  { id: 1003, name: 'Beans', country: 'USA', cost: 2, instock: 5 },
  { id: 1004, name: 'Cabbage', country: 'USA', cost: 1, instock: 8 },
];
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : items;
  console.log(`data:${JSON.stringify(data)}`);

  return (
    <Accordion className="accordion" defaultActiveKey="0">
      {list}
    </Accordion>
  );
};

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  // console.log(`Current state object: ${JSON.stringify(state.data)}`);
  useEffect(() => {
    console.log('useEffect Called on', url);
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        console.log('FETCH FROM URL');
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

function Products(props) {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const { Card, Accordion, Button, Container, Row, Col, Image, Input } =
    ReactBootstrap;
  //  Fetch Data
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState('http://localhost:1337/api/products');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://localhost:1337/api/products',
    {
      data: [],
    }
  );
  // console.log(`Rendering Products ${JSON.stringify(data)}`);
  // Fetch Data

  function decrementStock(item) {
    const productCopy = [...items];
    console.log('aaaaaaaaaaaaaaaaa');
    // productCopy.forEach((product) => {
    for (let product of productCopy) {
      console.log('bbbbbbbbbbbbbbbbb', product);
      if (product.id === item.id && product.instock > 0) {
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

  function incrementStock(id) {
    const productCopy = [...items];
    console.log('aaaaaaaaaaaaaaaaa');
    // productCopy.forEach((product) => {
    for (let product of productCopy) {
      // console.log('bbbbbbbbbbbbbbbbb', product.name);
      // console.log('bbbbbbbbbbbbbbbbb', item.name);
      if (product.id === id) {
        console.log('ccccccccccccccc');
        console.log(productCopy);
        product.instock++;
        product.inCart--;
        setItems((product) => productCopy);
        return true;
      }
    }
    return false;
  }

  const addToCart = (id) => {
    // const { name } = e.target;
    console.log(id);
    const [item] = items.filter((item) => item.id === id);
    console.log(`add to Cart ${JSON.stringify(item)}`);
    console.log(items);
    if (item.instock === 0) {
      return;
    } else {
      console.log('instock: ', item);
      item.inCart ? (item.inCart += 1) : (item.inCart = 1);
      item.instock -= 1;
    }

    setCart([...cart, item]);

    // const { name } = e.target;

    // let newItem;
    // console.log('items:', items);
    // items.forEach((item) => {

    //   if (item.name === name) {

    //     newItem = item;
    //   }
    // });
    // // console.log('new item initialized', newItem.name);
    // const cartCopy = [...cart];
    // // console.log('cartcopy', cart);

    // const alreadyInCart = cartCopy.some((item) => {
    //   return item.name === newItem.name;
    // });
    // // console.log(`item in cart: ${alreadyInCart}`);
    // if (alreadyInCart) {
    //   cartCopy.forEach((item) => {
    //     if (alreadyInCart && item.name === newItem.name && item.instock > 0) {
    //       // console.log('item.name', item.name);
    //       if (decrementStock(item)) {
    //         item.inCart++;
    //         setCart([...cartCopy, newItem]);
    //         // setCart(cartCopy);
    //         // return;
    //       }
    //       // return;
    //     }
    //   });
    // } else {
    //   // console.log('item.name no match', newItem.name);
    //   // console.log('decrement stock', decrementStock(newItem))
    //   if (decrementStock(newItem)) {
    //     newItem.inCart = 1;
    //     setCart([...cartCopy, newItem]);
    //     // console.log('cart', cart);
    //     // console.log('newItem', [...cart, newItem]);
    //   }

    //   // return;
    // }
    // // console.log('cartCopy', cartCopy);
    // // console.log('cart', cart);
    // // console.log(`add to Cart ${JSON.stringify(item)}`);
    // // setCart([...cart, ...item]);
    // // console.log(`Cart: ${JSON.stringify(cart)}`);
    // // doFetch(query);
  };

  const deleteCartItem = (index) => {
    let newCart = cart.filter((item, i) => index != i);

    setCart(newCart);
  };
  const photos = ['apple.png', 'orange.png', 'beans.png', 'cabbage.png'];
  // const randomNum = Math.floor(Math.random() * 1049);

  const list = items.map((item, index) => {
    // const photoId = randomNum + index; // index + Math.floor(Math.random() * 1049);
    // const photoUrl = `https://picsum.photos/id/${photoId}/50/50`;
    // console.log(55)
    const photoUrl = `https://picsum.photos/id/${index * 10}/50/50`;
    // let photoUrl = `https://picsum.photos/id//50/50`;

    return (
      <li key={index}>
        {/* <Image src={photos[index % 4]} width={70} roundedCircle></Image> */}
        <Image src={photoUrl} width={70} roundedCircle></Image>
        <Button variant="primary" size="large">
          {item.name} ${item.cost} Stock:{item.instock}
        </Button>
        <input
          name={item.name}
          type="submit"
          onClick={() => addToCart(item.id)}
        ></input>
      </li>
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <Accordion.Item
        className="accordion-item"
        key={1 + index}
        eventKey={1 + index}
      >
        {/* <Accordion.Item key={1 + index} id={1 + index}> */}
        <Accordion.Header>
          {item.name} {item.inCart}
        </Accordion.Header>
        <Accordion.Body
          onClick={() => {
            console.log('item name: ', item.name);
            console.log('item incart: ', item.inCart);
            // incrementStock(item, item.inCart);
            incrementStock(item.id);
            deleteCartItem(index);
          }}
          eventKey={1 + index}
          // id={1 + index}
        >
          $ {item.cost} from {item.country}
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  function groupedCart(cart) {
    const gCart = {};
    const groupedArray = [];
    cart.forEach((item) => {
      const { name } = item;
      console.log('item', item);
      if (!gCart[name]) {
        const { id, cost, inCart } = item;
        gCart[name] = { id, name, cost, inCart };
      }

    })
    // let gCart = cart.map((item) => {


    //   return { ...tempCart, { item };
    // });


    console.log(gCart);
    for (let key in gCart) {
      groupedArray.push(gCart[key])
    }
    return groupedArray;
  }
  let finalList = () => {
    let total = checkOut();
    console.log('groupedCart', groupedCart(cart))
    let final = groupedCart(cart).map((item, index) => {
      // let final = cart.map((item, index) => {
        console.log('final item', item)
      return (
        <div key={index} index={index}>
          {item.name} (x{item.inCart})... ${item.cost * item.inCart}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };
  // TODO: implement the restockProducts function
  const restockProducts = (url) => {
    doFetch(url);
    // console.log(data.data)
    const res = data.data; // Data object is nested in response
    const tempItems = res.map((item) => {
      console.log(item.attributes);
      const { id } = item;
      const { name, cost, country, instock } = item.attributes;
      return { id, name, cost, country, instock, inCart: 0 };
    });
    console.log(tempItems);
    setItems([...items, ...tempItems]);
  };

  // const restockProducts = (url) => {
  //   doFetch(url);
  //   let newItems = data.map((item) => {
  //     let { name, country, cost, instock } = item;
  //     return { name, country, cost, instock };
  //   });
  //   setItems([...items, ...newItems]);
  // };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: 'none' }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion defaultActiveKey="0">{cartList}</Accordion>
        </Col>
        <Col>
          <h1>CheckOut </h1>
          <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(`http://localhost:1337/api/${query}`);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => console.log(event.target.value)} //setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
}
// ========================================
ReactDOM.render(<Products />, document.getElementById('root'));
