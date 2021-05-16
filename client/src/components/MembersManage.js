import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, usersFetch } from '../actions/userActions';


function MembersManage(props) {


    const fetchedUsers = useSelector((state) => state.fetchedUsers);
    const {users } = fetchedUsers;
    const dispatch = useDispatch();
  
    const removeMemberHandler = (uid) =>{
        dispatch(removeUser(uid));
        setTimeout(
          function() {
            dispatch(usersFetch());
          }
          ,
          1000
      );
        }


    useEffect(() => {
        dispatch(usersFetch());
        return () => {

        }
    }, [dispatch])





    return (
        <div className="manage-table-wrapper">
            {!users ? (
                <div>
                    no
                </div>
            ) : (
                <div>
                    <span id="title">Members:</span>
                    <table className="manage-table">
                        <thead>
                            <tr className="">
                                <th className="">
                                    <span>ID</span>
                                </th>
                                <th className="">
                                    <span>Name</span>
                                </th>
                                <th className="">
                                    <span>Reg date</span>
                                </th>
                                <th className="">
                                    <span>Address</span>
                                </th>
                                <th className="">
                                    <span>Email</span>
                                </th>
                                <th className="">

                                </th>

                            </tr>
                        </thead>
                        <tbody >
                           
                            {users.map((user) => (
                                <tr className="" key={user._id}>
                                    <td id="id">
                                        {user._id}
                                    </td>
                                    <td id="name">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td id="Reg date">
                                        {user.regTime.slice(0, 10)}
                                    </td>
                                    <td id="address">
                                        {user.address}, {user.suburb}, {user.state}, {user.postcode}
                                    </td>
                                    <td id="Email">
                                        {user.email}
                                    </td>
                                    <td id="action">
                                        <button onClick={() => removeMemberHandler(user._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>




    )
}

export default MembersManage;