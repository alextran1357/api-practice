import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  // State for contacts, loading, error, and activityDate filter
  const [contacts, setContacts] = useState([]); // Holds the fetched contacts
  const [loading, setLoading] = useState(false); // Boolean to track loading state
  const [error, setError] = useState(""); // String for error message
  const [activityDate, setActivityDate] = useState('2022-10-01'); // Initial date filter

  // Effect hook to fetch contacts when component mounts or activityDate changes
  useEffect(() => {
    // Call the fetchContacts function (defined below) here
    // Remember to use dependency array with [activityDate]
    fetchContacts();
  }, [activityDate]);

  // Function to fetch contacts from API
  const fetchContacts = async () => {
    // Start loading
    setLoading(true);

    try {
      // Make the GET request to `/get_contacts` with the activityDate as a query parameter
      const response = await axios.get(`/get_contacts?activityDate=${activityDate}`);
      
      // Set contacts state with the data from response
      setContacts(response.data.message);

      // Clear any previous errors
      setError(null);
    } catch (err) {
      // Set an error message if the API call fails
      setError(response.data.error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      
      {/* Date input to set activityDate */}
      <input 
        type="date" 
        value={____} // Set the current activityDate value
        onChange={(e) => setActivityDate(____)} // Update activityDate based on user input
      />
      
      {/* Conditional rendering for loading and error states */}
      {loading && <p>____</p>} // Display "Loading..." message
      {error && <p>____</p>}   // Display error message if there is one

      {/* List of contacts */}
      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            {contact.first_name} {contact.last_name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
