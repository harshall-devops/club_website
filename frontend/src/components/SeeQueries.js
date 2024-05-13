import React, { useState, useEffect } from 'react';
import '../styles/SeeQueries.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SeeQueries() {
    const [queryInfoArray, setQueryInfoArray] = useState([]);

    useEffect(() => {
        const getQueryDetails = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/query/showQueries?status=unsolved", {
                    method: 'GET'
                });
                const data = await response.json();
                setQueryInfoArray(data);
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        };
        getQueryDetails();
    }, []);


    const SeeAllQueries=async()=>{
        try {
            const response = await fetch("http://localhost:3001/api/v1/query/seeAllQueries", {
                method: 'GET'
            });
            const data = await response.json();
            setQueryInfoArray(data);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    const SeeAllSolvedQueries=async()=> {
        try {
            const response = await fetch("http://localhost:3001/api/v1/query/showQueries?status=solved", {
                method: 'GET'
            });
            const data = await response.json();
            setQueryInfoArray(data);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    const SeeAllUnSolvedQueries=async()=> {
        try {
            const response = await fetch("http://localhost:3001/api/v1/query/showQueries?status=unsolved", {
                method: 'GET'
            });
            const data = await response.json();
            setQueryInfoArray(data);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    const HandleQuerySolved=async(e,queryId)=>{
        e.preventDefault()
            try{
                const response =await fetch(`http://localhost:3001/api/v1/query/markSolved/${queryId}`,{
                    method:'PUT',
                    headers: {
                        'Content-type': 'application/json'
                      },
                    body:JSON.stringify({
                        status:'solved'
                    })
                })
                const data = await response.json();
                if(data.success){
                    alert("Query Solved")
                    const updatedResponse = await fetch("http://localhost:3001/api/v1/query/showQueries?status=unsolved", {
                        method: 'GET'
                    });
                    const updatedData = await updatedResponse.json();
                    setQueryInfoArray(updatedData);
                }
                else{
                    alert("Error in processing your request")
                }
            }catch(e){

            }
    }

    return (
        <div className="OuterQueriesHoldingDiv">
            <div className="QueriesHoldingDiv"><br />
                <div className="queryHeadingDiv"><h1 className="queryHeadingDivH1Tag">Queries Section</h1>  <button onClick={()=>SeeAllQueries()} id="allQueriesId">SEE ALL</button> <button onClick={()=>SeeAllSolvedQueries()} id="allSolvedQueriesId" >SEE SOLVED QUERIES</button> <button onClick={()=>SeeAllUnSolvedQueries()} id="allUnsolvedQueriesId" >SEE UNSOLVED QUERIES</button> </div>
                <div className="queryDetails">
                    {queryInfoArray.map((query, index) => (
                        <div key={query._id}>
                            <p> <b>Name :  {query.name} ({query.email}) </b> </p> <p>Query : {query.query} </p> { query.status==='unsolved' && <button id="markSolvedId" onClick={(e)=>HandleQuerySolved(e,query._id)}>MARK AS SOLVED</button> }
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SeeQueries;





// import React, { useState,useEffect } from 'react'

// function SeeQueries() {

//     const [queryInfoArray,SetQueryInfoArray]=useState([]);
//     useEffect= (()=>{
//       const getQueryDetails=async()=>{
//         try{
//           const response=await fetch("http://localhost:3001/api/v1/query/showQueries",{
//             method:'GET'
//           })
//           const data=response.json();
//           SetQueryInfoArray(data)
//         }catch(e){
//           console.error('Error fetching data:', e);
//    }
//       }
//       getQueryDetails();
//     },[])

//   return (
//     <div>
//       <div className="QueriesHoldingDiv"><br />
//         <div className="queryHeadingDiv"><h1>Queries Section</h1></div>
//         <div className="queryDetails">
//         {queryInfoArray.map((query,index)=>(
//           <div>
//             <p>{query.name} : {query.query}</p>
//             <hr />
//           </div>
//         ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SeeQueries
