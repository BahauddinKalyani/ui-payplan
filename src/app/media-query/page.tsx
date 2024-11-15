'use client'
// import useMediaQuery from '@/hooks/user-media-query';

const MyComponent = () => {
  // const isDesktop = useMediaQuery("(min-width: 768px)");
  const isDesktop = true;
  return (
    <div>
      {isDesktop ? (
        <p>This is a desktop view</p>
      ) : (
        <p>This is a mobile view</p>
      )}
    </div>
  );
};

export default MyComponent;