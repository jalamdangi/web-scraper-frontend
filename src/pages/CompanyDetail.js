import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/companies/${id}`);
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (!company) {
    return <p className="text-center text-lg text-gray-500">Loading company details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={company.logo}
          alt={`${company.name} Logo`}
          className="w-20 h-20 object-cover rounded-full border border-gray-300"
        />
        <h1 className="text-3xl font-semibold text-gray-800">{company.name}</h1>
      </div>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {company.description}
      </p>
      <div className="mb-6">
        <p><strong>Facebook:</strong> <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.facebook}</a></p>
        <p><strong>LinkedIn:</strong> <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.linkedin}</a></p>
        <p><strong>Twitter:</strong> <a href={company.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.twitter}</a></p>
        <p><strong>Instagram:</strong> <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.instagram}</a></p>
      </div>
      <div className="mb-6">
        <p><strong>Address:</strong> {company.address}</p>
        <p><strong>Phone:</strong> {company.phone}</p>
        <p><strong>Email:</strong> <a href={`mailto:${company.email}`} className="text-blue-500 hover:underline">{company.email}</a></p>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Webpage Screenshot</h2>
      <img
        src={`http://localhost:5000/${company.screenshot}`}
        alt="Webpage Screenshot"
        className="w-full max-h-96 object-contain border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default CompanyDetails;
