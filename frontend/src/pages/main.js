import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import '../css/main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers(){

            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            })

            setUsers(response.data)
        };
        loadUsers();
    },[match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });
        
        socket.on('match', dev => {
            setMatchDev(dev);
        })
    }, [match.params.id]);

    async function handleLike(id, user){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id !== id))
        console.log('You liked ' + user);
    }

    async function handleDislike(id, user){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id !== id))
        console.log('You disliked ' + user);
    }

//     function shuffleArray(array) {
//         let i = array.length - 1;
//         for (; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             const temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//         }
//         return array;
//     }
    
//    const shuffledUsers = shuffleArray(users);

    return(
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="TinDev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{ user.name === null ? user.user : user.name }</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id, user.name)}>
                                <img src={dislike} alt="Dislike" />
                            </button>
                            <button type="button" onClick={() => handleLike(user._id, user.name)}>
                                <img src={like} alt="Like" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            ) : (
                <div className="empty">Acabou "/</div>
            )}
        {matchDev && (

            <div className="match-container">
                <img src={itsamatch} alt="Its's a match!" />
                <img className="avatar" src={matchDev.avatar} alt=""/>
                <strong>{matchDev.name}</strong>
                <p>{matchDev.bio}</p>

                <button type="button" onClick={() => setMatchDev(null)}>close</button>
            </div>

        )}

        </div>
    );
}