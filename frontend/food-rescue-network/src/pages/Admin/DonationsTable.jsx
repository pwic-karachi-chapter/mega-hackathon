import { useEffect, useState } from "react";
import useDonationStore from "../../stores/useDonationsStore";

const DonationsTable = () => {
  const {
    donations,
    loading,
    error,
    fetchDonations,
    fetchClaimedDonations,
    fetchDonationsByCharity,
    fetchDonationsByDonor,
    fetchDonationsByFoodType,
    fetchDonationsBeforeDate,
  } = useDonationStore(); // Accessing the Zustand store

  const [filters, setFilters] = useState({
    is_claimed: "",
    charity_username: "",
    donor_username: "",
    food_type: "",
    claimed_at__lt: "",
  });

  // Fetch donations based on the filters whenever they change
  useEffect(() => {
    fetchFilteredDonations();
  }, [filters]); // Runs whenever filters change

  const fetchFilteredDonations = () => {
    if (filters.is_claimed) {
      fetchClaimedDonations(); // Fetch claimed donations
    } else if (filters.charity_username) {
      fetchDonationsByCharity(filters.charity_username); // Fetch donations by charity username
    } else if (filters.donor_username) {
      fetchDonationsByDonor(filters.donor_username); // Fetch donations by donor username
    } else if (filters.food_type) {
      fetchDonationsByFoodType(filters.food_type); // Fetch donations by food type
    } else if (filters.claimed_at__lt) {
      fetchDonationsBeforeDate(filters.claimed_at__lt); // Fetch donations before a certain date
    } else {
      fetchDonations(); // Fetch all donations
    }
  };

  const handleFilterChange = (e) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [e.target.name]: e.target.value };
      return newFilters; // Update the filters state
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donations</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <select
          name="is_claimed"
          value={filters.is_claimed || ""}
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="true">Claimed</option>
        </select>
        <input
          type="text"
          name="charity_username"
          placeholder="Charity username"
          value={filters.charity_username || ""}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="donor_username"
          placeholder="Donor username"
          value={filters.donor_username || ""}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="food_type"
          placeholder="Food type"
          value={filters.food_type || ""}
          onChange={handleFilterChange}
          className="border p-2"
        />
        {/* <input
          type="date"
          name="claimed_at__lt"
          value={filters.claimed_at__lt || ""}
          onChange={handleFilterChange}
          className="border p-2"
        /> */}
      </div>

      {/* Loading and Error Messages */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Donations Table */}
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Food</th>
                <th className="p-2">Type</th>
                <th className="p-2">Charity</th>
                <th className="p-2">Donor</th>
                <th className="p-2">Claimed At</th>
              </tr>
            </thead>
            <tbody>
              {donations && donations.length > 0 ? (
                donations.map((donation, index) => (
                  <tr key={index}>
                    <td className="p-2">{donation.food_name}</td>
                    <td className="p-2">{donation.food_type}</td>
                    <td className="p-2">{donation.charity_name}</td>
                    <td className="p-2">{donation.donor_name}</td>
                    <td className="p-2">
                      {new Date(donation.claimed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-2 text-center">
                    No donations available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationsTable;
