import React from 'react';

// Make sure the component is properly defined as a function that returns JSX
const EfficiencyTable = ({ EfficiencytableValue, EfficiencytargetTable }) => {
  // Ensure the component returns a single root element
  return (
    <table className="w-full table-fixed border-collapse text-[8px] text-white">
      <thead className="sticky top-0 bg-gray-100">
        <tr>
          {Array.from({ length: 12 }, (_, i) => (
            <th
              key={i + 1}
              className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
              style={{ width: '8.33%' }}
            >
              {i + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Array.from({ length: 12 }, (_, i) => {
            const monthData = EfficiencytableValue.find(m => m.month === i + 1);
            const value = monthData ? monthData.value : null;

            let bgColorClass = '';
            if (value !== null && value !== undefined) {
              bgColorClass = value >= EfficiencytargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
            }

            return (
              <td
                key={i + 1}
                className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                style={{
                  width: '8.33%',
                  height: 'auto',
                  padding: '0.1rem',
                }}
              >
                {value !== null && value !== undefined ? value.toFixed(1) : '-'}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

// Make sure to export the component as default
export default EfficiencyTable;
