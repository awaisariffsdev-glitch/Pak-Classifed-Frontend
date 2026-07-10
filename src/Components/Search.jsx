// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faMicrophone } from '@fortawesome/free-solid-svg-icons';

// const Search = () => {
//     return (
//         <div className="navtheme-search-container">
//             <div className="navtheme-search-box">
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className="navtheme-search-icon" />

//                 <input
//                     type="text"
//                     placeholder="Search by Make, Model, Price, or City..."
//                     className="navtheme-search-input"
//                 />

//                 {/* <FontAwesomeIcon icon={faMicrophone} className="navtheme-mic-icon" />
//                  */}
//                  <button>Search</button>
//             </div>

//             <style>{`
//                 .navtheme-search-container {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     margin-top: 20px;
//                     padding: 0 16px;
//                 }

//                 .navtheme-search-box {
//                     width: 650px;
//                     max-width: 100%;
//                     height: 65px;
//                     background-color: #1D2023;
//                     border: 2px solid white;
//                     border-radius: 50px;
//                     display: flex;
//                     align-items: center;
//                     padding: 0 25px;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
//                     transition: border-color 0.2s ease, box-shadow 0.2s ease;
//                 }

//                 .navtheme-search-box:focus-within {
//                     border-color: #f1f1f1;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), 0 0 0 0.2rem rgba(255,255,255,0.1);
//                 }

//                 .navtheme-search-icon,
//                 .navtheme-mic-icon {
//                     font-size: 20px;
//                     color: rgba(255,255,255,0.6);
//                     flex-shrink: 0;
//                     transition: color 0.2s ease;
//                 }

//                 .navtheme-mic-icon {
//                     cursor: pointer;
//                 }

//                 .navtheme-mic-icon:hover {
//                     color: #f1f1f1;
//                 }

//                 .navtheme-search-input {
//                     flex: 1;
//                     border: none;
//                     outline: none;
//                     font-size: 16px;
//                     font-family: monospace;
//                     margin: 0 20px;
//                     background: transparent;
//                     color: #f1f1f1;
//                     min-width: 0;
//                 }

//                 .navtheme-search-input::placeholder {
//                     color: rgba(255,255,255,0.5);
//                 }

//                 @media (max-width: 700px) {
//                     .navtheme-search-box {
//                         height: 54px;
//                         padding: 0 18px;
//                     }
//                     .navtheme-search-icon,
//                     .navtheme-mic-icon {
//                         font-size: 17px;
//                     }
//                     .navtheme-search-input {
//                         font-size: 14px;
//                         margin: 0 14px;
//                     }
//                 }

//                 @media (max-width: 400px) {
//                     .navtheme-search-box {
//                         height: 48px;
//                         padding: 0 14px;
//                         border-width: 1px;
//                     }
//                     .navtheme-search-input {
//                         font-size: 13px;
//                         margin: 0 10px;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Search;


// Search bar — text input with search icon and button; navigates to home with ?q= query param on submit/enter
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!query.trim()) return;
        navigate(`/?q=${encodeURIComponent(query.trim())}`);

    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    return (
        <div className="navtheme-search-container">
            <div className="navtheme-search-box">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="navtheme-search-icon" />

                <input
                    type="text"
                    value={query}
                    onKeyDown={handleKeyDown}
                    onChange={(e)=>{setQuery(e.target.value)}}
                    placeholder="Search by Make, Model, Price, or City..."
                    className="navtheme-search-input"
                />

                <button className="navtheme-search-btn" onClick={handleSearch} >
                    Search
                </button>
            </div>

            <style>{`
                .navtheme-search-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                    padding: 0 16px;
                }

                .navtheme-search-box {
                    width: 650px;
                    max-width: 100%;
                    height: 65px;
                    background-color: #1D2023;
                    border: 2px solid white;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    padding: 0 8px 0 25px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .navtheme-search-box:focus-within {
                    border-color: #f1f1f1;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), 0 0 0 0.2rem rgba(255,255,255,0.1);
                }

                .navtheme-search-icon {
                    font-size: 20px;
                    color: rgba(255,255,255,0.6);
                    flex-shrink: 0;
                    transition: color 0.2s ease;
                }

                .navtheme-search-input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    font-family: 'Exo', sans-serif;
                    margin: 0 20px;
                    background: transparent;
                    color: #f1f1f1;
                    min-width: 0;
                }

                .navtheme-search-input::placeholder {
                    color: rgba(255,255,255,0.5);
                }

                .navtheme-search-btn {
                    flex-shrink: 0;
                    background-color: #f1f1f1;
                    color: #1D2023;
                    border: 1px solid #f1f1f1;
                    border-radius: 50px;
                    padding: 12px 28px;
                    font-size: 15px;
                    
                    font-family:Impact;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .navtheme-search-btn:hover {
                    background-color: transparent;
                    color: #f1f1f1;
                    border: 1px solid #f1f1f1;
                }

                .navtheme-search-btn:active {
                    transform: scale(0.98);
                }

                @media (max-width: 700px) {
                    .navtheme-search-box {
                        height: 54px;
                        padding: 0 6px 0 18px;
                    }
                    .navtheme-search-icon {
                        font-size: 17px;
                    }
                    .navtheme-search-input {
                        font-size: 14px;
                        margin: 0 14px;
                    }
                    .navtheme-search-btn {
                        padding: 9px 18px;
                        font-size: 13px;
                    }
                }

                @media (max-width: 500px) {
                    .navtheme-search-box {
                        height: 48px;
                        padding: 0 5px 0 14px;
                        border-width: 1px;
                    }
                    .navtheme-search-input {
                        font-size: 13px;
                        margin: 0 10px;
                    }
                    .navtheme-search-btn {
                        padding: 7px 14px;
                        font-size: 12px;
                    }
                }

                @media (max-width: 380px) {
                    .navtheme-search-input {
                        display: none;
                    }
                    .navtheme-search-btn {
                        margin-left: auto;
                    }
                }
            `}</style>
        </div>
    );
};

export default Search;