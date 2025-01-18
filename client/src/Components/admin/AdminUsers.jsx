// import React, { useEffect, useState } from 'react';
// import { useAdmin } from '../context/AdminContext';

// const AdminUsers = () => {
//     const { fetchUsers } = useAdmin();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const getUsers = async () => {
//             const data = await fetchUsers();
//             setUsers(data || []);
//         };
//         getUsers();
//     }, [fetchUsers]);

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Users</h2>
//             <ul className="space-y-4">
//                 {users.map((user) => (
//                     <li 
//                         key={user._id} 
//                         className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
//                     >
//                         {/* Avatar */}
//                         <img 
//                             src={user.avatar || 'https://via.placeholder.com/150'} 
//                             alt={`${user.username}'s avatar`} 
//                             className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
//                         />

//                         {/* User Info */}
//                         <div className="flex-1">
//                             <p className="text-lg font-semibold text-gray-800">{user.username}</p>
//                             <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminUsers;
import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminUsers = () => {
    const { fetchUsers } = useAdmin();
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortOption, setSortOption] = useState('newest'); // Default sort: newest to oldest

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers();
            setUsers(data || []);
        };
        getUsers();
    }, [fetchUsers]);

    // Handle sorting logic
    useEffect(() => {
        let sorted = [...users];
        if (sortOption === 'newest') {
            sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOption === 'oldest') {
            sorted = sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortOption === 'a-z') {
            sorted = sorted.sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortOption === 'z-a') {
            sorted = sorted.sort((a, b) => b.username.localeCompare(a.username));
        }
        setSortedUsers(sorted);
    }, [users, sortOption]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Users</h2>
            
            <div className="flex items-center justify-between mb-6">
                <label className="text-gray-700 font-medium">
                    Sort by:
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="ml-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest to Oldest</option>
                        <option value="oldest">Oldest to Newest</option>
                        <option value="a-z">A to Z (Username)</option>
                        <option value="z-a">Z to A (Username)</option>
                    </select>
                </label>
            </div>

            <ul className="space-y-4">
                {sortedUsers.map((user) => (
                    <li
                        key={user._id}
                        className="flex items-center border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
                    >
                        <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="w-16 h-16 rounded-full mr-4 object-cover"
                        />
                        <div>
                            <p className="text-lg font-bold text-gray-800">{user.username}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                            <p className="text-sm text-gray-500">
                                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsers;
