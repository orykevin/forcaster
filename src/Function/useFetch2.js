import React,{useEffect,useState} from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data1,setData] = useState(null);
  const [loading1,setLoading] = useState(false);
  const [error1,setError] = useState(null)

  useEffect(()=>{
    setLoading(true);
    axios.get(url).then((response)=>{
        setData(response);
    }).catch((err)=>{
        setError(err);
    }).finally(()=>{
        setLoading(false);
    })
  },[url])

  return {data1,loading1,error1}
}

export default useFetch