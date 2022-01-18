const Contact = () => {
  return (
    <div className='w-1/2 mx-auto p-8 rounded-md bg-white space-y-4 shadow-md'>
      <h2 className='text-xl font-bold'>お問い合わせ</h2>
      <p>
        お問い合わせは、制作者Tiwtter
        <a
          href='https://twitter.com/ShimaOh2a'
          target='_blank'
          className='text-sky-500 hover:underline'
          rel='noreferrer'
        >
          @ShimaOh2a
        </a>
        のDMまたはリプライにお願いします。
      </p>
    </div>
  );
};

export default Contact;
