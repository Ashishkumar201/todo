import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-2 mx-8 rounded-lg ml-8 pl-5 '>
        <div className="logo">
            <span className="font-bold mx-8 text-xl">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer  hover:text-blue-500 transition-all'>Home</li>
            <li className='cursor-pointer  hover:text-blue-500 transition-all'> Your Tasks</li>
        </ul>
    </nav>
  )
}
