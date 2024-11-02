import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HamburgerMenuProps {
    onToggle: (isOpen: boolean) => void;
    username: string
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onToggle, username }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()
    const toggleMenu = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onToggle(newIsOpen);
    };

    return (
        <div>
            {/* Hamburger Icon */}
            <div
                className={`flex flex-col justify-between w-8 h-6 cursor-pointer ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
            >
                <span className={`block h-1 bg-gray-900 dark:bg-gray-900 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-1 bg-red-500 dark:bg-gray-900 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-1 bg-red-500 dark:bg-gray-900 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>

            {/* Overlay for closing the drawer by clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={toggleMenu}
                />
            )}

            {/* Sidebar (Top Right Drawer) */}
            <div
                className={`fixed top-0 right-0 w-64 p-4 h-full bg-stone-400 shadow-lg text-black 
                    transition-transform transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full  '
                    }`}
            >
                {/* Close Button */}
                <button
                    className="text-black absolute top-4 right-4 focus:outline-none"
                    onClick={toggleMenu}
                >
                    &#10005;
                </button>




                {username ? (

                    <div>
                        <div className='text-center text-2xl font-semibold'> {username}</div>
                        <div className='flex text-xl  text-bold justify-center w-full text-gray-900'>


                            <ul className='p-4 space-y-2 mt-8'>
                                <button className="hover:text-green-900 rounded-md px-2 w-48 flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
                                    onClick={() => {

                                    }}
                                >Home

                                </button>
                                <button className="hover:text-green-900 rounded-md px-2 w-full flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
                                    onClick={() => {
navigate("/addEvent")
                                    }}
                                >Add Event

                                </button>
                                <button className="hover:text-green-900 rounded-md px-2 w-full flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
                                    onClick={() => {
navigate("/events")
                                    }}
                                >My Events

                                </button>
                                <button className="hover:text-red-700 rounded-md px-2 w-full 
               flex justify-left border-gray-500 shadow-lg 
              text-red-900 cursor-pointer"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        navigate('/');
                                    }}
                                >Logout</button>
                            </ul>
                        </div>
                    </div>


                ) : (

                    <div>
                        <div className=' w-full text-2xl font-semibold '>EvenTTracker</div>
                        <div className='flex text-xl text-bold justify-center  text-gray-900'>


                            <ul className='p-4 space-y-2 mt-8'>
                                <button className="hover:text-green-900 rounded-md px-2 w-48 flex justify-left 
                                border-gray-500 shadow-lg text-gray-700 cursor-pointer"
                                    onClick={() => {

                                    }}
                                >Home

                                </button>
                                <button className="hover:text-green-900  rounded-md px-2  w-full
                                flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
                                    onClick={() => {
                                        navigate("/signup")
                                    }}
                                >Signup

                                </button>
                                <button className="hover:text-green-900 rounded-md px-2 w-full flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                >Signin

                                </button>

                            </ul>
                        </div>
                    </div>

                )}

            </div>
        </div>
    );
};

export default HamburgerMenu;