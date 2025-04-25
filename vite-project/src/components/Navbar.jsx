import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-3 pt-3 my-2 mx-8 rounded-lg ml-8 pl-5 '>
        <div className="logo">
            <span className="font-bold mx-8 text-xl">iTask: your Task Manager</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer  hover:text-blue-500 transition-all'>Home</li>
            <li className='cursor-pointer  hover:text-blue-500 transition-all'> Your Tasks</li>
            {/* <li className='cursoropointer hover:text-blue-500 transition-all'>About the app</li> */}
        </ul>
    </nav>
  )
}
