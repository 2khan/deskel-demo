import Spinner from './Spinner'

const LoadingScreen = () => {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center">
      <Spinner />
    </div>
  )
}

export default LoadingScreen
