import React, { useState, useEffect, Children } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()

const GithubProvider = ({children})=>{
    const [users,setUsers] = useState(mockUser)
    const [repo,setRepo] = useState(mockRepos)
    const [follower,setFollower]=useState(mockFollowers)
    const [isLoading,setIsLoading]=useState(false)
    const [request,setRequest]=useState(0)
    const [error,setError]=useState({show:false,msg:''})
    
    
    const GithubData = async(user)=>{
        toggleError()
        setIsLoading(true)
        const res = await axios(`${rootUrl}/users/${user}`)
        // .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})

        if(res){
            // console.log(res.data);
            setUsers(res.data)
            const{login,followers_url}=res.data

            axios(`${followers_url}?per_page=100`).then((res)=>setFollower(res.data))

            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((res)=>setRepo(res.data))

        }
        else{
            toggleError(true,'no user with that username')
        }
        checkReq()
        setIsLoading(false)
        
    }
    const checkReq = ()=>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data})=>{
            let {rate:{remaining}}=data
            setRequest(remaining)
            if(remaining===0){
                toggleError(true,'you finished daily limit')
            }
        })
    }

    const toggleError = (show=false,msg='')=>{
        setError({show,msg})
    }

    useEffect(checkReq,[])
    return <GithubContext.Provider value={{users,repo,follower,GithubData,isLoading,error,request}}>{children}</GithubContext.Provider>
}

export{GithubContext,GithubProvider}