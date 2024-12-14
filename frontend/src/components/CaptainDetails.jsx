import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-3'>
                        <img className='h-10 w-10 rounded-full object-cover' src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" />
                        <h4 className='text-lg font-medium'>Mukesh Sharma</h4>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold'>₹300</h4>
                        <p className='text-sm text-gray-600'>Earned</p>
                    </div>
                </div>
                <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>

                </div>
    </div>
  )
}

export default CaptainDetails