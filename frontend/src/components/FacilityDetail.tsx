import { FaCheckCircle } from 'react-icons/fa';

type Props = {
  facilities: string[];
};

const Facility = ({ facilities }: Props) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {facilities.map((facility, index) => (
          <li key={index} className="flex items-center space-x-2">
            <FaCheckCircle className="text-black" />
            <span className="text-gray-700">{facility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Facility;
