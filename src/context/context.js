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
    
    
    // const GithubData = async(user)=>{
    //     const res = await axios(`${rootUrl}/users/${user}`)
    //     // .then((res)=>{console.log(res)})
    //     .catch((err)=>{console.log(err)})
    //     if(res){
    //         setUsers(res.data)
    //         const{login,follower_url}=res.data

    //        const followers = await axios(`${follower_url}?per_page=100`)
    //     //    console.log(followers);            // await Promise.allSettled([
    //         //     axios(`${rootUrl}/users/${login}/repos?per_page=100`),
    //         //     axios(`${follower_url}?per_page=100`),
    //         // ])
    //         .then((res)=>{console.log(followers)})
    //     }
    // }
    
    // useEffect(()=>{
    //     GithubData('john-smilga')
    // })
    return <GithubContext.Provider value={{users,repo,follower}}>{children}</GithubContext.Provider>
}

export{GithubContext,GithubProvider}