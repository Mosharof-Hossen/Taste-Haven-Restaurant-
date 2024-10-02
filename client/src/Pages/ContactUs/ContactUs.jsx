
const ContactUs = () => {
    return (
        <div className="p-10 mt-10 dark:text-white">
            <div>
                <div className="space-y-3">
                    <h3 className="font-bold text-3xl">Contact Us</h3>
                    <p className="text-gray-600 dark:text-white text-justify">We’d love to hear from you! At Taste Haven, we are dedicated to providing you with the best dining experience possible. Whether you have a question, feedback, or a special request, feel free to get in touch with us. Our team is here to assist you with reservations, event inquiries, catering services, or any other information you might need.</p>
                    <p className="text-gray-600 dark:text-white text-justify font-bold text-lg">Office Address</p>
                    <p>
                        <span className="font-semibold">Taste Haven</span> <br />
                        1234 Taste Haven <br />
                        Suite 567 <br />
                        Cityville, State 12345 <br />
                        Country
                    </p>

                    <p className="text-gray-600 text-justify dark:text-white font-bold text-lg">Phone Number</p>
                    <ul className="list-inside">
                        <li className="list-disc"><span className="font-semibold">General Inquiries:</span> +1 (123) 456-7890</li>
                        <li className="list-disc"><span className="font-semibold">Sales Department: </span> +1 (123) 456-7891</li>
                        <li className="list-disc"><span className="font-semibold">Customer Support: </span> +1 (123) 456-7892</li>
                    </ul>
                    <p className="text-gray-600 text-justify dark:text-white font-bold text-lg">Email Address</p>
                    <ul className="list-inside">
                        <li className="list-disc"><span className="font-semibold">General Information:</span>  info@tastehaven.com</li>
                        <li className="list-disc"><span className="font-semibold">Sales Inquiries:</span> sales@tastehaven.com</li>
                        <li className="list-disc"><span className="font-semibold">Support:</span> support@tastehaven.com</li>
                    </ul>
                    <p className="text-gray-600 dark:text-white text-justify font-bold text-lg">Visit Us</p>
                    <ul className="list-inside">
                        <p className="text-gray-600 dark:text-white text-justify">Our office is conveniently located in the heart of Cityville, making it easy for you to drop by for a consultation. We look forward to welcoming you! </p>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;