import React from 'react'

const LocationSearchPanel = (props) => {


    // sample array for location 
    const locations = [
        "123 Main St, Springfield, IL",
        "456 Elm St, Shelbyville, IL",
        "789 Oak St, Capital City, IL",
        "101 Maple St, Ogdenville, IL",
        "202 Pine St, North Haverbrook, IL",
        "303 Cedar St, Brockway, IL",
        "404 Birch St, Waverly Hills, IL",
        "505 Walnut St, Cypress Creek, IL"
    ]


    return (
        <div>
            {/* this is just a sample data  */}
            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }






        </div>
    )
}

export default LocationSearchPanel