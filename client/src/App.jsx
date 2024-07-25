import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import("./App.css");

const App = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [error,setError] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    // .post("http://localhost:5000/addProduct", { product, price, quantity })
     .post("https://inventory-one-phi.vercel.app/addProduct", { product, price, quantity })
      .then((result) => {
        if(result.data !== "Please fill all the fields"){
          // alert("something wrong")
          console.log(result.data );
          swal("Success!", "Product added successfully!", "success")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setError("Please fill all the fields")
        }
    
      })
      .catch((err) => {
        console.log("error while fetching");
      });
  };

  useEffect(() => {
    // axios.get("http://localhost:5000/").then((res) => {
       axios.get("https://inventory-one-phi.vercel.app/").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const filteredItems = products.filter((elm) =>
    elm.product.toLowerCase().includes(query.toLowerCase())
  );


  const handleDelete = (id) => {
    console.log("deleted product id ", id);
    // axios.delete('http://localhost:5000/delete/' + id)
     axios.delete('https://inventory-one-phi.vercel.app/delete/' + id)
    .then(res => {
      console.log(res.data);
      window.location.reload();
    }).catch(err => console.log("error while fetching product"))
  }

  return (
    <>
      <h1 className="text-center border-b-2 p-3  text-2xl sm:text-3xl font-semibold">
        Stock Managment System
      </h1>
      <h1 className=" mt-6 sm:mt-12 text-3xl font-bold">Search a Product</h1>
      <div className="text-center">
        <input
          type="text"
          placeholder="Search Product"
          onChange={(e) => setQuery(e.target.value)}
          className="py-2 px-4 w-full sm:w-1/3 text-xl sm:mt-3 mt-4 border border-black"
        />
      </div>
      <p className="text-center text-red-500 font-semibold mt-3">
        {filteredItems.length == 0 ? "No product found" : ""}
      </p>

      {query.length > 1 ? (
        ""
      ) : (
        <div>
          <h1 className="mt-6 sm:mt-3 text-3xl font-bold">Add a Product</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="mt-3">Product Name</h2>
            <input
              type="text"
              placeholder=" Product Name"
              onChange={(e) => setProduct(e.target.value)}
              className="py-2 px-4 w-full text-xl mt-1 border border-black"
            />
            <h2 className="mt-3">Product Price</h2>

            <input
              type="number"
              placeholder="$.00"
              onChange={(e) => setPrice(e.target.value)}
              className="py-2 px-4 w-full text-xl mt-1 border border-black"
            />
            <h2 className="mt-3">Product Quantity</h2>

            <input
              type="number"
              placeholder="000"
              onChange={(e) => setQuantity(e.target.value)}
              className="py-2 px-4 w-full text-xl mt-1 border border-black"
            />
            <p className="text-red-500 font-semibold mt-4">{error}</p>
            <button
              type="submit"
              className="px-3 py-2 bg-green-500 cursor-pointer text-white mt-6 block mx-auto hover:bg-green-800 w-full"
            >
              Add Product
            </button>
          </form>
        </div>
      )}



    
      <h1 className="my-6 text-3xl font-bold"> Display Current Stock</h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-xl text-center ">
          <thead className="text-xl text-gray-700  bg-gray-100 mt-4">
            <tr>
             
              <th scope="col" className="text-left px-3 py-4 rounded-s-lg">
               Name
              </th>
              <th scope="col" className="px-2 py-3">
                Price
              </th>
              <th scope="col" className="px-1 py-3 rounded-e-lg">
                Qty
              </th>
              <th scope="col" className="px-4 py-3 rounded-e-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {filteredItems.map((item, i) => (
              <tr className="bg-white text-lg" key={i}>
                <td
                  scope="row text-left"
                  className="text-left px-1 py-4 font-medium text-black whitespace-nowrap"
                >
                  {item.product}
                </td>
                <td className="px-1 py-4">${item.price}</td>
                <td className="px-1 py-4">{item.quantity}</td>
                <td className="px-1 py-4"><button className="bg-red-400 px-2 py-1 text-white cursor-pointer" onClick={() => handleDelete(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
