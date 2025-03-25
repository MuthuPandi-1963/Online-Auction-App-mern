import { Link } from 'react-router-dom';
import CategoriesData from './categoryData'

const Categories = () => {
  return (
    <div className="w-[96%] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Categories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-4">
        {CategoriesData.map((category, index) => (
          <Link to={"/categories/" + category.name}
            key={index}
            className="group cursor-pointer relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:bg-gray-50"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="mb-3 relative rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors p-6">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-gray-700 text-center text-base font-semibold group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;