const EmptyResult = ({ text }: { text: string; }) => {
  return (
    <div className="w-full text-center my-8">
      <p className="font-medium sm:text-lg md:text-xl">{text}</p>
    </div>      
  )
}

export default EmptyResult;