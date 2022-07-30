// Ex 2 - remove any item from navbar with less than minStock in stock
// write out both the name and the number in stock in format apple:2
function NavBar({ menuitems, minstock }) {
  const [cart, setCart] = React.useState([]);
  const [stock, setStock] = React.useState(menuitems);

  const { Button } = ReactBootstrap;

  const moveToCart = (e) => {
    const [name, count] = e.target.innerHTML.split(': ');
    let newStock;

    if (count > minstock) {
      newStock = stock.map((item, index) => {
        if (item.name === name) {
          item.instock--;

          console.log(item);
          const newCart = [...cart, item];

          setCart(newCart);
        }
        return item;
      });
      setStock(newStock);
    }
  };

  const updatedList = menuitems.map((item, index) => {
    return (
      <Button key={index} onClick={moveToCart}>
        {item.name}: {item.instock}
      </Button>
    );
  });

  const cartDisplay = cart.map((item, index) => {
    return <Button key={`cart.${index}`}>{item.name}</Button>;
  });

  return (
    <>
      <h1>React Lists</h1>
      <ul style={{ listStyleType: 'none' }}>{updatedList}</ul>;
      <h1>Shopping Cart</h1>
      <ul style={{ listStyleType: 'none' }}>{cartDisplay}</ul>;
    </>
  );
}
const menuItems = [
  { name: 'apple', instock: 2 },
  { name: 'pineapple', instock: 3 },
  { name: 'pear', instock: 0 },
  { name: 'peach', instock: 3 },
  { name: 'orange', instock: 1 },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NavBar menuitems={menuItems} minstock={0} />);
