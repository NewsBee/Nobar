import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const AdminProtect = ({children}) => {
    const {user} = UserAuth();
    if(user?.email != "admin@gmail.com"){
        return <Navigate to={'/'}/>
    }else{
        return children;
    }
};

export default AdminProtect