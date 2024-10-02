import React, { useEffect, useState } from 'react'

function Weather() {

    const [weatherdata,setWeatherdata]=useState(false);
    const [city,setCity]=useState();
    const [imgsrc,setimgsrc]=useState();

    const search=async(city)=>{

        if(city==="")
        {
            alert("Please Enter City Name")
            return;
        }
     
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=71745ea4d9077873dfd78fd87932a13f`)
        .then(response=>{
           
            if(!response.ok)
            {
               
             alert("City Not Found")
               return;
              
                
            }
            return response.json();
        })
        .then(data=>{
            
            setWeatherdata(
                {   humidity:data.main.humidity,
                   temperature:Math.floor(data.main.temp),
                   WindSpeed:data.wind.speed,
                   cityName:data.name,
                   
                })

                console.log(data.weather.icon);
                const urlimg=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                setimgsrc(urlimg);
                
            })
            .catch(error=>{
                setWeatherdata(false);
            })

            
            
    }
    function handleClick()
    {
        search(city);
    }

    function handleNameChange(e)
    {
         setCity(e.target.value)
    }

    useEffect(()=>{
       search("Delhi")
    },[])


  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
      
   
        <div className='border border-2 m-2 p-4 rounded-4 text-center fw-bold ' style={{width:'400px' ,backgroundColor:'#B9EBFF'}} >
            <div className=' input-group'> 
                <input type='text' className='form-control' placeholder='Search' onChange={handleNameChange}></input>
                <span className='bi bi-search input-group-text' onClick={handleClick}></span>
                

            </div>

          {weatherdata?<>
            <div>
               
               <img src={imgsrc}/>
           </div>
           <div>
               <p className='mb-0' style={{fontSize:'40px'}}>{weatherdata.temperature}°C </p>
               <p className='mt-0'  style={{fontSize:'30px'}}>{weatherdata.cityName}</p>
           </div>
           <div className='row' style={{fontSize:'20px'}}>
               <div className='col-6'>
                 <div className='row'>
                 <div className='bi bi-wind col-2'></div>
                  <div className='col-4'>
                  <p className='m-0' >{weatherdata.humidity}%</p>
                 
                  <p>Humidity</p>
                  </div>
                 </div>

               </div>
               <div className='col-6 '>
               <div className='row'>
               <div className='bi bi-water col-2'></div>
                 <div className='col-4'>
                
                 <p className='m-0'>{weatherdata.WindSpeed}&nbsp;Km/h</p>
                 <p>Wind&nbsp;Speed</p>
               
               
                 </div>

               </div>
               </div>
           </div>

          
          </>:<></>}

            
        </div>

    </div>
  )
}

export default Weather