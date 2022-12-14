import React, { useContext, useEffect, useState } from 'react';
import HomeBanner from './Banner'
import api from '../../axios'
import Loading from '../loading'
import './style.css'
import HomeItem from './Item';
import HomeTop from './Top';
import { useNavigate } from 'react-router-dom';
import HomeListAlbum from './HomeListAlbum';
import Chat from './Chat';
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
    document.title = 'Music App'
    const navigate = useNavigate()
    const [data, setData] = useState();
    const { dataUser } = useContext(UserContext)

    useEffect(() => {
        api.get('api/Home').then(res => {
            setData(res.data)
        })
    }, [setData])

    if (!data)
        return <Loading />
    return (
        <>
            <div className='row'>
                <div className='col-xl-9 col-12'>
                    {data?.banner.length > 0 && (
                        <div className='card p-3 mb-4'>
                            <div className='overflow-hidden position-relative border-radius-lg bg-cover h-100'>
                                <HomeBanner data={data.banner} />
                            </div>
                        </div>
                    )}
                    <div className='card p-3 mb-4'>
                        <div className='overflow-hidden position-relative border-radius-lg bg-cover h-100'>
                            <div className='text-dark font-weight-bolder mb-4 pt-2'>New songs</div>
                            <HomeItem data={data.newsong} />
                        </div>
                    </div>
                    <div className='card p-3 mb-4'>
                        <div className='overflow-hidden position-relative border-radius-lg bg-cover h-100'>
                            <div className='text-dark font-weight-bolder mb-4 pt-2'>New albums</div>
                            <div className='home-content row'>
                                {data.albums.map((e, i) => (
                                    <div key={i} 
                                        onClick={() => navigate('/album/' + e.tag)} 
                                        className='col-mini col-6 col-sm-4 col-md-3 col-max cursor-pointer'>
                                        <div className='item'>
                                            <div className='img'>
                                                <img
                                                    src={e.localImg === 1
                                                        ? (process.env.REACT_APP_API_SRC_ALBUM_IMG + e.img)
                                                        : e.img
                                                    }
                                                    alt='avatar' />
                                                <div onClick={() => navigate('/album/' + e.tag)} className='info'>
                                                    <div className='name'>
                                                        {e.name}
                                                    </div>
                                                    <div className='singer'>
                                                        {e.artist}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className='card p-3 mb-4'>
                        <div className='overflow-hidden position-relative border-radius-lg bg-cover h-100'>
                            <div className='text-dark font-weight-bolder mb-4 pt-2'>The songs for today</div>
                            <HomeItem data={data.randomsong} />
                        </div>
                    </div>
                </div>


                <div className='col-xl-3 col-12'>
                    {dataUser && (
                        <Chat/>
                    )}
                    <HomeTop />
                    <HomeListAlbum />
                </div>
            </div>
        </>
    );
};

export default Home;