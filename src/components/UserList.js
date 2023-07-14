import React, { useState, useEffect } from 'react';
import { fetchUserData, exportUserData } from '../services/api';
import { NavLink } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineExport } from 'react-icons/ai';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const limit = 10; // Number of users to fetch per page

  useEffect(() => {
    fetchData();
  }, [currentPage, searchKeyword]);

  const fetchData = async () => {
    try {
      const response = await fetchUserData(limit, (currentPage - 1) * limit, searchKeyword);
      setUsers(response.users);
      setTotalPages(Math.ceil(response.totalCount / limit));
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleExport = async () => {
    try {
      await exportUserData();
    } catch (error) {
      alert('Failed to export data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User List</h2>
        <div className="flex items-center">
          <NavLink
            to="/newUser"
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
          >
            <AiOutlinePlus className="mr-2" />
            New User
          </NavLink>
          <button
            onClick={handleExport}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md ml-2"
          >
            <AiOutlineExport className="mr-2" />
            Export
          </button>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-3">
          <AiOutlineSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 focus:outline-none ml-1 text-left"
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">ID</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Department</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Role</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-4 border-b">{user.id}</td>
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b">{user.department}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.role}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex justify-center items-center">
                    <NavLink to={`/editUser/${user.id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg mr-2">
                      <AiOutlineEdit />
                    </NavLink>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-gray-100'
          }`}
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          <AiOutlineDoubleLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-gray-100'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-gray-100'
          }`}
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default UserList;
