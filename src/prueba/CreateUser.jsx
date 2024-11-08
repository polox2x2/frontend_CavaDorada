import axios from "axios";
import { useState } from "react";

export default function CreateUser (){
    const [inputs,setInput] = useState({})
    const handleChange = (event)=>{
        const name = event.target.name; 
        const value = event.target.value; 
        setInput( values =({values, [name]:value}));

    }
    const handleSumit = (event) =>{
        event.preventDefault();

        console.log(inputs);
    }
    return (
<div>
                <h1>Create User </h1>
         <form onSubmit={handleSumit}>
            <table>
                <tbody>
                    <tr>
                        <th>
                        <label> nombre : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> apellido : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> documentoIdentidad : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>    
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> direccion : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                            
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> telefono : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                            
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> email : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                            
                        </td>
                    </tr>
                    <tr>
                        <th>
                        <label> clave : </label>
                        </th>
                        <td>
                        <input type="text" name="name" onChange={handleChange}></input>
                        </td>
                    </tr>
                        <button >Save</button>

                </tbody>
            </table>
                    </form>
                </div>
    )

}