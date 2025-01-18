import { ChangeEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {SignupInput} from '@nandasaikishor/medium-common'
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==='signin'? 'signin' : 'signup'}`, postInputs);
        const jwt = response.data; 
        localStorage.setItem("token", jwt);
        navigate("/blogs")
    }

    return <div className="flex flex-col h-screen justify-center"> 
                <div className="flex justify-center"> 
                    <div> 
                        <div className='px-10'>
                            <div className="text-3xl font-extrabold">
                                Create an account
                            </div>
                            <div className="text-slate-400">
                                {type==='signin'? "Don't have an account?" :' Already have an account?'}
                                <Link className='pl-2 underline ' to={type==='signin'? '/signup' : '/signin'}>
                                    {type==='signup'? 'Login': 'Signup'}
                                </Link>

                            </div>
                        </div>


                        <div className='pt-5'>
                        {type==='signup' ?
                            <LabelledInput label='Name' placeholder='name' onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value
                                })
                            }}></LabelledInput>  : null }
                            
                            <LabelledInput label='Username' placeholder='username' onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    username:e.target.value
                                })
                            }}></LabelledInput>
                            <LabelledInput type='password' label='Password' placeholder='password' onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    password:e.target.value
                                })
                            }}></LabelledInput> 

<button onClick={sendRequest} type="button" className="mt-5 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"? "sign up" : 'sign in'}</button>

                        </div>  
                    </div> 
                </div>
            </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType) {
    return  <div className=''>
    <label className="block mb-2 text-sm font-semibold text-black pt-2">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" 
    className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg
     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      placeholder={placeholder} required />
</div>
} 