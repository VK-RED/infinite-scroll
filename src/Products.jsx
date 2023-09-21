import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import PacmanLoader from "react-spinners/PacmanLoader";

function Products() {

  //The var limit controls the no of products to be fetched from the API. NOTE: The max limit of products is 30.
  //The var data stores the products returned from the API
  //The var hasMore is used to tell the InfiniteScroll Component whether is there any products to fetched from API.


  const [limit, setLimit] = useState(2);
  const [data,setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);


  const [error,setError] = useState(false);

  // When the page is loaded initially we fetch the products from the API

  useEffect(()=>{
      fetchData();
  },[])

  /*
      This is the function which fetches product from the API. Once we reach a limit of 30
      We set the hasMore var to false and we stop fetching from API.
      Also we are fetching the items incrementally by 2.

  */
  async function fetchData(){

    try {

      if(limit <= 30){
      
        const res = await axios.get(`https://dummyjson.com/products/?limit=${limit}`);
        const newData = res.data.products;
        setData([...newData]);
        setLimit(limit+2);
        if(limit == 30) setHasMore(false);
        console.log(newData);
        setError(false);
      }
      
    } catch (error) {
      console.log(error);
      setError(true);
    }

    
  }

  // The override object is used to override the Pacman Loader Styling Properties
  const override  = {
    display: "block",
    margin: "0 auto",
  };


  /*
    The InfiniteScroll Component has some props like 
      dataLength - Which is nothing but the array size of our products
      next - This will call the fetchData(). Once, we reach the current end of the Product.
      hasMore - When it is set to false, upon reaching the end, This will not call the fetchData()
      loader - During the fetching time, it displays a Pacman Animation Loader
      endMessage - Once we have fetched all the items, This displays an end message. 
  */

  if(!error){

    return (
      <div className='bg-black text-white h-screen'>
        <div className='bg-black text-white'>

              <h1 className='text-5xl text-center h-20 py-8 mb-5'>
                  Infinite Scrolling Animation
              </h1>
          

            <InfiniteScroll
            
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<PacmanLoader  cssOverride={override}  size={50} color="#36d7b7"/>}
                endMessage={
                  <p className='font-bold text-xl text-center'>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                className='grid grid-cols-2 p-10'
            >

                {
                    data.map((d,ind)=>(
                      <div className='border border-gray-300 h-auto flex flex-col items-center p-10 m-2 rounded-xl'
                          key = {ind}
                          onClick={()=>{console.log(d);}}
                      >
                          
                          <img className='h-80' src={d.images[0]} />

                          <div className='text-2xl my-3 font-bold'>{d.title}</div>
                          <div className='text-sm font-mono mb-4'>{d.description}</div>
                          <div className='text-xl font-bold bottom-0'>  {`$ ${d.price}`}  </div>

                      </div>))
                }

            </InfiniteScroll>


        </div>
      </div>
    )
  }

  return(
    <div>
        Something Went Wrong ... Please Contact Admin...
    </div>
  )

  
}

export default Products;
