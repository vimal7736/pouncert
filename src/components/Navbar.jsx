import React from 'react';
import {Button, Menu , Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectFilled} from "@ant-design/icons";

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="nav">
                <Avatar/>
                <Typography.Title level={2} className='logo'>
                    <Link to="/crypto_verse">Cryptoverse</Link>
                </Typography.Title>
                <Button className="menu-control-container">

                </Button>
            </div>
        </div>
    )
}
export default Navbar
