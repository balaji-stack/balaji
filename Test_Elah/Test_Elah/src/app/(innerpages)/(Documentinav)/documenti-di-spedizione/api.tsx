'use server'

import SERVER_URL from "@/helpers/common";
import axios from "axios";

export async function testapi(){
    console.log("on test api from server component");
    let result:any;
    await axios.get(`${SERVER_URL}/test`).then((res)=>{
        console.log(res.data); 
        result= res.data;     
    })
    return result;
}

//below code is to get the async function from server component to client component
// testapi().then(function(res) {
//     // here you can use the result of promiseB
//     console.log(res);
// });
