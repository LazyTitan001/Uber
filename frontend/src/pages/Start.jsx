import React from 'react'
import { Link } from 'react-router-dom'

const logo = 'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417';
const main = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/2bdda1182519763.652f36061af63.jpg';

const Start = () => {
    return (
        <div>
            <div className='bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full'style={{backgroundImage:`url(${main})`}}>
                <img className='w-16 ml-8' src={logo} alt="" />

                <div className='bg-white pb-8 py-4 px-4'>
                    <h2 className='text-[30px] font-semibold'>Get Started with Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start