import { useProductsContext } from '../hooks'

export function ProductsFilter() {
  const {
    categories,
    departments,
    handleCategoryClick,
    handleDepartmentClick,
    selectedCategoryId,
    selectedDepartmentId,
  } = useProductsContext()

  return (
    <aside className="w-full md:w-1/4 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Departamentos</h2>
      <ul>
        {departments.map((department) => (
          <li
            className={`mb-2 cursor-pointer ${selectedDepartmentId === department.id ? 'font-bold text-blue-600' : ''}`}
            key={department.id}
            onClick={() => handleDepartmentClick(department.id)}
          >
            {department.name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">Categorias</h2>
      <ul>
        {categories.map((category) => (
          <li
            className={`mb-2 cursor-pointer ${selectedCategoryId === category.id ? 'font-bold text-blue-600' : ''}`}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}
