import PropTypes from 'prop-types';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className='mx-auto text-center space-y-5 my-5'>
            <p className='text-[#D99904] text-xl'>--- {subHeading} ---</p>
            <h3 className='md:text-4xl text-3xl border-y-2 p-2 max-w-xs mx-auto uppercase'>{heading}</h3>
        </div>
    );
};

SectionTitle.propTypes = {
    subHeading: PropTypes.string,
    heading: PropTypes.string,
};

export default SectionTitle;