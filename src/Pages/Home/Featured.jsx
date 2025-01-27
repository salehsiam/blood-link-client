const Featured = () => {
  const campaigns = [
    {
      title: "Help Save Lives",
      image:
        "https://media.post.rvohealth.io/wp-content/uploads/2020/09/732x549_Side_Effects_of_Donating_Plasma-1-732x549.jpg",
      description: "Join us in this life-saving campaign to donate blood.",
    },
    {
      title: "Donate Now for Health",
      image:
        "https://s3sdghub.s3.eu-west-1.amazonaws.com/core-cms/public/styles/media_image_large/public/images/projects/alg-blood-donation-jpg.jpg?itok=b6pxFq7W",
      description: "Your blood can make a difference in someone's life.",
    },
    {
      title: "Urgent Blood Needed",
      image:
        "https://media.licdn.com/dms/image/v2/C4D12AQHDu6pqmH4QdQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1609873709735?e=2147483647&v=beta&t=tks8Qo5qm6P9vU-9ge2e4F0ZWuii2LUNs4j6RCCfRAk",
      description: "An urgent campaign in need of blood donations.",
    },
    // Add more campaigns as needed
  ];

  return (
    <section className="p-6 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Campaign Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{campaign.title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {campaign.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
