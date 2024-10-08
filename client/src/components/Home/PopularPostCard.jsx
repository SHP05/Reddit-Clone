const PopularPostCard = ({ img_url, title, subTitle }) => {
  return (
    <>
      <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-12">
        <img
          src={img_url}
          alt="University of Southern California"
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <a
          href="#"
          className=" absolute w-full h-full top-0 left-0 bg-white opacity-0 z-10 transition-opacity duration-300 hover:opacity-10 "
        ></a>
        <h3 className="z-10 mt-3 text-3xl font-bold text-white">{title}</h3>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
          {subTitle}
        </div>
      </article>
    </>
  );
};

export default PopularPostCard;
