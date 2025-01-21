const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center md:w-4/12 mx-auto mb-8">
      <p className="text-red-500 mb-1">{subHeading}</p>
      <h3 className="text-3xl font-semibold uppercase py-2">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
