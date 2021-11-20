import React from 'react';
import { motion } from 'framer-motion';

function FadeInOnScroll( { children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: '-3rem' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'tween', duration: 1.5, delayChildren: 3 }}
        >
            {children}
        </motion.div>
    );
}

export default FadeInOnScroll;