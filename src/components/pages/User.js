import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './User.module.css';
const User = () => {
    const [user, setUser] = useState([]);

    // Pagination code 5 line perPage 
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Number of users to display per page

    // useEffect(() => {
    //     axios.get("http://localhost:8080")
    //         .then(result => setUser(result.data))
    //         .catch(err => console.log(err))
    // }, [])


    useEffect(() => {
        axios.get("http://localhost:8080")
            .then(result => {
                // Assuming the result.data is an array of user objects.
                // You can perform validation here before setting the user state.
                setUser(result.data.filter(user => user && user.name && user.email && user.phone && user.age !== undefined));
            })
            .catch(err => console.log(err))
    }, []);

    // const handelDelete = (id) => {
    //     axios.delete('http://localhost:8080/deleteUser/'+ id)
    //         .then(res=>{
    //             console.log(res)
    //         window.location.reload()})
    //         .catch(err=>console.log(err))
    // }
    const handelDelete = (id) => {
        // Validate the ID before sending the delete request to the server.
        if (id && typeof id === 'string') {
            if (window.confirm('Are You Sure Delete User !')) {
                axios.delete('http://localhost:8080/deleteUser/' + id)
                    .then(res => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
            } else {
                console.log('Invalid ID format.');
            }
        }
    }

    // Calculate the index range of users to display for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

    // Function to handle pagination when clicking on page numbers
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#acb3ab' }}       >
            <div className="table-body">
                <Link to="/create" class="btn btn-primary mt-3 w-100">
                    Add + User
                </Link>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Phone No.</th>
                                <th>Age</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.age}</td>
                                    <td>{user.active}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} className="btn btn-primary" >
                                            Update
                                        </Link>
                                        <button type="button" onClick={() => handelDelete(user._id)} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination buttons */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(user.length / usersPerPage) }).map((_, index) => (
                        <button key={index + 1} onClick={() => handlePageClick(index + 1)} className={`btn ${currentPage === index + 1 ? 'btn-warning' : 'btn-secondary'}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//     <div className="w-50 bg-white rounded p-3">
//         <Link to='/create' className="btn btn-primary">Add + User</Link>
//         <table className="table">
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Email-address</th>
//                     <th>Phone-No.</th>
//                     <th>Age</th>
//                     <th>Status</th>
//                     <th>Action</th>

//                 </tr>

//             </thead>
//             <tbody>
//                 {
//                     user.map((user) => {
//                         return <tr>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                             <td>{user.age}</td>
//                             <td>{user.active}</td>
//                             <td>  <Link to={`/edit/${user._id}`} className="btn btn-primary mb-1 text-center d-flex">Update</Link>
//                                 <Link to={'/'} onClick={(event) => handelDelete(user._id)} className="btn btn-danger">Remove</Link>
//                             </td>
//                         </tr>
//                     })}
//             </tbody>
//         </table>
//     </div>

// </div>     

export default User;
