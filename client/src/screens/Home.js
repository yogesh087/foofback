import React,{useEffect,useState} from "react";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Card from "../component/Card"; 




 

export default function Home() {
  const [foodCat,setfoodCat]=useState([]);
  const [fooditm,setfooditm]=useState([]);
  const [search,setsearch]=useState('');

   const loaddata= async()=>{
     let response =await fetch ("http://localhost:5000/api/fooddata",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'}
      });
       response=await (response.json());
      setfooditm(response[0]);
      setfoodCat(response[1]);
     
    
       
      
    }
     useEffect(()=>{
       loaddata()
     },[])




  return (
    <>
      <Navbar />
       <div>
       <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className='carousel-caption' style={ {zIndex:"10"}}>
  <div class="d-flex justify-content-centre">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=>{
      setsearch(e.target.value)
    }}/>
    {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
  </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900*700/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900*700/?momos" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900*700/?chicken" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
      

       </div>
       </div>
     <div className="container">
     {
  foodCat.length > 0 ? (
    foodCat.map((data) => {
      return (
        <div className="row mb-3" key={data.id}>
          <div className="fs-3 m-3">{data.CategoryName}</div>
          <hr />
          {fooditm.length > 0 ? (
            fooditm
              .filter(
                (item) =>
                  item.CategoryName === data.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((Filteritm) => {
                return (
                  <div key={Filteritm._id} className="col-12 col-md-6 col-lg-3">
                    <Card fooditem={Filteritm} options={Filteritm.options[0]} />
                  </div>
                );
              })
          ) : (
            <div> no such data is present</div>
          )}
        </div>
      );
    })
  ) : (
    ""
  )
}
<Card/>
   
     </div>
    <Footer />

    </>
  );
}
