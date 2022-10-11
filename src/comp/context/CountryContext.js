import React, { useContext, useEffect, useState } from "react";
import searchCountry from "./helper/Search";

const CountryContext=React.createContext();


const CountryProvider=({children})=>{
    const [countryList,setCountryList]=useState([]);
    const [sendList,setSendList]=useState([]);
    const [region,setRegion]=useState("");
    const [load,setLoad]=useState(false);




    const loadItem=()=>{
        setLoad(!load);
    }

    const searchData=(data)=>{
        const searchVar=data.toLowerCase();
        setSendList(()=>{
            const newList=searchCountry(countryList,searchVar);
            return newList;
        })
    }


    const searchByRegion=(selectedRegion)=>{
        setRegion(selectedRegion);
    }

    useEffect(()=>{
        const controller=new AbortController();
        const getList=()=>{
            fetch('https://restcountries.com/v3.1/all',{signal:controller.signal})
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    console.log(data);
                    setCountryList(data);
                    setSendList(data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }

        getList();
        return ()=>controller?.abort();

    },[load])




    useEffect(()=>{
        const controller =new AbortController();
        const getRegion=(region)=>{
            fetch(`https://restcountries.com/v3.1/region/${region}`,{signal:controller.signal})
            .then(res=>res.json())
            .then((data)=>{
                setSendList(data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        region && getRegion(region)

        return ()=>controller?.abort();
    },[region])



    return (
        <CountryContext.Provider
        value={{
            sendList,
            searchData,
            searchByRegion,
            loadItem,            
            
        }}
        >
            {children}
        </CountryContext.Provider>
    )

}




const useCountry=()=>{
    return useContext(CountryContext);
}

export {CountryContext,CountryProvider,useCountry}