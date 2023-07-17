import React from 'react';
import { Result, Button } from 'antd';
import { motion } from 'framer-motion';

const SchoolErrorPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <motion.div
                className="w-2/3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Result
                    status="warning"
                    title="School Error"
                    subTitle="Sorry, it seems like you've registered for another school."
                    extra={
                        <Button type="primary" href="#" className="mt-4">
                            Back to Homepage
                        </Button>
                    }
                />
            </motion.div>
        </div>
    );
};

export default SchoolErrorPage;
