import React from 'react';

/**
 * A reusable component for displaying monthly data in a table format
 * @param {Object} props
 * @param {Array} props.monthlyValues - Array of objects with month and value properties
 * @param {number} props.targetValue - Target value for comparison
 * @param {boolean} props.higherIsBetter - If true, values >= target are good (green), otherwise values <= target are good
 * @param {number} props.decimalPlaces - Number of decimal places to display (default: 1)
 */
const MonthlyDataTable = ({ 
  monthlyValues, 
  targetValue, 
  higherIsBetter = true,
  decimalPlaces = 1 
}) => {
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
            const monthData = monthlyValues.find(m => m.month === i + 1);
            const value = monthData ? monthData.value : null;

            let bgColorClass = '';
            if (value !== null && value !== undefined) {
              if (higherIsBetter) {
                bgColorClass = value >= targetValue ? 'bg-[#00B050]' : 'bg-[#FF0000]';
              } else {
                bgColorClass = value <= targetValue ? 'bg-[#00B050]' : 'bg-[#FF0000]';
              }
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
                {value !== null && value !== undefined ? value.toFixed(decimalPlaces) : '-'}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default MonthlyDataTable;