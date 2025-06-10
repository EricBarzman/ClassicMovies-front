function LoadingSpinner() {
  return (
    <div className="flex item-center justify-center h-screen text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400" />
    </div>
  )
}

export default LoadingSpinner;