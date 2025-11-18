
const PerhatianCard = ({children}) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-6 bg-red-500 rounded-full"></div>
        <h3 className="text-md font-semibold text-blue-800">Perhatian</h3>
      </div>
      
      
    {children}
    </div>
  )
}

export default PerhatianCard