interface ContainerProps {
  children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-4 py-6">
      {children}
    </div>
  )
}

export default Container