
const reasons = [
    {
        title: "High Quality Services",
        description: "We provide top-notch services with a focus on quality and reliability.",
        image: "https://static.vecteezy.com/system/resources/previews/011/875/468/non_2x/quality-icon-award-to-winner-medal-for-professional-line-symbol-assurance-sign-premium-level-product-warranty-rosette-ribbon-with-tick-outline-illustration-vector.jpg"
    },
    {
        id: 2,
        title: "Affordable Prices",
        description: "Our team consists of highly skilled professionals dedicated to excellence.",
        image: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-best-price-line-icon-vector-png-image_6692934.png",
    },
    {
        id: 3,
        title: "24/7 Support",
        description: "We offer round-the-clock customer support to assist you anytime.",
        image: "https://png.pngtree.com/png-clipart/20230923/original/pngtree-247-support-flat-icon-headphone-call-center-symbol-vector-png-image_12839486.png",
    },
];


const WhyUs = () => {

    return (
        <section className="bg-white py-12 px-4 text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg  text-center">
                            <img src={reason.image} alt={reason.title} className="mx-auto mb-4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white" />
                            <h3 className="text-lg font-semibold text-gray-800">{reason.title}</h3>
                            <p className="text-gray-600 mt-2">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
