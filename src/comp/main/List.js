import Card from './Card';
import { useCountry } from '../context/CountryContext';
import NoData from '../notfound/NoData';
import Load from '../load/Load';
import Err from '../notfound/Err';

const List = () => {
    const {sendList,searchParameter,internet,err}=useCountry();



    if(err){
        return(<Err/>)
    }

    if(internet){
        return (
            <div className="notfound text-color">
                <h3>No Internet</h3>
            </div>
        )
    }


    if(sendList.length===0 && !searchParameter){
        return (
            <div className="loading-page loading-padd">
                <Load/>
            </div>
        )
    }

    if(sendList.length===0 && searchParameter){
        return (
            <div className="content-list background-color nodata-page">
                <NoData searchParameter={searchParameter}/>
            </div>
        )
    }


    return (
        <section className="content-list background-color">
            <div className="content">
            { sendList.length!==0 &&
                sendList.map((country,index)=>{
                    const {name,population,region,capital,flags,cca3,}=country;
                    return <Card  cca3={cca3} name={name} population={population} region={region} capital={capital}  flags={flags} key={index}/>
                })
             }
            </div>
         </section>
     );
}
 
export default List;