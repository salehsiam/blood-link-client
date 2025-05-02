const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center md:w-5/12 mx-auto mb-10">
      <p className="text-primary text-sm mb-1 font-medium tracking-wide">
        {subHeading}
      </p>
      <h3 className="text-2xl font-semibold text-accent uppercase border-y-2 border-primary py-2">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
