// simulate getting products from DataBase

const products = [
  { name: 'Apples', country: 'Italy', cost: 3, instock: 10 },
  { name: 'Oranges', country: 'Spain', cost: 4, instock: 3 },
  { name: 'Beans', country: 'USA', cost: 2, instock: 5 },
  { name: 'Cabbage', country: 'USA', cost: 1, instock: 8 },
];
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  return <Accordion className="accordion" defaultActiveKey="0">{list}</Accordion>;
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
  useEffect(() => {
    console.log('useEffect Called');
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        console.log('FETCH FROM URl');
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
    const productCopy = [...products];
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

  function incrementStock(item, count){
    const productCopy = [...products];
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




  const addToCart = (e) => {
    const { name } = e.target;
    // let item = items.filter((item) => item.name == name);
    let newItem;
    items.forEach((item) => {
      // console.log(`NAME: ${name} || ITEM: ${item.name}`)
      if (item.name === name) {
        console.log(
          `NAME: ${name} || ITEM: ${item.name}  || MATCH: ${name === item.name}`
        );
        newItem = item;
      }
    });
    console.log('new item initialized', newItem.name);
    const cartCopy = [...cart];
    console.log('cartcopy', cart);

    const alreadyInCart = cartCopy.some((item) => {
      return item.name === newItem.name;
    });
    console.log(`item in cart: ${alreadyInCart}`);
    if (alreadyInCart) {
      cartCopy.forEach((item) => {
        if (alreadyInCart && item.name === newItem.name && item.instock > 0) {
          console.log('item.name', item.name);
          if (decrementStock(item)) {
            item.inCart++;
            // setCart([...cartCopy, newItem]);
            setCart(cartCopy);
            // return;
          }
          // return;
        }
      });
    } else {
      console.log('item.name no match', newItem.name);
      // console.log('decrement stock', decrementStock(newItem))
      if (decrementStock(newItem)) {
        newItem.inCart = 1;
        setCart([...cartCopy, newItem]);
        console.log('cart', cart);
        console.log('newItem', [...cart, newItem]);
      }

      // return;
    }
    console.log('cartCopy', cartCopy);
    console.log('cart', cart);
    // console.log(`add to Cart ${JSON.stringify(item)}`);
    // setCart([...cart, ...item]);
    // console.log(`Cart: ${JSON.stringify(cart)}`);
    // doFetch(query);
  };

  const deleteCartItem = (index) => {
    let newCart = cart.filter((item, i) => index != i);
    
    setCart(newCart);
    
  };
  const photos = ['apple.png', 'orange.png', 'beans.png', 'cabbage.png'];

  const list = items.map((item, index) => {
    // let n = index + 1049;
    // let url = "https://picsum.photos/id/" + n + "/50/50";

    return (
      <li key={index}>
        <Image src={photos[index % 4]} width={70} roundedCircle></Image>
        <Button variant="primary" size="large">
          {item.name} ${item.cost} Stock:{item.instock}
        </Button>
        <input name={item.name} type="submit" onClick={addToCart}></input>
      </li>
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <Accordion.Item classNamae="accordion-item" key={1 + index} eventKey={1 + index}>
        {/* <Accordion.Item key={1 + index} id={1 + index}> */}
        <Accordion.Header>
          {item.name} {item.inCart}
        </Accordion.Header>
        <Accordion.Body
          onClick={() => {
            console.log('item name: ', item.name)
            console.log('item incart: ', item.inCart)
            incrementStock(item, item.inCart)
            deleteCartItem(index)
          }}
          eventKey={1 + index}
          // id={1 + index}
        >
          $ {item.cost} from {item.country}
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
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
  const restockProducts = (url) => {};

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
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
}
// ========================================
ReactDOM.render(<Products />, document.getElementById('root'));
