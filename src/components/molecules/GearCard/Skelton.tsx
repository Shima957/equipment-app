const Skelton = () => {
  return (
    <div className='py-4 px-8 border border-gray-300 bg-white rounded-md shadow-sm '>
      <div className='md:flex space-x-6 animate-pulse'>
        <div className='md:shrink-0'>
          <div className='w-[200px] h-[200px] bg-slate-300 rounded'></div>
        </div>
        <div className='space-y-4 mt-10'>
          <div className='space-y-2'>
            <div className='h-4 w-20 bg-slate-300 rounded-md'></div>
            <div className='h-4 w-36 bg-slate-300 rounded-md'></div>
          </div>
          <div className='space-y-2'>
            <div className='h-4 w-20 bg-slate-300 rounded-md'></div>
            <div className='h-4 w-36 bg-slate-300 rounded-md'></div>
          </div>
          <div className='h-8 w-24 bg-slate-300 rounded-md'></div>
          <div>
            <span></span>
            <p className='font-bold'></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skelton;
