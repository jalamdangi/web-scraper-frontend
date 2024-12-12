import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/companies");
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  const handleSelectCompany = (id) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((companyId) => companyId !== id) : [...prev, id]
    );
  };

  const deleteSelectedCompanies = async () => {
    try {
      await axios.post("http://localhost:5000/api/companies/delete", { ids: selectedCompanies });
      setCompanies((prev) => prev.filter((company) => !selectedCompanies.includes(company._id)));
      setSelectedCompanies([]);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadCSV = () => {
    const csvContent = [
      ["Name", "Description", "Logo", "Facebook", "LinkedIn", "Twitter", "Instagram", "Screenshot","Address","Phone","Email"].join(","),
      ...companies.map((company) =>
        [
          company.name,
          company.description,
          company.logo,
          company.facebook,
          company.linkedin,
          company.twitter,
          company.instagram,
          company.screenshot,
          company.address,
          company.phone,
          company.email,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "companies.csv");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Scraped Companies</h1>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2 text-left">Select</th>
              <th className="p-2 text-left cursor-pointer">Company</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Facebook</th>
              <th className="p-2 text-left">LinkedIn</th>
              <th className="p-2 text-left">Instagram</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="hover:bg-gray-100">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company._id)}
                    onChange={() => handleSelectCompany(company._id)}
                  />
                </td>
                <td className="p-2 flex cursor-pointer">
                  <img
                    onClick={() => navigate(`/company/${company._id}`)}
                    src={`http://localhost:5000/${company.logo || company.screenshot}`}
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                  <p className="p-2">{company.name}</p>
                </td>
                <td className="p-2">{company.description}</td>
                <td className="p-2">
                  <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Facebook
                  </a>
                </td>
                <td className="p-2">
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    LinkedIn
                  </a>
                </td>
                <td className="p-2">
                  <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Instagram
                  </a>
                </td>
                <td className="p-2">{company.address||"-"}</td>
                <td className="p-2">{company.phone||"-"}</td>
                <td className="p-2">{company.email||"-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-4 justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={downloadCSV}
          >
            Download CSV
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={deleteSelectedCompanies}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
