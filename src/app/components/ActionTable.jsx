import React from 'react';

/**
 * A reusable component for displaying action highlights in a table format
 * @param {Object} props
 * @param {Array} props.highlightValues - Array of objects with highlight and date properties
 * @param {number} props.rows - Number of rows to display (default: 3)
 */
const ActionTable = ({ highlightValues, rows = 3 }) => {
  // Ensure we always have the correct number of rows by padding with empty entries if needed
  const normalizedData = [...highlightValues];
  
  // Add empty rows if needed
  while (normalizedData.length < rows) {
    normalizedData.push({ highlight: "", date: "" });
  }
  
  // Limit to specified number of rows
  const displayData = normalizedData.slice(0, rows);

  return (
    <div className="min-w-[60px]">
      <table className="w-full table-fixed border-collapse text-[8px] bg-white border-2 border-[#595959]">
        <thead className="sticky font-bold bg-gray-100">
          <tr>
            <th
              className="px-[0.1rem] py-[0.1rem]"
              style={{ width: '75%' }}
            >
              Highlight
            </th>
            <th
              className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
              style={{ width: '25%' }}
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, index) => (
            <tr key={index} style={{ height: '20px' }}>
              <td
                className="border-2 border-[#595959] align-middle"
                style={{
                  width: '80%',
                  padding: '0.2rem',
                  height: 'auto',
                }}
              >
                {item.highlight}
              </td>
              <td
                className="border-2 border-[#595959] text-center align-middle"
                style={{
                  width: '20%',
                  wordWrap: 'break-word',
                  padding: '0.2rem',
                  height: 'auto',
                }}
              >
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActionTable;